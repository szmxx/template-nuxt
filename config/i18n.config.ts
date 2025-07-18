/**
 * 国际化配置
 */
export const i18nConfig = {
  locales: [
    {
      code: "zh-CN" as const,
      name: "中文",
      file: "zh-CN.json",
    },
    {
      code: "en-US" as const,
      name: "English",
      file: "en-US.json",
    },
  ],
  defaultLocale: (process.env.NUXT_PUBLIC_DEFAULT_LOCALE || "zh-CN") as
    | "zh-CN"
    | "en-US",
  strategy: "prefix_except_default" as const,
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    redirectOn: "root" as const,
  },
};