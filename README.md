# HopHunt - 让每一票都有价值

🚀 一个 ProductHunt 投票中间页，帮助创作者更好地管理投票流程，让每一票都有价值。

## 🚀 快速导航

**👤 运营人员（无需技术背景）**
- [📦 一键部署](#-一键部署推荐) - 点击按钮即可部署
- [📋 简单配置](#-部署后的简单配置) - 配置产品信息
- [📄 批量配置](#-环境变量批量配置) - 一键复制粘贴配置

**👨‍💻 技术人员**
- [🛠️ 本地开发](#-技术栈) - 技术栈和本地开发
- [🔧 详细配置](#-添加数据库支持可选) - 完整配置说明
- [🔄 获取更新](#-获取项目更新) - 代码同步方式

**📚 通用文档**
- [✨ 功能特性](#✨-功能特性) - 了解项目功能
- [📱 使用说明](#📱-功能说明) - 详细使用指南
- [🤝 贡献指南](#🤝-贡献指南) - 参与项目开发

---

## ✨ 功能特性

-   🎯 **智能投票管理** - 记录访问和投票统计，提供投票建议
-   📊 **实时数据展示** - 显示近期访问人数、投票人数等统计信息
-   ⚠️ **智能警告系统** - 根据投票频率和数量提供等待建议
-   📋 **任务清单界面** - 引导用户完成投票前的准备工作
-   📱 **响应式设计** - 支持桌面和移动设备
-   🎨 **现代化 UI** - 使用 Tailwind CSS 构建的美观界面
-   🔧 **易于配置** - 通过环境变量快速配置产品信息
-   🎉 **感谢页面** - 投票后显示个性化感谢页面和优惠信息
-   💾 **动态数据存储** - 支持 Vercel KV 数据库和 localStorage 双重模式

## 🛠️ 技术栈

-   **框架**: Next.js 15.4.1
-   **样式**: Tailwind CSS
-   **图标**: Lucide React
-   **数据存储**: Upstash Redis / localStorage
-   **部署**: Vercel (推荐)

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/huglemon/hophunt.git
cd hophunt
```

### 2. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 3. 配置产品信息

编辑 `lib/config.js` 文件，配置你的产品信息：

```javascript
export const config = {
	// 产品信息
	product: {
		name: 'Your Product Name',
		description: 'Your amazing product description',
		logoUrl: '/logo.png',
		productUrl: 'https://github.com/huglemon/hothunt',
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

	// 数据库配置
	database: {
		mode: 'auto', // 'auto' | 'localStorage' | 'database'
		dataExpiration: 24, // 数据过期时间（小时）
		keyPrefix: 'hophunt:', // 数据库键名前缀
	},

	// 感谢页面配置
	thankYou: {
		title: 'Thank you for your support!',
		message: 'Your vote means a lot to us!',
		couponCode: 'VOTE2024',
		couponDiscount: '20% OFF',
		couponImage: '/coupon.png', // 可选，如果为空则显示优惠码文本
	},

	// 任务清单配置
	tasks: [
		{ id: 1, text: '复制产品名称', completed: true },
		{ id: 2, text: '检查近期投票量', completed: false },
	],
};
```

### 4. 数据库配置（可选但推荐）

HopHunt 支持两种数据存储模式：

#### 模式 1: localStorage（默认）

-   数据只存储在用户本地浏览器
-   无需额外配置
-   适合测试和小规模使用

#### 模式 2: Vercel KV（推荐）

-   真正的跨用户数据统计
-   实时同步所有用户的投票数据
-   适合生产环境使用

**📊 添加数据库支持（可选）**

如果你想要真正的跨用户统计功能，可以添加数据库：

1. **在 Vercel 项目中添加数据库**
   - 进入你的项目设置
   - 点击 "Storage" 标签
   - 选择 "Create Database" → "KV (Redis)"
   - **环境变量会自动添加，无需手动配置**

2. **不添加数据库也可以正常使用**
   - 项目会自动使用浏览器本地存储
   - 功能完全正常，只是统计数据只对当前用户可见

> **说明：** 项目使用 Upstash Redis 作为数据库，Vercel 会自动配置所有必要的环境变量，你无需手动操作。

### 5. 运行开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📦 部署到 Vercel

### 🚀 一键部署（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/huglemon/hophunt)

**👆 点击按钮即可快速部署，无需任何技术背景！**

**⚠️ 重要提醒：**
- 请保留页面底部的版权信息不变
- 这是使用本项目的必要条件

**📋 部署后的简单配置：**

1. **打开项目设置**
   - 在 Vercel 控制台找到你的项目
   - 点击 "Settings" → "Environment Variables"

2. **配置你的产品信息**（必需）
   
   **💡 快速配置方法：**
   - 复制下面的环境变量（全选复制）
   - 在 Vercel 的 "Environment Variables" 页面直接粘贴
   - Vercel 会自动识别并创建多个环境变量
   
   ```bash
   NEXT_PUBLIC_PRODUCT_NAME=你的产品名称
   NEXT_PUBLIC_PRODUCT_DESCRIPTION=你的产品描述
   NEXT_PUBLIC_PRODUCTHUNT_URL=https://www.producthunt.com/posts/your-product
   ```
   
   **📝 编辑说明：**
   - 将 `你的产品名称` 替换为实际的产品名称
   - 将 `你的产品描述` 替换为实际的产品描述
   - 将 `https://your-product-website.com` 替换为你的产品官网或GitHub仓库链接
   - 将 `your-product` 替换为你的 ProductHunt 产品页面链接

3. **添加数据库**（推荐，实现真正的统计功能）
   - 在 Vercel 项目中点击 "Storage" 标签
   - 选择 "Create Database" → "KV (Redis)"
   - 创建后，**环境变量会自动添加，无需手动配置**

4. **重新部署**
   - 保存配置后，点击 "Deployments" → "Redeploy"
   - 等待部署完成

**🎉 完成！你的投票页面就可以使用了！**

## 📄 环境变量批量配置

为了让配置更简单，你可以使用 Vercel 的批量粘贴功能：

### 🚀 快速配置方法

**Vercel 支持批量粘贴环境变量！** 只需复制下面的配置，直接粘贴到 Vercel 即可：

#### 🔧 基础配置（必需）
```bash
NEXT_PUBLIC_PRODUCT_NAME=你的产品名称
NEXT_PUBLIC_PRODUCT_DESCRIPTION=你的产品描述
NEXT_PUBLIC_PRODUCT_URL=https://your-product-website.com
NEXT_PUBLIC_PRODUCTHUNT_URL=https://www.producthunt.com/posts/your-product
```

#### 🎨 首页文本配置（可选）
```bash
NEXT_PUBLIC_HOMEPAGE_TITLE=感谢你来投票
NEXT_PUBLIC_HOMEPAGE_SUBTITLE=你的每一票都很珍贵，感谢你愿意为我们的产品投出支持的一票
```

#### 🎁 感谢页面配置（可选）
```bash
NEXT_PUBLIC_THANKYOU_TITLE=谢谢你的支持！
NEXT_PUBLIC_THANKYOU_MESSAGE=你的每一票都很珍贵！
NEXT_PUBLIC_COUPON_CODE=VOTE2024
NEXT_PUBLIC_COUPON_DISCOUNT=8折优惠
NEXT_PUBLIC_COUPON_IMAGE=/coupon.png
```

#### ⚙️ 高级配置（可选）
```bash
NEXT_PUBLIC_MIN_WAIT_TIME=300000
NEXT_PUBLIC_MAX_HOURLY_VOTES=10
NEXT_PUBLIC_WARNING_THRESHOLD=5
```

### 📋 使用步骤

1. **复制需要的配置**
   - 选择上面的配置块（基础配置是必需的）
   - 全选复制（Ctrl+A, Ctrl+C 或 Cmd+A, Cmd+C）

2. **编辑配置信息**
   - 将配置中的示例值替换为你的实际信息
   - 只需要修改 `=` 后面的值即可

3. **粘贴到 Vercel**
   - 在 Vercel 项目设置的 "Environment Variables" 页面
   - 直接粘贴（Ctrl+V 或 Cmd+V）
   - **Vercel 会自动识别并创建多个环境变量**

4. **重新部署**
   - 粘贴完成后，点击 "Redeploy" 重新部署
   - 等待部署完成即可

### ⚡ 优势

- **一键粘贴**：不用逐个添加环境变量
- **自动识别**：Vercel 自动解析多行环境变量
- **减少错误**：避免手动输入时的拼写错误
- **按需选择**：可以只复制需要的配置块

### 🔄 如何获取项目更新

**简单方式：重新部署**
- 当项目有重要更新时，直接重新点击部署按钮
- 这会创建一个包含最新功能的新版本

**高级方式：技术用户专用**
<details>
<summary>点击展开详细步骤</summary>

如果你有技术背景，可以使用以下方式获取更新：

1. **Fork 方式**（推荐）
   - [Fork 这个项目](https://github.com/huglemon/hophunt/fork)
   - 在 Vercel 中连接你的 Fork 仓库
   - 在 GitHub 上点击 "Sync fork" 获取更新

2. **Git 命令方式**
   ```bash
   git remote add upstream https://github.com/huglemon/hophunt.git
   git fetch upstream
   git merge upstream/main
   git push origin main
   ```

</details>

### 配置方式对比

| 配置方式     | 适用场景             | 优点                       | 缺点         |
| ------------ | -------------------- | -------------------------- | ------------ |
| 环境变量     | 一键部署、多环境部署 | 无需修改代码，支持不同环境 | 配置项较多   |
| 直接修改代码 | Fork 后自定义部署    | 配置简单，一目了然         | 需要修改代码 |

### 环境变量完整列表

#### 产品信息配置

| 环境变量                          | 说明             | 默认值                                     |
| --------------------------------- | ---------------- | ------------------------------------------ |
| `NEXT_PUBLIC_PRODUCT_NAME`        | 产品名称         | 'HopHunt - 让每一票都有价值'               |
| `NEXT_PUBLIC_PRODUCT_DESCRIPTION` | 产品描述         | 'HopHunt 是一个 ProductHunt 投票中间页...' |
| `NEXT_PUBLIC_LOGO_URL`            | Logo URL         | '/logo.png'                                |
| `NEXT_PUBLIC_PRODUCT_URL`         | 产品主页链接     | 'https://github.com/huglemon/hophunt'      |
| `NEXT_PUBLIC_PRODUCTHUNT_URL`     | ProductHunt 链接 | 'https://www.producthunt.com'              |

**重要提示：**
- `NEXT_PUBLIC_PRODUCT_URL` 是你的产品官网或GitHub仓库链接
- `NEXT_PUBLIC_PRODUCTHUNT_URL` 是你的具体ProductHunt产品页面链接

#### 首页文本配置

| 环境变量                        | 说明       | 默认值                  |
| ------------------------------- | ---------- | ----------------------- |
| `NEXT_PUBLIC_HOMEPAGE_TITLE`    | 首页主标题 | '感谢你来投票'          |
| `NEXT_PUBLIC_HOMEPAGE_SUBTITLE` | 首页副标题 | '你的每一票都很珍贵...' |

#### 投票设置配置

| 环境变量                        | 说明                 | 默认值 |
| ------------------------------- | -------------------- | ------ |
| `NEXT_PUBLIC_MIN_WAIT_TIME`     | 最小等待时间（毫秒） | 300000 |
| `NEXT_PUBLIC_MAX_HOURLY_VOTES`  | 每小时最大投票数     | 10     |
| `NEXT_PUBLIC_WARNING_THRESHOLD` | 警告阈值             | 5      |

#### 数据库配置

| 环境变量                      | 说明                 | 默认值     |
| ----------------------------- | -------------------- | ---------- |
| `NEXT_PUBLIC_DATABASE_MODE`   | 数据存储模式         | 'auto'     |
| `NEXT_PUBLIC_DATA_EXPIRATION` | 数据过期时间（小时） | 24         |
| `NEXT_PUBLIC_KEY_PREFIX`      | 数据库键名前缀       | 'hophunt:' |
| `KV_REST_API_URL`             | Upstash Redis API URL | -          |
| `KV_REST_API_TOKEN`           | Upstash Redis API Token | -          |

#### 感谢页面配置

| 环境变量                       | 说明           | 默认值                 |
| ------------------------------ | -------------- | ---------------------- |
| `NEXT_PUBLIC_THANKYOU_TITLE`   | 感谢页面标题   | '谢谢你的支持！'       |
| `NEXT_PUBLIC_THANKYOU_MESSAGE` | 感谢页面消息   | '你的每一票都很珍贵！' |
| `NEXT_PUBLIC_COUPON_CODE`      | 优惠券代码     | 'VOTE2024'             |
| `NEXT_PUBLIC_COUPON_DISCOUNT`  | 优惠券折扣     | '8 折优惠'             |
| `NEXT_PUBLIC_COUPON_IMAGE`     | 优惠券图片路径 | '/coupon.png'          |

**优惠券图片说明：**
- `NEXT_PUBLIC_COUPON_IMAGE` 可以是优惠券图片路径，也可以是微信群二维码等
- 如果设置为空字符串，则只显示优惠码文本
- 支持本地图片（如 `/coupon.png`）或外部图片链接（如 `https://example.com/coupon.png`）

## 🔄 获取项目更新

**🎯 推荐方式：重新部署**
- 当项目有重要更新时，直接重新点击部署按钮
- 这是最简单的方式，适合所有用户

**⚙️ 高级方式（技术用户）**
<details>
<summary>点击展开技术细节</summary>

如果你有技术背景且需要保持代码同步：

1. **Fork 方式**
   - [Fork 项目](https://github.com/huglemon/hophunt/fork)
   - 在 Vercel 中连接 Fork 仓库
   - 使用 GitHub 的 "Sync fork" 功能

2. **Git 命令方式**
   ```bash
   git remote add upstream https://github.com/huglemon/hophunt.git
   git fetch upstream
   git merge upstream/main
   git push origin main
   ```

</details>

## 📱 功能说明

### 主页面功能

1. **统计面板** - 显示近 1 小时访问量、投票数和总统计
2. **投票建议** - 根据投票频率智能提示等待时间
3. **任务清单** - 引导用户完成投票前的准备工作：
    - 复制产品名称
    - 检查近期投票量
    - 切换全局 IP（如需要）
    - 前往 ProductHunt 投票
4. **一键复制** - 点击复制产品名称到剪贴板
5. **延迟跳转** - 点击投票按钮后延迟跳转到 ProductHunt

### 感谢页面功能

1. **感谢信息** - 个性化的感谢消息
2. **优惠券展示** - 显示优惠码和折扣信息
3. **一键复制** - 复制优惠码到剪贴板
4. **快速导航** - 返回首页或再次访问 ProductHunt

### 数据存储功能

1. **智能模式切换** - 自动检测数据库可用性，优雅降级
2. **实时统计** - 跨用户的实时投票和访问统计
3. **数据过期** - 自动清理过期数据，保持性能
4. **错误恢复** - 数据库不可用时自动回退到 localStorage

## 🎨 自定义样式

项目使用 Tailwind CSS，你可以在以下文件中自定义样式：

-   `app/globals.css` - 全局样式
-   `components/VotingPage.js` - 主页面样式
-   `components/Footer.js` - 底部样式
-   `app/thank-you/page.js` - 感谢页面样式

## 📊 数据存储详情

### 数据结构

```javascript
// 存储在Vercel KV中的数据结构
{
  visits: [timestamp1, timestamp2, ...],    // 访问时间戳数组
  votes: [timestamp1, timestamp2, ...],     // 投票时间戳数组
  totalVisits: number,                      // 总访问数
  totalVotes: number,                       // 总投票数
}
```

### 数据生命周期

-   **过期时间**: 24 小时（可在 config 中配置）
-   **清理机制**: 每次 API 调用时自动清理过期数据
-   **存储方式**: Redis List（时间戳）+ 计数器（总数）

### 配置项详细说明

| 配置项                    | 说明                                                                       | 示例                                          |
| ------------------------- | -------------------------------------------------------------------------- | --------------------------------------------- |
| `product.name`            | 产品名称，显示在页面标题和导航栏                                           | 'HopHunt - ProductHunt 投票中间页'            |
| `product.description`     | 产品描述，用于 SEO                                                         | '防止同 IP 大量投票的 ProductHunt 投票中间页' |
| `product.logoUrl`         | 产品 Logo URL                                                              | '/logo.png'                                   |
| `product.productUrl`      | 产品主页链接，用于跳转到产品主页                                           | 'https://github.com/huglemon/hophunt'         |
| `product.productHuntUrl`  | ProductHunt 跳转 URL                                                       | 'https://www.producthunt.com'                 |
| `homepage.title`          | 首页主标题                                                                 | "感谢你来投票"                                |
| `homepage.subtitle`       | 首页副标题                                                                 | "你的每一票都很珍贵，感谢你愿意..."           |
| `voting.minWaitTime`      | 最小等待时间（毫秒）                                                       | 300000 (5 分钟)                               |
| `voting.maxHourlyVotes`   | 每小时最大投票数                                                           | 10                                            |
| `voting.warningThreshold` | 警告阈值                                                                   | 5                                             |
| `database.mode`           | 数据存储模式                                                               | 'auto' \| 'localStorage' \| 'database'        |
| `database.dataExpiration` | 数据过期时间（小时）                                                       | 24                                            |
| `database.keyPrefix`      | 数据库键名前缀                                                             | 'hophunt:'                                    |
| `thankYou.title`          | 感谢页面标题                                                               | 'Thank you for your support!'                 |
| `thankYou.message`        | 感谢页面消息                                                               | 'Your vote means a lot to us!'                |
| `thankYou.couponCode`     | 优惠券代码                                                                 | 'VOTE2024'                                    |
| `thankYou.couponDiscount` | 优惠券折扣                                                                 | '20% OFF'                                     |
| `thankYou.couponImage`    | 优惠券图片路径，可以是优惠券图片或微信群二维码等，如果为空则显示优惠码文本 | '/coupon.png'                                 |
| `tasks`                   | 任务清单配置                                                               | 见下方说明                                    |

### 任务清单配置说明

`tasks` 数组用于配置投票前的任务清单，每个任务包含以下字段：

-   `id`: 任务唯一标识符
-   `text`: 任务显示文本
-   `completed`: 是否默认完成（true/false）

**注意事项：**

-   第一个任务通常设置为已完成，因为产品名称会自动复制
-   可以根据需要添加或删除任务
-   任务会按顺序逐个显示，增强用户体验

**示例：**

```javascript
tasks: [
  { id: 1, text: '复制产品名称', completed: true },
  { id: 2, text: '检查近期投票量', completed: false },
  { id: 3, text: '切换IP地址', completed: false },
],
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

**⚠️ 重要提示：**
- 请勿修改或删除 `components/Footer.js` 中的版权信息
- Footer 中的版权声明必须保持完整：`© [年份] HopHunt with ❤️ by DirsHunt | Huglemon`
- 任何修改或删除 footer 版权信息的 PR 将被拒绝

## 📝 许可证

本项目使用 MIT 许可证，但有一个额外要求：**不允许修改或删除 footer 中的版权信息**。

**特别说明：**
- 你可以自由使用、修改、分发本项目
- 但必须保留 footer 组件中的版权信息不变
- 包括："© [年份] HopHunt with ❤️ by DirsHunt | Huglemon" 及相关链接
- 此要求适用于所有副本、分发和衍生作品

查看 [LICENSE](LICENSE) 文件了解完整详情。

## 🆘 支持

如果你遇到问题或有建议，请：

1. 查看 [Issues](https://github.com/huglemon/hophunt/issues)
2. 创建新的 Issue
3. 联系作者：[hi@huglemon.com](mailto:hi@huglemon.com) / Wechat: YFLowerRed

## 🙏 致谢

-   [Next.js](https://nextjs.org/) - React 框架
-   [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
-   [Lucide React](https://lucide.dev/) - 图标库
-   [Vercel](https://vercel.com/) - 部署平台
-   [Upstash](https://upstash.com/) - Redis 数据库服务

## 🔗 作者其他作品

### 开源项目
- **[DirsHunt](https://dirshunt.com)** - 目录导航和发现平台
- **[DirsHunt Ext](https://dirshunt.com/ext)** - 智能填写导航站表单
- **[HopHunt](https://github.com/huglemon/hophunt)** - ProductHunt 投票中间页

### 产品和服务
- **[个人网站](https://www.huglemon.com)** - 技术博客和作品展示
- **[技术咨询](mailto:hi@huglemon.com)** - 提供技术咨询和开发服务

## ☕ 支持作者

如果这个项目对你有帮助，欢迎支持作者继续创作更多优质的开源项目！

### 捐赠方式

<div align="center">

**微信赞赏码**

<img src="/public/donate-wechat.png" alt="微信赞赏码" width="200"/>

</div>

### 其他支持方式
- ⭐ 给项目点个 Star
- 🐛 提交 Bug 报告和功能建议
- 📝 贡献代码和文档
- 📢 向朋友推荐这个项目

---

**Made with ❤️ by [Huglemon](https://huglemon.com)**
