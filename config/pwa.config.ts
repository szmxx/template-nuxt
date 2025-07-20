/**
 * PWA 完整配置
 */
import type { ModuleOptions } from "@vite-pwa/nuxt";
export const pwaConfig: ModuleOptions = {
  registerType: "prompt" as const,
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    // 排除鉴权相关的API路由，确保不被缓存
    navigateFallbackDenylist: [/^\/api\/auth\/.*/],
    runtimeCaching: [
      {
        urlPattern: /^\/api\/auth\/.*/,
        handler: "NetworkOnly", // 鉴权API始终从网络获取，不缓存
      },
      {
        urlPattern: /^\/api\/.*/,
        handler: "NetworkFirst", // 其他API优先从网络获取
        options: {
          cacheName: "api-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 300, // 5分钟缓存
          },
        },
      },
    ],
  },
  client: {
    installPrompt: true,
    periodicSyncForUpdates: 20,
  },
  devOptions: {
    enabled: false, // 开发环境禁用 PWA 以避免模块加载问题
    suppressWarnings: true,
    navigateFallback: "/",
    navigateFallbackAllowlist: [/^\/$/],
    type: "module" as const,
  },
  manifest: {
    name: process.env.NUXT_PUBLIC_SITE_NAME,
    short_name: process.env.NUXT_PUBLIC_PWA_SHORT_NAME,
    description: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
    theme_color: process.env.NUXT_PUBLIC_PWA_THEME_COLOR,
    background_color: process.env.NUXT_PUBLIC_PWA_BACKGROUND_COLOR,
    display: "standalone" as const,
    orientation: "portrait" as const,
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "pwa-64x64.svg",
        sizes: "64x64",
        type: "image/svg+xml",
      },
      {
        src: "pwa-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "pwa-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any" as const,
      },
      {
        src: "maskable-icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable" as const,
      },
    ],
  },
};
