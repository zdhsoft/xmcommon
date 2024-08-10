import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  { files: ["lib/**/*.{js,mjs,cjs,ts}"] },
  { ignores: ['.eslintrc.js', 'eslint.config.mjs', 'src/db/*.ts'], },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
    }
  }
];
