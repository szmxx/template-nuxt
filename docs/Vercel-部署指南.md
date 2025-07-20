# Vercel 部署指南

本指南将帮助您将 Nuxt 3 项目（包含 Google Analytics 和 Cookie 同意功能）部署到 Vercel 平台。

## 📋 部署前准备

### 1. 确保项目配置正确

检查以下文件是否存在且配置正确：
- ✅ `vercel.json` - Vercel 配置文件
- ✅ `nuxt.config.ts` - Nuxt 配置
- ✅ `package.json` - 依赖管理
- ✅ `.env.example` - 环境变量示例

### 2. 准备必要的环境变量

在部署前，请准备以下环境变量：

```env
# 必需的环境变量
NUXT_AUTH_SECRET=your-strong-secret-key
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NUXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NUXT_PUBLIC_SITE_NAME=您的网站名称

# OAuth 配置（根据需要）
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
# ... 其他 OAuth 提供商
```

## 🚀 部署步骤

### 方法一：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   pnpm add -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **初始化项目**
   ```bash
   vercel
   ```
   
   按照提示配置：
   - 选择团队（如果有）
   - 确认项目名称
   - 确认项目目录
   - 选择框架：`Nuxt.js`

4. **配置环境变量**
   ```bash
   # 添加生产环境变量
   vercel env add NUXT_AUTH_SECRET production
   vercel env add NUXT_PUBLIC_GOOGLE_ANALYTICS_ID production
   vercel env add NUXT_PUBLIC_SITE_URL production
   vercel env add NUXT_PUBLIC_SITE_NAME production
   
   # 添加 OAuth 配置
   vercel env add GOOGLE_CLIENT_ID production
   vercel env add GOOGLE_CLIENT_SECRET production
   # ... 添加其他必要的环境变量
   ```

5. **部署到生产环境**
   ```bash
   vercel --prod
   ```

### 方法二：通过 GitHub 集成部署

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "准备部署到 Vercel"
   git push origin main
   ```

2. **连接 Vercel 和 GitHub**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择 GitHub 仓库
   - 导入项目

3. **配置项目设置**
   - **Framework Preset**: `Nuxt.js`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.output/public`
   - **Install Command**: `pnpm install`
   - **Development Command**: `pnpm dev`

4. **配置环境变量**
   在 Vercel 项目设置中添加环境变量：
   
   | 变量名 | 值 | 环境 |
   |--------|----|---------|
   | `NUXT_AUTH_SECRET` | 您的密钥 | Production |
   | `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` | G-XXXXXXXXXX | Production |
   | `NUXT_PUBLIC_SITE_URL` | https://your-domain.vercel.app | Production |
   | `NUXT_PUBLIC_SITE_NAME` | 您的网站名称 | Production |
   | `GOOGLE_CLIENT_ID` | 您的 Google 客户端 ID | Production |
   | `GOOGLE_CLIENT_SECRET` | 您的 Google 客户端密钥 | Production |

5. **部署项目**
   点击 "Deploy" 按钮开始部署。

## ⚙️ 环境变量配置详解

### 必需的环境变量

```bash
# 认证密钥（必需）
NUXT_AUTH_SECRET=your-very-strong-secret-key-at-least-32-characters

# Google Analytics（推荐）
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# 网站基本信息
NUXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NUXT_PUBLIC_SITE_NAME=您的网站名称
NUXT_PUBLIC_SITE_DESCRIPTION=网站描述

# 国际化配置
NUXT_PUBLIC_DEFAULT_LOCALE=zh-CN

# PWA 配置
NUXT_PUBLIC_PWA_SHORT_NAME=App名称
NUXT_PUBLIC_PWA_THEME_COLOR=#3B82F6
```

### OAuth 提供商配置

#### Google OAuth
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**配置步骤：**
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建或选择项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端 ID
5. 添加授权重定向 URI：`https://your-domain.vercel.app/api/auth/callback/google`

#### GitHub OAuth
```bash
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

**配置步骤：**
1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 创建新的 OAuth App
3. 设置 Authorization callback URL：`https://your-domain.vercel.app/api/auth/callback/github`

#### 其他 OAuth 提供商
```bash
# Discord
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret

# Twitter
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret

# Facebook
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
```

## 🔧 自定义域名配置

### 1. 添加自定义域名

在 Vercel 项目设置中：
1. 进入 "Domains" 标签
2. 添加您的域名
3. 配置 DNS 记录

### 2. 更新环境变量

```bash
# 更新网站 URL
NUXT_PUBLIC_SITE_URL=https://your-custom-domain.com
```

### 3. 更新 OAuth 回调 URL

