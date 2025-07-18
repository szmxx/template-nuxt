<template>
  <div>
    <!-- 离线状态提示 -->
    <div
      v-if="!isOnline"
      class="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 text-sm z-50"
    >
      <Icon name="heroicons:wifi-slash" class="inline w-4 h-4 mr-1" />
      {{ $t("pwa.offline") }} - {{ $t("pwa.offlineDescription") }}
    </div>

    <!-- 更新可用提示 -->
    <div
      v-if="$pwa?.needRefresh"
      class="fixed top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm z-50"
      :class="{ 'mt-10': !isOnline }"
    >
      <Icon name="heroicons:arrow-path" class="inline w-4 h-4 mr-1" />
      {{ $t("pwa.updateAvailable") }} - {{ $t("pwa.updateDescription") }}
      <div class="flex justify-center items-center gap-2 mt-1">
        <button
          class="px-3 py-1 bg-white text-blue-600 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
          @click="updateApp"
        >
          {{ $t("pwa.update") }}
        </button>
        <button
          class="px-3 py-1 bg-transparent border border-white text-white rounded text-xs font-medium hover:bg-white hover:text-blue-600 transition-colors"
          @click="dismissUpdate"
        >
          {{ $t("pwa.later") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $pwa } = useNuxtApp();
const isOnline = useOnline();

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
</script>
