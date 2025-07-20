// Google Analytics 和 Cookie 同意功能使用示例
// 这个文件包含了在 Vue 组件中使用分析功能的各种代码示例

// ===== 基础使用示例 =====

// 1. 在 Vue 组件中导入和使用 useAnalytics
/*
<script setup>
const {
  isAnalyticsEnabled,
  trackEvent,
  trackButtonClick,
  trackFormSubmit,
  trackSearch,
  trackDownload,
  trackExternalLink,
  setUserProperties
} = useAnalytics()

// 检查分析是否启用
console.log('分析状态:', isAnalyticsEnabled.value)
</script>
*/

// ===== 事件跟踪示例 =====

// 2. 基础事件跟踪
function trackBasicEvent() {
  const { trackEvent } = useAnalytics()
  
  trackEvent({
    name: 'custom_event',
    category: 'engagement',
    label: 'user_action',
    value: 1
  })
}

// 3. 按钮点击跟踪
function trackButtonExample() {
  const { trackButtonClick } = useAnalytics()
  
  // 简单按钮点击
  trackButtonClick('signup_button', 'header')
  
  // 带额外参数的按钮点击
  trackButtonClick('download_button', 'sidebar', {
    file_type: 'pdf',
    file_size: '2.5MB'
  })
}

// 4. 表单提交跟踪
function trackFormExample() {
  const { trackFormSubmit } = useAnalytics()
  
  // 成功提交
  trackFormSubmit('contact_form', true)
  
  // 失败提交（验证错误）
  trackFormSubmit('contact_form', false, {
    error_type: 'validation',
    missing_fields: ['email', 'phone']
  })
}

// 5. 搜索跟踪
function trackSearchExample() {
  const { trackSearch } = useAnalytics()
  
  // 基础搜索跟踪
  trackSearch('产品名称', 15)
  
  // 带分类的搜索
  trackSearch('iPhone', 8, {
    category: 'electronics',
    filter: 'price_low_to_high'
  })
}

// 6. 文件下载跟踪
function trackDownloadExample() {
  const { trackDownload } = useAnalytics()
  
  // 基础下载跟踪
  trackDownload('user-guide.pdf', 'pdf')
  
  // 带额外信息的下载跟踪
  trackDownload('product-catalog.xlsx', 'excel', {
    file_size: '5.2MB',
    download_source: 'product_page'
  })
}

// 7. 外部链接跟踪
function trackExternalLinkExample() {
  const { trackExternalLink } = useAnalytics()
  
  // 基础外部链接跟踪
  trackExternalLink('https://example.com', '合作伙伴网站')
  
  // 带位置信息的外部链接跟踪
  trackExternalLink('https://github.com/project', 'GitHub 项目', {
    link_position: 'footer',
    link_type: 'social'
  })
}

// ===== 用户属性设置示例 =====

// 8. 设置用户属性
function setUserPropertiesExample() {
  const { setUserProperties } = useAnalytics()
  
  // 基础用户属性
  setUserProperties({
    user_type: 'premium',
    subscription_plan: 'pro',
    registration_date: '2024-01-01'
  })
  
  // 用户偏好设置
  setUserProperties({
    preferred_language: 'zh-CN',
    theme_preference: 'dark',
    notification_enabled: true
  })
}

// ===== 性能跟踪示例 =====

// 9. API 性能跟踪
async function trackApiPerformanceExample() {
  const { trackPerformance } = useAnalytics()
  
  const startTime = performance.now()
  
  try {
    const response = await fetch('/api/data')
    const endTime = performance.now()
    const duration = endTime - startTime
    
    // 跟踪 API 响应时间
    trackPerformance('api_response_time', duration, 'ms', {
      endpoint: '/api/data',
      status_code: response.status,
      method: 'GET'
    })
  } catch (error) {
    // 跟踪 API 错误
    trackError(error.message, 'api_error', false)
  }
}

// 10. 页面加载时间跟踪
function trackPageLoadExample() {
  const { trackPageLoadTime } = useAnalytics()
  
  // 在页面加载完成后调用
  onMounted(() => {
    trackPageLoadTime()
  })
}

// ===== Cookie 管理示例 =====

// 11. Cookie 偏好管理
function cookieManagementExample() {
  const { getCookiePreferences, saveCookiePreferences } = useAnalytics()
  
  // 获取当前偏好
  const currentPrefs = getCookiePreferences()
  console.log('当前 Cookie 偏好:', currentPrefs)
  
  // 更新偏好
  saveCookiePreferences({
    necessary: true,
    analytics: true,
    marketing: false
  })
}

// ===== 高级使用示例 =====

