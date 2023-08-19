const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/g2': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:8888',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/g2': '' }
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:8889',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/api2': '' }
      }
    }
  }
})
