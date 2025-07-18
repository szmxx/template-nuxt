<template>
  <div ref="templateRef" class="color-mode-switcher relative">
    <button
      class="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      :title="$t('colorMode.toggle')"
      @click="toggleDropdown"
    >
      <Icon
        :name="colorModeIcon"
        class="w-5 h-5 text-gray-600 dark:text-gray-300"
      />
    </button>

    <!-- 下拉菜单 -->
    <div
      v-show="showDropdown"
      class="absolute top-12 right-0 z-50 min-w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-1"
    >
      <button
        v-for="mode in colorModes"
        :key="mode.value"
        class="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
        :class="{
          'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400': colorMode.preference === mode.value
        }"
        @click="setColorMode(mode.value)"
      >
        <Icon :name="mode.icon" class="w-4 h-4" />
        <span>{{ $t(`colorMode.${mode.value}`) }}</span>
        <Icon
          v-if="colorMode.preference === mode.value"
          name="heroicons:check"
          class="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const showDropdown = ref(false);
const isMounted = ref(false);

// 模板引用
const templateRef = ref();

// 颜色模式配置
const colorModes = [
  {
    value: "light",
    icon: "heroicons:sun",
  },
  {
    value: "dark",
    icon: "heroicons:moon",
  },
  {
    value: "system",
    icon: "heroicons:computer-desktop",
  },
];

// 当前颜色模式图标 - 修复水合不匹配问题
const colorModeIcon = computed(() => {
  // 在服务端渲染时，始终显示 preference 对应的图标
  // 在客户端挂载后，可以使用实际的 value
  const modeValue = isMounted.value ? colorMode.value : colorMode.preference;
  const currentMode = colorModes.find(mode => mode.value === modeValue);
  return currentMode?.icon || "heroicons:computer-desktop";
});

// 切换下拉菜单显示
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// 设置颜色模式
const setColorMode = (mode) => {
  colorMode.preference = mode;
  showDropdown.value = false;
};

// 点击外部关闭下拉菜单
onClickOutside(templateRef, () => {
  showDropdown.value = false;
});

// 客户端挂载后更新状态
onMounted(() => {
  isMounted.value = true;
});
</script>

<style scoped>
.color-mode-switcher {
  @apply relative;
}
</style>
