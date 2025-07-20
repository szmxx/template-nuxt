# 🚀 Vercel 部署快速指南

本指南将帮助您在 5 分钟内将 Nuxt 3 项目部署到 Vercel。

## 📋 部署前准备

### 1. 安装 Vercel CLI

```bash
# 使用 pnpm 安装
pnpm add -g vercel

# 或使用 npm 安装
npm install -g vercel
```

### 2. 登录 Vercel

```bash
vercel login
```

## 🎯 快速部署

### 方法一：使用部署脚本（推荐）

```bash
# 部署到预览环境
pnpm run deploy:vercel

# 部署到生产环境
pnpm run deploy:vercel:production
```

### 方法二：手动部署

```bash
# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

## ⚙️ 环境变量配置

### 必需的环境变量

在 Vercel 控制台或使用 CLI 配置以下环境变量：

```bash
# 认证密钥（必需）
vercel env add NUXT_AUTH_SECRET production
# 输入一个随机字符串，建议使用: openssl rand -base64 32

# Google Analytics ID（可选）
vercel env add NUXT_PUBLIC_GOOGLE_ANALYTICS_ID production
# 输入您的 GA4 测量 ID，格式: G-XXXXXXXXXX

# 网站 URL（推荐）
vercel env add NUXT_PUBLIC_SITE_URL production
# 输入您的域名，例如: https://your-domain.vercel.app

# 网站名称（可选）
vercel env add NUXT_PUBLIC_SITE_NAME production
# 输入您的网站名称
```

### OAuth 提供商配置（可选）

如果使用 OAuth 登录，需要配置相应的客户端 ID 和密钥：

```bash
# Google OAuth
vercel env add NUXT_GOOGLE_CLIENT_ID production
vercel env add NUXT_GOOGLE_CLIENT_SECRET production

# GitHub OAuth
vercel env add NUXT_GITHUB_CLIENT_ID production
vercel env add NUXT_GITHUB_CLIENT_SECRET production

# Discord OAuth
vercel env add NUXT_DISCORD_CLIENT_ID production
vercel env add NUXT_DISCORD_CLIENT_SECRET production
```

## 🔧 常用命令

```bash
# 查看环境变量
pnpm run vercel:env

# 查看部署日志
pnpm run vercel:logs

# 查看域名
pnpm run vercel:domains

# 查看项目信息
vercel ls

# 查看部署详情
vercel inspect [deployment-url]
```

## 🌐 自定义域名

### 1. 添加域名

```bash
vercel domains add your-domain.com
```

### 2. 配置 DNS

在您的域名提供商处添加以下 DNS 记录：

```
类型: CNAME
名称: www (或 @)
值: cname.vercel-dns.com
```

### 3. 分配域名到项目

```bash
vercel domains assign your-domain.com your-project-name
```

## ✅ 部署后检查清单

- [ ] 网站正常加载
- [ ] Cookie 同意横幅显示
- [ ] Google Analytics 事件发送成功
- [ ] OAuth 登录功能正常（如果配置）
- [ ] PWA 功能正常
- [ ] 国际化切换正常
- [ ] 主题切换正常
- [ ] SEO 元数据正确

## 🔍 性能检查

部署完成后，建议使用以下工具检查性能：

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 🐛 常见问题

### 1. 构建失败

**问题**: 部署时构建失败

**解决方案**:
```bash
# 本地测试构建
pnpm run build

# 检查 Node.js 版本
node --version

# 确保使用正确的 Node.js 版本（推荐 18.x 或 20.x）
```

### 2. 环境变量未生效

**问题**: 环境变量在生产环境中未生效

**解决方案**:
```bash
# 检查环境变量是否正确配置
vercel env ls

# 重新部署
vercel --prod
```

### 3. OAuth 登录失败

**问题**: OAuth 登录在生产环境中失败

**解决方案**:
1. 确保在 OAuth 提供商中配置了正确的回调 URL
2. 检查客户端 ID 和密钥是否正确
3. 确保 `NUXT_AUTH_SECRET` 已配置

### 4. Google Analytics 不工作

**问题**: Google Analytics 事件未发送

**解决方案**:
1. 检查 `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` 是否正确
2. 确保用户已同意 Cookie
3. 在浏览器开发者工具中检查网络请求

## 📚 更多资源

- [Vercel 官方文档](https://vercel.com/docs)
- [Nuxt 3 部署指南](https://nuxt.com/docs/getting-started/deployment)
- [详细部署指南](./Vercel-部署指南.md)
- [Google Analytics 配置指南](./Google-Analytics-Cookie-配置指南.md)

## 🎉 完成！

恭喜！您的 Nuxt 3 项目现在已经成功部署到 Vercel。您可以通过 Vercel 提供的 URL 访问您的网站。

如果遇到任何问题，请参考上面的常见问题部分或查看详细的部署指南。