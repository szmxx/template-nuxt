<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t("analytics.usage_examples.title") }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          {{ $t("analytics.usage_examples.description") }}
        </p>
      </div>

      <!-- 当前状态显示 -->
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
          {{ $t("analytics.current_status") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 class="font-medium text-gray-900 dark:text-white mb-2">
              {{ $t("analytics.analytics_status") }}
            </h3>
            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                isAnalyticsEnabled
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
              ]"
            >
              {{
                isAnalyticsEnabled
                  ? $t("analytics.enabled")
                  : $t("analytics.disabled")
              }}
            </span>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 class="font-medium text-gray-900 dark:text-white mb-2">
              {{ $t("cookie.preferences") }}
            </h3>
            <div class="space-y-1 text-sm">
              <div>{{ $t("cookie.necessary") }}: ✅</div>
              <div>
                {{ $t("cookie.analytics") }}:
                {{ preferences.analytics ? "✅" : "❌" }}
              </div>
              <div>
                {{ $t("cookie.marketing") }}:
                {{ preferences.marketing ? "✅" : "❌" }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 基础事件跟踪示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {{ $t("analytics.usage_examples.basic_events") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- 按钮点击跟踪 -->
          <div class="space-y-3">
            <h3 class="font-medium text-gray-700 dark:text-gray-300">
              {{ $t("analytics.usage_examples.button_tracking") }}
            </h3>
            <button
              @click="handleButtonClick"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {{ $t("analytics.usage_examples.track_button") }}
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t("analytics.usage_examples.button_description") }}
            </p>
          </div>

          <!-- 自定义事件跟踪 -->
          <div class="space-y-3">
            <h3 class="font-medium text-gray-700 dark:text-gray-300">
              {{ $t("analytics.usage_examples.custom_event") }}
            </h3>
            <button
              @click="handleCustomEvent"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {{ $t("analytics.usage_examples.track_custom") }}
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t("analytics.usage_examples.custom_description") }}
            </p>
          </div>

          <!-- 外部链接跟踪 -->
          <div class="space-y-3">
            <h3 class="font-medium text-gray-700 dark:text-gray-300">
              {{ $t("analytics.usage_examples.external_link") }}
            </h3>
            <button
              @click="handleExternalLink"
              class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {{ $t("analytics.usage_examples.track_external") }}
            </button>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t("analytics.usage_examples.external_description") }}
            </p>
          </div>
        </div>
      </div>

      <!-- 表单跟踪示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {{ $t("analytics.usage_examples.form_tracking") }}
        </h2>
        <form @submit="handleFormSubmit" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {{ $t("analytics.usage_examples.name") }}
              </label>
              <input
                v-model="formData.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                :placeholder="$t('analytics.usage_examples.name_placeholder')"
              />
            </div>
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {{ $t("analytics.usage_examples.email") }}
              </label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                :placeholder="$t('analytics.usage_examples.email_placeholder')"
              />
            </div>
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ $t("analytics.usage_examples.message") }}
            </label>
            <textarea
              v-model="formData.message"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              :placeholder="$t('analytics.usage_examples.message_placeholder')"
            ></textarea>
          </div>
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            {{ $t("analytics.usage_examples.submit_form") }}
          </button>
        </form>
      </div>

      <!-- 搜索跟踪示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {{ $t("analytics.usage_examples.search_tracking") }}
        </h2>
        <div class="flex gap-4">
          <input
            v-model="searchQuery"
            type="text"
            class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            :placeholder="$t('analytics.usage_examples.search_placeholder')"
            @keyup.enter="handleSearch"
          />
          <button
            @click="handleSearch"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            {{ $t("analytics.usage_examples.search_button") }}
          </button>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {{ $t("analytics.usage_examples.search_description") }}
        </p>
      </div>

      <!-- 文件下载跟踪示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {{ $t("analytics.usage_examples.download_tracking") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            @click="handleDownload('user-guide.pdf', 'pdf')"
            class="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            {{ $t("analytics.usage_examples.download_pdf") }}
          </button>
          <button
            @click="handleDownload('data-export.xlsx', 'excel')"
            class="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            {{ $t("analytics.usage_examples.download_excel") }}
          </button>
          <button
            @click="handleDownload('app-installer.zip', 'archive')"
            class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            {{ $t("analytics.usage_examples.download_zip") }}
          </button>
        </div>
      </div>

      <!-- 用户属性设置示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {{ $t("analytics.usage_examples.user_properties") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-3">
              {{ $t("analytics.usage_examples.set_user_type") }}
            </h3>
            <div class="space-y-2">
              <button
                @click="setUserType('visitor')"
                class="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {{ $t("analytics.usage_examples.visitor") }}
              </button>
              <button
                @click="setUserType('member')"
                class="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {{ $t("analytics.usage_examples.member") }}
              </button>
              <button
                @click="setUserType('premium')"
                class="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {{ $t("analytics.usage_examples.premium") }}
              </button>
            </div>
          </div>
          <div>
            <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-3">
              {{ $t("analytics.usage_examples.set_preferences") }}
            </h3>
            <div class="space-y-2">
              <button
                @click="setLanguagePreference('zh-CN')"
                class="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {{ $t("analytics.usage_examples.chinese") }}
              </button>
              <button
                @click="setLanguagePreference('en-US')"
                class="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {{ $t("analytics.usage_examples.english") }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 性能跟踪示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {{ $t("analytics.usage_examples.performance_tracking") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            @click="measureApiPerformance"
            class="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {{ $t("analytics.usage_examples.measure_api") }}
          </button>
          <button
            @click="measurePageLoadTime"
            class="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {{ $t("analytics.usage_examples.measure_page_load") }}
          </button>
        </div>
        <div v-if="performanceResults.length > 0" class="mt-4">
          <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t("analytics.usage_examples.performance_results") }}
          </h3>
          <div class="space-y-2">
            <div
              v-for="(result, index) in performanceResults"
              :key="index"
              class="text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded"
            >
              {{ result }}
            </div>
          </div>
        </div>
      </div>

      <!-- Cookie 管理 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {{ $t("analytics.usage_examples.cookie_management") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            @click="showCookieSettings"
            class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {{ $t("analytics.usage_examples.show_cookie_settings") }}
          </button>
          <button
            @click="clearAllCookies"
            class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {{ $t("analytics.usage_examples.clear_cookies") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入必要的 composables
const {
  isAnalyticsEnabled,
  getCookiePreferences,
  saveCookiePreferences,
  trackEvent,
  trackButtonClick,
  trackFormSubmit,
  trackSearch,
  trackDownload,
  trackExternalLink,
  trackPerformance,
  trackPageLoadTime,
  setUserProperties,
} = useAnalytics();

// SEO 配置
useSEO({
  title: "analytics.usage_examples.title",
  description: "analytics.usage_examples.description",
  keywords: ["Google Analytics", "Cookie 同意", "事件跟踪", "用户分析", "GDPR"],
});

// 响应式数据
const preferences = ref(getCookiePreferences());
const searchQuery = ref("");
const performanceResults = ref([]);
const formData = ref({
  name: "",
  email: "",
  message: "",
});

// 监听 Cookie 偏好变化
watch(
  () => getCookiePreferences(),
  (newPrefs) => {
    preferences.value = newPrefs;
  },
  { deep: true }
);

// 事件处理函数
const handleButtonClick = () => {
  trackButtonClick("example_button", "usage_demo");
  // 显示成功提示
  if (import.meta.client) {
    alert("按钮点击事件已跟踪！");
  }
};

const handleCustomEvent = () => {
  trackEvent({
    name: "custom_interaction",
    category: "engagement",
    label: "usage_example",
    value: 1,
    custom_parameter: "demo_value",
  });
  if (import.meta.client) {
    alert("自定义事件已跟踪！");
  }
};

const handleExternalLink = () => {
  trackExternalLink("https://analytics.google.com", "Google Analytics 官网");
  if (import.meta.client) {
    alert("外部链接点击已跟踪！");
    window.open("https://analytics.google.com", "_blank");
  }
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  // 验证表单
  const isValid =
    formData.value.name && formData.value.email && formData.value.message;

  // 跟踪表单提交
  trackFormSubmit("contact_form", isValid);

  if (isValid) {
    if (import.meta.client) {
      alert("表单提交成功！事件已跟踪。");
    }
    // 重置表单
    formData.value = { name: "", email: "", message: "" };
  } else {
    if (import.meta.client) {
      alert("请填写所有必填字段！");
    }
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 模拟搜索结果数量
    const resultCount = Math.floor(Math.random() * 100) + 1;
    trackSearch(searchQuery.value, resultCount);

    if (import.meta.client) {
      alert(
        `搜索 "${searchQuery.value}" 已跟踪！模拟找到 ${resultCount} 个结果。`
      );
    }
    searchQuery.value = "";
  }
};

const handleDownload = (filename, fileType) => {
  trackDownload(filename, fileType);
  if (import.meta.client) {
    alert(`文件下载 "${filename}" 已跟踪！`);
  }
};

const setUserType = (userType) => {
  setUserProperties({
    user_type: userType,
    updated_at: new Date().toISOString(),
  });
  if (import.meta.client) {
    alert(`用户类型已设置为: ${userType}`);
  }
};

const setLanguagePreference = (language) => {
  setUserProperties({
    preferred_language: language,
    language_updated_at: new Date().toISOString(),
  });
  if (import.meta.client) {
    alert(`语言偏好已设置为: ${language}`);
  }
};

const measureApiPerformance = async () => {
  const startTime = performance.now();

  try {
    // 模拟 API 调用
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500)
    );
    const endTime = performance.now();
    const duration = endTime - startTime;

    trackPerformance("api_response_time", duration, "ms");

    const result = `API 响应时间: ${duration.toFixed(2)}ms`;
    performanceResults.value.unshift(result);

    if (import.meta.client) {
      alert(`${result} - 已跟踪！`);
    }
  } catch (error) {
    if (import.meta.client) {
      alert("API 调用失败！");
    }
  }
};

const measurePageLoadTime = () => {
  trackPageLoadTime();

  const loadTime = performance.now();
  const result = `页面加载时间: ${loadTime.toFixed(2)}ms`;
  performanceResults.value.unshift(result);

  if (import.meta.client) {
    alert(`${result} - 已跟踪！`);
  }
};

const showCookieSettings = () => {
  // 触发 Cookie 设置显示（这里可以实现一个模态框）
  if (import.meta.client) {
    const currentPrefs = getCookiePreferences();
    const message = `当前 Cookie 设置:\n必要: ${
      currentPrefs.necessary ? "✅" : "❌"
    }\n分析: ${currentPrefs.analytics ? "✅" : "❌"}\n营销: ${
      currentPrefs.marketing ? "✅" : "❌"
    }`;
    alert(message);
  }
};

const clearAllCookies = () => {
  // 重置为默认设置（只保留必要 Cookie）
  saveCookiePreferences({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  if (import.meta.client) {
    alert("所有非必要 Cookie 已清除！页面将刷新以应用更改。");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

// 页面加载时跟踪
onMounted(() => {
  // 跟踪页面访问
  trackEvent({
    name: "page_view",
    category: "engagement",
    label: "analytics_usage_example",
  });
});
</script>
