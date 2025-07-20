# 🔧 GitHub Actions 自动部署配置指南

本指南将帮助您配置 GitHub Actions 自动部署到 Vercel。

## 📋 前置要求

1. GitHub 仓库
2. Vercel 账户
3. 项目已在 Vercel 中创建

## 🔑 配置 GitHub Secrets

### 1. 获取 Vercel 信息

首先，您需要获取以下 Vercel 信息：

#### 获取 Vercel Token

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击右上角头像 → Settings
3. 在左侧菜单中选择 "Tokens"
4. 点击 "Create" 创建新的 Token
5. 输入 Token 名称（如：`github-actions`）
6. 选择过期时间
7. 点击 "Create" 并复制生成的 Token

#### 获取 Organization ID 和 Project ID

```bash
# 安装 Vercel CLI（如果还没有安装）
npm install -g vercel

# 登录 Vercel
vercel login

# 在项目根目录运行
vercel link

# 查看项目信息
cat .vercel/project.json
```

您将看到类似以下的输出：
```json
{
  "orgId": "team_xxxxxxxxxxxxxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### 2. 在 GitHub 中添加 Secrets

1. 打开您的 GitHub 仓库
2. 点击 "Settings" 选项卡
3. 在左侧菜单中选择 "Secrets and variables" → "Actions"
4. 点击 "New repository secret" 添加以下密钥：

#### 必需的 Secrets

| Secret 名称 | 描述 | 示例值 |
|------------|------|--------|
| `VERCEL_TOKEN` | Vercel API Token | `xxxxxxxxxxxxxxxxxxxxxxxx` |
| `VERCEL_ORG_ID` | Vercel 组织 ID | `team_xxxxxxxxxxxxxxxxxxxxxxxx` |
| `VERCEL_PROJECT_ID` | Vercel 项目 ID | `prj_xxxxxxxxxxxxxxxxxxxxxxxx` |

#### 可选的 Secrets（环境变量）

| Secret 名称 | 描述 | 示例值 |
|------------|------|--------|
| `NUXT_PUBLIC_SITE_URL` | 网站 URL | `https://your-domain.vercel.app` |
| `NUXT_PUBLIC_SITE_NAME` | 网站名称 | `My Awesome Site` |
| `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Google Analytics ID | `G-XXXXXXXXXX` |

#### OAuth 提供商 Secrets（如果使用）

| Secret 名称 | 描述 |
|------------|------|
| `NUXT_GOOGLE_CLIENT_ID` | Google OAuth 客户端 ID |
| `NUXT_GOOGLE_CLIENT_SECRET` | Google OAuth 客户端密钥 |
| `NUXT_GITHUB_CLIENT_ID` | GitHub OAuth 客户端 ID |
| `NUXT_GITHUB_CLIENT_SECRET` | GitHub OAuth 客户端密钥 |
| `NUXT_DISCORD_CLIENT_ID` | Discord OAuth 客户端 ID |
| `NUXT_DISCORD_CLIENT_SECRET` | Discord OAuth 客户端密钥 |

## 🚀 工作流程说明

### 触发条件

1. **自动触发**：
   - 推送到 `main` 或 `master` 分支 → 部署到生产环境
   - 创建 Pull Request → 部署到预览环境

2. **手动触发**：
   - 在 GitHub Actions 页面手动运行工作流
   - 可选择部署到预览或生产环境

### 工作流程步骤

1. **代码检出**：获取最新代码
2. **环境设置**：安装 Node.js 和 pnpm
3. **依赖安装**：安装项目依赖
4. **代码检查**：运行 ESLint
5. **测试运行**：执行单元测试
6. **项目构建**：验证构建是否成功
7. **Vercel 部署**：部署到相应环境
8. **状态更新**：更新部署状态和 PR 评论
9. **性能检查**：运行 Lighthouse 性能测试（可选）

## 📊 性能监控

### Lighthouse CI

工作流程包含 Lighthouse CI 性能检查，会自动测试以下指标：

- **性能 (Performance)**: 最低分数 80%
- **可访问性 (Accessibility)**: 最低分数 90%
- **最佳实践 (Best Practices)**: 最低分数 85%
- **SEO**: 最低分数 90%
- **PWA**: 最低分数 80%

### 自定义性能阈值

您可以在 `.lighthouserc.json` 文件中调整性能阈值：

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}]
      }
    }
  }
}
```

## 🔧 自定义配置

### 修改触发分支

如果您的主分支不是 `main` 或 `master`，请修改 `.github/workflows/deploy-vercel.yml`：

```yaml
on:
  push:
    branches:
      - your-main-branch  # 修改为您的主分支名称
  pull_request:
    branches:
      - your-main-branch  # 修改为您的主分支名称
```

### 添加额外的检查

您可以在工作流程中添加更多检查步骤：

```yaml
# 添加类型检查
- name: Type Check
  run: pnpm run type-check

# 添加安全检查
- name: Security Audit
  run: pnpm audit

# 添加依赖检查
- name: Check Dependencies
  run: pnpm outdated
```

## 🐛 故障排除

### 常见问题

#### 1. Vercel Token 无效

**错误信息**: `Error: Invalid token`

**解决方案**:
1. 检查 `VERCEL_TOKEN` 是否正确配置
2. 确保 Token 没有过期
3. 重新生成 Token 并更新 Secret

#### 2. 项目 ID 不匹配

**错误信息**: `Error: Project not found`

**解决方案**:
1. 检查 `VERCEL_PROJECT_ID` 是否正确
2. 确保项目已在 Vercel 中创建
3. 运行 `vercel link` 重新链接项目

#### 3. 构建失败

**错误信息**: `Build failed`

**解决方案**:
1. 在本地运行 `pnpm run build` 检查构建
2. 检查环境变量是否正确配置
3. 查看构建日志中的具体错误信息

#### 4. 环境变量未生效

**解决方案**:
1. 确保在 Vercel 项目中配置了环境变量
2. 检查变量名称是否正确（区分大小写）
3. 重新部署项目

### 调试技巧

1. **查看工作流程日志**：
   - 在 GitHub 仓库中点击 "Actions" 选项卡
   - 选择失败的工作流程查看详细日志

2. **本地测试**：
   ```bash
   # 本地运行相同的命令
   pnpm install
   pnpm run lint
   pnpm run test:run
   pnpm run build
   ```

3. **Vercel 日志**：
   ```bash
   # 查看 Vercel 部署日志
   vercel logs [deployment-url]
   ```

## 📚 更多资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Vercel CLI 文档](https://vercel.com/docs/cli)
- [Lighthouse CI 文档](https://github.com/GoogleChrome/lighthouse-ci)
- [Vercel GitHub 集成](https://vercel.com/docs/concepts/git/vercel-for-github)

## 🎉 完成！

配置完成后，每次推送代码或创建 Pull Request 时，GitHub Actions 将自动运行部署流程。您可以在 GitHub Actions 页面查看部署状态和日志。