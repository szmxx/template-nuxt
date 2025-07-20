<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <Icon name="heroicons:exclamation-triangle" class="mx-auto h-16 w-16 text-red-500" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          {{ $t('auth.authError') }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ errorInfo.message }}
        </p>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-500">
          {{ errorInfo.suggestion }}
        </p>
      </div>
      
      <div class="mt-8 space-y-4">
        <button
          @click="clearStateAndRetry"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-2" />
          清除状态并重试
        </button>
        
        <button
          @click="$router.push('/auth/signin')"
          class="group relative w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {{ $t('auth.tryAgain') }}
        </button>
        
        <button
          @click="$router.push('/')"
          class="group relative w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {{ $t('auth.backToHome') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { resetAndRetry, getDetailedErrorInfo } = useAuthRecovery()

// 获取错误信息
const error = computed(() => route.query.error as string || 'unknown')
const errorInfo = computed(() => getDetailedErrorInfo(error.value))

// 页面元数据
useHead({
  title: t('auth.authError'),
  meta: [
    { name: 'description', content: t('auth.authErrorDescription') }
  ]
})

// 清除认证状态并重新尝试登录
const clearStateAndRetry = async () => {
  try {
    await resetAndRetry()
  } catch (error) {
    console.error('重置认证状态失败:', error)
    // 即使重置失败也尝试重定向
    await router.push('/auth/signin')
  }
}


</script>