'use strict'

module.exports = {
  devServer: {
    port: 8050,
    proxy: {
      '/api': {
        // target: 'http://120.26.130.248:9050',
        target: 'http://localhost:8080',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}
