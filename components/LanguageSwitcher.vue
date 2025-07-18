<template>
  <div class="language-switcher">
    <select
      v-model="currentLocale"
      class="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      @change="switchLanguage"
    >
      <option
        v-for="localeOption in availableLocales"
        :key="localeOption.code"
        :value="localeOption.code"
      >
        {{ localeOption.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const currentLocale = ref(locale.value);
const availableLocales = computed(() => locales.value);

const switchLanguage = async () => {
  await setLocale(currentLocale.value);
};

// 监听语言变化
watch(locale, (newLocale) => {
  currentLocale.value = newLocale;
});
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}
</style>
