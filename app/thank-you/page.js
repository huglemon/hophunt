'use client';

import { useState } from 'react';
import { Heart, Copy, CheckCircle, ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { config } from '@/lib/config';

export default function ThankYouPage() {
	const [copied, setCopied] = useState(false);

	const handleCopyCoupon = async () => {
		try {
			await navigator.clipboard.writeText(config.thankYou.couponCode);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error('复制失败:', error);
		}
	};

	const handleGoBack = () => {
		window.location.href = '/';
	};

	return (
		<div className='min-h-screen bg-white'>
			{/* 主要内容区域 */}
			<div className='flex items-center justify-center pt-16 md:pt-48 pb-8'>
				<div className='max-w-4xl mx-auto px-4 sm:px-8 text-center'>
					{/* 主标题 */}
					<div className='mb-8 sm:mb-12'>
						<div className='w-12 h-12 sm:w-16 sm:h-16 border-2 border-black mx-auto mb-4 sm:mb-6 flex items-center justify-center'>
							<Heart className='w-6 h-6 sm:w-8 sm:h-8 text-black' />
						</div>
						<h1 className='text-4xl sm:text-6xl font-light text-gray-900 mb-4 sm:mb-6'>{config.thankYou.title}</h1>
						<p className='text-base sm:text-lg text-gray-600 leading-relaxed mx-auto px-4 sm:px-0'>{config.thankYou.message}</p>
					</div>

					{/* 优惠券卡片 */}
					<div className='bg-gray-50 border border-gray-200 p-6 sm:p-8 mx-auto mb-8 sm:mb-12 max-w-3xl'>
						<h2 className='text-base sm:text-lg font-medium text-gray-900 mb-4 text-center'>小小心意</h2>

						<p className='text-gray-600 mb-6 text-sm text-center'>感谢你的支持！这是给你的小礼物：</p>

						{/* 优惠券内容 */}
						<div className='flex justify-center'>
							{/* 优惠券图片 */}
							{config.thankYou.couponImage ? (
								<div className='w-full max-w-md'>
									<div className='relative overflow-hidden border border-gray-200 bg-white rounded-lg p-4'>
										<img
											src={config.thankYou.couponImage}
											alt='优惠券'
											className='w-full h-auto max-h-64 object-contain mx-auto'
											onError={(e) => {
												// 如果图片加载失败，显示优惠码
												e.target.parentElement.parentElement.innerHTML = `
													<div class="text-center">
														<div class="text-xl sm:text-2xl font-light text-gray-900 mb-6">
															${config.thankYou.couponDiscount}
														</div>
														<div class="flex items-center justify-center gap-3 mb-4">
															<span class="text-base sm:text-lg font-mono text-gray-900 bg-white border border-gray-300 px-4 py-2.5 rounded">
																${config.thankYou.couponCode}
															</span>
															<button onclick="navigator.clipboard.writeText('${config.thankYou.couponCode}')" class="px-4 py-2.5 border border-gray-300 text-sm transition-colors rounded bg-white text-gray-600 hover:bg-gray-50">
																<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
																</svg>
															</button>
														</div>
													</div>
												`;
											}}
										/>
									</div>
									<p className='text-xs text-gray-500 mt-3 text-center leading-relaxed'>💡 长按保存图片或扫描二维码使用</p>
								</div>
							) : (
								/* 优惠码 */
								<div className='w-full max-w-md text-center'>
									<div className='text-xl sm:text-2xl font-light text-gray-900 mb-6'>
										{config.thankYou.couponDiscount}
									</div>
									<div className='flex items-center justify-center gap-3 mb-4'>
										<span className='text-base sm:text-lg font-mono text-gray-900 bg-white border border-gray-300 px-4 py-2.5 rounded'>
											{config.thankYou.couponCode}
										</span>
										<button
											onClick={handleCopyCoupon}
											className={`px-4 py-2.5 border border-gray-300 text-sm transition-colors rounded ${
												copied ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
											}`}
										>
											{copied ? <CheckCircle className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
										</button>
									</div>
									{copied && <p className='text-sm text-gray-600'>✅ 已复制到剪贴板啦～</p>}
								</div>
							)}
						</div>

						<p className='text-xs text-gray-500 mt-8 text-center'>* 30天内有效哦</p>
					</div>

					{/* 操作按钮 */}
					<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0'>
						<button
							onClick={handleGoBack}
							className='border border-gray-300 text-gray-700 px-6 sm:px-8 py-3 text-sm hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto'
						>
							<ArrowLeft className='w-4 h-4' />
							回到首页
						</button>

						<a
							href={config.product.productUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='bg-black text-white px-6 sm:px-8 py-3 text-sm hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto'
						>
							<ExternalLink className='w-4 h-4' />
							再去看看
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
