import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  // 暗黑模式配置
  shortcuts: [
    // 自定义快捷方式
    [
      "btn",
      "px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
    ],
    ["btn-primary", "btn bg-blue-600 hover:bg-blue-700"],
    ["btn-secondary", "btn bg-gray-600 hover:bg-gray-700"],
    [
      "icon-btn",
      "text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none",
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      },
    }),
    presetTypography(),
    // 暂时禁用 Web 字体以避免网络问题导致的启动缓慢
    // presetWebFonts({
    //   fonts: {
    //     sans: "DM Sans",
    //     serif: "DM Serif Display",
    //     mono: "DM Mono",
    //   },
    // }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: "prose prose-sm m-auto text-left".split(" "),
});
