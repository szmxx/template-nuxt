<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <PwaInstallPrompt />
    <PwaStatus />
    <CookieConsent />
  </NuxtLayout>
</template>
