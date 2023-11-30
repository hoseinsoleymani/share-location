const { init } = require('@fullstacksjs/eslint-config/init');
const path = require('path');

module.exports = init({
  root: true,
  modules: {
    auto: true,
    react: true,
    next: false,
    typescript: {
      parserProject: './tsconfig.json',
      resolverProject: './tsconfig.json',
    },
  },
  parser: '@typescript-eslint/parser',

  rules: {
    'tailwindcss/no-custom-classname': 'warn',
    'import/extensions': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
      },
      typescript: {
        project: './tsconfig.json',
      },
      alias: {
        map: [['@', path.resolve(__dirname, './src')]],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
      },
    },
  },

  extends: 'prettier',
  plugins: ['prettier', 'import', '@typescript-eslint'],
});
