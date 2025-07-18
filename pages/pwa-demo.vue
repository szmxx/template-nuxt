<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">PWA 更新演示 - 版本 2.0</h1>
    <div
      class="bg-green-100 dark:bg-green-900/20 border border-green-400 rounded-lg p-4 mb-6"
    >
      <p class="text-green-800 dark:text-green-200">
        🎉
        <strong>新功能发布！</strong>
        这是一个模拟的新版本更新，包含了改进的用户界面和新的功能特性。
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- PWA 状态信息 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">PWA 状态</h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span>Service Worker 激活状态:</span>
            <span
              :class="$pwa?.swActivated ? 'text-green-600' : 'text-red-600'"
            >
              {{ $pwa?.swActivated ? "已激活" : "未激活" }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span>离线就绪状态:</span>
            <span
              :class="$pwa?.offlineReady ? 'text-green-600' : 'text-gray-500'"
            >
              {{ $pwa?.offlineReady ? "已就绪" : "未就绪" }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span>需要刷新:</span>
            <span
              :class="$pwa?.needRefresh ? 'text-orange-600' : 'text-gray-500'"
            >
              {{ $pwa?.needRefresh ? "是" : "否" }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span>网络状态:</span>
            <span :class="isOnline ? 'text-green-600' : 'text-red-600'">
              {{ isOnline ? "在线" : "离线" }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span>PWA 安装状态:</span>
            <span :class="isInstalled ? 'text-green-600' : 'text-gray-500'">
              {{ isInstalled ? "已安装" : "未安装" }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span>可以安装:</span>
            <span :class="canInstall ? 'text-blue-600' : 'text-gray-500'">
              {{ canInstall ? "是" : "否" }}
            </span>
          </div>
        </div>
      </div>

      <!-- PWA 操作 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">
          PWA 操作
          <span
            class="text-xs bg-red-500 text-white px-2 py-1 rounded-full ml-2"
            >NEW</span
          >
        </h2>
        <div class="space-y-3">
          <button
            v-if="$pwa?.needRefresh"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            @click="updateApp"
          >
            立即更新应用
          </button>
          <button
            v-if="$pwa?.needRefresh"
            class="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            @click="dismissUpdate"
          >
            稍后更新
          </button>
          <button
            v-if="canInstall"
            class="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            @click="installApp"
          >
            安装 PWA 应用
          </button>
          <button
            v-if="!canInstall && !isInstalled"
            class="w-full px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
            disabled
          >
            等待安装提示...
          </button>
          <div
            v-if="isInstalled"
            class="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded text-center"
          >
            ✅ PWA 已安装
          </div>
          <button
            class="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors mt-2"
            @click="checkInstallStatus"
          >
            检查安装状态
          </button>
          <button
            v-if="!canInstall && !isInstalled"
            class="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors mt-2"
            @click="resetInstallPrompt"
          >
            重置安装提示
          </button>
          <div
            v-if="!$pwa?.needRefresh && !canInstall && !isInstalled"
            class="text-gray-500 text-center py-4"
          >
            当前没有可用的 PWA 操作
          </div>
        </div>
      </div>
    </div>

    <!-- 说明文档 -->
    <div class="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">如何测试 PWA 更新功能 🚀</h2>
      <div
        class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-400 rounded-lg p-4 mb-4"
      >
        <p class="text-yellow-800 dark:text-yellow-200 font-medium">
          📢 <strong>当前测试状态：</strong> 已模拟发布新版本
          2.0，请观察页面顶部是否出现蓝色更新提示条！
        </p>
      </div>
      <div class="space-y-3 text-sm">
        <p><strong>1. 开发环境测试:</strong></p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li>当前 PWA 配置为 'prompt' 模式，会在有新版本时提示用户</li>
          <li>在开发环境中，每次代码更改都会触发 Service Worker 更新</li>
          <li>页面顶部会显示蓝色的更新提示条</li>
        </ul>

        <p><strong>2. 生产环境测试:</strong></p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li>构建并部署新版本到服务器</li>
          <li>用户访问时会检测到新的 Service Worker</li>
          <li>显示更新提示，用户可选择立即更新或稍后更新</li>
        </ul>

        <p><strong>3. PWA 安装功能:</strong></p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li><strong>安装条件：</strong>浏览器支持 PWA 且应用满足安装条件</li>
          <li>
            <strong>常见情况：</strong>Chrome/Edge 桌面版、Android Chrome、iOS
            Safari 16+
          </li>
          <li><strong>不显示安装按钮的原因：</strong></li>
          <ul class="list-disc list-inside ml-6 space-y-1">
            <li>PWA 已经安装</li>
            <li>用户之前关闭过安装提示</li>
            <li>浏览器不支持 PWA 安装</li>
            <li>应用不满足安装条件（需要 HTTPS、manifest.json 等）</li>
          </ul>
          <li><strong>解决方法：</strong>点击"重置安装提示"按钮并刷新页面</li>
        </ul>

        <p><strong>4. 功能特性:</strong></p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li>自动检测新版本并提示用户</li>
          <li>用户可选择立即更新或稍后更新</li>
          <li>支持离线状态检测和提示</li>
          <li>智能 PWA 安装提示功能</li>
          <li>实时状态监控和调试信息</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $pwa } = useNuxtApp();
const isOnline = useOnline();
// PWA 安装状态
const canInstall = ref(false);
const isInstalled = ref(false);
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null);

// 检查 PWA 安装状态
const checkInstallStatus = () => {
  if (import.meta.client) {
    // 检查是否已安装
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const navigatorWithStandalone = window.navigator as {
      standalone?: boolean;
    };
    const isInWebAppiOS = navigatorWithStandalone.standalone === true;
    const isInWebAppChrome = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    isInstalled.value = isStandalone || isInWebAppiOS || isInWebAppChrome;

    // 检查是否可以安装
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    canInstall.value =
      !!deferredPrompt.value && dismissed !== "true" && !isInstalled.value;
  }
};

// 监听安装提示事件
if (import.meta.client) {
  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    deferredPrompt.value = e as BeforeInstallPromptEvent;
    checkInstallStatus();
  });

  window.addEventListener("appinstalled", () => {
    isInstalled.value = true;
    canInstall.value = false;
    deferredPrompt.value = null;
  });
}

// 更新应用
const updateApp = async () => {
  if ($pwa?.updateServiceWorker) {
    await $pwa.updateServiceWorker(true);
  }
};

// 稍后更新
const dismissUpdate = async () => {
  if ($pwa?.cancelPrompt) {
    await $pwa.cancelPrompt();
  }
};

// 安装应用
const installApp = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    await deferredPrompt.value.userChoice;

    // 用户接受或拒绝了 PWA 安装

    deferredPrompt.value = null;
    checkInstallStatus();
  }
};

// 重置安装提示
const resetInstallPrompt = () => {
  if (import.meta.client) {
    localStorage.removeItem("pwa-install-dismissed");

    checkInstallStatus();
    // 提示用户刷新页面以重新触发安装提示
    console.log("安装提示状态已重置！请刷新页面以重新触发安装提示。");
  }
};

// 组件挂载时检查状态
onMounted(() => {
  checkInstallStatus();
});

// 使用简化的网页 SEO 配置
useWebPageSEO({
  title: "PWA 更新演示 - Nuxt 模板项目",
  description:
    "演示 PWA 应用更新提示功能的工作原理，包括自动更新检测、安装提示和离线状态管理。",
  keywords:
    "PWA, Progressive Web App, Service Worker, 应用更新, 离线应用, Web App",
  breadcrumb: [
    { name: "首页", url: "https://your-domain.com" },
    { name: "PWA 演示", url: "https://your-domain.com/pwa-demo" },
  ],
});
</script>
