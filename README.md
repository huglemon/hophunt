# HopHunt - 让每一票都有价值

🚀 一个ProductHunt投票中间页，帮助创作者更好地管理投票流程，让每一票都有价值。

## ✨ 功能特性

- 🎯 **智能投票管理** - 记录访问和投票统计，提供投票建议
- 📊 **实时数据展示** - 显示近期访问人数、投票人数等统计信息
- ⚠️ **智能警告系统** - 根据投票频率和数量提供等待建议
- 📋 **任务清单界面** - 引导用户完成投票前的准备工作
- 📱 **响应式设计** - 支持桌面和移动设备
- 🎨 **现代化UI** - 使用 Tailwind CSS 构建的美观界面
- 🔧 **易于配置** - 通过环境变量快速配置产品信息
- 🎉 **感谢页面** - 投票后显示个性化感谢页面和优惠信息
- 💾 **动态数据存储** - 支持Vercel KV数据库和localStorage双重模式

## 🛠️ 技术栈

- **框架**: Next.js 15.4.1
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **数据存储**: Vercel KV (Redis) / localStorage
- **部署**: Vercel (推荐)

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/yourusername/hophunt.git
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
    productUrl: 'https://github.com/yourusername/yourproject',
    productHuntUrl: 'https://www.producthunt.com',
  },
  
  // 首页文本配置
  homepage: {
    title: "感谢你来投票",
    subtitle: "你的每一票都很珍贵，感谢你愿意为我们的产品投出支持的一票",
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

#### 模式1: localStorage（默认）
- 数据只存储在用户本地浏览器
- 无需额外配置
- 适合测试和小规模使用

#### 模式2: Vercel KV（推荐）
- 真正的跨用户数据统计
- 实时同步所有用户的投票数据
- 适合生产环境使用

**配置Vercel KV步骤：**

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入你的项目页面
3. 点击 "Storage" 标签
4. 点击 "Create Database" 选择 "KV"
5. 创建数据库后，复制提供的环境变量
6. 在项目设置的 "Environment Variables" 中添加：
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

**本地开发配置：**

创建 `.env.local` 文件：
```bash
KV_REST_API_URL=your_kv_rest_api_url
KV_REST_API_TOKEN=your_kv_rest_api_token
```

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

### 方法一：一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/hophunt)

**一键部署后的配置步骤：**

1. **部署完成后，进入项目设置**
   - 在 Vercel Dashboard 中找到你的项目
   - 点击 "Settings" 标签
   - 选择 "Environment Variables"

2. **配置产品信息**（必需）
   - 添加以下环境变量来配置你的产品信息：
   
   ```bash
   NEXT_PUBLIC_PRODUCT_NAME=你的产品名称
   NEXT_PUBLIC_PRODUCT_DESCRIPTION=你的产品描述
   NEXT_PUBLIC_PRODUCTHUNT_URL=https://www.producthunt.com/posts/your-product
   NEXT_PUBLIC_PRODUCT_URL=https://github.com/yourusername/yourproject
   NEXT_PUBLIC_HOMEPAGE_TITLE=感谢你来投票
   NEXT_PUBLIC_HOMEPAGE_SUBTITLE=你的每一票都很珍贵，感谢你愿意为我们的产品投出支持的一票
   ```

3. **配置数据库**（推荐）
   - 在 Vercel 中创建 KV 数据库（参考下方数据库配置说明）
   - 添加数据库环境变量：
   
   ```bash
   KV_REST_API_URL=your_kv_rest_api_url
   KV_REST_API_TOKEN=your_kv_rest_api_token
   ```

4. **配置感谢页面**（可选）
   ```bash
   NEXT_PUBLIC_THANKYOU_TITLE=谢谢你的支持！
   NEXT_PUBLIC_THANKYOU_MESSAGE=你的每一票都很珍贵！
   NEXT_PUBLIC_COUPON_CODE=VOTE2024
   NEXT_PUBLIC_COUPON_DISCOUNT=8折优惠
   ```

5. **重新部署**
   - 保存环境变量后，在 "Deployments" 标签中点击 "Redeploy"
   - 等待部署完成

### 方法二：手动部署

1. Fork 这个项目到你的 GitHub 账户
2. 在 [Vercel](https://vercel.com) 创建账户
3. 连接你的 GitHub 仓库
4. 修改 `lib/config.js` 文件配置产品信息
5. 配置Vercel KV数据库（推荐）
6. 部署项目

### 配置方式对比

| 配置方式 | 适用场景 | 优点 | 缺点 |
|----------|----------|------|------|
| 环境变量 | 一键部署、多环境部署 | 无需修改代码，支持不同环境 | 配置项较多 |
| 直接修改代码 | Fork后自定义部署 | 配置简单，一目了然 | 需要修改代码 |

### 环境变量完整列表

#### 产品信息配置
| 环境变量 | 说明 | 默认值 |
|----------|------|--------|
| `NEXT_PUBLIC_PRODUCT_NAME` | 产品名称 | 'HopHunt - 让每一票都有价值' |
| `NEXT_PUBLIC_PRODUCT_DESCRIPTION` | 产品描述 | 'HopHunt 是一个 ProductHunt 投票中间页...' |
| `NEXT_PUBLIC_LOGO_URL` | Logo URL | '/logo.png' |
| `NEXT_PUBLIC_PRODUCT_URL` | 产品主页链接 | 'https://github.com/huglemon/hophunt' |
| `NEXT_PUBLIC_PRODUCTHUNT_URL` | ProductHunt 链接 | 'https://www.producthunt.com' |

#### 首页文本配置
| 环境变量 | 说明 | 默认值 |
|----------|------|--------|
| `NEXT_PUBLIC_HOMEPAGE_TITLE` | 首页主标题 | '感谢你来投票' |
| `NEXT_PUBLIC_HOMEPAGE_SUBTITLE` | 首页副标题 | '你的每一票都很珍贵...' |

#### 投票设置配置
| 环境变量 | 说明 | 默认值 |
|----------|------|--------|
| `NEXT_PUBLIC_MIN_WAIT_TIME` | 最小等待时间（毫秒） | 300000 |
| `NEXT_PUBLIC_MAX_HOURLY_VOTES` | 每小时最大投票数 | 10 |
| `NEXT_PUBLIC_WARNING_THRESHOLD` | 警告阈值 | 5 |

#### 数据库配置
| 环境变量 | 说明 | 默认值 |
|----------|------|--------|
| `NEXT_PUBLIC_DATABASE_MODE` | 数据存储模式 | 'auto' |
| `NEXT_PUBLIC_DATA_EXPIRATION` | 数据过期时间（小时） | 24 |
| `NEXT_PUBLIC_KEY_PREFIX` | 数据库键名前缀 | 'hophunt:' |
| `KV_REST_API_URL` | Vercel KV API URL | - |
| `KV_REST_API_TOKEN` | Vercel KV API Token | - |

#### 感谢页面配置
| 环境变量 | 说明 | 默认值 |
|----------|------|--------|
| `NEXT_PUBLIC_THANKYOU_TITLE` | 感谢页面标题 | '谢谢你的支持！' |
| `NEXT_PUBLIC_THANKYOU_MESSAGE` | 感谢页面消息 | '你的每一票都很珍贵！' |
| `NEXT_PUBLIC_COUPON_CODE` | 优惠券代码 | 'VOTE2024' |
| `NEXT_PUBLIC_COUPON_DISCOUNT` | 优惠券折扣 | '8折优惠' |
| `NEXT_PUBLIC_COUPON_IMAGE` | 优惠券图片路径 | '/coupon.png' |

## 📱 功能说明

### 主页面功能

1. **统计面板** - 显示近1小时访问量、投票数和总统计
2. **投票建议** - 根据投票频率智能提示等待时间
3. **任务清单** - 引导用户完成投票前的准备工作：
   - 复制产品名称
   - 检查近期投票量
   - 切换全局IP（如需要）
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
4. **错误恢复** - 数据库不可用时自动回退到localStorage

## 🎨 自定义样式

项目使用 Tailwind CSS，你可以在以下文件中自定义样式：

- `app/globals.css` - 全局样式
- `components/VotingPage.js` - 主页面样式
- `components/Footer.js` - 底部样式
- `app/thank-you/page.js` - 感谢页面样式

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

- **过期时间**: 24小时（可在config中配置）
- **清理机制**: 每次API调用时自动清理过期数据
- **存储方式**: Redis List（时间戳）+ 计数器（总数）

### 配置项详细说明

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `product.name` | 产品名称，显示在页面标题和导航栏 | 'HopHunt - ProductHunt 投票中间页' |
| `product.description` | 产品描述，用于SEO | '防止同IP大量投票的 ProductHunt 投票中间页' |
| `product.logoUrl` | 产品Logo URL | '/logo.png' |
| `product.productUrl` | 产品主页链接，用于跳转到产品主页 | 'https://github.com/huglemon/hophunt' |
| `product.productHuntUrl` | ProductHunt 跳转URL | 'https://www.producthunt.com' |
| `homepage.title` | 首页主标题 | "感谢你来投票" |
| `homepage.subtitle` | 首页副标题 | "你的每一票都很珍贵，感谢你愿意..." |
| `voting.minWaitTime` | 最小等待时间（毫秒） | 300000 (5分钟) |
| `voting.maxHourlyVotes` | 每小时最大投票数 | 10 |
| `voting.warningThreshold` | 警告阈值 | 5 |
| `database.mode` | 数据存储模式 | 'auto' \| 'localStorage' \| 'database' |
| `database.dataExpiration` | 数据过期时间（小时） | 24 |
| `database.keyPrefix` | 数据库键名前缀 | 'hophunt:' |
| `thankYou.title` | 感谢页面标题 | 'Thank you for your support!' |
| `thankYou.message` | 感谢页面消息 | 'Your vote means a lot to us!' |
| `thankYou.couponCode` | 优惠券代码 | 'VOTE2024' |
| `thankYou.couponDiscount` | 优惠券折扣 | '20% OFF' |
| `thankYou.couponImage` | 优惠券图片路径，可以是优惠券图片或微信群二维码等，如果为空则显示优惠码文本 | '/coupon.png' |
| `tasks` | 任务清单配置 | 见下方说明 |

### 任务清单配置说明

`tasks` 数组用于配置投票前的任务清单，每个任务包含以下字段：

- `id`: 任务唯一标识符
- `text`: 任务显示文本
- `completed`: 是否默认完成（true/false）

**注意事项：**
- 第一个任务通常设置为已完成，因为产品名称会自动复制
- 可以根据需要添加或删除任务
- 任务会按顺序逐个显示，增强用户体验

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

## 📝 许可证

本项目使用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

如果你遇到问题或有建议，请：

1. 查看 [Issues](https://github.com/yourusername/hophunt/issues)
2. 创建新的 Issue
3. 联系作者：[your-email@example.com](mailto:your-email@example.com)

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide React](https://lucide.dev/) - 图标库
- [Vercel](https://vercel.com/) - 部署平台
- [Vercel KV](https://vercel.com/storage/kv) - Redis 数据库

---

**Made with ❤️ by HopHunt Team**
