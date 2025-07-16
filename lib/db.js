// 数据库配置 - 支持 Upstash Redis 和本地开发
import { Redis } from '@upstash/redis';

// 数据库配置
export const dbConfig = {
  // 是否启用数据库存储（如果为false，则回退到localStorage）
  enabled: process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
  
  // 数据过期时间（秒）
  dataExpiration: 24 * 60 * 60, // 24小时
  
  // 统计数据键名前缀
  keyPrefix: 'hophunt:',
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
      redis.lrange(`${dbConfig.keyPrefix}visits`, 0, -1),
      redis.lrange(`${dbConfig.keyPrefix}votes`, 0, -1),
      redis.get(`${dbConfig.keyPrefix}total_visits`) || 0,
      redis.get(`${dbConfig.keyPrefix}total_votes`) || 0,
    ]);
    
    // 过滤过期数据
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    
    const validVisits = visits.filter(visit => {
      const timestamp = typeof visit === 'string' ? parseInt(visit) : visit;
      return timestamp > dayAgo;
    });
    
    const validVotes = votes.filter(vote => {
      const timestamp = typeof vote === 'string' ? parseInt(vote) : vote;
      return timestamp > dayAgo;
    });
    
    return {
      visits: validVisits,
      votes: validVotes,
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
    await redis.lpush(`${dbConfig.keyPrefix}visits`, now);
    
    // 设置过期时间
    await redis.expire(`${dbConfig.keyPrefix}visits`, dbConfig.dataExpiration);
    
    // 增加总访问数
    await redis.incr(`${dbConfig.keyPrefix}total_visits`);
    
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
    await redis.lpush(`${dbConfig.keyPrefix}votes`, now);
    
    // 设置过期时间
    await redis.expire(`${dbConfig.keyPrefix}votes`, dbConfig.dataExpiration);
    
    // 增加总投票数
    await redis.incr(`${dbConfig.keyPrefix}total_votes`);
    
    return true;
  } catch (error) {
    console.error('记录投票失败:', error);
    return false;
  }
}

// 清理过期数据
export async function cleanupExpiredData() {
  if (!dbConfig.enabled || !redis) return;
  
  try {
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    
    // 获取所有访问记录
    const visits = await redis.lrange(`${dbConfig.keyPrefix}visits`, 0, -1);
    const votes = await redis.lrange(`${dbConfig.keyPrefix}votes`, 0, -1);
    
    // 过滤有效数据
    const validVisits = visits.filter(visit => {
      const timestamp = typeof visit === 'string' ? parseInt(visit) : visit;
      return timestamp > dayAgo;
    });
    
    const validVotes = votes.filter(vote => {
      const timestamp = typeof vote === 'string' ? parseInt(vote) : vote;
      return timestamp > dayAgo;
    });
    
    // 重新设置数据
    if (validVisits.length > 0) {
      await redis.del(`${dbConfig.keyPrefix}visits`);
      await redis.lpush(`${dbConfig.keyPrefix}visits`, ...validVisits);
      await redis.expire(`${dbConfig.keyPrefix}visits`, dbConfig.dataExpiration);
    }
    
    if (validVotes.length > 0) {
      await redis.del(`${dbConfig.keyPrefix}votes`);
      await redis.lpush(`${dbConfig.keyPrefix}votes`, ...validVotes);
      await redis.expire(`${dbConfig.keyPrefix}votes`, dbConfig.dataExpiration);
    }
    
  } catch (error) {
    console.error('清理过期数据失败:', error);
  }
} 