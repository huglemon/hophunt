# 部署指南

本文档详细说明了如何将 HopHunt 项目部署到不同的平台。

## Vercel 部署（推荐）

### 一键部署

点击下面的按钮进行一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/hophunt)

### 手动部署步骤

1. **准备工作**
   - 确保你的代码已推送到 GitHub 仓库
   - 在 `lib/config.js` 中配置好产品信息

2. **创建 Vercel 项目**
   - 访问 [Vercel](https://vercel.com)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Import"

3. **配置产品信息**
   
   在部署前，确保在 `lib/config.js` 中配置了正确的产品信息：
   
   ```javascript
   export const config = {
     product: {
       name: '你的产品名称',
       description: '你的产品描述',
       logoUrl: '/logo.png',
       productHuntUrl: 'https://www.producthunt.com',
     },
     // ... 其他配置
   };
   ```

4. **部署项目**
   - 点击 "Deploy"
   - 等待部署完成
   - 获取部署 URL

## Netlify 部署

1. **连接仓库**
   - 访问 [Netlify](https://netlify.com)
   - 点击 "New site from Git"
   - 选择你的 GitHub 仓库

2. **构建设置**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **配置产品信息**
   - 在 `lib/config.js` 中配置产品信息
   - 无需额外的环境变量配置

## 自定义域名

### Vercel 自定义域名

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名
3. 根据提示配置 DNS 记录

### DNS 配置示例

```
Type: CNAME
Name: www
Value: your-project.vercel.app

Type: A
Name: @
Value: 76.76.19.19
```

## 配置详解

### 产品信息配置

在 `lib/config.js` 中配置以下信息：

```javascript
export const config = {
  // 产品信息
  product: {
    name: '你的产品名称',                    // 必需
    description: '你的产品描述',             // 可选
    logoUrl: '/logo.png',                   // 可选
    productUrl: 'https://github.com/yourusername/yourproject',  // 产品主页链接
    productHuntUrl: 'https://www.producthunt.com',  // 跳转URL
  },
  
  // 首页文本配置
  homepage: {
    title: "感谢你来投票",            // 首页主标题
    subtitle: "你的每一票都很珍贵，感谢你愿意...",  // 首页副标题
  },
  
  // 投票建议配置
  voting: {
    minWaitTime: 300000,        // 最小等待时间（毫秒）
    maxHourlyVotes: 10,         // 每小时最大投票数
    warningThreshold: 5,        // 警告阈值
  },
  
  // 感谢页面配置
  thankYou: {
    title: '感谢你的支持！',      // 感谢页面标题
    message: '你的投票对我们意义重大！',  // 感谢页面消息
    couponCode: 'VOTE2024',     // 优惠码
    couponDiscount: '20% OFF',  // 优惠折扣
    couponImage: '/coupon.png', // 优惠券图片路径，可选，如果为空则显示优惠码文本
  },
  
  // 任务清单配置
  tasks: [
    { id: 1, text: '复制产品名称', completed: true },    // 第一个任务默认完成
    { id: 2, text: '检查近期投票量', completed: false }, // 第二个任务需要用户确认
  ],
};
```

## 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] `lib/config.js` 中产品信息已配置
- [ ] Logo 文件已上传
- [ ] 域名已配置（如需要）
- [ ] 测试所有功能正常
- [ ] 检查移动端适配

## 故障排除

### 常见问题

1. **页面无法加载**
   - 检查 `lib/config.js` 配置是否正确
   - 确认构建是否成功

2. **投票跳转失败**
   - 检查 `config.product.productHuntUrl` 是否正确
   - 确认 URL 格式正确

3. **样式显示异常**
   - 检查 Tailwind CSS 是否正确构建
   - 确认 CSS 文件是否正确加载

### 调试建议

1. 查看浏览器控制台错误
2. 检查网络请求状态
3. 验证 `lib/config.js` 配置值
4. 测试本地开发环境

## 性能优化

1. **图片优化**
   - 使用 WebP 格式
   - 压缩图片大小
   - 使用 CDN

2. **缓存配置**
   - 配置静态资源缓存
   - 使用 CDN 加速

3. **监控设置**
   - 配置错误监控
   - 设置性能监控

## 安全建议

1. **配置安全**
   - 不要在代码中硬编码敏感信息
   - 确保配置文件不包含私密信息

2. **域名安全**
   - 配置 HTTPS
   - 设置安全头部

3. **访问控制**
   - 考虑添加访问频率限制
   - 监控异常访问 