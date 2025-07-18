<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-8"
  >
    <!-- 语言切换器和主题切换器 -->
    <div class="fixed top-4 right-4 z-10 flex gap-2">
      <ColorModeSwitcher />
      <LanguageSwitcher />
    </div>

    <div class="container mx-auto max-w-6xl">
      <h1
        class="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8"
      >
        {{ $t("demo.vueuse_demo") }}
      </h1>

      <!-- 鼠标位置追踪 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-purple-700">
          🖱️ 鼠标位置追踪
        </h2>
        <p class="text-lg">
          鼠标位置: X:
          <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ x }}</span
          >, Y:
          <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ y }}</span>
        </p>
      </div>

      <!-- 窗口大小 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400"
        >
          📐 窗口大小
        </h2>
        <p class="text-lg text-gray-900 dark:text-gray-100">
          窗口尺寸:
          <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
            >{{ width }} × {{ height }}</span
          >
        </p>
      </div>

      <!-- 在线状态 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-green-700 dark:text-green-400"
        >
          🌐 网络状态
        </h2>
        <div class="flex items-center gap-2">
          <div
            :class="[
              isOnline ? 'bg-green-500' : 'bg-red-500',
              'w-3 h-3 rounded-full',
            ]"
          />
          <span class="text-lg">{{ isOnline ? "在线" : "离线" }}</span>
        </div>
      </div>

      <!-- 本地存储 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-orange-700 dark:text-orange-400"
        >
          💾 本地存储
        </h2>
        <div class="space-y-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >输入文本（自动保存到 localStorage）:</label
            >
            <input
              v-model="storedValue"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="输入一些文本..."
            >
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            刷新页面后文本仍会保留
          </p>
        </div>
      </div>

      <!-- 计数器 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400"
        >
          🔢 响应式计数器
        </h2>
        <div class="flex items-center gap-4">
          <button
            class="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            @click="dec()"
          >
            -
          </button>
          <span class="text-2xl font-mono bg-gray-100 px-4 py-2 rounded">{{
            count
          }}</span>
          <button
            class="btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            @click="inc()"
          >
            +
          </button>
          <button
            class="btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            @click="reset()"
          >
            重置
          </button>
        </div>
      </div>

      <!-- 颜色模式切换 -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-purple-700">🌙 深色模式</h2>
        <div class="flex items-center gap-4">
          <button
            class="btn bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2"
            @click="toggleColorMode()"
          >
            <span v-if="colorMode === 'dark'">🌞</span>
            <span v-else>🌙</span>
            切换到 {{ colorMode === "dark" ? "浅色" : "深色" }} 模式
          </button>
          <span class="text-sm text-gray-600">当前模式: {{ colorMode }}</span>
        </div>
      </div>

      <!-- 时间格式化 -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-teal-700">⏰ 实时时间</h2>
        <div class="space-y-2">
          <p class="text-lg">
            当前时间:
            <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{
              formattedTime
            }}</span>
          </p>
          <p class="text-sm text-gray-600">自动更新，每秒刷新</p>
        </div>
      </div>

      <!-- 复制到剪贴板 -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-pink-700">📋 剪贴板操作</h2>
        <div class="space-y-4">
          <div>
            <input
              v-model="textToCopy"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="输入要复制的文本..."
            >
          </div>
          <button
            class="btn bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
            @click="copy(textToCopy)"
          >
            {{ copied ? "已复制!" : "复制到剪贴板" }}
          </button>
        </div>
      </div>

      <!-- 返回首页 -->
      <div class="text-center">
        <NuxtLink
          :to="localePath('/')"
          class="btn bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg inline-block"
        >
          {{ $t("home") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const localePath = useLocalePath();

// VueUse 组合式 API
const { x, y } = useMouse();
const { width, height } = useWindowSize();
const isOnline = useOnline();
const storedValue = useLocalStorage("vueuse-demo-text", "");
const { count, inc, dec, reset } = useCounter(0);
const colorMode = useColorMode();
const { copy, copied } = useClipboard();

// 实时时间
const now = useNow();
const formattedTime = computed(() => {
  return now.value.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
});

// 复制文本
const textToCopy = ref("Hello VueUse! 这是一个很棒的工具库。");

// 切换颜色模式
const toggleColorMode = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};

// 使用简化的网页 SEO 配置
useWebPageSEO({
  title: `${t("demo.vueuse_demo")} - ${t("seo.title")}`,
  description: "展示 VueUse 组合式 API 的强大功能，包括鼠标追踪、本地存储、响应式计数器等实用工具。",
  keywords: "VueUse, Vue 3, 组合式 API, 鼠标追踪, 本地存储, 响应式, i18n",
  breadcrumb: [
    { name: t("home"), url: "https://your-domain.com" },
    { name: t("demo.vueuse_demo"), url: "https://your-domain.com/vueuse-demo" },
  ],
});
</script>

<style scoped>
.btn {
  @apply transition-colors duration-200 font-medium;
}
</style>
