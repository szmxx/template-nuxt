<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 p-8"
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
        {{ $t("demo.test_demo") }}
      </h1>

      <!-- 测试框架介绍 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-indigo-700">
          ⚡ Vitest 特性
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            class="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="text-2xl mb-2">🚀</div>
            <h3 class="font-semibold mb-1">极速启动</h3>
            <p class="text-sm text-gray-600">基于 Vite 的快速测试运行器</p>
          </div>
          <div
            class="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="text-2xl mb-2">🔧</div>
            <h3 class="font-semibold mb-1">零配置</h3>
            <p class="text-sm text-gray-600">开箱即用的测试环境</p>
          </div>
          <div
            class="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="text-2xl mb-2">📊</div>
            <h3 class="font-semibold mb-1">覆盖率报告</h3>
            <p class="text-sm text-gray-600">内置代码覆盖率分析</p>
          </div>
          <div
            class="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="text-2xl mb-2">🎯</div>
            <h3 class="font-semibold mb-1">智能监听</h3>
            <p class="text-sm text-gray-600">文件变化自动重新测试</p>
          </div>
          <div
            class="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="text-2xl mb-2">🌐</div>
            <h3 class="font-semibold mb-1">Web UI</h3>
            <p class="text-sm text-gray-600">可视化测试界面</p>
          </div>
          <div
            class="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="text-2xl mb-2">🔍</div>
            <h3 class="font-semibold mb-1">Jest 兼容</h3>
            <p class="text-sm text-gray-600">兼容 Jest API 和断言</p>
          </div>
        </div>
      </div>

      <!-- 测试命令 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400"
        >
          📝 测试命令
        </h2>
        <div class="space-y-4">
          <div class="bg-gray-100 p-4 rounded-lg">
            <h3 class="font-semibold mb-2">基础测试命令</h3>
            <div class="space-y-2 text-sm font-mono">
              <div class="flex items-center gap-2">
                <span class="text-green-600">$</span>
                <span>pnpm test</span>
                <span class="text-gray-500 ml-auto">运行所有测试</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-600">$</span>
                <span>pnpm test:watch</span>
                <span class="text-gray-500 ml-auto">监听模式运行测试</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-600">$</span>
                <span>pnpm test:ui</span>
                <span class="text-gray-500 ml-auto">启动 Web UI 界面</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-600">$</span>
                <span>pnpm test:coverage</span>
                <span class="text-gray-500 ml-auto">生成覆盖率报告</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-600">$</span>
                <span>pnpm test:run</span>
                <span class="text-gray-500 ml-auto">单次运行所有测试</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 测试示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-400"
        >
          🧩 测试示例
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 class="font-semibold text-lg mb-3">组件测试</h3>
            <div class="bg-gray-100 p-4 rounded-lg text-sm">
              <div class="text-gray-600 mb-2">
                test/components/Button.test.ts
              </div>
              <ul class="space-y-1">
                <li class="flex items-center gap-2">
                  <span class="text-green-500">✓</span>
                  <span>按钮渲染测试</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-green-500">✓</span>
                  <span>属性传递测试</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-green-500">✓</span>
                  <span>事件触发测试</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-green-500">✓</span>
                  <span>禁用状态测试</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-green-500">✓</span>
                  <span>插槽内容测试</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 class="font-semibold text-lg mb-3">工具函数测试</h3>
            <div class="bg-gray-100 p-4 rounded-lg text-sm">
              <div class="text-gray-600 mb-2">test/utils/helpers.test.ts</div>
              <ul class="space-y-1">
                <li class="flex items-center gap-2">
                  <span class="text-green-500">✓</span>
                  <span>日期格式化测试</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-green-500">✓</span>
                  <span>货币格式化测试</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-green-500">✓</span>
                  <span>邮箱验证测试</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-green-500">✓</span>
                  <span>ID 生成测试</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-green-500">✓</span>
                  <span>防抖函数测试</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 测试配置 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2
          class="text-2xl font-semibold mb-4 text-orange-700 dark:text-orange-400"
        >
          ⚙️ 测试配置
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-semibold text-lg mb-3">环境配置</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-blue-500">📄</span>
                <span>vitest.config.ts - 主配置文件</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-blue-500">🔧</span>
                <span>test/setup.ts - 测试环境设置</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-blue-500">🌐</span>
                <span>happy-dom - 浏览器环境模拟</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-blue-500">🧪</span>
                <span>@nuxt/test-utils - Nuxt 测试工具</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="font-semibold text-lg mb-3">覆盖率配置</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-green-500">📊</span>
                <span>V8 覆盖率提供者</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-500">📈</span>
                <span>文本、JSON、HTML 报告</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-500">🚫</span>
                <span>排除配置文件和测试文件</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-500">📁</span>
                <span>自动生成覆盖率目录</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 最佳实践 -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-red-700">
          💡 测试最佳实践
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-semibold text-lg mb-3">编写原则</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">✓</span>
                <span>测试应该简单、清晰、易懂</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">✓</span>
                <span>每个测试只验证一个功能点</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">✓</span>
                <span>使用描述性的测试名称</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">✓</span>
                <span>遵循 AAA 模式（Arrange, Act, Assert）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">✓</span>
                <span>测试边界条件和异常情况</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold text-lg mb-3">组织结构</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-blue-500 mt-1">📁</span>
                <span>test/ - 测试文件根目录</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-blue-500 mt-1">📁</span>
                <span>test/components/ - 组件测试</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-blue-500 mt-1">📁</span>
                <span>test/utils/ - 工具函数测试</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-blue-500 mt-1">📁</span>
                <span>test/pages/ - 页面集成测试</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-blue-500 mt-1">📄</span>
                <span>*.test.ts - 测试文件命名</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 运行测试按钮 -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-teal-700">🚀 快速开始</h2>
        <div class="text-center space-y-4">
          <p class="text-gray-600 mb-4">在终端中运行以下命令来开始测试：</p>
          <div
            class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-left"
          >
            <div class="mb-2"># 运行所有测试</div>
            <div class="text-white">pnpm test</div>
            <div class="mt-4 mb-2"># 启动监听模式</div>
            <div class="text-white">pnpm test:watch</div>
            <div class="mt-4 mb-2"># 启动 Web UI</div>
            <div class="text-white">pnpm test:ui</div>
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
        <NuxtLink
          :to="localePath('/seo-demo')"
          class="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block"
        >
          {{ $t("demo.seo_demo") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const localePath = useLocalePath();

// 使用简化的网页 SEO 配置
useWebPageSEO({
  title: `${t("demo.test_demo")} - ${t("seo.title")}`,
  description: "展示 Vitest 测试框架的配置和使用方法，包括单元测试、组件测试、集成测试等最佳实践。",
  keywords: "Vitest, 测试, Vue 测试, 组件测试, 单元测试, 集成测试, TDD, i18n",
  breadcrumb: [
    { name: t("home"), url: "https://your-domain.com" },
    { name: t("demo.test_demo"), url: "https://your-domain.com/test-demo" },
  ],
});
</script>

<style scoped>
.btn {
  @apply transition-colors duration-200 font-medium;
}
</style>
