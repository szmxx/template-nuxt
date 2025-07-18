<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-8"
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
        {{ $t("demo.seo_demo") }}
      </h1>

      <!-- SEO 基础信息 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-green-700">
          🔍 SEO 基础优化
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="font-semibold text-lg mb-2">页面标题</h3>
            <p class="text-gray-600 bg-gray-100 p-3 rounded">
              SEO 优化演示 - Nuxt 模板项目
            </p>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-2">页面描述</h3>
            <p class="text-gray-600 bg-gray-100 p-3 rounded">
              展示 @nuxtjs/seo 模块的强大功能，包括元数据优化、结构化数据、Open
              Graph 等。
            </p>
          </div>
        </div>
      </div>

      <!-- Open Graph 信息 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400"
        >
          📱 Open Graph 优化
        </h2>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="font-semibold w-24">标题:</span>
            <span class="bg-gray-100 px-3 py-1 rounded flex-1"
              >SEO 优化演示 - Nuxt 模板项目</span
            >
          </div>
          <div class="flex items-center gap-3">
            <span class="font-semibold w-24">类型:</span>
            <span class="bg-gray-100 px-3 py-1 rounded flex-1">article</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="font-semibold w-24">语言:</span>
            <span class="bg-gray-100 px-3 py-1 rounded flex-1">zh_CN</span>
          </div>
        </div>
      </div>

      <!-- 结构化数据 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-400"
        >
          🏗️ 结构化数据
        </h2>
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold text-lg mb-2">面包屑导航</h3>
            <div class="flex items-center gap-2 text-sm">
              <span class="bg-blue-100 px-2 py-1 rounded">首页</span>
              <span>→</span>
              <span class="bg-blue-100 px-2 py-1 rounded">SEO 演示</span>
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-2">文章信息</h3>
            <div class="bg-gray-100 p-3 rounded">
              <p><strong>标题:</strong> SEO 优化最佳实践</p>
              <p><strong>作者:</strong> szmintel</p>
              <p><strong>发布时间:</strong> {{ publishDate }}</p>
              <p><strong>更新时间:</strong> {{ modifiedDate }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- SEO 检查清单 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-orange-700 dark:text-orange-400"
        >
          ✅ SEO 检查清单
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>页面标题优化</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>Meta 描述</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>关键词标签</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>Canonical URL</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>Open Graph 标签</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>Twitter Cards</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>结构化数据</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>Robots.txt</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SEO 工具 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400"
        >
          🛠️ SEO 工具推荐
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            class="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="text-2xl mb-2">🔍</div>
            <h3 class="font-semibold mb-1">Google Search Console</h3>
            <p class="text-sm text-gray-600">监控网站在 Google 搜索中的表现</p>
          </div>
          <div
            class="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="text-2xl mb-2">📊</div>
            <h3 class="font-semibold mb-1">Google Analytics</h3>
            <p class="text-sm text-gray-600">分析网站流量和用户行为</p>
          </div>
          <div
            class="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="text-2xl mb-2">⚡</div>
            <h3 class="font-semibold mb-1">PageSpeed Insights</h3>
            <p class="text-sm text-gray-600">测试页面加载速度和性能</p>
          </div>
        </div>
      </div>

      <!-- 返回导航 -->
      <div class="text-center space-x-4">
        <NuxtLink
          :to="localePath('/')"
          class="btn bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg inline-block"
        >
          {{ $t("home") }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/vueuse-demo')"
          class="btn bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg inline-block"
        >
          {{ $t("demo.vueuse_demo") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t, locale } = useI18n();
const localePath = useLocalePath();

// 当前时间
const now = new Date();
const publishDate = now.toLocaleDateString(
  locale.value === "zh-CN" ? "zh-CN" : "en-US",
);
const modifiedDate = now.toLocaleDateString(
  locale.value === "zh-CN" ? "zh-CN" : "en-US",
);

// 使用简化的文章 SEO 配置
useArticleSEO({
  title: `${t("demo.seo_demo")} - ${t("seo.title")}`,
  description:
    "展示 @nuxtjs/seo 模块的强大功能，包括元数据优化、结构化数据、Open Graph 等。",
  keywords:
    "SEO, 搜索引擎优化, Nuxt SEO, Open Graph, 结构化数据, Meta 标签, i18n",
  headline: "SEO 优化最佳实践",
  author: "szmintel",
  datePublished: now,
  dateModified: now,
});

// 添加面包屑导航的网页结构化数据
useWebPageSEO({
  title: "SEO 优化演示",
  description: "展示 @nuxtjs/seo 模块的强大功能和 SEO 最佳实践",
  breadcrumb: [
    { name: "首页", url: "https://your-domain.com" },
    { name: "SEO 演示", url: "https://your-domain.com/seo-demo" },
  ],
});
</script>

<style scoped>
.btn {
  @apply transition-colors duration-200 font-medium;
}
</style>
