// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import TurboConsole from "unplugin-turbo-console/vite";
import { pwaConfig } from "./config/pwa.config";
import { i18nConfig } from "./config/i18n.config";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  // SEO 配置
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    name: process.env.NUXT_PUBLIC_SITE_NAME,
    description: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
    defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE,
  },

  // 全局 SEO 配置
  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  // 全局 App 配置 - 设置默认的 meta 标签
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        // 基础 SEO meta 标签
        { name: "author", content: "szmintel" },
        { name: "format-detection", content: "telephone=no" },
        { name: "msapplication-TileColor", content: "#ffffff" },
        { name: "theme-color", content: "#ffffff" },

        // Open Graph 默认配置
        {
          property: "og:site_name",
          content: process.env.NUXT_PUBLIC_SITE_NAME,
        },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "zh_CN" },
        { property: "og:locale:alternate", content: "en_US" },

        // Twitter Card 默认配置
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@your_twitter" },
        { name: "twitter:creator", content: "@your_twitter" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
      ],
    },
  },

  modules: [
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/icon",
    "@nuxt/eslint",
    "@vite-pwa/nuxt",
    "@pinia/nuxt",
  ],

  // Pinia 配置
  pinia: {
    storesDirs: ["./stores/**"],
  },

  // 运行时配置
  runtimeConfig: {
    // 私有配置（仅在服务端可用）
    apiSecret: "123",
    // 公共配置（客户端也可用）
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  // 国际化配置
  i18n: i18nConfig,

  // 颜色模式配置
  colorMode: {
    preference: process.env.NUXT_PUBLIC_COLOR_MODE_PREFERENCE, // 默认使用系统主题
    fallback: process.env.NUXT_PUBLIC_COLOR_MODE_FALLBACK, // 回退到浅色主题
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "", // 移除后缀，使用标准的 dark 类名
    storageKey: "nuxt-color-mode",
    dataValue: "theme", // 添加 data-theme 属性
  },

  // PWA 配置
  pwa: pwaConfig,

  css: ["@unocss/reset/tailwind.css"],

  // 性能优化配置
  experimental: {
    viewTransition: true, // 启用视图过渡 API
  },

  // 构建优化
  build: {
    analyze: {
      analyzerPort: 4000, // 指定分析服务器的端口
      // 其他可选配置
      analyzerMode: "static", // 或 'server'
      open: true, // 是否自动打开浏览器
    },
  },

  // Nitro 服务器优化
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    minify: true, // 压缩服务器代码
    sourceMap: false, // 生产环境禁用 source map
    experimental: {
      wasm: true, // 启用 WebAssembly 支持
    },
    routeRules: {
      // 首页预渲染
      "/": { prerender: true },
      // API 路由缓存
      "/api/**": { cors: true, headers: { "cache-control": "s-maxage=60" } },
      // 静态页面缓存
      "/seo-demo": { prerender: true },
      "/test-demo": { prerender: true },
      // 动态页面 ISR
      "/pwa-demo": { isr: 60 },
      "/pinia-demo": { isr: 60 },
      "/vueuse-demo": { isr: 60 },
    },
  },

  // 图片优化
  image: {
    format: ["webp", "avif"], // 现代图片格式
    quality: 80, // 图片质量
    densities: [1, 2], // 支持高分辨率屏幕
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Vite 构建配置
  vite: {
    plugins: [TurboConsole()],
    build: {
      // 生产环境启用压缩
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          // 移除未使用的代码
          dead_code: true,
          // 移除未使用的变量
          unused: true,
        },
        mangle: {
          // 混淆变量名以减少体积
          toplevel: true,
        },
      },
      // 启用 Tree Shaking
      target: "esnext",
      // 减少 chunk 大小警告阈值
      chunkSizeWarningLimit: 500,
      // 启用 CSS 代码分割
      cssCodeSplit: true,
    },
    css: {
      devSourcemap: false,
    },
    // 预构建优化
    esbuild: {
      drop:
        process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
    },
  },
});
