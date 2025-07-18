<template>
  <main class="min-h-screen grid place-items-center px-4">
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-primary">
        {{ $t('error.404.title') }}
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        {{ $t('error.404.description') }}
      </p>
      <NuxtLink
        to="/"
        class="btn btn-primary inline-flex items-center gap-2"
      >
        <span>{{ $t('error.404.action') }}</span>
        <span class="i-heroicons-arrow-right-20-solid w-5 h-5" />
      </NuxtLink>
    </div>
  </main>
</template>