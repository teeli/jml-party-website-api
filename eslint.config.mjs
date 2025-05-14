import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
// import tsParser from '@typescript-eslint/parser'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  eslintPluginPrettierRecommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    ignores: [
      '**/.serverless',
      '**/node_modules',
      '**/.sst',
      '**/.env',
      '**/.env.*',
      '!**/.env.example',
      '**/package-lock.json',
      'eslint.config.mjs',
      '.lintstagedrc.mjs',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': [ '.ts', '.tsx' ],
      },

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },

        node: true,
      },
    },

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],

      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-unresolved': 'error',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],

          'newlines-between': 'always',
        },
      ],

      'unicorn/no-array-reduce': 0,
      'unicorn/prefer-module': 0,
    },
  },
)
