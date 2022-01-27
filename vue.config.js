module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8882,
    public: '0.0.0.0:8882',
    host: 'localhost',
    watchOptions: {
      poll: true,
    },
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
