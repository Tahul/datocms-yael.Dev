const antfu = require('@antfu/eslint-config').default
const perfectionist = require('eslint-plugin-perfectionist')

module.exports = antfu(
  {
    ignores: [
      '**/.nitro',
      '**/.nuxt',
      '**/.turbo',
      '**/*.md',
      '**/build',
      '**/dist',
      'node_modules',
    ],
    regexp: false,
  },
  {
    languageOptions: {
      globals: {
        $crisp: true,
        $FPROM: true,
        $nuxt: true,
        chrome: true,
        gapi: true,
        hj: true,
      },
    },
    plugins: { perfectionist },
    rules: {
      'array-bracket-newline': [
        'error',
        {
          minItems: 3,
          multiline: true,
        },
      ],
      'array-element-newline': [
        'error',
        {
          minItems: 3,
          multiline: true,
        },
      ],
      'brace-style': [
        'error',
        'stroustrup',
        { allowSingleLine: false },
      ],
      'curly': ['error', 'all'],
      'id-length': [
        'error',
        {
          exceptions: [
            '_',
            't',
            'x',
            'y',
          ],
          min: 2,
        },
      ],
      'import/no-mutable-exports': 'off',
      'import/no-unresolved': 'off',
      'import/order': 'off',
      'no-console': 'off',
      'no-control-regex': 'off',
      'no-labels': 'off',
      'no-restricted-globals': 'off', // Fix
      'no-restricted-syntax': 'off',
      'no-throw-literal': 'off', // Fix
      'no-unmodified-loop-condition': 'off', // Fix
      'no-use-before-define': 'off',
      'no-var': 'off',
      'node/prefer-global/buffer': ['error', 'always'],
      'node/prefer-global/process': ['error', 'always'],
      'object-curly-newline': [
        'error',
        {
          ExportDeclaration: {
            minProperties: 2,
            multiline: true,
          },
          ImportDeclaration: 'never',
          ObjectExpression: {
            minProperties: 2,
            multiline: true,
          },
          ObjectPattern: { multiline: true },
        },
      ],
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: '*',
          prev: [
            'const',
            'let',
            'var',
          ],
        },
        {
          blankLine: 'any',
          next: [
            'const',
            'let',
            'var',
          ],
          prev: [
            'const',
            'let',
            'var',
          ],
        },
        {
          blankLine: 'always',
          next: 'return',
          prev: '*',
        },
      ],
      'perfectionist/sort-array-includes': ['error', { type: 'natural' }],
      'perfectionist/sort-classes': [
        'error',
        {
          groups: [
            'index-signature',
            'static-property',
            'private-property',
            'property',
            'constructor',
            'static-method',
            'private-method',
            'method',
          ],
          type: 'natural',
        },
      ],
      'perfectionist/sort-enums': ['error', { type: 'natural' }],
      'perfectionist/sort-exports': ['error', { type: 'natural' }],
      'perfectionist/sort-interfaces': ['error', { type: 'natural' }],
      'perfectionist/sort-maps': ['error', { type: 'natural' }],
      'perfectionist/sort-named-exports': ['error', { type: 'natural' }],
      'perfectionist/sort-named-imports': ['error', { type: 'natural' }],
      'perfectionist/sort-object-types': ['error', { type: 'natural' }],
      'perfectionist/sort-objects': [
        'error',
        {
          partitionByNewLine: true,
          type: 'natural',
        },
      ],
      'perfectionist/sort-union-types': ['error', { type: 'natural' }],
      'prefer-regex-literals': 'off',
      'quotes': [
        'error',
        'single',
        {
          allowTemplateLiterals: false,
          avoidEscape: true,
        },
      ],
      'sort-imports': 'off',
      'ts/ban-ts-comment': 'off',
      'ts/ban-ts-ignore': 'off',
      'ts/ban-types': 'off',
      'ts/explicit-member-accessibility': 'off',
      'ts/no-invalid-this': 'off',
      'ts/no-namespace': 'off',
      'ts/no-require-imports': 'off',
      'ts/no-shadow': 'off',
      'ts/no-unused-expressions': 'off',
      'ts/no-use-before-define': 'off',
      'ts/no-var-requires': 'off',
      'unicorn/filename-case': 'off',
      'vars-on-top': 'off',
      'vue/attributes-order': [
        'error',
        {
          alphabetical: true,
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
        },
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: false },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          multiline: 1,
          singleline: 1,
        },
      ],
      'vue/multiline-html-element-content-newline': [
        'error',
        {
          allowEmptyLines: false,
          ignores: ['pre', 'textarea'],
          ignoreWhenEmpty: true,
        },
      ],
      'vue/no-side-effects-in-computed-properties': 'off',
      'vue/padding-line-between-tags': [
        'error',
        [
          {
            blankLine: 'always',
            next: '*',
            prev: '*',
          },
        ],
      ],
      'vue/return-in-computed-property': 'off', // This conflicts with another rule that removes empty `return` statements
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
)
