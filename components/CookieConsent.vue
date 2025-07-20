<template>
  <div
    v-if="showBanner"
    class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg"
  >
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {{ $t('cookie.title') }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {{ $t('cookie.description') }}
            <NuxtLink
              to="/privacy"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ $t('cookie.learnMore') }}
            </NuxtLink>
          </p>
          
          <!-- Cookie 类型选择 -->
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                :checked="true"
                disabled
                class="mr-2 rounded"
              >
              <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ $t('cookie.necessary') }}
              </span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="preferences.analytics"
                type="checkbox"
                class="mr-2 rounded"
              >
              <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ $t('cookie.analytics') }}
              </span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="preferences.marketing"
                type="checkbox"
                class="mr-2 rounded"
              >
              <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ $t('cookie.marketing') }}
              </span>
            </label>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-2 min-w-fit">
          <button
            @click="acceptSelected"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {{ $t('cookie.acceptSelected') }}
          </button>
          
          <button
            @click="acceptAll"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            {{ $t('cookie.acceptAll') }}
          </button>
          
          <button
            @click="rejectAll"
            class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            {{ $t('cookie.rejectAll') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const { $gtag } = useNuxtApp()

const showBanner = ref(false)
const preferences = ref<CookiePreferences>({
  necessary: true,
  analytics: false,
  marketing: false
})

// 检查是否已经设置过 Cookie 偏好
const checkCookieConsent = () => {
  if (process.client) {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      showBanner.value = true
    } else {
      const savedPreferences = JSON.parse(consent)
      preferences.value = savedPreferences
      applyPreferences(savedPreferences)
    }
  }
}

// 应用 Cookie 偏好设置
const applyPreferences = (prefs: CookiePreferences) => {
  if (process.client) {
    // 设置 Google Analytics
    if (prefs.analytics && $gtag) {
      $gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
    } else if ($gtag) {
      $gtag('consent', 'update', {
        analytics_storage: 'denied'
      })
    }
    
    // 设置营销 Cookie
    if (prefs.marketing && $gtag) {
      $gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      })
    } else if ($gtag) {
      $gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      })
    }
  }
}

// 保存偏好设置
const savePreferences = (prefs: CookiePreferences) => {
  if (process.client) {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
  }
  applyPreferences(prefs)
  showBanner.value = false
}

// 接受选中的 Cookie
const acceptSelected = () => {
  savePreferences(preferences.value)
}

// 接受所有 Cookie
const acceptAll = () => {
  const allAccepted: CookiePreferences = {
    necessary: true,
    analytics: true,
    marketing: true
  }
  preferences.value = allAccepted
  savePreferences(allAccepted)
}

// 拒绝所有非必要 Cookie
const rejectAll = () => {
  const onlyNecessary: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false
  }
  preferences.value = onlyNecessary
  savePreferences(onlyNecessary)
}

// 暴露方法供外部调用
defineExpose({
  showBanner: () => {
    showBanner.value = true
  },
  getPreferences: () => preferences.value
})

onMounted(() => {
  checkCookieConsent()
})
</script>