<template>
  <div class="relative" ref="dropdownRef">
    <!-- 未登录状态 -->
    <div v-if="!isAuthenticated && !isLoading" class="flex items-center space-x-2">
      <NuxtLink
        to="/auth/signin"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Icon name="heroicons:user" class="w-4 h-4 mr-2" />
        {{ $t('auth.signIn') }}
      </NuxtLink>
    </div>
    
    <!-- 加载状态 -->
    <div v-else-if="isLoading" class="flex items-center space-x-2">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      <span class="text-sm text-gray-600 dark:text-gray-400">{{ $t('auth.signingIn') }}</span>
    </div>
    
    <!-- 已登录状态 -->
    <div v-else class="relative">
      <button
        @click="toggleDropdown"
        class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <img
          v-if="user?.image"
          :src="user.image"
          :alt="user.name || 'User'"
          class="w-8 h-8 rounded-full"
        />
        <div v-else class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
          <Icon name="heroicons:user" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </div>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
          {{ user?.name || user?.email }}
        </span>
        <Icon name="heroicons:chevron-down" class="w-4 h-4 text-gray-500" />
      </button>
      
      <!-- 下拉菜单 -->
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-show="showDropdown"
          class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          <div class="py-1">
            <!-- 用户信息 -->
            <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ user?.name }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ user?.email }}
              </p>
              <p v-if="session?.user" class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {{ $t('auth.signInWithProvider', { provider: 'OAuth' }) }}
              </p>
            </div>
            
            <!-- 菜单项 -->
            <NuxtLink
              to="/profile"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              @click="closeDropdown"
            >
              <Icon name="heroicons:user" class="w-4 h-4 mr-2 inline" />
              {{ $t('auth.profile') }}
            </NuxtLink>
            
            <button
              @click="handleSignOut"
              class="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Icon name="heroicons:arrow-right-on-rectangle" class="w-4 h-4 mr-2 inline" />
              {{ $t('auth.signOut') }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: session, status, signOut } = useAuth()

// 计算属性
const isLoading = computed(() => status.value === 'loading')
const isAuthenticated = computed(() => status.value === 'authenticated')
const user = computed(() => session.value?.user || null)
const router = useRouter()

// 组件引用
const dropdownRef = ref<HTMLElement>()

// 下拉菜单状态
const showDropdown = ref(false)

// 切换下拉菜单
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// 关闭下拉菜单
const closeDropdown = () => {
  showDropdown.value = false
}

// 登出处理
const handleSignOut = async () => {
  try {
    await signOut({
      callbackUrl: '/'
    })
    closeDropdown()
    router.push('/')
  } catch (error) {
    console.error('Sign out error:', error)
  }
}

// 点击外部关闭下拉菜单
if (import.meta.client) {
  onClickOutside(dropdownRef, () => {
    closeDropdown()
  })
}

// 监听路由变化关闭下拉菜单
watch(() => router.currentRoute.value.path, () => {
  closeDropdown()
})
</script>