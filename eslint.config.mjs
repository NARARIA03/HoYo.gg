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

const noUnknownPropertyRule = {
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  rules: {
    'react/no-unknown-property': 'error',
  },
};

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  typescriptTypeImportRule,

  noUnusedVarsRule,
  noUnknownPropertyRule,
  eslintConfigPrettier,
];

export default eslintConfig;
