import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import stylistic from '@stylistic/eslint-plugin';

// Import order, top to bottom (no blank lines between groups)
const ALIAS_ORDER = ['@/api', '@/lib', '@/types', '@/constants', '@/hooks', '@/assets', '@/components'];

const NO_PARENT_IMPORTS = { group: ['../*'], message: 'Use the @/ alias instead of ../' };

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Code conventions — see CONVENTIONS.md
  {
    plugins: { '@stylistic': stylistic },
    rules: {
      // Formatting
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/eol-last': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/max-len': ['error', { code: 130, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreUrls: true }],

      // Imports
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'sibling', 'index'],
          pathGroups: [
            ...ALIAS_ORDER.map((alias) => ({ pattern: `${alias}/**`, group: 'internal', position: 'before' })),
            // Own files last, in this order: styles → types → constants
            { pattern: './*.module.css', group: 'index', position: 'after' },
            { pattern: './*.types', group: 'index', position: 'after' },
            { pattern: './*.constants', group: 'index', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          distinctGroup: false,
          'newlines-between': 'never',
        },
      ],
      'no-restricted-imports': ['error', { patterns: [NO_PARENT_IMPORTS] }],
      'import/no-default-export': 'error',

      // Code
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi-line'],
      'prefer-const': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    },
  },

  // Next.js requires default exports for routes and config files; .d.ts files mirror modules that export default (SVGR)
  {
    files: ['src/app/**/{page,layout,not-found,error,loading}.tsx', '*.config.{ts,mjs}', 'src/**/*.d.ts'],
    rules: { 'import/no-default-export': 'off' },
  },

  // Dependencies flow one way: shared → layout / product → app
  {
    files: ['src/components/shared/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            NO_PARENT_IMPORTS,
            {
              group: ['@/components/layout/*', '@/components/product/*'],
              message: 'shared/ must not import from layout/ or product/.',
            },
          ],
        },
      ],
    },
  },

  globalIgnores(['**/.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.claude/**']),
]);

export default eslintConfig;
