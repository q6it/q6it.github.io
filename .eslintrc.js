module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  parser: 'babel-eslint',
  globals: {
    window: true,
    document: true,
    localStorage: true,
    sessionStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    // typescript
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        'plugin:sonarjs/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        'prettier/react',
      ],
      rules: {
        'tsdoc/syntax': 'warn',
        'prettier/prettier': 'warn',
        'react/prop-types': 0,
        'no-plusplus': 0,
        'no-param-reassign': [2, { props: false }],
        'no-use-before-define': 0,
        '@typescript-eslint/explicit-module-boundary-types': [
          'error',
          {
            allowArgumentsExplicitlyTypedAsAny: false,
            allowDirectConstAssertionInArrowFunctions: true,
            allowedNames: ['validationSchema'],
            allowHigherOrderFunctions: true,
            allowTypedFunctionExpressions: true,
          },
        ],
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/strict-boolean-expressions': [
          2,
          {
            allowNullableBoolean: true,
            allowNullableObject: true,
            allowString: true,
            allowNullableString: true,
            allowNumber: false,
            allowNullableNumber: false,
          },
        ],
        'import/no-anonymous-default-export': 0,
        'import/prefer-default-export': 0,
        'import/no-cycle': 1,
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
            'newlines-between': 'always',
          },
        ],
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: false,
          },
        ],
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error'],
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
      },
    },
    {
      files: ['src/app/pages/ThemeBuilder/draggables/**/*.{tsx,ts}'],
      rules: {
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/control-has-associated-label': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'import/no-cycle': 0,
      },
    },
  ],
  plugins: ['import', 'sonarjs', 'react', 'prettier', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'react-app',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  rules: {
    'prettier/prettier': 'warn',
    'prefer-arrow-callback': ['error'],
    camelcase: [0, { properties: 'never' }],
    'no-plusplus': 0,
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-fallthrough': 0,
    'no-param-reassign': [2, { props: false }],
    'no-unneeded-ternary': 'error',
    'no-unused-vars': 'warn',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    'sonarjs/cognitive-complexity': ['warn', 30],
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/no-collapsible-if': 'warn',
    'import/no-anonymous-default-export': 0,
    'import/prefer-default-export': 0,
    'import/newline-after-import': 'error',
    'import/no-cycle': 1,
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
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
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': [
      2,
      {
        html: 'ignore',
        explicitSpread: 'ignore',
      },
    ],
    'jsx-a11y/anchor-is-valid': 0,
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
};
