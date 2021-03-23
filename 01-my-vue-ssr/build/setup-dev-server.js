const fs = require('fs')
const path = require('path')
const chokidir = require('chokidar')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const resolve = file => path.resolve(__dirname, file)

module.exports = (server, callback) => {
  let ready
  const onReady = new Promise(resolve => ready = resolve)

  // 监视构建 -> 更新 Renderer
  let template
  let serverBundle
  let clientManifest

  const update = () => {
    if (template && serverBundle && clientManifest) {
      ready()
      callback(serverBundle, template, clientManifest)
    }
  }

  // 监视构建 template -> 调用 update -> 更新 Renderer 渲染器
  const templatePath = path.resolve(__dirname, '../index.template.html')
  template = fs.readFileSync(templatePath, 'utf-8')
  update()
  chokidir.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    update()
  })
  // 服务端构建 监视构建 serverBundle -> 调用 update -> 更新 Renderer 渲染器
  const serverConfig = require('./webpack.server.config')
  const serverCompiler = webpack(serverConfig)
  // 写入内存
  const serverDevMiddleware = devMiddleware(serverCompiler, {
    logLevel: 'silent' // 关闭日志输出，由 FriendlyErrorsWebpackPlugin 处理
  })
  serverCompiler.hooks.done.tap('server', () => {
    // 读取此文件 重新更新Renderer
    serverBundle = JSON.parse(
      // 内存中读取
      serverDevMiddleware.fileSystem.readFileSync(resolve("../dist/vue-ssr-server-bundle.json"), 'utf-8')
    )
    update()
  })
  // serverCompiler.watch({}, (err, stats) => {
  //   if (err) throw err
  //   if (stats.hasErrors()) return
  //   // 此时会在dist目录打包生成vue-ssr-server-bundle.json
  //   // 读取此文件 重新更新Renderer
  //   serverBundle = JSON.parse(fs.readFileSync(resolve("../dist/vue-ssr-server-bundle.json"), 'utf-8'))
  //   update()
  // })

  // 客户端构建 监视构建 clientManifest -> 调用 update -> 更新 Renderer 渲染器
  const clientConfig = require('./webpack.client.config')
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  clientConfig.entry.app = [
    'webpack-hot-middleware/client?quiet=true&reload=true', // 和服务端交互处理热更新的一个客户端脚本
    clientConfig.entry.app
  ]
  clientConfig.output.filename = '[name].js' // 热更新模式下确保一直的hash
  const clientCompiler = webpack(clientConfig)
  // 写入内存
  const clientDevMiddleware = devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    logLevel: 'silent' // 关闭日志输出，由 FriendlyErrorsWebpackPlugin 处理
  })
  clientCompiler.hooks.done.tap('client', () => {
    // 读取此文件 重新更新Renderer
    clientManifest = JSON.parse(
      // 内存中读取
      clientDevMiddleware.fileSystem.readFileSync(resolve("../dist/vue-ssr-client-manifest.json"), 'utf-8')
    )
    update()
  })

  server.use(hotMiddleware(clientCompiler, {
    log: false //关闭本身的日志输出
  }))

  // 将clientDevMiddleware 挂载到Express服务中 提供对内存中数据的访问 
  server.use(clientDevMiddleware)

  return onReady
}