# Google Analytics 和 Cookie 同意配置指南

本指南将帮助您在 Nuxt 3 项目中集成 Google Analytics 4 (GA4) 和实现 GDPR 合规的 Cookie 同意功能。

## 📋 目录

1. [Google Analytics 4 配置](#google-analytics-4-配置)
2. [Cookie 同意功能](#cookie-同意功能)
3. [环境变量配置](#环境变量配置)
4. [使用方法](#使用方法)
5. [高级功能](#高级功能)
6. [故障排除](#故障排除)
7. [最佳实践](#最佳实践)

## 🔍 Google Analytics 4 配置

### 1. 创建 GA4 属性

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新账户或选择现有账户
3. 创建新的 GA4 属性
4. 获取测量 ID（格式：`G-XXXXXXXXXX`）

### 2. 配置数据流

1. 在 GA4 属性中创建网络数据流
2. 添加您的网站 URL
3. 启用增强型测量功能
4. 配置转化事件

### 3. 设置自定义维度（可选）

在 GA4 中创建以下自定义维度：

| 维度名称 | 范围 | 描述 |
|---------|------|------|
| user_type | 用户 | 用户类型（访客、会员、高级会员） |
| page_category | 事件 | 页面类别（产品、支持、演示等） |
| button_location | 事件 | 按钮位置 |
| form_name | 事件 | 表单名称 |

## 🍪 Cookie 同意功能

### 功能特性

- ✅ GDPR 合规
- ✅ 细粒度 Cookie 控制
- ✅ 用户友好的界面
- ✅ 多语言支持
- ✅ 响应式设计
- ✅ 本地存储偏好

### Cookie 类型

1. **必要 Cookie**（始终启用）
   - 会话管理
   - 身份验证
   - 安全功能
   - 用户偏好

2. **分析 Cookie**（可选）
   - Google Analytics
   - 页面浏览统计
   - 用户行为分析
   - 性能监控

3. **营销 Cookie**（可选）
   - 个性化广告
   - 社交媒体集成
   - 营销活动跟踪

## ⚙️ 环境变量配置

在 `.env` 文件中添加以下配置：

```env
# Google Analytics 配置
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# 网站基本信息（用于 GA 配置）
NUXT_PUBLIC_SITE_URL=https://your-domain.com
NUXT_PUBLIC_SITE_NAME=您的网站名称
```

## 🚀 使用方法

### 1. 基础使用

```vue
<template>
  <div>
    <!-- Cookie 同意横幅会自动显示 -->
    <CookieConsent />
  </div>
</template>

<script setup>
// 使用分析功能
const { trackEvent, trackButtonClick } = useAnalytics()

// 跟踪按钮点击
const handleClick = () => {
  trackButtonClick('signup_button', 'header')
}
</script>
```

### 2. 事件跟踪

```javascript
// 基础事件跟踪
trackEvent({
  name: 'custom_event',
  category: 'engagement',
  label: 'user_action',
  value: 1
})

// 按钮点击跟踪
trackButtonClick('download_button', 'sidebar')

// 表单提交跟踪
trackFormSubmit('contact_form', true)

// 搜索跟踪
trackSearch('产品搜索', 10)

// 文件下载跟踪
trackDownload('user-guide.pdf', 'pdf')

// 外部链接跟踪
trackExternalLink('https://example.com', '合作伙伴链接')
```

### 3. 用户属性设置

```javascript
// 设置用户属性
setUserProperties({
  user_type: 'premium',
  subscription_plan: 'pro',
  registration_date: '2024-01-01'
})
```

### 4. 页面浏览跟踪

```javascript
// 手动跟踪页面浏览（通常自动处理）
trackPage('/custom-page', '自定义页面标题')
```

## 🔧 高级功能

### 1. 自定义事件跟踪

```javascript
// 电商事件跟踪
const { $trackPurchase } = useNuxtApp()

$trackPurchase('order_123', [
  {
    item_id: 'product_1',
    item_name: '产品名称',
    category: '产品类别',
    quantity: 1,
    price: 99.99
  }
], 99.99, 'CNY')

// 转化跟踪
const { $trackConversion } = useNuxtApp()

$trackConversion('AW-CONVERSION_ID/CONVERSION_LABEL', 100, 'CNY')
```

### 2. 异常跟踪

```javascript
// 跟踪 JavaScript 错误
const { trackError } = useAnalytics()

try {
  // 可能出错的代码
} catch (error) {
  trackError(error.message, 'javascript_error', false)
}
```

### 3. 性能监控

```javascript
// 跟踪自定义性能指标
const { trackPerformance } = useAnalytics()

// 测量 API 响应时间
const startTime = performance.now()
const response = await fetch('/api/data')
const endTime = performance.now()

trackPerformance('api_response_time', endTime - startTime, 'ms')
```

### 4. Cookie 偏好管理

```javascript
// 获取当前 Cookie 偏好
const { getCookiePreferences, saveCookiePreferences } = useAnalytics()

const preferences = getCookiePreferences()
console.log(preferences) // { necessary: true, analytics: false, marketing: false }

// 更新 Cookie 偏好
saveCookiePreferences({
  necessary: true,
  analytics: true,
  marketing: false
})
```

## 🎨 自定义样式

### Cookie 横幅样式自定义

```vue
<!-- 在 CookieConsent.vue 中自定义样式 -->
<style scoped>
.cookie-banner {
  /* 自定义背景色 */
  @apply bg-blue-900 text-white;
}

.cookie-button {
  /* 自定义按钮样式 */
  @apply bg-yellow-500 hover:bg-yellow-600;
}
</style>
```

## 🛠️ 故障排除

### 常见问题

1. **GA4 数据不显示**
   - 检查测量 ID 是否正确
   - 确认分析 Cookie 已启用
   - 验证网络请求是否发送成功

2. **Cookie 横幅不显示**
   - 检查组件是否正确导入
   - 确认本地存储中没有同意记录
   - 验证组件挂载状态

3. **事件跟踪失效**
   - 确认分析功能已启用
   - 检查事件参数格式
   - 验证网络连接

### 调试技巧

```javascript
// 启用调试模式
if (process.dev) {
  window.gtag('config', 'G-XXXXXXXXXX', {
    debug_mode: true
  })
}

// 检查 Cookie 状态
console.log('Cookie 偏好:', getCookiePreferences())
console.log('分析状态:', isAnalyticsEnabled.value)

// 监听 GA 事件
window.dataLayer = window.dataLayer || []
window.dataLayer.push(function() {
  console.log('GA 事件:', arguments)
})
```

## 📊 最佳实践

### 1. 性能优化

- 使用 `client` 插件避免 SSR 问题
- 延迟加载非关键跟踪代码
- 限制事件跟踪频率

### 2. 隐私保护

- 默认拒绝所有非必要 Cookie
- 提供清晰的隐私政策链接
- 允许用户随时更改偏好
- 匿名化 IP 地址

### 3. 用户体验

- 使用非侵入式的横幅设计
- 提供多语言支持
- 确保移动端友好
- 快速响应用户选择

### 4. 合规性

- 遵循 GDPR 要求
- 实施数据最小化原则
- 提供数据删除选项
- 记录用户同意状态

## 📚 相关资源

- [Google Analytics 4 文档](https://developers.google.com/analytics/devguides/collection/ga4)
- [GDPR 合规指南](https://gdpr.eu/)
- [Cookie 法律要求](https://www.cookielaw.org/)
- [Nuxt 3 文档](https://nuxt.com/)

## 🔄 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 基础 GA4 集成
- Cookie 同意功能
- 多语言支持

---

如有问题或建议，请提交 Issue 或 Pull Request。