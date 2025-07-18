<template>
  <div
    v-if="showInstallPrompt"
    class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4 z-50"
  >
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0">
        <Icon
          name="heroicons:device-phone-mobile"
          class="w-6 h-6 text-blue-600"
        />
      </div>
      <div class="flex-1">
        <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">
          {{ $t("pwa.installTitle") }}
        </h3>
        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {{ $t("pwa.installDescription") }}
        </p>
        <div class="flex gap-2 mt-3">
          <button
            class="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            @click="installPwa"
          >
            {{ $t("pwa.install") }}
          </button>
          <button
            class="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            @click="dismissPrompt"
          >
            {{ $t("pwa.dismiss") }}
          </button>
        </div>
      </div>
      <button
        class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        @click="dismissPrompt"
      >
        <Icon name="heroicons:x-mark" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const showInstallPrompt = ref(false);
const deferredPrompt = ref(null);

// 监听 PWA 安装提示事件
if (import.meta.client) {
  window.addEventListener("beforeinstallprompt", (e) => {
    // 阻止默认的安装提示
    e.preventDefault();
    // 保存事件以便后续使用
    deferredPrompt.value = e;
    // 显示自定义安装提示
    showInstallPrompt.value = true;
  });

  // 监听应用安装事件
  window.addEventListener("appinstalled", () => {
    showInstallPrompt.value = false;
    deferredPrompt.value = null;
  });
}

// 安装 PWA
const installPwa = async () => {
  if (!deferredPrompt.value) return;

  // 显示安装提示
  deferredPrompt.value.prompt();

  // 等待用户响应
  const { outcome } = await deferredPrompt.value.userChoice;

  if (outcome === "accepted") {
    // console.log('用户接受了 PWA 安装');
  } else {
    // console.log('用户拒绝了 PWA 安装');
  }

  // 清理
  deferredPrompt.value = null;
  showInstallPrompt.value = false;
};

// 关闭提示
const dismissPrompt = () => {
  showInstallPrompt.value = false;
  // 可以设置一个 cookie 或 localStorage 来记住用户的选择
  if (import.meta.client) {
    localStorage.setItem("pwa-install-dismissed", "true");
  }
};

// 检查用户是否之前已经关闭过提示
onMounted(() => {
  if (import.meta.client) {
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed === "true") {
      showInstallPrompt.value = false;
    }
  }
});
</script>
