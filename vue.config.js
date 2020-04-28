module.exports = {
  pwa: {
    name: '99Leads',
    short_name: '99Leads',
    themeColor: '#2d3549',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].title = '99 Leads'
      return args;
    });
  }
};
