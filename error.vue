<template>
  <main class="min-h-screen grid place-items-center px-4">
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-primary">
        {{
          error.statusCode === 404
            ? $t("error.404.title")
            : $t("error.general.title")
        }}
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        {{
          error.statusCode === 404
            ? $t("error.404.description")
            : error.statusMessage
        }}
      </p>
      <div class="flex gap-4 justify-center">
        <NuxtLink to="/" class="btn btn-primary inline-flex items-center gap-2">
          <span>{{ $t("error.404.action") }}</span>
          <span class="i-heroicons-arrow-right-20-solid w-5 h-5" />
        </NuxtLink>
        <button
          @click="handleError"
          class="btn btn-outline inline-flex items-center gap-2"
        >
          <span>{{ $t("error.retry") }}</span>
          <span class="i-heroicons-arrow-path-20-solid w-5 h-5" />
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => {
  clearError({ redirect: "/" });
};

// 设置页面标题
useHead({
  title: props.error?.statusCode === 404 ? "页面未找到" : "发生错误",
});
</script>