// 12. 电商事件跟踪（需要在 gtag.client.ts 中实现）
function trackEcommerceExample() {
  // 购买事件
  if (process.client && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: 'order_123',
      value: 99.99,
      currency: 'CNY',
      items: [{
        item_id: 'product_1',
        item_name: '产品名称',
        category: '产品类别',
        quantity: 1,
        price: 99.99
      }]
    })
  }
  
  // 添加到购物车事件
  if (process.client && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'CNY',
      value: 29.99,
      items: [{
        item_id: 'product_2',
        item_name: '另一个产品',
        category: '产品类别',
        quantity: 1,
        price: 29.99
      }]
    })
  }
}

// 13. 自定义维度跟踪
function trackCustomDimensionsExample() {
  const { trackEvent } = useAnalytics()
  
  trackEvent({
    name: 'page_view',
    category: 'engagement',
    custom_dimension_1: 'premium_user',  // 用户类型
    custom_dimension_2: 'product_page',  // 页面类别
    custom_dimension_3: 'mobile'         // 设备类型
  })
}

// 14. 错误跟踪
function trackErrorExample() {
  const { trackError } = useAnalytics()
  
  try {
    // 可能出错的代码
    throw new Error('示例错误')
  } catch (error) {
    trackError(error.message, 'javascript_error', false, {
      error_stack: error.stack,
      user_agent: navigator.userAgent,
      page_url: window.location.href
    })
  }
}

// ===== Vue 组件完整示例 =====

/*
<template>
  <div>
    <!-- 按钮点击跟踪 -->
    <button @click="handleButtonClick">
      点击跟踪按钮
    </button>
    
    <!-- 表单提交跟踪 -->
    <form @submit="handleFormSubmit">
      <input v-model="formData.email" type="email" placeholder="邮箱" />
      <button type="submit">提交</button>
    </form>
    
    <!-- 搜索跟踪 -->
    <input 
      v-model="searchQuery" 
      @keyup.enter="handleSearch"
      placeholder="搜索..."
    />
    
    <!-- 下载跟踪 -->
    <a @click="handleDownload" href="#">
      下载文件
    </a>
    
    <!-- 外部链接跟踪 -->
    <a @click="handleExternalLink" href="https://example.com" target="_blank">
      外部链接
    </a>
  </div>
</template>

<script setup>
const {
  isAnalyticsEnabled,
  trackButtonClick,
  trackFormSubmit,
  trackSearch,
  trackDownload,
  trackExternalLink,
  setUserProperties
} = useAnalytics()

const formData = ref({ email: '' })
const searchQuery = ref('')

// 按钮点击处理
const handleButtonClick = () => {
  trackButtonClick('example_button', 'demo_section')
}

// 表单提交处理
const handleFormSubmit = (event) => {
  event.preventDefault()
  const isValid = formData.value.email.includes('@')
  trackFormSubmit('demo_form', isValid)
  
  if (isValid) {
    // 处理成功提交
    console.log('表单提交成功')
  }
}

// 搜索处理
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    const resultCount = Math.floor(Math.random() * 100)
    trackSearch(searchQuery.value, resultCount)
    searchQuery.value = ''
  }
}

// 下载处理
const handleDownload = (event) => {
  event.preventDefault()
  trackDownload('example-file.pdf', 'pdf')
  // 实际下载逻辑
}

// 外部链接处理
const handleExternalLink = () => {
  trackExternalLink('https://example.com', '示例网站')
}

// 设置用户属性（在适当时机调用）
onMounted(() => {
  setUserProperties({
    page_category: 'demo',
    user_type: 'visitor'
  })
})
</script>
*/

// ===== 最佳实践提示 =====

/*
最佳实践：

1. 性能考虑：
   - 避免在循环中频繁调用跟踪函数
   - 使用防抖（debounce）处理高频事件
   - 只在必要时跟踪事件

2. 隐私保护：
   - 始终检查用户是否同意分析 Cookie
   - 不要跟踪敏感个人信息
   - 遵循 GDPR 和其他隐私法规

3. 数据质量：
   - 使用一致的命名约定
   - 验证事件参数
   - 避免发送无效或空数据

4. 调试：
   - 在开发环境中启用调试模式
   - 使用浏览器开发工具检查网络请求
   - 在 GA4 实时报告中验证事件

5. 测试：
   - 在不同浏览器中测试
   - 验证 Cookie 同意流程
   - 测试分析功能的启用/禁用
*/

export {
  trackBasicEvent,
  trackButtonExample,
  trackFormExample,
  trackSearchExample,
  trackDownloadExample,
  trackExternalLinkExample,
  setUserPropertiesExample,
  trackApiPerformanceExample,
  trackPageLoadExample,
  cookieManagementExample,
  trackEcommerceExample,
  trackCustomDimensionsExample,
  trackErrorExample
}