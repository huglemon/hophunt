// 统计数据API路由
import { NextResponse } from 'next/server';
import { getStatsFromDB, recordVisitToDB, recordVoteToDB, repairDataConsistency } from '@/lib/db';

// 内存缓存
let statsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 1000; // 30秒缓存

// 获取统计数据
export async function GET() {
  try {
    // 检查缓存
    const now = Date.now();
    if (statsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      const response = NextResponse.json({
        success: true,
        data: statsCache,
        cached: true,
      });
      
      // 添加缓存头
      response.headers.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
      return response;
    }
    
    // 并行执行清理和获取数据，但不等待清理结果
    const repairPromise = repairDataConsistency().catch(console.error);
    const dbStats = await getStatsFromDB();
    
    if (!dbStats) {
      return NextResponse.json({
        success: false,
        message: '数据库未配置或连接失败',
        data: {
          visits: 0,
          votes: 0,
          totalVisits: 0,
          totalVotes: 0,
        }
      });
    }
    
    // 计算近1小时的统计
    const hourAgo = now - 60 * 60 * 1000;
    
    const recentVisits = dbStats.visits.filter(visit => {
      const timestamp = typeof visit === 'string' ? parseInt(visit) : visit;
      return timestamp > hourAgo;
    });
    
    const recentVotes = dbStats.votes.filter(vote => {
      const timestamp = typeof vote === 'string' ? parseInt(vote) : vote;
      return timestamp > hourAgo;
    });
    
    // 获取最后一次投票时间
    const lastVoteTime = dbStats.votes.length > 0 ? 
      Math.max(...dbStats.votes.map(vote => typeof vote === 'string' ? parseInt(vote) : vote)) : 
      null;
    
    // 数据一致性检查：确保累计数据不小于当前数据
    const correctedTotalVisits = Math.max(dbStats.totalVisits, dbStats.visits.length);
    const correctedTotalVotes = Math.max(dbStats.totalVotes, dbStats.votes.length);
    
    const result = {
      visits: recentVisits.length,
      votes: recentVotes.length,
      totalVisits: correctedTotalVisits,
      totalVotes: correctedTotalVotes,
      lastVoteTime,
    };
    
    // 更新缓存
    statsCache = result;
    cacheTimestamp = now;
    
    const response = NextResponse.json({
      success: true,
      data: result,
      cached: false,
    });
    
    // 添加缓存头
    response.headers.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
    
    return response;
    
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return NextResponse.json({
      success: false,
      message: '获取统计数据失败',
      error: error.message,
    }, { status: 500 });
  }
}

// 记录访问或投票
export async function POST(request) {
  try {
    const { action } = await request.json();
    
    let success = false;
    
    if (action === 'visit') {
      success = await recordVisitToDB();
    } else if (action === 'vote') {
      success = await recordVoteToDB();
      // 投票后清除缓存
      statsCache = null;
    } else {
      return NextResponse.json({
        success: false,
        message: '无效的操作类型',
      }, { status: 400 });
    }
    
    if (!success) {
      return NextResponse.json({
        success: false,
        message: '数据库未配置或操作失败',
      }, { status: 500 });
    }
    
    // 清除缓存以确保数据一致性
    if (action === 'vote') {
      statsCache = null;
    }
    
    return NextResponse.json({
      success: true,
      message: `${action === 'visit' ? '访问' : '投票'}记录成功`,
    });
    
  } catch (error) {
    console.error('记录统计数据失败:', error);
    return NextResponse.json({
      success: false,
      message: '记录统计数据失败',
      error: error.message,
    }, { status: 500 });
  }
} 