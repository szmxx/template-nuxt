// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  languageOptions: {
    parserOptions: {
      parser: "@typescript-eslint/parser",
    },
  },
  rules: {
    // 通用代码质量规则
    "no-debugger": "error",
    "no-alert": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "object-shorthand": "error",
    "quote-props": ["error", "as-needed"],

    // 安全相关规则
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "no-script-url": "error",
    "@typescript-eslint/no-explicit-any": "off",
  },

  // 忽略特定文件
  ignores: ["dist/**", ".output/**", ".nuxt/**", "node_modules/**", "*.min.js"],
});
