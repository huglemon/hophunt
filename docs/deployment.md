# 部署指南

## 快速部署到 Vercel

### 1. 一键部署

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
   - 参考下方数据库配置说明创建 KV 数据库
   - 添加数据库环境变量：
   
   ```bash
   KV_REST_API_URL=your_kv_rest_api_url
   KV_REST_API_TOKEN=your_kv_rest_api_token
   ```

4. **重新部署**
   - 保存环境变量后，在 "Deployments" 标签中点击 "Redeploy"
   - 等待部署完成

### 2. 手动部署

1. Fork 这个项目到你的 GitHub 账户
2. 在 [Vercel](https://vercel.com) 创建账户
3. 连接你的 GitHub 仓库
4. 修改 `lib/config.js` 文件配置产品信息（或使用环境变量）
5. 配置环境变量（可选但推荐）
6. 部署项目

### 配置方式选择

| 配置方式 | 适用场景 | 优点 | 缺点 |
|----------|----------|------|------|
| 环境变量 | 一键部署、多环境部署 | 无需修改代码，支持不同环境 | 配置项较多 |
| 直接修改代码 | Fork后自定义部署 | 配置简单，一目了然 | 需要修改代码 |

## 数据库配置（推荐）

### 为什么需要数据库？

默认情况下，HopHunt 使用 localStorage 存储数据，这意味着：
- 数据只存在于用户的浏览器中
- 无法跨用户共享统计数据
- 清除浏览器缓存会丢失数据

使用 Vercel KV 数据库可以：
- 实现真正的跨用户数据统计
- 实时同步所有用户的投票数据
- 提供更准确的投票建议

### 配置 Vercel KV 步骤

1. **登录 Vercel Dashboard**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 进入你的项目页面

2. **创建 KV 数据库**
   - 点击 "Storage" 标签
   - 点击 "Create Database"
   - 选择 "KV" 数据库类型
   - 输入数据库名称（例如：hophunt-stats）
   - 点击 "Create"

3. **获取环境变量**
   - 创建完成后，Vercel 会显示环境变量
   - 复制以下两个环境变量：
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`

4. **配置环境变量**
   - 在项目设置中找到 "Environment Variables" 选项
   - 添加上面复制的两个环境变量
   - 确保在 Production、Preview 和 Development 环境中都添加

5. **重新部署**
   - 保存环境变量后，触发重新部署
   - 系统会自动使用 KV 数据库存储数据

### 本地开发配置

如果你想在本地开发时也使用 Vercel KV：

1. 在项目根目录创建 `.env.local` 文件
2. 添加以下内容：
   ```bash
   KV_REST_API_URL=your_kv_rest_api_url
   KV_REST_API_TOKEN=your_kv_rest_api_token
   ```
3. 重启开发服务器

## 配置产品信息

### 方法一：使用环境变量（推荐用于一键部署）

在 Vercel 项目设置中添加以下环境变量：

```bash
# 产品基本信息
NEXT_PUBLIC_PRODUCT_NAME=你的产品名称
NEXT_PUBLIC_PRODUCT_DESCRIPTION=你的产品描述
NEXT_PUBLIC_LOGO_URL=/logo.png
NEXT_PUBLIC_PRODUCT_URL=https://github.com/yourusername/yourproject
NEXT_PUBLIC_PRODUCTHUNT_URL=https://www.producthunt.com/posts/your-product

# 首页文本
NEXT_PUBLIC_HOMEPAGE_TITLE=感谢你来投票
NEXT_PUBLIC_HOMEPAGE_SUBTITLE=你的每一票都很珍贵，感谢你愿意为我们的产品投出支持的一票

# 感谢页面
NEXT_PUBLIC_THANKYOU_TITLE=谢谢你的支持！
NEXT_PUBLIC_THANKYOU_MESSAGE=你的每一票都很珍贵！
NEXT_PUBLIC_COUPON_CODE=VOTE2024
NEXT_PUBLIC_COUPON_DISCOUNT=8折优惠
NEXT_PUBLIC_COUPON_IMAGE=/coupon.png

# 投票设置
NEXT_PUBLIC_MIN_WAIT_TIME=300000
NEXT_PUBLIC_MAX_HOURLY_VOTES=10
NEXT_PUBLIC_WARNING_THRESHOLD=5

# 数据库设置
NEXT_PUBLIC_DATABASE_MODE=auto
NEXT_PUBLIC_DATA_EXPIRATION=24
NEXT_PUBLIC_KEY_PREFIX=hophunt:
```

### 方法二：直接修改代码（推荐用于Fork部署）

在 `lib/config.js` 中直接修改配置：

```javascript
export const config = {
  product: {
    name: '你的产品名称',
    description: '你的产品描述',
    logoUrl: '/logo.png',
    productUrl: 'https://github.com/yourusername/yourproject',
    productHuntUrl: 'https://www.producthunt.com/posts/your-product',
  },
  // ... 其他配置
};
```

## 自定义域名（可选）

1. 在 Vercel 项目设置中找到 "Domains" 选项
2. 添加你的自定义域名
3. 根据提示配置 DNS 记录
4. 等待域名验证完成

## 环境变量说明

### 必需环境变量

| 变量名 | 描述 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_PRODUCT_NAME` | 产品名称 | 'My Awesome Product' |
| `NEXT_PUBLIC_PRODUCTHUNT_URL` | ProductHunt 链接 | 'https://www.producthunt.com/posts/my-product' |

### 可选环境变量

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `KV_REST_API_URL` | Vercel KV 数据库的 REST API URL | - |
| `KV_REST_API_TOKEN` | Vercel KV 数据库的 REST API Token | - |
| `NEXT_PUBLIC_PRODUCT_DESCRIPTION` | 产品描述 | 'HopHunt 是一个 ProductHunt 投票中间页...' |
| `NEXT_PUBLIC_LOGO_URL` | Logo URL | '/logo.png' |
| `NEXT_PUBLIC_PRODUCT_URL` | 产品主页链接 | 'https://github.com/huglemon/hophunt' |
| `NEXT_PUBLIC_HOMEPAGE_TITLE` | 首页主标题 | '感谢你来投票' |
| `NEXT_PUBLIC_HOMEPAGE_SUBTITLE` | 首页副标题 | '你的每一票都很珍贵...' |
| `NEXT_PUBLIC_THANKYOU_TITLE` | 感谢页面标题 | '谢谢你的支持！' |
| `NEXT_PUBLIC_THANKYOU_MESSAGE` | 感谢页面消息 | '你的每一票都很珍贵！' |
| `NEXT_PUBLIC_COUPON_CODE` | 优惠券代码 | 'VOTE2024' |
| `NEXT_PUBLIC_COUPON_DISCOUNT` | 优惠券折扣 | '8折优惠' |
| `NEXT_PUBLIC_COUPON_IMAGE` | 优惠券图片路径 | '/coupon.png' |

**注意：** 如果不配置数据库环境变量，系统会自动回退到 localStorage 模式。

## 部署检查清单

- [ ] 配置了正确的产品信息（通过环境变量或修改代码）
- [ ] 上传了产品 Logo 到 `public/logo.png`
- [ ] 配置了 Vercel KV 数据库（推荐）
- [ ] 测试了投票流程
- [ ] 检查了感谢页面配置
- [ ] 验证了统计数据显示正常

## 故障排除

### 数据库连接问题

如果遇到数据库连接问题：

1. 检查环境变量是否正确设置
2. 确认 KV 数据库是否创建成功
3. 查看 Vercel 部署日志中的错误信息
4. 系统会自动回退到 localStorage，不影响基本功能

### 统计数据不显示

1. 检查浏览器控制台是否有错误
2. 确认 API 路由是否正常工作
3. 检查数据库配置是否正确
4. 尝试清除浏览器缓存后重新访问

### 投票跳转问题

1. 确认 `NEXT_PUBLIC_PRODUCTHUNT_URL` 配置是否正确
2. 检查是否有浏览器弹窗拦截
3. 测试在不同浏览器中的表现

### 环境变量不生效

1. 确认环境变量名称是否正确（注意大小写）
2. 检查是否在所有环境（Production、Preview、Development）中都添加了
3. 保存环境变量后需要重新部署
4. 客户端环境变量必须以 `NEXT_PUBLIC_` 开头

## 性能优化建议

1. **启用 Vercel KV**：提供更好的性能和可靠性
2. **配置 CDN**：Vercel 自动提供全球 CDN
3. **优化图片**：使用适当大小的 Logo 图片
4. **监控使用情况**：定期检查 Vercel 使用量

## 安全考虑

1. **环境变量安全**：不要在代码中硬编码敏感信息
2. **数据隐私**：只存储必要的统计数据
3. **访问控制**：考虑添加基本的访问限制
4. **定期清理**：系统自动清理过期数据

## 更新和维护

1. **定期更新依赖**：保持依赖包的最新版本
2. **监控错误**：使用 Vercel 的错误监控功能
3. **备份配置**：保存重要的配置文件
4. **测试新功能**：在 Preview 环境中测试新功能

## 支持

如果遇到问题，请：

1. 查看 [GitHub Issues](https://github.com/yourusername/hophunt/issues)
2. 检查 Vercel 部署日志
3. 联系技术支持 