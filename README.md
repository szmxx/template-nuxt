# Nuxt 全栈开发模板

![License](https://img.shields.io/badge/License-MIT-blue)
![Node Version](https://img.shields.io/badge/Node-%3E%3D18.0.0-success)

## 🚀 功能特性

### 核心模块
- Nuxt3 SSR/SSG 支持
- 国际化 (i18n) 多语言切换
- PWA 渐进式网页应用
- UnoCSS 原子化样式方案
- API速率限制中间件
- OAuth 鉴权 (Google, GitHub)
- Google Analytics 4 集成
- GDPR 合规 Cookie 同意功能

### 开发支持
- Vitest 单元测试框架
- ESLint + Prettier 代码规范
- 自动化API路由生成
- 可视化构建分析
- Docker 生产部署配置
- Vercel 一键部署
- GitHub Actions 自动化部署
- Lighthouse CI 性能监控

## 📦 命令说明

```bash
# 安装依赖
pnpm install

# 开发模式 (带热更新)
pnpm dev

# 生产构建
pnpm build

# 预览生产版本
pnpm preview

# 部署到 Vercel
pnpm run deploy:vercel

# 部署到 Vercel 生产环境
pnpm run deploy:vercel:production
```

## 🗂 目录结构

```
template-nuxt/
├── server/        # 服务端逻辑
│   ├── api/       # API路由
│   └── middleware # 中间件
├── components/    # 公共组件
├── composables/  # 组合式函数
├── stores/        # Pinia状态管理
├── utils/         # 工具函数库
└── test/          # 测试用例
```

## 📄 文档资源

### 开发指南
- [API开发规范](./docs/API规范.md)
- [SEO优化指南](./docs/SEO-优化指南.md)
- [OAuth配置指南](./docs/OAuth配置指南.md)

### 部署指南
- [Vercel 快速部署](./README-Vercel-部署.md)
- [详细部署指南](./docs/Vercel-部署指南.md)
- [GitHub Actions 配置](./docs/GitHub-Actions-配置指南.md)
- [Docker 部署](./docs/Docker部署.md)

### 功能配置
- [Google Analytics 配置](./docs/Google-Analytics-Cookie-配置指南.md)
- [快速开始指南](./docs/快速开始指南.md)
- [代码示例](./examples/analytics-code-examples.js)

## 🔧 技术栈
- Vue 3.3
- TypeScript 5.0
- Nitro Server
- Pinia 2.1
- UnoCSS 0.55

## 授权协议
[MIT License](LICENSE)
