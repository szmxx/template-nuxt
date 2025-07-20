# Vercel 部署指南

## 环境变量配置

为了解决 `AUTH_NO_ORIGIN` 错误，您需要在 Vercel 中正确配置以下环境变量：

### 必需的环境变量

1. **AUTH_ORIGIN** (重要)
   - 值：您的完整域名，例如 `https://template-nuxt-lake.vercel.app`
   - 说明：这是解决生产环境认证错误的关键变量

2. **NUXT_AUTH_SECRET**
   - 值：一个强密码字符串（至少32字符）
   - 说明：用于加密 JWT 令牌

3. **NUXT_PUBLIC_SITE_URL**
   - 值：您的完整域名，例如 `https://template-nuxt-lake.vercel.app`
   - 说明：公共站点 URL

### OAuth 提供商配置（可选）

如果您要使用 OAuth 登录，请配置相应的客户端 ID 和密钥：

- **GOOGLE_CLIENT_ID** 和 **GOOGLE_CLIENT_SECRET**
- **GITHUB_CLIENT_ID** 和 **GITHUB_CLIENT_SECRET**
- **DISCORD_CLIENT_ID** 和 **DISCORD_CLIENT_SECRET**
- **TWITTER_CLIENT_ID** 和 **TWITTER_CLIENT_SECRET**
- **FACEBOOK_CLIENT_ID** 和 **FACEBOOK_CLIENT_SECRET**

## 在 Vercel 中设置环境变量

1. 登录 Vercel Dashboard
2. 选择您的项目
3. 进入 "Settings" 标签
4. 点击 "Environment Variables"
5. 添加上述环境变量
6. 重新部署项目

## 故障排除

### AUTH_NO_ORIGIN 错误

如果您遇到 `AUTH_NO_ORIGIN: No origin - this is an error in production` 错误：

1. 确保 `AUTH_ORIGIN` 环境变量已正确设置
2. 确保 `NUXT_PUBLIC_SITE_URL` 环境变量已正确设置
3. 重新部署项目
4. 检查 Vercel 函数日志以确认变量已正确加载

### 验证配置

部署后，您可以访问 `/auth-demo` 页面来测试认证功能是否正常工作。

## 本地开发

对于本地开发，请复制 `.env.example` 文件为 `.env` 并填入相应的值：

```bash
cp .env.example .env
```

然后编辑 `.env` 文件，设置必要的环境变量。