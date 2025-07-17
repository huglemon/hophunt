'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, ExternalLink, X } from 'lucide-react';
import { config } from '@/lib/config';
import { recordVisit, recordVote, getHourlyStats, shouldShowWarning, shouldWait, getLastVoteTime } from '@/lib/stats';
import { StatsLoader, PageLoader } from '@/components/LoadingSpinner';

export default function VotingPage({ initialStats = null }) {
	const [stats, setStats] = useState(
		initialStats || {
			visits: 0,
			votes: 0,
			totalVisits: 0,
			totalVotes: 0,
		}
	);
	const [showWarning, setShowWarning] = useState(false);
	const [shouldWaitTime, setShouldWaitTime] = useState(false);
	const [lastVoteTime, setLastVoteTime] = useState(initialStats?.lastVoteTime || null);
	const [showModal, setShowModal] = useState(false);
	const [visibleTasks, setVisibleTasks] = useState(0);
	const [tasks, setTasks] = useState(config.tasks);
	const [loading, setLoading] = useState(false);
	const [votingInProgress, setVotingInProgress] = useState(false);
	const [dataLoading, setDataLoading] = useState(!initialStats); // 如果有初始数据，则不显示加载状态

	useEffect(() => {
		// 如果有初始数据，只需要记录访问和检查状态
		const initializeClientData = async () => {
			try {
				// 记录访问（不等待结果）
				recordVisit().catch(console.error);

				// 如果没有初始数据，则获取完整数据
				if (!initialStats) {
					const [currentStats, warning, waitTime, lastVote] = await Promise.allSettled([
						getHourlyStats(),
						shouldShowWarning(),
						shouldWait(),
						getLastVoteTime(),
					]);

					if (currentStats.status === 'fulfilled') {
						setStats(currentStats.value);
					}

					if (warning.status === 'fulfilled') {
						setShowWarning(warning.value);
					}

					if (waitTime.status === 'fulfilled') {
						setShouldWaitTime(waitTime.value);
					}

					if (lastVote.status === 'fulfilled') {
						setLastVoteTime(lastVote.value);
					}
				} else {
					// 有初始数据时，只检查警告和等待状态
					const [warning, waitTime] = await Promise.allSettled([shouldShowWarning(), shouldWait()]);

					if (warning.status === 'fulfilled') {
						setShowWarning(warning.value);
					}

					if (waitTime.status === 'fulfilled') {
						setShouldWaitTime(waitTime.value);
					}
				}
			} catch (error) {
				console.error('初始化客户端数据失败:', error);
			} finally {
				setDataLoading(false);
			}
		};

		initializeClientData();
	}, [initialStats]);

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
			setVotingInProgress(true);
			
			// 获取ProductHunt URL - 使用配置中的具体产品URL
			const productHuntUrl = config.product.productHuntUrl;
			console.log('准备跳转到:', productHuntUrl);
			console.log('完整配置:', config.product);

			// 方法1: 立即在用户点击的同步上下文中打开新窗口
			console.log('尝试打开新窗口...');
			let newWindow;
			try {
				newWindow = window.open(productHuntUrl, '_blank');
				console.log('新窗口对象:', newWindow);
			} catch (popupError) {
				console.error('window.open失败:', popupError);
				newWindow = null;
			}
			
			// 异步记录投票
			recordVote().catch(console.error);
			
			// 检查是否成功打开新窗口
			if (!newWindow) {
				console.warn('新窗口为null，尝试备用方案');
				
				// 方法2: 创建隐藏链接并点击
				const link = document.createElement('a');
				link.href = productHuntUrl;
				link.target = '_blank';
				link.rel = 'noopener noreferrer';
				link.style.display = 'none';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				
				console.log('使用链接点击方式跳转');
			}

			console.log('跳转处理完成，1.5秒后跳转到感谢页面');
			setShowModal(false);
			
			// 延迟跳转到感谢页面，确保新窗口有时间打开
			setTimeout(() => {
				console.log('跳转到感谢页面');
				window.location.href = '/thank-you';
			}, 1500);
			
		} catch (error) {
			console.error('投票处理失败:', error);
			// 即使记录失败，也继续投票流程
			setShowModal(false);
			setVotingInProgress(false);
			window.location.href = '/thank-you';
		}
	};

	const formatTime = (timestamp) => {
		if (!timestamp) return '从未';
		const date = new Date(timestamp);
		return date.toLocaleString('zh-CN');
	};

	const getWaitTimeRemaining = () => {
		if (!lastVoteTime) {
			return 0;
		}
		const now = Date.now();
		const remaining = config.voting.minWaitTime - (now - lastVoteTime);
		const waitMinutes = Math.max(0, Math.ceil(remaining / 1000 / 60));
		
		// 如果不需要等待，隐藏警告
		if (waitMinutes === 0) {
			setShowWarning(false);
		}
		
		return waitMinutes;
	};

	// 弹窗打开时的动画效果
	useEffect(() => {
		if (showModal) {
			let currentTask = 0;
			const interval = setInterval(() => {
				if (currentTask < tasks.length) {
					setVisibleTasks(currentTask + 1);
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
						<a
							href={config.product.productUrl}
							target='_blank'
							rel='noreferrer noopener'
							className='border border-gray-300 text-gray-700 px-6 sm:px-8 py-3 text-sm font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto'
						>
							看看产品
						</a>
					</div>

					{/* 警告信息 */}
					{showWarning && getWaitTimeRemaining() > 0 && (
						<div className='bg-blue-50 border border-blue-200 px-4 py-3 mb-8 sm:mb-12 text-sm text-blue-800 flex items-center gap-2 mx-4 sm:mx-0'>
							<AlertTriangle className='w-4 h-4 flex-shrink-0' />
							<span>💡 建议等待 {getWaitTimeRemaining()} 分钟后再投票，这样可以获得更好的投票效果</span>
						</div>
					)}

					{/* 统计数据 */}
					{dataLoading ? (
						<StatsLoader />
					) : (
						<div className='bg-gray-50 px-6 sm:px-8 py-6 sm:py-8 mx-4 sm:mx-0'>
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
					)}
				</div>
			</div>

			{/* 任务清单弹窗 */}
			{showModal && (
				<div className='fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50'>
					<div className='bg-white max-w-md w-full p-6 relative animate-fade-in'>
						<button
							onClick={() => setShowModal(false)}
							className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
						>
							<X className='w-5 h-5' />
						</button>

						<h2 className='text-xl font-medium mb-6'>投票前确认</h2>

						<div className='space-y-3 mb-6'>
							{tasks.slice(0, visibleTasks).map((task, index) => (
								<div
									key={task.id}
									className={`flex items-center gap-3 p-3 border transition-all duration-300 animate-slide-in ${
										task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
									}`}
								>
									<div
										className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
											task.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
										}`}
									>
										{task.completed ? '✓' : index + 1}
									</div>
									<span className={`text-sm ${task.completed ? 'text-green-800' : 'text-gray-700'}`}>{task.text}</span>
								</div>
							))}
						</div>

						{visibleTasks >= tasks.length && (
							<div className='space-y-3'>
								<button
									onClick={handleFinalVote}
									disabled={votingInProgress}
									className={`w-full py-3 px-4 text-sm font-medium transition-colors ${
										votingInProgress ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
									} text-white`}
								>
									{votingInProgress ? '正在处理投票...' : '确认投票'}
								</button>
								{shouldWaitTime && getWaitTimeRemaining() > 0 && (
									<div className='text-xs text-yellow-600 text-center'>
										💡 建议等待 {getWaitTimeRemaining()} 分钟后再投票，以获得更好的效果
									</div>
								)}
								<button
									onClick={() => setShowModal(false)}
									disabled={votingInProgress}
									className='w-full py-3 px-4 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50'
								>
									取消
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
