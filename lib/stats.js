// 统计数据管理工具 - 支持API和localStorage双重模式
const STORAGE_KEY = 'hophunt_stats';

// 检查是否在客户端环境
const isClient = typeof window !== 'undefined';

// API调用函数
async function callStatsAPI(method, data = null) {
  if (!isClient) return null;
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch('/api/stats', options);
    const result = await response.json();
    
    if (!result.success) {
      console.warn('API调用失败，回退到localStorage:', result.message);
      return null;
    }
    
    return result.data || result;
  } catch (error) {
    console.warn('API调用失败，回退到localStorage:', error);
    return null;
  }
}

// 获取统计数据 - 优先使用API，失败则使用localStorage
export async function getStats() {
  // 尝试从API获取
  const apiStats = await callStatsAPI('GET');
  if (apiStats) {
    return {
      visits: apiStats.visits || 0,
      votes: apiStats.votes || 0,
      totalVisits: apiStats.totalVisits || 0,
      totalVotes: apiStats.totalVotes || 0,
      lastVoteTime: apiStats.lastVoteTime,
    };
  }
  
  // 回退到localStorage
  if (!isClient) return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initStats();
    
    const stats = JSON.parse(stored);
    // 清理过期数据（超过24小时）
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    
    stats.visits = stats.visits.filter(visit => visit.timestamp > dayAgo);
    stats.votes = stats.votes.filter(vote => vote.timestamp > dayAgo);
    
    return stats;
  } catch (error) {
    console.error('获取localStorage统计数据失败:', error);
    return initStats();
  }
}

// 初始化统计数据
function initStats() {
  const stats = {
    visits: [],
    votes: [],
    totalVisits: 0,
    totalVotes: 0,
  };
  if (isClient) {
    saveStats(stats);
  }
  return stats;
}

// 保存统计数据到localStorage
export function saveStats(stats) {
  if (!isClient) return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('保存统计数据失败:', error);
  }
}

// 记录访问 - 优先使用API，失败则使用localStorage
export async function recordVisit() {
  // 尝试使用API
  const apiResult = await callStatsAPI('POST', { action: 'visit' });
  if (apiResult) {
    return;
  }
  
  // 回退到localStorage
  const stats = await getStats();
  if (!stats) return;
  
  const now = Date.now();
  stats.visits.push({ timestamp: now });
  stats.totalVisits++;
  
  saveStats(stats);
  return stats;
}

// 记录投票 - 优先使用API，失败则使用localStorage
export async function recordVote() {
  // 尝试使用API
  const apiResult = await callStatsAPI('POST', { action: 'vote' });
  if (apiResult) {
    return;
  }
  
  // 回退到localStorage
  const stats = await getStats();
  if (!stats) return;
  
  const now = Date.now();
  stats.votes.push({ timestamp: now });
  stats.totalVotes++;
  
  saveStats(stats);
  return stats;
}

// 获取最近一小时的统计
export async function getHourlyStats() {
  const stats = await getStats();
  if (!stats) return { visits: 0, votes: 0, totalVisits: 0, totalVotes: 0 };
  
  // 如果是API返回的数据，直接返回
  if (typeof stats.visits === 'number') {
    return stats;
  }
  
  // 如果是localStorage数据，需要计算
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;
  
  const recentVisits = stats.visits.filter(visit => visit.timestamp > hourAgo);
  const recentVotes = stats.votes.filter(vote => vote.timestamp > hourAgo);
  
  return {
    visits: recentVisits.length,
    votes: recentVotes.length,
    totalVisits: stats.totalVisits,
    totalVotes: stats.totalVotes,
  };
}

// 获取最后一次投票时间
export async function getLastVoteTime() {
  const stats = await getStats();
  if (!stats) return null;
  
  // 如果是API返回的数据
  if (stats.lastVoteTime !== undefined) {
    return stats.lastVoteTime;
  }
  
  // 如果是localStorage数据
  if (!stats.votes || stats.votes.length === 0) return null;
  
  const lastVote = stats.votes[stats.votes.length - 1];
  return lastVote.timestamp;
}

// 检查是否应该显示警告
export async function shouldShowWarning(maxHourlyVotes = 10, warningThreshold = 5) {
  const hourlyStats = await getHourlyStats();
  return hourlyStats.votes >= warningThreshold;
}

// 检查是否应该等待
export async function shouldWait(minWaitTime = 300000) {
  const lastVoteTime = await getLastVoteTime();
  if (!lastVoteTime) return false;
  
  const now = Date.now();
  return (now - lastVoteTime) < minWaitTime;
} 