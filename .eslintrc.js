module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: { ecmaVersion: 2020, },
  rules: {
    // https://eslint.vuejs.org/rules/
    "vue/html-indent": ["error", 2],
    "vue/script-indent": [
      "error",
      2,
      {
        switchCase: 1,
        ignores: [],
      },
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "never",
      },
    ],
    "vue/multi-word-component-names": ["off"],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 1,
        multiline: 1
      },
    ],
    "vue/first-attribute-linebreak": [
      "error",
      {
        singleline: "beside",
        multiline: "below"
      }
    ],
    // https://eslint.org/docs/rules/
    semi: ["error", "never"],
    quotes: ["error", "double"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "object-curly-newline": [
      "warn",
      {
        multiline: true,
        minProperties: 4,
      },
    ],
    "object-property-newline": [
      "warn",
      { allowAllPropertiesOnSameLine: false },
    ],
    "object-curly-spacing": ["warn", "always"],
    "key-spacing": [
      "warn",
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    "sort-imports": ["warn", { ignoreCase: true }],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    // https://eslint.vuejs.org/rules/no-v-html.html
    "vue/no-v-html": "off",
  },
}
