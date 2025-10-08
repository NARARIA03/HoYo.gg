import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const typescriptTypeImportRule = {
  files: ['**/*.ts', '**/*.tsx', '**/*.mjs', '**/*.mts'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
  },
};

const noConsoleRule = {
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  rules: {
    'no-console': ['error', { allow: ['error'] }],
  },
};

const noUnusedVarsRule = {
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
};

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  typescriptTypeImportRule,
  noConsoleRule,
  noUnusedVarsRule,
  eslintConfigPrettier,
];

export default eslintConfig;
