<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-8"
  >
    <!-- 语言切换器和主题切换器 -->
    <div class="fixed top-4 right-4 z-10 flex gap-2">
      <ColorModeSwitcher />
      <LanguageSwitcher />
    </div>

    <div class="container mx-auto max-w-4xl">
      <h1
        class="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8"
      >
        SEO Composables 使用示例
      </h1>

      <!-- 基础 SEO 示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-400"
        >
          🎯 基础 SEO 配置
        </h2>
        <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <pre class="text-sm overflow-auto"><code>// 基础页面 SEO
useSEO({
  title: '页面标题',
  description: '页面描述',
  keywords: '关键词1, 关键词2',
  ogType: 'website'
})</code></pre>
        </div>
      </div>

      <!-- 文章 SEO 示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400"
        >
          📝 文章页面 SEO
        </h2>
        <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <pre class="text-sm overflow-auto"><code>// 文章页面专用 SEO
useArticleSEO({
  title: '文章标题',
  description: '文章描述',
  headline: '文章标题（结构化数据）',
  author: '作者名称',
  datePublished: new Date('2024-01-01'),
  dateModified: new Date()
})</code></pre>
        </div>
      </div>

      <!-- 网页 SEO 示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-green-700 dark:text-green-400"
        >
          🌐 网页 SEO（带面包屑）
        </h2>
        <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <pre class="text-sm overflow-auto"><code>// 带面包屑的网页 SEO
useWebPageSEO({
  title: '页面标题',
  description: '页面描述',
  breadcrumb: [
    { name: '首页', url: 'https://your-domain.com' },
    { name: '分类', url: 'https://your-domain.com/category' },
    { name: '当前页', url: 'https://your-domain.com/current' }
  ]
})</code></pre>
        </div>
      </div>

      <!-- 全局配置说明 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-orange-700 dark:text-orange-400"
        >
          ⚙️ 全局配置优势
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="font-semibold text-lg mb-2">✅ 优化后</h3>
            <ul class="space-y-2 text-sm">
              <li>• 只需 3-5 行代码</li>
              <li>• 自动处理多语言</li>
              <li>• 自动生成 canonical URL</li>
              <li>• 统一的 meta 标签格式</li>
              <li>• 内置结构化数据</li>
              <li>• 类型安全</li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-2">❌ 优化前</h3>
            <ul class="space-y-2 text-sm">
              <li>• 需要 30+ 行重复代码</li>
              <li>• 手动处理多语言</li>
              <li>• 手动设置每个 meta 标签</li>
              <li>• 容易出错和遗漏</li>
              <li>• 维护困难</li>
              <li>• 代码冗余</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 配置参数说明 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400"
        >
          📋 配置参数说明
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left p-2">参数</th>
                <th class="text-left p-2">类型</th>
                <th class="text-left p-2">说明</th>
                <th class="text-left p-2">默认值</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="p-2 font-mono">title</td>
                <td class="p-2">string</td>
                <td class="p-2">页面标题</td>
                <td class="p-2">t('seo.title')</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono">description</td>
                <td class="p-2">string</td>
                <td class="p-2">页面描述</td>
                <td class="p-2">t('seo.description')</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono">keywords</td>
                <td class="p-2">string</td>
                <td class="p-2">关键词</td>
                <td class="p-2">默认关键词</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono">ogType</td>
                <td class="p-2">string</td>
                <td class="p-2">Open Graph 类型</td>
                <td class="p-2">'website'</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono">author</td>
                <td class="p-2">string</td>
                <td class="p-2">作者</td>
                <td class="p-2">'szmintel'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 返回导航 -->
      <div class="text-center space-x-4">
        <NuxtLink
          :to="localePath('/')"
          class="btn bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg inline-block"
        >
          返回首页
        </NuxtLink>
        <NuxtLink
          :to="localePath('/seo-demo')"
          class="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block"
        >
          SEO 演示
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>

const localePath = useLocalePath();

// 使用简化的网页 SEO 配置
useWebPageSEO({
  title: "SEO Composables 使用示例 - Nuxt 模板项目",
  description:
    "展示如何使用新的 SEO composables 来简化页面级别的 SEO 配置，减少重复代码。",
  keywords: "SEO, Composables, Nuxt 3, Vue 3, 代码优化, 最佳实践",
  breadcrumb: [
    { name: "首页", url: "https://your-domain.com" },
    { name: "SEO 示例", url: "https://your-domain.com/seo-example" },
  ],
});
</script>

<style scoped>
.btn {
  @apply transition-colors duration-200 font-medium;
}
</style>
