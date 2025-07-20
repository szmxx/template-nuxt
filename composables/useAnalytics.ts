export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export interface AnalyticsEvent {
  name: string
  category?: string
  label?: string
  value?: number
  custom?: Record<string, any>
}

export const useAnalytics = () => {
  const { $gtag, $trackEvent, $trackPageView, $setUserProperties } = useNuxtApp()
  
  // Cookie 偏好状态
  const cookiePreferences = ref<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false
  })
  
  const isAnalyticsEnabled = computed(() => cookiePreferences.value.analytics)
  const isMarketingEnabled = computed(() => cookiePreferences.value.marketing)
  
  // 获取保存的 Cookie 偏好
  const getCookiePreferences = (): CookiePreferences | null => {
    if (process.client) {
      try {
        const saved = localStorage.getItem('cookie-consent')
        return saved ? JSON.parse(saved) : null
      } catch (error) {
        console.error('获取 Cookie 偏好失败:', error)
        return null
      }
    }
    return null
  }
  
  // 保存 Cookie 偏好
  const saveCookiePreferences = (preferences: CookiePreferences) => {
    if (process.client) {
      try {
        localStorage.setItem('cookie-consent', JSON.stringify(preferences))
        localStorage.setItem('cookie-consent-date', new Date().toISOString())
        cookiePreferences.value = preferences
        
        // 更新 Google Analytics 同意状态
        if ($gtag) {
          $gtag('consent', 'update', {
            analytics_storage: preferences.analytics ? 'granted' : 'denied',
            ad_storage: preferences.marketing ? 'granted' : 'denied',
            ad_user_data: preferences.marketing ? 'granted' : 'denied',
            ad_personalization: preferences.marketing ? 'granted' : 'denied'
          })
        }
      } catch (error) {
        console.error('保存 Cookie 偏好失败:', error)
      }
    }
  }
  
  // 初始化 Cookie 偏好
  const initializeCookiePreferences = () => {
    const saved = getCookiePreferences()
    if (saved) {
      cookiePreferences.value = saved
    }
  }
  
  // 跟踪页面浏览
  const trackPage = (path?: string, title?: string) => {
    if (!isAnalyticsEnabled.value) return
    
    const pagePath = path || (process.client ? window.location.pathname : '')
    const pageTitle = title || (process.client ? document.title : '')
    
    if ($trackPageView) {
      $trackPageView(pagePath, pageTitle)
    }
  }
  
  // 跟踪事件
  const trackEvent = (event: AnalyticsEvent) => {
    if (!isAnalyticsEnabled.value) return
    
    if ($trackEvent) {
      $trackEvent(event.name, {
        category: event.category,
        label: event.label,
        value: event.value,
        ...event.custom
      })
    }
  }
  
  // 跟踪用户交互
  const trackInteraction = (element: string, action: string, label?: string) => {
    trackEvent({
      name: 'user_interaction',
      category: 'engagement',
      label: `${element}_${action}${label ? `_${label}` : ''}`,
      custom: {
        element_type: element,
        action_type: action
      }
    })
  }
  
  // 跟踪按钮点击
  const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent({
      name: 'button_click',
      category: 'engagement',
      label: buttonName,
      custom: {
        button_name: buttonName,
        button_location: location
      }
    })
  }
  
  // 跟踪表单提交
  const trackFormSubmit = (formName: string, success: boolean = true) => {
    trackEvent({
      name: 'form_submit',
      category: 'engagement',
      label: formName,
      value: success ? 1 : 0,
      custom: {
        form_name: formName,
        form_success: success
      }
    })
  }
  
  // 跟踪搜索
  const trackSearch = (searchTerm: string, resultCount?: number) => {
    trackEvent({
      name: 'search',
      category: 'engagement',
      label: searchTerm,
      value: resultCount,
      custom: {
        search_term: searchTerm,
        result_count: resultCount
      }
    })
  }
  
  // 跟踪文件下载
  const trackDownload = (fileName: string, fileType?: string) => {
    trackEvent({
      name: 'file_download',
      category: 'engagement',
      label: fileName,
      custom: {
        file_name: fileName,
        file_type: fileType
      }
    })
  }
  
  // 跟踪外部链接点击
  const trackExternalLink = (url: string, linkText?: string) => {
    trackEvent({
      name: 'external_link_click',
      category: 'engagement',
      label: url,
      custom: {
        link_url: url,
        link_text: linkText
      }
    })
  }
  
  // 跟踪视频播放
  const trackVideoPlay = (videoTitle: string, videoDuration?: number) => {
    trackEvent({
      name: 'video_play',
      category: 'engagement',
      label: videoTitle,
      value: videoDuration,
      custom: {
        video_title: videoTitle,
        video_duration: videoDuration
      }
    })
  }
  
  // 跟踪错误
  const trackError = (errorMessage: string, errorType?: string, fatal: boolean = false) => {
    trackEvent({
      name: 'exception',
      category: 'error',
      label: errorMessage,
      custom: {
        error_message: errorMessage,
        error_type: errorType,
        fatal: fatal
      }
    })
  }
  
  // 设置用户属性
  const setUserProperties = (properties: Record<string, any>) => {
    if (!isAnalyticsEnabled.value) return
    
    if ($setUserProperties) {
      $setUserProperties(properties)
    }
  }
  
  // 跟踪性能指标
  const trackPerformance = (metricName: string, value: number, unit?: string) => {
    trackEvent({
      name: 'performance_metric',
      category: 'performance',
      label: metricName,
      value: value,
      custom: {
        metric_name: metricName,
        metric_value: value,
        metric_unit: unit
      }
    })
  }
  
  // 跟踪页面加载时间
  const trackPageLoadTime = () => {
    if (process.client && window.performance) {
      const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart
      trackPerformance('page_load_time', loadTime, 'ms')
    }
  }
  
  // 初始化
  onMounted(() => {
    initializeCookiePreferences()
    
    // 跟踪页面加载时间
    nextTick(() => {
      setTimeout(trackPageLoadTime, 1000)
    })
  })
  
  return {
    // 状态
    cookiePreferences: readonly(cookiePreferences),
    isAnalyticsEnabled,
    isMarketingEnabled,
    
    // Cookie 管理
    getCookiePreferences,
    saveCookiePreferences,
    initializeCookiePreferences,
    
    // 基础跟踪
    trackPage,
    trackEvent,
    setUserProperties,
    
    // 特定事件跟踪
    trackInteraction,
    trackButtonClick,
    trackFormSubmit,
    trackSearch,
    trackDownload,
    trackExternalLink,
    trackVideoPlay,
    trackError,
    trackPerformance,
    trackPageLoadTime
  }
}