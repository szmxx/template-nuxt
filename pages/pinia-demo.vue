<template>
  <div class="container mx-auto p-6 space-y-8">
    <!-- 页面标题 -->
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Pinia 状态管理演示</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        展示 Pinia 在 Nuxt 3 中的使用方法和最佳实践
      </p>
    </div>

    <!-- Counter Store 演示 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold mb-4 flex items-center">
        <Icon name="carbon:calculator" class="mr-2" />
        计数器 Store
      </h2>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- 状态显示 -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">状态信息</h3>
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
            <div class="flex justify-between">
              <span>Store 名称:</span>
              <span class="font-mono">{{ counterStore.name }}</span>
            </div>
            <div class="flex justify-between">
              <span>当前计数:</span>
              <span class="font-mono text-2xl font-bold text-blue-600">{{
                counterStore.count
              }}</span>
            </div>
            <div class="flex justify-between">
              <span>双倍计数:</span>
              <span class="font-mono text-lg text-green-600">{{
                counterStore.doubleCount
              }}</span>
            </div>
            <div class="flex justify-between">
              <span>是否为偶数:</span>
              <span
                class="font-mono"
                :class="counterStore.isEven ? 'text-green-600' : 'text-red-600'"
              >
                {{ counterStore.isEven ? "是" : "否" }}
              </span>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">操作</h3>
          <div class="grid grid-cols-2 gap-3">
            <button class="btn btn-primary" @click="counterStore.increment()">
              <Icon name="carbon:add" class="mr-1" />
              增加
            </button>
            <button class="btn btn-secondary" @click="counterStore.decrement()">
              <Icon name="carbon:subtract" class="mr-1" />
              减少
            </button>
            <button class="btn btn-warning" @click="counterStore.reset()">
              <Icon name="carbon:reset" class="mr-1" />
              重置
            </button>
            <button class="btn btn-info" @click="setRandomCount">
              <Icon name="carbon:shuffle" class="mr-1" />
              随机
            </button>
          </div>

          <!-- 自定义设置 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium">设置计数值:</label>
            <div class="flex gap-2">
              <input
                v-model.number="customCount"
                type="number"
                class="input flex-1"
                placeholder="输入数字"
              />
              <button
                class="btn btn-primary"
                @click="counterStore.setCount(customCount)"
              >
                设置
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium">Store 名称:</label>
            <div class="flex gap-2">
              <input
                v-model="customName"
                type="text"
                class="input flex-1"
                placeholder="输入名称"
              />
              <button
                class="btn btn-primary"
                @click="counterStore.setName(customName)"
              >
                更新
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User Store 演示 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold mb-4 flex items-center">
        <Icon name="carbon:user" class="mr-2" />
        用户 Store
      </h2>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- 用户信息 -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">用户信息</h3>

          <div v-if="!userStore.isLoggedIn" class="text-center py-8">
            <Icon
              name="carbon:user-avatar"
              class="text-6xl text-gray-400 mx-auto mb-4"
            />
            <p class="text-gray-500 mb-4">请先登录</p>

            <!-- 登录表单 -->
            <form
              class="space-y-3 max-w-sm mx-auto"
              @submit.prevent="handleLogin"
            >
              <input
                v-model="loginForm.email"
                type="email"
                class="input w-full"
                placeholder="邮箱地址"
                required
              />
              <input
                v-model="loginForm.password"
                type="password"
                class="input w-full"
                placeholder="密码"
                required
              />
              <button
                type="submit"
                :disabled="userStore.loading"
                class="btn btn-primary w-full"
              >
                <Icon
                  v-if="userStore.loading"
                  name="carbon:loading"
                  class="animate-spin mr-2"
                />
                {{ userStore.loading ? "登录中..." : "登录" }}
              </button>
            </form>

            <p class="text-xs text-gray-400 mt-2">
              提示: 邮箱包含 "admin" 将获得管理员权限
            </p>
          </div>

          <div v-else class="space-y-4">
            <!-- 用户头像和基本信息 -->
            <div class="flex items-center space-x-4">
              <div
                class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold"
              >
                {{ userStore.userInitials }}
              </div>
              <div>
                <h4 class="text-xl font-semibold">{{ userStore.userName }}</h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ userStore.user?.email }}
                </p>
                <span
                  class="inline-block px-2 py-1 text-xs rounded-full"
                  :class="{
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                      userStore.userRole === 'admin',
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200':
                      userStore.userRole === 'user',
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200':
                      userStore.userRole === 'guest',
                  }"
                >
                  {{
                    userStore.userRole === "admin"
                      ? "管理员"
                      : userStore.userRole === "user"
                      ? "用户"
                      : "游客"
                  }}
                </span>
              </div>
            </div>

            <!-- 用户偏好设置 -->
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
              <h5 class="font-medium">偏好设置</h5>

              <div class="grid grid-cols-1 gap-3">
                <div class="flex items-center justify-between">
                  <span>主题:</span>
                  <select
                    :value="userStore.preferences.theme"
                    class="input text-sm"
                    @change="
                      updateTheme(
                        ($event.target as HTMLSelectElement).value as
                          | 'light'
                          | 'dark'
                          | 'auto'
                      )
                    "
                  >
                    <option value="light">浅色</option>
                    <option value="dark">深色</option>
                    <option value="auto">自动</option>
                  </select>
                </div>

                <div class="flex items-center justify-between">
                  <span>语言:</span>
                  <select
                    :value="userStore.preferences.language"
                    class="input text-sm"
                    @change="
                      updateLanguage(($event.target as HTMLSelectElement).value)
                    "
                  >
                    <option value="zh-CN">中文</option>
                    <option value="en-US">English</option>
                  </select>
                </div>

                <div class="flex items-center justify-between">
                  <span>通知:</span>
                  <button
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                    :class="
                      userStore.preferences.notifications
                        ? 'bg-blue-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    "
                    @click="toggleNotifications"
                  >
                    <span
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                      :class="
                        userStore.preferences.notifications
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      "
                    />
                  </button>
                </div>
              </div>
            </div>

            <button class="btn btn-danger w-full" @click="userStore.logout()">
              <Icon name="carbon:logout" class="mr-2" />
              退出登录
            </button>
          </div>
        </div>

        <!-- Store 状态调试 -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Store 状态调试</h3>

          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h5 class="font-medium mb-2">计算属性</h5>
            <div class="space-y-1 text-sm font-mono">
              <div>userName: {{ userStore.userName }}</div>
              <div>userRole: {{ userStore.userRole }}</div>
              <div>isAdmin: {{ userStore.isAdmin }}</div>
              <div>userInitials: {{ userStore.userInitials }}</div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h5 class="font-medium mb-2">原始状态</h5>
            <pre class="text-xs overflow-auto max-h-40">{{
              JSON.stringify(
                {
                  user: userStore.user,
                  isLoggedIn: userStore.isLoggedIn,
                  loading: userStore.loading,
                  preferences: userStore.preferences,
                },
                null,
                2
              )
            }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
      <h2
        class="text-2xl font-semibold mb-4 flex items-center text-blue-800 dark:text-blue-200"
      >
        <Icon name="carbon:information" class="mr-2" />
        Pinia 使用说明
      </h2>

      <div class="grid md:grid-cols-2 gap-6 text-sm">
        <div class="space-y-3">
          <h3 class="font-semibold text-blue-700 dark:text-blue-300">
            功能特性
          </h3>
          <ul class="space-y-1 text-blue-600 dark:text-blue-400">
            <li>• 类型安全的状态管理</li>
            <li>• Composition API 风格</li>
            <li>• 自动代码分割</li>
            <li>• 开发工具支持</li>
            <li>• 服务端渲染兼容</li>
            <li>• 轻量级 (~2kb)</li>
          </ul>
        </div>

        <div class="space-y-3">
          <h3 class="font-semibold text-blue-700 dark:text-blue-300">
            最佳实践
          </h3>
          <ul class="space-y-1 text-blue-600 dark:text-blue-400">
            <li>• 使用 Composition API 定义 stores</li>
            <li>• 合理拆分 stores 职责</li>
            <li>• 利用计算属性优化性能</li>
            <li>• 在客户端操作本地存储</li>
            <li>• 使用 TypeScript 增强类型安全</li>
            <li>• 适当使用 reactive 和 ref</li>
          </ul>
        </div>
      </div>

      <div class="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 class="font-semibold mb-2">代码示例</h3>
        <pre class="text-xs overflow-auto"><code>// 在组件中使用 store
const counterStore = useCounterStore()
const userStore = useUserStore()

// 访问状态
console.log(counterStore.count)
console.log(userStore.userName)

// 调用动作
counterStore.increment()
userStore.login(email, password)</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 使用简化的网页 SEO 配置
useWebPageSEO({
  title: "Pinia 状态管理演示 - Nuxt 模板项目",
  description:
    "展示 Pinia 在 Nuxt 3 中的使用方法和最佳实践，包括状态管理、计算属性和动作的完整示例。",
  keywords:
    "Pinia, 状态管理, Nuxt 3, Vue 3, Composition API, TypeScript, 响应式",
  breadcrumb: [
    { name: "首页", url: "https://your-domain.com" },
    { name: "Pinia 演示", url: "https://your-domain.com/pinia-demo" },
  ],
});

// 使用 stores
const counterStore = useCounterStore();
const userStore = useUserStore();

// 响应式数据
const customCount = ref(0);
const customName = ref("");
const loginForm = reactive({
  email: "",
  password: "",
});

// 方法
function setRandomCount() {
  const randomValue = Math.floor(Math.random() * 100);
  counterStore.setCount(randomValue);
}

async function handleLogin() {
  try {
    await userStore.login(loginForm.email);
    // 清空表单
    loginForm.email = "";
    loginForm.password = "";
  } catch (error) {
    console.error("登录失败:", error);
    // 这里可以添加错误提示
  }
}

function updateTheme(theme: "light" | "dark" | "auto") {
  userStore.updatePreferences({ theme: theme as "light" | "dark" | "auto" });
}

function updateLanguage(language: string) {
  userStore.updatePreferences({ language });
}

function toggleNotifications() {
  userStore.updatePreferences({
    notifications: !userStore.preferences.notifications,
  });
}

// 初始化用户数据
onMounted(() => {
  userStore.initializeFromStorage();
});
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply bg-gray-600 text-white hover:bg-gray-700;
}

.btn-warning {
  @apply bg-yellow-600 text-white hover:bg-yellow-700;
}

.btn-info {
  @apply bg-cyan-600 text-white hover:bg-cyan-700;
}

.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700;
}

.input {
  @apply px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}
</style>
