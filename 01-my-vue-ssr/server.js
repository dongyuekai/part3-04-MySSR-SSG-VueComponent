// 通过vue-server-renderer将一个vue实例渲染成字符串
// node server.js 会输出  <div id="app" data-server-rendered="true"><h1> LG-Hello </h1></div> 实现了渲染

const Vue = require('vue')
const fs = require('fs')
const express = require('express')
const server = express()

const isProd = process.env.NODE_ENV === 'production'

const { createBundleRenderer } = require('vue-server-renderer')

const { setupDevServer } = require('./build/setup-dev-server')

server.use('/dist', express.static('./dist'))


// const renderer = require('vue-server-renderer').createRenderer({
//   // 将渲染内容放到模板占位处 替换 <!--vue-ssr-outlet-->
//   template: fs.readFileSync('./index.template.html', 'utf-8')
// })

let renderer
let onReady

if (isProd) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const template = fs.readFileSync('./index.template.html', 'utf-8')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
  })
} else {
  // 开发模式 -> 监视打包构建 -> 重新生成Renderer渲染器
  onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest
    })
  })
}


const render = (req, res) => {
  renderer.renderToString({
    title: 'LG',
    meta: `
      <meta name="description" content="LG-Hello">
    `
  }, (err, html) => {
    console.log(err)
    if (err) {
      return res.status(500).end('Internal Server Error.')
    }
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.end(html)
  })
}

server.get('/', isProd
  ? render
  : async (req, res) => {
    // 等待有了Renderer渲染器之后 调用render进行渲染
    await onReady
    render()
  })

server.listen(3000, () => {
  console.log('server running at port 3000...')
})


