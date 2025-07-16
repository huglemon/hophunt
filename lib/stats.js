// 统计数据管理工具
const STORAGE_KEY = 'hophunt_stats';

// 获取统计数据
export function getStats() {
  if (typeof window === 'undefined') return null;
  
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
    console.error('获取统计数据失败:', error);
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
  saveStats(stats);
  return stats;
}

// 保存统计数据
export function saveStats(stats) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('保存统计数据失败:', error);
  }
}

// 记录访问
export function recordVisit() {
  const stats = getStats();
  if (!stats) return;
  
  const now = Date.now();
  stats.visits.push({ timestamp: now });
  stats.totalVisits++;
  
  saveStats(stats);
  return stats;
}

// 记录投票
export function recordVote() {
  const stats = getStats();
  if (!stats) return;
  
  const now = Date.now();
  stats.votes.push({ timestamp: now });
  stats.totalVotes++;
  
  saveStats(stats);
  return stats;
}

// 获取最近一小时的统计
export function getHourlyStats() {
  const stats = getStats();
  if (!stats) return { visits: 0, votes: 0 };
  
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
export function getLastVoteTime() {
  const stats = getStats();
  if (!stats || stats.votes.length === 0) return null;
  
  const lastVote = stats.votes[stats.votes.length - 1];
  return lastVote.timestamp;
}

// 检查是否应该显示警告
export function shouldShowWarning(maxHourlyVotes = 10, warningThreshold = 5) {
  const hourlyStats = getHourlyStats();
  return hourlyStats.votes >= warningThreshold;
}

// 检查是否应该等待
export function shouldWait(minWaitTime = 300000) {
  const lastVoteTime = getLastVoteTime();
  if (!lastVoteTime) return false;
  
  const now = Date.now();
  return (now - lastVoteTime) < minWaitTime;
} 