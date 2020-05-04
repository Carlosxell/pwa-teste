module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '99 Leads'
      return args;
    });
  },
  pwa: {
    name: '99 Leads',
    short_name: '99 Leads',
    themeColor: '#2d3549',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
};