在各个 OAuth 提供商的设置中，更新回调 URL：
- Google: `https://your-custom-domain.com/api/auth/callback/google`
- GitHub: `https://your-custom-domain.com/api/auth/callback/github`
- 其他提供商类似

## 📊 Google Analytics 生产环境配置

### 1. 创建生产环境 GA4 属性

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新的 GA4 属性（用于生产环境）
3. 配置数据流，使用您的生产域名
4. 获取测量 ID（G-XXXXXXXXXX）

### 2. 配置跨域跟踪（如果需要）

```javascript
// 在 gtag.client.ts 中添加
if (process.client && window.gtag) {
  window.gtag('config', runtimeConfig.public.googleAnalyticsId, {
    // 跨域跟踪配置
    linker: {
      domains: ['your-main-domain.com', 'your-subdomain.com']
    }
  })
}
```

## 🛡️ 安全配置

### 1. 内容安全策略 (CSP)

在 `nuxt.config.ts` 中配置：

```typescript
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy': [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
            "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
            "img-src 'self' data: https://www.google-analytics.com",
            "style-src 'self' 'unsafe-inline'"
          ].join('; ')
        }
      }
    }
  }
})
```

### 2. 环境变量安全

- ✅ 使用强密码作为 `NUXT_AUTH_SECRET`
- ✅ 不要在客户端代码中暴露敏感信息
- ✅ 定期轮换 OAuth 客户端密钥
- ✅ 使用 Vercel 的环境变量加密功能

## 🔍 部署后验证

### 1. 功能检查清单

- [ ] 网站正常加载
- [ ] Cookie 同意横幅显示
- [ ] Google Analytics 事件发送成功
- [ ] OAuth 登录功能正常
- [ ] PWA 功能正常
- [ ] 国际化切换正常
- [ ] 主题切换正常
- [ ] SEO 元数据正确

### 2. 性能检查

使用以下工具检查性能：
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### 3. Google Analytics 验证

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 查看实时报告
3. 验证事件是否正确发送
4. 检查转化跟踪是否正常

## 🚨 常见问题和解决方案

### 问题 1: 构建失败

**错误**: `Build failed with exit code 1`

**解决方案**:
1. 检查 `package.json` 中的脚本
2. 确保所有依赖都已正确安装
3. 检查 TypeScript 类型错误
4. 查看构建日志获取详细错误信息

### 问题 2: 环境变量未生效

**错误**: 环境变量在生产环境中为 `undefined`

**解决方案**:
1. 确保环境变量名称正确（区分大小写）
2. 检查环境变量是否设置为 "Production" 环境
3. 重新部署项目
4. 使用 `console.log` 调试环境变量值

### 问题 3: OAuth 回调失败

**错误**: `redirect_uri_mismatch`

**解决方案**:
1. 检查 OAuth 提供商的回调 URL 配置
2. 确保使用正确的域名（包括 https://）
3. 检查 `NUXT_AUTH_SECRET` 是否设置
4. 验证 OAuth 客户端 ID 和密钥

### 问题 4: Google Analytics 不工作

**错误**: 事件未发送到 GA

**解决方案**:
1. 检查 `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` 是否正确
2. 确保用户已同意分析 Cookie
3. 检查浏览器网络标签中的 GA 请求
4. 验证 GA4 属性配置

### 问题 5: Cookie 同意横幅不显示

**解决方案**:
1. 清除浏览器本地存储
2. 检查 `CookieConsent` 组件是否正确导入
3. 验证组件挂载逻辑
4. 检查 CSS 样式是否正确加载

## 📈 性能优化建议

### 1. 启用 Vercel 分析

```bash
vercel --prod --enable-analytics
```

### 2. 配置缓存策略

在 `vercel.json` 中：

```json
{
  "headers": [
    {
      "source": "/_nuxt/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 3. 启用压缩

Vercel 默认启用 Gzip 压缩，无需额外配置。

## 🔄 持续部署

### GitHub Actions 集成

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: latest
          
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Run tests
        run: pnpm test
        
      - name: Build project
        run: pnpm build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📚 相关资源

- [Vercel 官方文档](https://vercel.com/docs)
- [Nuxt 3 部署指南](https://nuxt.com/docs/getting-started/deployment)
- [Google Analytics 4 文档](https://developers.google.com/analytics/devguides/collection/ga4)
- [OAuth 配置指南](./OAuth配置指南.md)
- [Google Analytics 配置指南](./Google-Analytics-Cookie-配置指南.md)

---

🎉 恭喜！您的项目现在已经成功部署到 Vercel 上，并且所有功能都已正常工作。