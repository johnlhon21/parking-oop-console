module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/base',
    'vuetify',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eslint-disable': 'off',
    'eslint-disable-next-line': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
