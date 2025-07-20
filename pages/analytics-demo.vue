<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {{ $t('analytics.title') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          {{ $t('analytics.description') }}
        </p>
      </div>

      <!-- Cookie 状态卡片 -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- 分析状态 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Google Analytics
            </h3>
            <div 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                isAnalyticsEnabled 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              ]"
            >
              {{ isAnalyticsEnabled ? $t('analytics.enabled') : $t('analytics.disabled') }}
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            当前分析 Cookie 状态：{{ isAnalyticsEnabled ? '已启用' : '已禁用' }}
          </p>
          <button
            @click="toggleAnalytics"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              isAnalyticsEnabled
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            ]"
          >
            {{ isAnalyticsEnabled ? $t('analytics.optOut') : $t('analytics.optIn') }}
          </button>
        </div>

        <!-- Cookie 偏好 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {{ $t('cookie.settings') }}
          </h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-700 dark:text-gray-300">{{ $t('cookie.necessary') }}</span>
              <span class="text-green-600 font-medium">✓ 已启用</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-700 dark:text-gray-300">{{ $t('cookie.analytics') }}</span>
              <span :class="isAnalyticsEnabled ? 'text-green-600' : 'text-red-600'" class="font-medium">
                {{ isAnalyticsEnabled ? '✓ 已启用' : '✗ 已禁用' }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-700 dark:text-gray-300">{{ $t('cookie.marketing') }}</span>
              <span :class="isMarketingEnabled ? 'text-green-600' : 'text-red-600'" class="font-medium">
                {{ isMarketingEnabled ? '✓ 已启用' : '✗ 已禁用' }}
              </span>
            </div>
          </div>
          <button
            @click="showCookieBanner"
            class="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            {{ $t('cookie.manage') }}
          </button>
        </div>
      </div>

      <!-- 事件跟踪演示 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          事件跟踪演示
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          以下按钮将触发不同类型的 Google Analytics 事件（仅在启用分析 Cookie 时生效）
        </p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            @click="trackButtonClickEvent"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            按钮点击
          </button>
          
          <button
            @click="trackFormSubmitEvent"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            表单提交
          </button>
          
          <button
            @click="trackSearchEvent"
            class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
          >
            搜索事件
          </button>
          
          <button
            @click="trackDownloadEvent"
            class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
          >
            文件下载
          </button>
        </div>
        
        <!-- 事件日志 -->
        <div class="mt-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
            事件日志
          </h4>
          <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 max-h-40 overflow-y-auto">
            <div v-if="eventLog.length === 0" class="text-gray-500 dark:text-gray-400 text-sm">
              暂无事件记录
            </div>
            <div 
              v-for="(event, index) in eventLog" 
              :key="index"
              class="text-sm text-gray-700 dark:text-gray-300 mb-1"
            >
              <span class="font-mono text-xs text-gray-500 dark:text-gray-400">
                {{ event.timestamp }}
              </span>
              - {{ event.message }}
            </div>
          </div>
          <button
            @click="clearEventLog"
            class="mt-2 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded font-medium transition-colors"
          >
            清空日志
          </button>
        </div>
      </div>

      <!-- 用户属性演示 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          用户属性设置
        </h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              用户类型
            </label>
            <select 
              v-model="userType" 
              @change="updateUserProperties"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="visitor">访客</option>
              <option value="member">会员</option>
              <option value="premium">高级会员</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              页面类别
            </label>
            <select 
              v-model="pageCategory" 
              @change="updateUserProperties"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="demo">演示页面</option>
              <option value="product">产品页面</option>
              <option value="support">支持页面</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 返回导航 -->
      <div class="text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <div class="i-carbon-arrow-left mr-2" />
          返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSEO } from '~/composables/useSEO'
import { useAnalytics } from '~/composables/useAnalytics'

// SEO 配置
useSEO({
  title: 'Google Analytics 和 Cookie 同意演示',
  description: '演示如何在 Nuxt 3 中集成 Google Analytics 和实现 GDPR 合规的 Cookie 同意功能',
  keywords: 'Google Analytics, Cookie 同意, GDPR, Nuxt 3, 数据分析',
  ogType: 'website'
})

// 使用分析功能
const {
  isAnalyticsEnabled,
  isMarketingEnabled,
  saveCookiePreferences,
  getCookiePreferences,
  trackEvent,
  trackButtonClick,
  trackFormSubmit,
  trackSearch,
  trackDownload,
  setUserProperties
} = useAnalytics()

// 响应式数据
const eventLog = ref<Array<{ timestamp: string; message: string }>>([])
const userType = ref('visitor')
const pageCategory = ref('demo')

// Cookie 同意组件引用
const cookieConsentRef = ref()

// 添加事件到日志
const addEventToLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  eventLog.value.unshift({ timestamp, message })
  
  // 限制日志条数
  if (eventLog.value.length > 20) {
    eventLog.value = eventLog.value.slice(0, 20)
  }
}

// 切换分析功能
const toggleAnalytics = () => {
  const currentPreferences = getCookiePreferences() || {
    necessary: true,
    analytics: false,
    marketing: false
  }
  
  const newPreferences = {
    ...currentPreferences,
    analytics: !currentPreferences.analytics
  }
  
  saveCookiePreferences(newPreferences)
  
  addEventToLog(`分析 Cookie ${newPreferences.analytics ? '已启用' : '已禁用'}`)
}

// 显示 Cookie 横幅
const showCookieBanner = () => {
  // 这里需要通过 ref 或事件来触发 CookieConsent 组件显示
  // 暂时通过清除本地存储来模拟
  if (process.client) {
    localStorage.removeItem('cookie-consent')
    location.reload()
  }
}

// 事件跟踪演示函数
const trackButtonClickEvent = () => {
  trackButtonClick('demo_button', 'analytics_page')
  addEventToLog('按钮点击事件已发送')
}

const trackFormSubmitEvent = () => {
  trackFormSubmit('demo_form', true)
  addEventToLog('表单提交事件已发送')
}

const trackSearchEvent = () => {
  trackSearch('analytics demo', 5)
  addEventToLog('搜索事件已发送')
}

const trackDownloadEvent = () => {
  trackDownload('analytics-guide.pdf', 'pdf')
  addEventToLog('下载事件已发送')
}

// 更新用户属性
const updateUserProperties = () => {
  setUserProperties({
    user_type: userType.value,
    page_category: pageCategory.value,
    demo_version: '1.0'
  })
  
  addEventToLog(`用户属性已更新: ${userType.value}, ${pageCategory.value}`)
}

// 清空事件日志
const clearEventLog = () => {
  eventLog.value = []
}

// 页面加载时的初始化
onMounted(() => {
  addEventToLog('页面已加载')
  updateUserProperties()
})
</script>