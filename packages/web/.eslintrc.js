module.exports = {
  extends: [
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [
      0,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    "@typescript-eslint/ban-ts-comment": 'off',
    'react/no-array-index-key': 'off',
    "react/no-did-update-set-state":'off'
  },
  globals: {
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  },
  parser: '@typescript-eslint/parser'
};
