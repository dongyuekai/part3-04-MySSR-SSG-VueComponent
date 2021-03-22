// 服务端打包配置文件
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  // 将entry指向应用程序的server entry文件
  entry: './src/entry-server.js',

  // 这允许 webpack 以node适用方式处理模块架子啊
  // 还会在编译vue组价时
  // 告知 ’vue-loader‘输送面向服务器代码（server-oriented code）
  target: 'node',

  output: {
    filename: 'sever-bundle.js',
    // 此处告知 server bundle适用Node风格导出模块
    libraryTarget: 'commonjs2'
  },
  // 不打包 node_modules 第三方包 而是 保留 require 方式直接加载
  externals: [nodeExternals({
    // 白名单中的资源依然正常打包
    allowlist: [/\.css$/]
  })],
  plugins: [
    // 这是将服务器的整个输出构建为单个JSON文件的插件
    // 默认文件名为 'vue-ssr-server-bundle.json'
    new VueSSRServerPlugin()
  ]
})