// 统计数据API路由
import { NextResponse } from 'next/server';
import { getStatsFromDB, recordVisitToDB, recordVoteToDB, cleanupExpiredData } from '@/lib/db';

// 获取统计数据
export async function GET() {
  try {
    // 并行执行清理和获取数据
    const [cleanupResult, dbStats] = await Promise.allSettled([
      cleanupExpiredData(),
      getStatsFromDB()
    ]);
    
    if (dbStats.status !== 'fulfilled' || !dbStats.value) {
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
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;
    
    const statsData = dbStats.value;
    const recentVisits = statsData.visits.filter(visit => {
      const timestamp = typeof visit === 'string' ? parseInt(visit) : visit;
      return timestamp > hourAgo;
    });
    
    const recentVotes = statsData.votes.filter(vote => {
      const timestamp = typeof vote === 'string' ? parseInt(vote) : vote;
      return timestamp > hourAgo;
    });
    
    // 获取最后一次投票时间
    const lastVoteTime = statsData.votes.length > 0 ? 
      Math.max(...statsData.votes.map(vote => typeof vote === 'string' ? parseInt(vote) : vote)) : 
      null;
    
    const response = NextResponse.json({
      success: true,
      data: {
        visits: recentVisits.length,
        votes: recentVotes.length,
        totalVisits: statsData.totalVisits,
        totalVotes: statsData.totalVotes,
        lastVoteTime,
      }
    });
    
    // 添加缓存头，缓存30秒
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