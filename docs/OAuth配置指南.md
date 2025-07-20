# OAuth 配置指南

本指南将帮助您配置 Google 和 GitHub OAuth 登录功能。

## 🔧 环境变量配置

首先，复制 `.env.example` 文件为 `.env`，并填入您的 OAuth 应用配置：

```bash
cp .env.example .env
```

## 🔑 Google OAuth 配置

### 1. 创建 Google Cloud 项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API 或 Google Identity API

### 2. 创建 OAuth 2.0 客户端 ID

1. 导航到 **APIs & Services** > **Credentials**
2. 点击 **Create Credentials** > **OAuth client ID**
3. 选择 **Web application**
4. 配置以下信息：
   - **Name**: 您的应用名称
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (开发环境)
     - `https://yourdomain.com` (生产环境)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (开发环境)
     - `https://yourdomain.com/api/auth/callback/google` (生产环境)

### 3. 获取客户端凭据

创建完成后，您将获得：
- **Client ID**: 复制到 `GOOGLE_CLIENT_ID`
- **Client Secret**: 复制到 `GOOGLE_CLIENT_SECRET`

## 🐙 GitHub OAuth 配置

### 1. 创建 GitHub OAuth 应用

1. 访问 [GitHub Settings](https://github.com/settings/applications/new)
2. 或者导航到 **Settings** > **Developer settings** > **OAuth Apps** > **New OAuth App**

### 2. 配置应用信息

填写以下信息：
- **Application name**: 您的应用名称
- **Homepage URL**: 
  - `http://localhost:3000` (开发环境)
  - `https://yourdomain.com` (生产环境)
- **Authorization callback URL**:
  - `http://localhost:3000/api/auth/callback/github` (开发环境)
  - `https://yourdomain.com/api/auth/callback/github` (生产环境)

### 3. 获取客户端凭据

创建完成后，您将获得：
- **Client ID**: 复制到 `GITHUB_CLIENT_ID`
- **Client Secret**: 点击 **Generate a new client secret** 生成，然后复制到 `GITHUB_CLIENT_SECRET`

## 🔐 Auth.js 密钥配置

生成一个强密码作为 Auth.js 的密钥：

```bash
# 使用 openssl 生成随机密钥
openssl rand -base64 32

# 或者使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

将生成的密钥设置为 `NUXT_AUTH_SECRET`。

## 📝 完整的 .env 配置示例

```env
# 鉴权配置
NUXT_AUTH_SECRET=your-generated-secret-key-here

# Google OAuth 配置
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-google-client-secret

# GitHub OAuth 配置
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Auth 回调 URL 配置
NUXT_AUTH_ORIGIN=http://localhost:3000
```

## 🚀 测试配置

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问 `http://localhost:3000/auth-demo` 测试登录功能

3. 点击 Google 或 GitHub 登录按钮进行测试

## 🔒 安全注意事项

### 开发环境
- 确保 `.env` 文件已添加到 `.gitignore`
- 不要将真实的客户端密钥提交到版本控制

### 生产环境
- 使用环境变量或安全的密钥管理服务
- 确保回调 URL 使用 HTTPS
- 定期轮换客户端密钥
- 限制 OAuth 应用的权限范围

## 🛠️ 故障排除

### 常见错误

1. **redirect_uri_mismatch**
   - 检查 OAuth 应用配置中的回调 URL 是否正确
   - 确保 URL 完全匹配（包括协议、域名、端口）

2. **invalid_client**
   - 检查客户端 ID 和密钥是否正确
   - 确保环境变量名称正确

3. **Configuration error**
   - 检查 `NUXT_AUTH_SECRET` 是否已设置
   - 确保所有必需的环境变量都已配置

### 调试技巧

1. 检查浏览器开发者工具的网络标签
2. 查看服务器控制台日志
3. 验证环境变量是否正确加载：
   ```javascript
   console.log({
     googleClientId: process.env.GOOGLE_CLIENT_ID,
     githubClientId: process.env.GITHUB_CLIENT_ID,
     authSecret: process.env.NUXT_AUTH_SECRET ? '已设置' : '未设置'
   })
   ```

## 📚 相关资源

- [Auth.js 官方文档](https://authjs.dev/)
- [Google OAuth 2.0 文档](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth 文档](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Nuxt Auth 模块文档](https://sidebase.io/nuxt-auth/)