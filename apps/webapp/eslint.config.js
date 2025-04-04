import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import tanstackQuery from '@tanstack/eslint-plugin-query';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  // Add TanStack Query recommended config
  tanstackQuery.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte', "**/*.svelte.ts"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  // If you want to customize TanStack Query rules
  {
    plugins: ['@tanstack/query'],
    rules: {
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/no-deprecated-options': 'error',
      '@tanstack/query/prefer-query-object-syntax': 'error',
      '@tanstack/query/stable-query-client': 'error'
    }
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/']
  }
];
