'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, ExternalLink, X } from 'lucide-react';
import { config } from '@/lib/config';
import { recordVisit, recordVote, getHourlyStats, shouldShowWarning, shouldWait, getLastVoteTime } from '@/lib/stats';

export default function VotingPage() {
	const [stats, setStats] = useState({
		visits: 0,
		votes: 0,
		totalVisits: 0,
		totalVotes: 0,
	});
	const [showWarning, setShowWarning] = useState(false);
	const [shouldWaitTime, setShouldWaitTime] = useState(false);
	const [lastVoteTime, setLastVoteTime] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [visibleTasks, setVisibleTasks] = useState(0);
	const [tasks, setTasks] = useState(config.tasks);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// 异步初始化数据
		const initializeData = async () => {
			try {
				// 记录访问
				await recordVisit();

				// 获取统计数据
				const currentStats = await getHourlyStats();
				setStats(currentStats);

				// 检查是否需要显示警告
				const warning = await shouldShowWarning();
				const waitTime = await shouldWait();
				const lastVote = await getLastVoteTime();
				
				setShowWarning(warning);
				setShouldWaitTime(waitTime);
				setLastVoteTime(lastVote);
			} catch (error) {
				console.error('初始化数据失败:', error);
			} finally {
				setLoading(false);
			}
		};

		initializeData();
	}, []);

	const handleVoteClick = async () => {
		// 自动复制产品名称
		try {
			await navigator.clipboard.writeText(config.product.name);
		} catch (error) {
			console.error('复制失败:', error);
		}
		setShowModal(true);
	};

	const handleFinalVote = async () => {
		try {
			await recordVote();
			setShowModal(false);

			// 使用noreferrer和noopener来隐藏来源
			const link = document.createElement('a');
			link.href = config.product.productHuntUrl;
			link.target = '_blank';
			link.rel = 'noreferrer noopener';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			// 跳转到感谢页面
			window.location.href = '/thank-you';
		} catch (error) {
			console.error('投票记录失败:', error);
			// 即使记录失败，也继续投票流程
			setShowModal(false);
			window.location.href = '/thank-you';
		}
	};

	const formatTime = (timestamp) => {
		if (!timestamp) return '从未';
		const date = new Date(timestamp);
		return date.toLocaleString('zh-CN');
	};

	const getWaitTimeRemaining = () => {
		if (!lastVoteTime) return 0;
		const now = Date.now();
		const remaining = config.voting.minWaitTime - (now - lastVoteTime);
		return Math.max(0, Math.ceil(remaining / 1000 / 60));
	};

	// 弹窗打开时的动画效果
	useEffect(() => {
		if (showModal) {
			let currentTask = 0;
			const interval = setInterval(() => {
				if (currentTask < tasks.length) {
					setVisibleTasks(currentTask + 1);
					// 自动完成任务
					// setTasks(prev => prev.map((task, index) =>
					//   index === currentTask ? { ...task, completed: true } : task
					// ));
					currentTask++;
				} else {
					clearInterval(interval);
				}
			}, 800);

			return () => clearInterval(interval);
		}
	}, [showModal, tasks.length]);

	// 显示加载状态
	if (loading) {
		return (
			<div className='bg-white'>
				<div className='flex items-center justify-center pt-24 md:pt-48 pb-16'>
					<div className='max-w-2xl mx-auto px-4 sm:px-8 text-center'>
						<div className='text-gray-500'>加载中...</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white'>
			{/* 主要内容区域 */}
			<div className='flex items-center justify-center pt-24 md:pt-48 pb-16'>
				<div className='max-w-2xl mx-auto px-4 sm:px-8 text-center'>
					{/* 主标题 */}
					<div className='mb-8 sm:mb-12'>
						<h1 className='text-4xl sm:text-6xl font-light text-gray-900 mb-4 sm:mb-6'>{config.homepage.title}</h1>
						<p className='text-base sm:text-lg text-gray-600 leading-relaxed mx-auto px-4 sm:px-0'>{config.homepage.subtitle}</p>
					</div>

					{/* 按钮组 */}
					<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4 sm:px-0'>
						<button
							onClick={handleVoteClick}
							className='bg-black text-white px-6 sm:px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto'
						>
							我要投票
							<ExternalLink className='w-4 h-4' />
						</button>
						<button className='border border-gray-300 text-gray-700 px-6 sm:px-8 py-3 text-sm font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto'>
							随便看看
						</button>
					</div>

					{/* 警告信息 */}
					{(showWarning || shouldWaitTime) && (
						<div className='bg-gray-50 border border-gray-200 p-4 sm:p-6 mb-8 sm:mb-12 text-left max-w-md mx-auto'>
							<div className='flex items-start gap-3'>
								<AlertTriangle className='w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0' />
								<div>
									<h3 className='text-sm font-medium text-gray-900 mb-2'>温馨提示</h3>
									<div className='text-sm text-gray-600 space-y-1'>
										{shouldWaitTime && <p>建议休息 {getWaitTimeRemaining()} 分钟后再投票哦</p>}
										{showWarning && <p>最近投票有点多，换个网络或稍后再试试吧</p>}
									</div>
								</div>
							</div>
						</div>
					)}

					{/* 统计卡片 */}
					<div className='bg-gray-50 border border-gray-200 p-6 sm:p-8 max-w-md mx-auto'>
						<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center'>
							<div>
								<div className='text-xl sm:text-2xl font-light text-gray-900 mb-1'>{stats.visits}</div>
								<div className='text-xs text-gray-500'>本小时访问</div>
							</div>
							<div>
								<div className='text-xl sm:text-2xl font-light text-gray-900 mb-1'>{stats.votes}</div>
								<div className='text-xs text-gray-500'>本小时投票</div>
							</div>
							<div>
								<div className='text-xl sm:text-2xl font-light text-gray-900 mb-1'>{stats.totalVisits}</div>
								<div className='text-xs text-gray-500'>累计访问</div>
							</div>
							<div>
								<div className='text-xl sm:text-2xl font-light text-gray-900 mb-1'>{stats.totalVotes}</div>
								<div className='text-xs text-gray-500'>累计投票</div>
							</div>
						</div>
						<div className='mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 text-xs text-gray-500'>
							<p>上次投票: {formatTime(lastVoteTime)}</p>
						</div>
					</div>
				</div>
			</div>

			{/* 任务清单弹窗 */}
			{showModal && (
				<div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
					<div className='bg-white max-w-md w-full p-6 sm:p-8 border border-gray-200'>
						<div className='flex items-center justify-between mb-4 sm:mb-6'>
							<h2 className='text-base sm:text-lg font-medium text-gray-900'>准备投票</h2>
							<button
								onClick={() => setShowModal(false)}
								className='text-gray-400 hover:text-gray-600'
							>
								<X className='w-5 h-5' />
							</button>
						</div>

						<p className='text-gray-600 mb-6 sm:mb-8 text-sm'>正在为你准备最佳投票体验...</p>

						<div className='space-y-3 sm:space-y-4 mb-6 sm:mb-8'>
							{tasks.slice(0, visibleTasks).map((task, index) => (
								<div
									key={task.id}
									className={`flex items-center transition-all duration-500 ${
										index < visibleTasks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
									}`}
								>
									<div
										className={`w-4 h-4 border mr-3 flex items-center justify-center transition-all duration-300 ${
											task.completed ? 'bg-black border-black' : 'border-gray-300'
										}`}
									>
										{task.completed && <div className='w-2 h-2 bg-white animate-pulse' />}
									</div>
									<span
										className={`text-sm transition-all duration-300 ${
											task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
										}`}
									>
										{task.text}
									</span>
									{task.completed && <span className='ml-2 text-xs text-green-600 animate-fade-in'>✓</span>}
								</div>
							))}
						</div>

						<div className='flex flex-col sm:flex-row gap-3'>
							<button
								onClick={() => setShowModal(false)}
								className='flex-1 border border-gray-300 text-gray-700 py-3 px-4 text-sm hover:bg-gray-50 transition-colors'
							>
								等等再说
							</button>
							<button
								onClick={handleFinalVote}
								className={`flex-1 py-3 px-4 text-sm transition-all duration-300 ${
									visibleTasks === tasks.length
										? 'bg-black text-white hover:bg-gray-800'
										: 'bg-gray-300 text-gray-500 cursor-not-allowed'
								}`}
								disabled={visibleTasks !== tasks.length}
							>
								{visibleTasks === tasks.length ? '好的，去投票' : '准备中...'}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
