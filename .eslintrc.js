module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['./src/**/test.ts', './src/**/*.test.ts', './src/**/*test.js', './src/test/**/*.ts'],
      env: { mocha: true },
      rules: {
        'no-unused-expressions': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'max-len': ['error', { code: 150, ignoreStrings: true, ignoreComments: true }],
    'no-underscore-dangle': 'off',
    'arrow-parens': 'off',
    'no-param-reassign': ['error', { props: false }],
    'import/extensions': ['warn', {
      ts: 'never',
    }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-shadow': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        caughtErrors: 'none',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
