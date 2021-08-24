module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "google"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
    },
    "plugins": [
        "@typescript-eslint",
        "prettier-eslint",
    ],
    "rules": {
        "tabWidth": 4,
        "indent": ["error", 4],
        "linebreak-style": ["warn", "windows"],
        "quotes": 0,
        "semi": ["error", "always"],
        "max-len": ["error", {
            "code": 160,
        }],
        "requireParamType": true,
    },
};
