// import tsPlugin from "@typescript-eslint/eslint-plugin";
// import tsParser from "@typescript-eslint/parser";

// const config = [
//   {
//     files: ["**/*.ts", "**/*.tsx"],
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         project: "./tsconfig.json",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": tsPlugin,
//     },
//     rules: {
//       ...tsPlugin.configs.recommended.rules,
//     },
//   },
// ];

// export default config;

// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { dirname } from "path";
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_", // Ignore `_` prefixed vars
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-unused-vars-experimental": "off", // ✅ Disable experimental unused-vars checks
    },
  },
];

export default eslintConfig;
