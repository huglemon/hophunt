// 配置管理 - 直接在此文件中修改配置
export const config = {
	// 产品信息
	product: {
		name: 'HopHunt - 让每一票都有价值',
		description: 'HopHunt 是一个 ProductHunt 投票中间页，帮助创作者更好地管理投票流程，让每一票都有价值。',
		logoUrl: '/logo.png',
		productUrl: 'https://github.com/huglemon/hophunt',
		productHuntUrl: 'https://www.producthunt.com',
	},

	// 首页文本配置
	homepage: {
		title: '感谢你来投票',
		subtitle: '你的每一票都很珍贵，感谢你愿意为我们的产品投出支持的一票',
	},

	// 投票建议配置
	voting: {
		minWaitTime: 300000, // 5分钟 (毫秒)
		maxHourlyVotes: 10,
		warningThreshold: 5,
	},

	// 感谢页面配置
	thankYou: {
		title: '谢谢你的支持！',
		message: '你的每一票都很珍贵！',
		couponCode: 'VOTE2024',
		couponDiscount: '8折优惠',
		couponImage: '/coupon.png', // 也可以是微信群二维码等, 如果为空，则显示优惠码
	},

	// 任务清单配置
	tasks: [
		{ id: 1, text: '已帮你复制产品名称', completed: true },
		{ id: 2, text: '看看最近投票情况', completed: false },
		{ id: 3, text: '开启全局IP代理(强烈建议)', completed: false },
	],
};
