import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,

  ...tseslint.configs.recommended,
  {
    rules: {
      // JavaScript-specific rule: Disallow unused variables
      "no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],

      // TypeScript-specific rule: Enforce consistent type definitions
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // Example: Enforce double quotes
      quotes: ["error", "double"],

      semi: ["error", "always"],
      "no-inline-comments": ["error"],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "function", next: "*" },
      ],
    },
  },
];
