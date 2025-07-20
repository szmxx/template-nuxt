<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          隐私政策
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          最后更新：{{ lastUpdated }}
        </p>
      </div>

      <!-- 隐私政策内容 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-8">
        <!-- 概述 -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            1. 概述
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            我们重视您的隐私，并致力于保护您的个人信息。本隐私政策说明了我们如何收集、使用、存储和保护您在使用我们网站时提供的信息。
          </p>
        </section>

        <!-- 信息收集 -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            2. 我们收集的信息
          </h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                2.1 自动收集的信息
              </h3>
              <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>IP 地址和设备信息</li>
                <li>浏览器类型和版本</li>
                <li>访问时间和页面浏览记录</li>
                <li>引荐来源网址</li>
                <li>操作系统信息</li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                2.2 主动提供的信息
              </h3>
              <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>通过 OAuth 登录提供的基本资料（姓名、邮箱、头像）</li>
                <li>联系表单中填写的信息</li>
                <li>用户偏好设置</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Cookie 使用 -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            3. Cookie 和跟踪技术
          </h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                3.1 必要 Cookie
              </h3>
              <p class="text-gray-700 dark:text-gray-300">
                这些 Cookie 对网站正常运行是必需的，包括：
              </p>
              <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li>会话管理和身份验证</li>
                <li>安全功能</li>
                <li>语言和主题偏好</li>
                <li>Cookie 同意状态</li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                3.2 分析 Cookie
              </h3>
              <p class="text-gray-700 dark:text-gray-300">
                我们使用 Google Analytics 来了解网站使用情况：
              </p>
              <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li>页面浏览量和访问路径</li>
                <li>用户行为分析</li>
                <li>网站性能监控</li>
                <li>匿名化的用户统计信息</li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                3.3 营销 Cookie
              </h3>
              <p class="text-gray-700 dark:text-gray-300">
                用于个性化广告和营销活动（如果您选择启用）：
              </p>
              <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li>个性化内容推荐</li>
                <li>广告效果跟踪</li>
                <li>社交媒体集成</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 信息使用 -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            4. 信息使用目的
          </h2>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>提供和改进我们的服务</li>
            <li>个性化用户体验</li>
            <li>分析网站使用情况和性能</li>
            <li>确保网站安全和防止欺诈</li>
            <li>遵守法律义务</li>
            <li>与您沟通重要信息</li>
          </ul>
        </section>

        <!-- 信息共享 -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            5. 信息共享
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            我们不会出售、交易或转让您的个人信息给第三方，除非：
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>获得您的明确同意</li>
            <li>法律要求或法院命令</li>
            <li>保护我们的权利、财产或安全</li>
            <li>与可信的第三方服务提供商合作（如 Google Analytics）</li>
          </ul>
        </section>

        <!-- 数据安全 -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            6. 数据安全
          </h2>
          <p class="text-gray-700 dark:text-gray-300">
            我们采用适当的技术和组织措施来保护您的个人信息：
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mt-4 space-y-2">
            <li>SSL/TLS 加密传输</li>
            <li>安全的数据存储</li>
            <li>访问控制和身份验证</li>
            <li>定期安全审计</li>
            <li>员工隐私培训</li>
          </ul>
        </section>

        <!-- 您的权利 -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            7. 您的权利
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            根据适用的数据保护法律，您享有以下权利：
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>访问权：</strong>请求获取我们持有的您的个人信息副本</li>
            <li><strong>更正权：</strong>要求更正不准确或不完整的信息</li>
            <li><strong>删除权：</strong>在某些情况下要求删除您的个人信息</li>
            <li><strong>限制处理权：</strong>要求限制对您个人信息的处理</li>
            <li><strong>数据可携权：</strong>以结构化、常用格式接收您的数据</li>
            <li><strong>反对权：</strong>反对基于合法利益的数据处理</li>
          </ul>
        </section>

        <!-- Cookie 管理 -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            8. Cookie 管理
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            您可以随时管理您的 Cookie 偏好：
          </p>
          <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <button
              @click="showCookieSettings"
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              管理 Cookie 设置
            </button>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mt-4">
            您也可以通过浏览器设置来禁用 Cookie，但这可能影响网站的某些功能。
          </p>
        </section>

        <!-- 第三方服务 -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            9. 第三方服务
          </h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Google Analytics
              </h3>
              <p class="text-gray-700 dark:text-gray-300">
                我们使用 Google Analytics 来分析网站使用情况。Google 的隐私政策可在
                <a href="https://policies.google.com/privacy" target="_blank" class="text-blue-600 hover:underline">
                  https://policies.google.com/privacy
                </a> 查看。
              </p>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                OAuth 提供商
              </h3>
              <p class="text-gray-700 dark:text-gray-300">
                我们支持通过 Google、GitHub 等第三方服务登录。这些服务有自己的隐私政策，请查阅相关文档。
              </p>
            </div>
          </div>
        </section>

        <!-- 政策更新 -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            10. 政策更新
          </h2>
          <p class="text-gray-700 dark:text-gray-300">
            我们可能会不时更新本隐私政策。重大变更将通过网站通知或电子邮件告知您。建议您定期查看本政策以了解最新信息。
          </p>
        </section>

        <!-- 联系我们 -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            11. 联系我们
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：
          </p>
          <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <p class="text-gray-700 dark:text-gray-300">
              <strong>邮箱：</strong> privacy@example.com<br>
              <strong>地址：</strong> [您的公司地址]<br>
              <strong>电话：</strong> [您的联系电话]
            </p>
          </div>
        </section>
      </div>

      <!-- 返回导航 -->
      <div class="text-center mt-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <div class="i-carbon-arrow-left mr-2" />
          返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSEO } from '~/composables/useSEO'

// SEO 配置
useSEO({
  title: '隐私政策',
  description: '了解我们如何收集、使用和保护您的个人信息，以及您在数据保护方面的权利',
  keywords: '隐私政策, 数据保护, GDPR, Cookie 政策, 个人信息',
  ogType: 'website',
  noIndex: false
})

// 最后更新日期
const lastUpdated = ref('2024年1月1日')

// 显示 Cookie 设置
const showCookieSettings = () => {
  if (process.client) {
    // 清除 Cookie 同意状态，重新显示横幅
    localStorage.removeItem('cookie-consent')
    // 刷新页面以显示 Cookie 横幅
    location.reload()
  }
}

// 页面加载时更新最后更新日期
onMounted(() => {
  lastUpdated.value = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>