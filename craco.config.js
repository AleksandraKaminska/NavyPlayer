/* eslint-disable @typescript-eslint/no-var-requires */
const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@menu-dark-bg': '#000a11',
              '@component-background': '#000a11',
              '@layout-header-background': '#000a11',
              '@layout-footer-background': 'rgba(3,3,15,0.6)',
              '@layout-body-background': '#000a11'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
