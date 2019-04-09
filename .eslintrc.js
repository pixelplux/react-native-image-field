module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: 'babel-eslint',
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    camelcase: 'off',
    // enable this later.
    'arrow-parens': 'off',
    'import/no-cycle': 'off',
    'operator-linebreak': 'off',
    'import/no-default-export': 'error',
    'import/no-extraneous-dependencies': 'off',
    'comma-dangle': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'react/jsx-filename-extension': 'off',
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
    ]
  }
};
