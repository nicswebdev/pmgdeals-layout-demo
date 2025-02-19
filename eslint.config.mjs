import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: {
      react: require("eslint-plugin-react"),
      import: require("eslint-plugin-import"),
    },
    rules: {
      // "react/jsx-uses-react": "error",
      // "react/jsx-uses-vars": "error",
      // "import/no-unresolved": "error",
      // "import/first": "error",
      // "import/newline-after-import": "error",
      // "import/no-duplicates": "error",
      // "simple-import-sort/imports": "error",
      // "simple-import-sort/exports": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;
