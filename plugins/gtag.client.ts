export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { $i18n } = useNuxtApp()

  // 从环境变量获取 GA4 测量 ID
  const gaId = config.public.googleAnalyticsId

  if (!gaId) {
    console.warn('Google Analytics ID 未配置')
    return
  }

  // 加载 Google Analytics 脚本
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)

  // 初始化 gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }

  // 设置默认的同意状态（拒绝所有）
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  })

  // 配置 Google Analytics
  gtag('js', new Date())
  gtag('config', gaId, {
    // 基础配置
    send_page_view: true,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,

    // 自定义参数
    custom_map: {
      dimension1: 'user_type',
      dimension2: 'page_category'
    },

    // 页面标题和语言
    page_title: document.title,
    language: $i18n?.locale?.value || 'zh-CN'
  })

  // 检查已保存的 Cookie 偏好
  const savedConsent = localStorage.getItem('cookie-consent')
  if (savedConsent) {
    try {
      const preferences = JSON.parse(savedConsent)

      // 根据用户偏好更新同意状态
      gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        ad_user_data: preferences.marketing ? 'granted' : 'denied',
        ad_personalization: preferences.marketing ? 'granted' : 'denied'
      })
    } catch (error) {
      console.error('解析 Cookie 偏好失败:', error)
    }
  }

  // 自定义事件跟踪函数
  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    gtag('event', eventName, {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label,
      value: parameters.value,
      custom_parameter: parameters.custom,
      ...parameters
    })
  }

  // 页面浏览跟踪
  const trackPageView = (pagePath: string, pageTitle?: string) => {
    gtag('config', gaId, {
      page_path: pagePath,
      page_title: pageTitle || document.title
    })
  }

  // 用户属性设置
  const setUserProperties = (properties: Record<string, any>) => {
    gtag('config', gaId, {
      user_properties: properties
    })
  }

  // 电商事件跟踪
  const trackPurchase = (transactionId: string, items: any[], value: number, currency = 'CNY') => {
    gtag('event', 'purchase', {
      transaction_id: transactionId,
      value,
      currency,
      items
    })
  }

  // 转化事件跟踪
  const trackConversion = (conversionId: string, value?: number, currency = 'CNY') => {
    gtag('event', 'conversion', {
      send_to: conversionId,
      value,
      currency
    })
  }

  // 异常跟踪
  const trackException = (description: string, fatal = false) => {
    gtag('event', 'exception', {
      description,
      fatal
    })
  }

  // 时间跟踪
  const trackTiming = (category: string, variable: string, value: number, label?: string) => {
    gtag('event', 'timing_complete', {
      name: variable,
      value,
      event_category: category,
      event_label: label
    })
  }

  // 提供全局访问
  return {
    provide: {
      gtag,
      trackEvent,
      trackPageView,
      setUserProperties,
      trackPurchase,
      trackConversion,
      trackException,
      trackTiming
    }
  }
})

// 类型声明
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

// Nuxt 应用类型扩展
declare module '#app' {
  interface NuxtApp {
    $gtag: (...args: any[]) => void
    $trackEvent: (eventName: string, parameters?: Record<string, any>) => void
    $trackPageView: (pagePath: string, pageTitle?: string) => void
    $setUserProperties: (properties: Record<string, any>) => void
    $trackPurchase: (transactionId: string, items: any[], value: number, currency?: string) => void
    $trackConversion: (conversionId: string, value?: number, currency?: string) => void
    $trackException: (description: string, fatal?: boolean) => void
    $trackTiming: (category: string, variable: string, value: number, label?: string) => void
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $gtag: (...args: any[]) => void
    $trackEvent: (eventName: string, parameters?: Record<string, any>) => void
    $trackPageView: (pagePath: string, pageTitle?: string) => void
    $setUserProperties: (properties: Record<string, any>) => void
    $trackPurchase: (transactionId: string, items: any[], value: number, currency?: string) => void
    $trackConversion: (conversionId: string, value?: number, currency?: string) => void
    $trackException: (description: string, fatal?: boolean) => void
    $trackTiming: (category: string, variable: string, value: number, label?: string) => void
  }
}
