<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
  >
    <!-- 语言切换器和主题切换器 -->
    <div class="fixed top-4 right-4 z-10 flex gap-2">
      <ColorModeSwitcher />
      <LanguageSwitcher />
    </div>

    <!-- UnoCSS 测试区域 -->
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          {{ $t("seo.title") }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {{ $t("description") }}
        </p>

        <div class="flex justify-center gap-4 mb-8">
          <button class="btn-primary">主要按钮</button>
          <button class="btn-secondary">次要按钮</button>
          <button class="btn">默认按钮</button>
          <NuxtLink
            :to="localePath('/vueuse-demo')"
            class="btn bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            {{ $t("demo.vueuse_demo") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/seo-demo')"
            class="btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {{ $t("demo.seo_demo") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/test-demo')"
            class="btn bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            {{ $t("demo.test_demo") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/pwa-demo')"
            class="btn bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
          >
            PWA 演示
          </NuxtLink>
          <NuxtLink
            :to="localePath('/pinia-demo')"
            class="btn bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
          >
            Pinia 演示
          </NuxtLink>
          <NuxtLink
            :to="localePath('/api-crud-demo')"
            class="btn bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
          >
            API CRUD 演示
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div
              class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto"
            >
              <div class="i-carbon-chemistry text-white text-xl" />
            </div>
            <h3
              class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100"
            >
              原子化 CSS
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              使用实用优先的 CSS 框架快速构建现代界面
            </p>
          </div>

          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div
              class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto"
            >
              <div class="i-carbon-flash text-white text-xl" />
            </div>
            <h3
              class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100"
            >
              高性能
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              按需生成 CSS，减少包体积，提升加载速度
            </p>
          </div>

          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div
              class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto"
            >
              <div class="i-carbon-settings text-white text-xl" />
            </div>
            <h3
              class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100"
            >
              高度可配置
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              灵活的配置选项，支持自定义主题和样式
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const localePath = useLocalePath();

// 使用简化的 SEO 配置
useSEO({
  title: t("seo.title"),
  description: t("seo.description"),
  keywords: "Nuxt 3, Vue 3, UnoCSS, VueUse, SEO, i18n, 模板, 全栈开发",
  ogType: "website",
});

// 添加网站结构化数据
useSchemaOrg([
  defineWebSite({
    name: t("seo.title"),
    description: t("seo.description"),
  }),
]);

</script>
