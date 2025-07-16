import VotingPage from '@/components/VotingPage';
import { getStatsFromDB } from '@/lib/db';
import { config } from '@/lib/config';

// 启用 ISR，每30秒重新生成页面
export const revalidate = 30;

// 生成静态元数据
export async function generateMetadata() {
  return {
    title: `${config.product.name} - 投票页面`,
    description: config.product.description,
    openGraph: {
      title: config.product.name,
      description: config.product.description,
      type: 'website',
    },
  };
}

// 服务端获取初始数据
async function getInitialStats() {
  try {
    // 获取数据库统计数据
    const dbStats = await getStatsFromDB();
    
    if (!dbStats) {
      return {
        visits: 0,
        votes: 0,
        totalVisits: 0,
        totalVotes: 0,
        lastVoteTime: null,
      };
    }
    
    // 计算近1小时的统计
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;
    
    const statsData = dbStats;
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
    
    return {
      visits: recentVisits.length,
      votes: recentVotes.length,
      totalVisits: statsData.totalVisits,
      totalVotes: statsData.totalVotes,
      lastVoteTime,
    };
    
  } catch (error) {
    console.error('获取初始统计数据失败:', error);
    return {
      visits: 0,
      votes: 0,
      totalVisits: 0,
      totalVotes: 0,
      lastVoteTime: null,
    };
  }
}

export default async function Home() {
  // 服务端获取初始数据
  const initialStats = await getInitialStats();
  
  return <VotingPage initialStats={initialStats} />;
}
