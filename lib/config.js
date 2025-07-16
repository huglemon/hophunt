// 配置管理 - 支持环境变量和直接配置两种方式
export const config = {
	// 产品信息 - 支持环境变量配置（用于一键部署）
	product: {
		name: process.env.NEXT_PUBLIC_PRODUCT_NAME || 'HopHunt - 让每一票都有价值',
		description: process.env.NEXT_PUBLIC_PRODUCT_DESCRIPTION || 'HopHunt 是一个 ProductHunt 投票中间页，帮助创作者更好地管理投票流程，让每一票都有价值。',
		logoUrl: process.env.NEXT_PUBLIC_LOGO_URL || '/logo.png',
		productUrl: process.env.NEXT_PUBLIC_PRODUCT_URL || 'https://github.com/huglemon/hophunt',
		productHuntUrl: process.env.NEXT_PUBLIC_PRODUCTHUNT_URL || 'https://www.producthunt.com',
	},

	// 首页文本配置 - 支持环境变量配置
	homepage: {
		title: process.env.NEXT_PUBLIC_HOMEPAGE_TITLE || '感谢你来投票',
		subtitle: process.env.NEXT_PUBLIC_HOMEPAGE_SUBTITLE || '你的每一票都很珍贵，感谢你愿意为我们的产品投出支持的一票',
	},

	// 投票建议配置 - 支持环境变量配置
	voting: {
		minWaitTime: parseInt(process.env.NEXT_PUBLIC_MIN_WAIT_TIME) || 300000, // 5分钟 (毫秒)
		maxHourlyVotes: parseInt(process.env.NEXT_PUBLIC_MAX_HOURLY_VOTES) || 10,
		warningThreshold: parseInt(process.env.NEXT_PUBLIC_WARNING_THRESHOLD) || 5,
	},

	// 数据库配置
	database: {
		// 数据存储模式说明：
		// - 'auto': 自动检测，如果配置了Vercel KV则使用数据库，否则使用localStorage
		// - 'localStorage': 强制使用localStorage（仅本地存储，不跨用户）
		// - 'database': 强制使用数据库（需要配置环境变量）
		mode: process.env.NEXT_PUBLIC_DATABASE_MODE || 'auto',
		
		// 环境变量配置说明（在Vercel部署时设置）：
		// KV_REST_API_URL: Vercel KV的REST API URL
		// KV_REST_API_TOKEN: Vercel KV的REST API Token
		// 
		// 获取这些环境变量的步骤：
		// 1. 在Vercel Dashboard中进入你的项目
		// 2. 点击 "Storage" 标签
		// 3. 创建一个新的KV数据库
		// 4. 复制提供的环境变量到项目设置中
	},

	// 感谢页面配置 - 支持环境变量配置
	thankYou: {
		title: process.env.NEXT_PUBLIC_THANKYOU_TITLE || '谢谢你的支持！',
		message: process.env.NEXT_PUBLIC_THANKYOU_MESSAGE || '你的每一票都很珍贵！',
		couponCode: process.env.NEXT_PUBLIC_COUPON_CODE || 'VOTE2024',
		couponDiscount: process.env.NEXT_PUBLIC_COUPON_DISCOUNT || '8折优惠',
		couponImage: process.env.NEXT_PUBLIC_COUPON_IMAGE || '/coupon.png', // 也可以是微信群二维码等, 如果为空，则显示优惠码
	},

	// 任务清单配置 - 目前不支持环境变量配置，需要在代码中修改
	tasks: [
		{ id: 1, text: '已帮你复制产品名称', completed: true },
		{ id: 2, text: '看看最近投票情况', completed: false },
		{ id: 3, text: '开启全局IP代理(强烈建议)', completed: false },
	],
};
