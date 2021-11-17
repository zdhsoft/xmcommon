module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'commonjs': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'no-constant-condition': [
            'error', { 'checkLoops': false }
        ],
        'quotes': [
            'error',
            'single'
        ],
        'no-inferrable-types':[
            'off'
        ],
        'max-len': ['error', {
            'code': 160,
        }],
        'semi': [
            'error',
            'always'
        ]
    }
};
