// Aligned with interfaces/web ESLint baseline (Airbnb + TypeScript, no Prettier)
const {
  R3F_SOURCE_GLOBS,
  R3F_UNKNOWN_PROPERTY_IGNORE,
} = require('./eslint/r3f-unknown-properties.cjs');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@react-three/recommended',
  ],
  plugins: [
    '@react-three',
  ],
  ignorePatterns: [
    'build',
    'dist',
    'node_modules',
    'coverage',
    'scripts',
  ],
  overrides: [
    {
      files: ['*.test.tsx', '*.test.ts'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
    {
      files: [
        'vite.config.ts',
        'vitest.config.ts',
        'scripts/**/*.{js,mjs,cjs}',
      ],
      rules: {
        'import/no-extraneous-dependencies': ['error', {
          devDependencies: true,
        }],
      },
    },
    {
      files: ['src/test/**/*'],
      rules: {
        'import/no-extraneous-dependencies': ['error', {
          devDependencies: true,
        }],
      },
    },
    {
      files: R3F_SOURCE_GLOBS,
      rules: {
        'react/no-unknown-property': ['error', {
          ignore: [...R3F_UNKNOWN_PROPERTY_IGNORE],
        }],
      },
    },
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.eslint.json',
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'linebreak-style': ['error', 'unix'],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
};
