// 数据库配置 - 支持 Upstash Redis 和本地开发
import { Redis } from '@upstash/redis';

// 数据库配置
export const dbConfig = {
  // 是否启用数据库存储（如果为false，则回退到localStorage）
  enabled: process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
};

// 初始化 Redis 客户端
let redis = null;
if (dbConfig.enabled) {
  try {
    redis = Redis.fromEnv();
  } catch (error) {
    console.error('Redis 初始化失败:', error);
  }
}

// 获取统计数据
export async function getStatsFromDB() {
  if (!dbConfig.enabled || !redis) return null;
  
  try {
    const [visits, votes, totalVisits, totalVotes] = await Promise.all([
      redis.lrange('visits', 0, -1),
      redis.lrange('votes', 0, -1),
      redis.get('total_visits') || 0,
      redis.get('total_votes') || 0,
    ]);
    
    return {
      visits: visits,
      votes: votes,
      totalVisits: parseInt(totalVisits) || 0,
      totalVotes: parseInt(totalVotes) || 0,
    };
  } catch (error) {
    console.error('获取数据库统计数据失败:', error);
    return null;
  }
}

// 记录访问
export async function recordVisitToDB() {
  if (!dbConfig.enabled || !redis) return false;
  
  try {
    const now = Date.now();
    
    // 添加访问记录
    await redis.lpush('visits', now);
    
    // 增加总访问数
    await redis.incr('total_visits');
    
    return true;
  } catch (error) {
    console.error('记录访问失败:', error);
    return false;
  }
}

// 记录投票
export async function recordVoteToDB() {
  if (!dbConfig.enabled || !redis) return false;
  
  try {
    const now = Date.now();
    
    // 添加投票记录
    await redis.lpush('votes', now);
    
    // 增加总投票数
    await redis.incr('total_votes');
    
    return true;
  } catch (error) {
    console.error('记录投票失败:', error);
    return false;
  }
}

// 数据修复函数 - 修复计数器与实际数据不一致的问题
export async function repairDataConsistency() {
  if (!dbConfig.enabled || !redis) return false;
  
  try {
    const [visits, votes] = await Promise.all([
      redis.lrange('visits', 0, -1),
      redis.lrange('votes', 0, -1),
    ]);
    
    // 获取当前计数器值
    const [currentTotalVisits, currentTotalVotes] = await Promise.all([
      redis.get('total_visits') || 0,
      redis.get('total_votes') || 0,
    ]);
    
    const actualTotalVisits = visits.length;
    const actualTotalVotes = votes.length;
    
    // 如果计数器小于实际数据，则修复
    if (parseInt(currentTotalVisits) < actualTotalVisits) {
      await redis.set('total_visits', actualTotalVisits);
      console.log(`修复访问计数器: ${currentTotalVisits} -> ${actualTotalVisits}`);
    }
    
    if (parseInt(currentTotalVotes) < actualTotalVotes) {
      await redis.set('total_votes', actualTotalVotes);
      console.log(`修复投票计数器: ${currentTotalVotes} -> ${actualTotalVotes}`);
    }
    
    return true;
  } catch (error) {
    console.error('数据修复失败:', error);
    return false;
  }
} 