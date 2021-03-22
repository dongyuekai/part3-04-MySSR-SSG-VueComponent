// 通过vue-server-renderer将一个vue实例渲染成字符串
// node server.js 会输出  <div id="app" data-server-rendered="true"><h1> LG-Hello </h1></div> 实现了渲染

const Vue = require('vue')
const fs = require('fs')
const express = require('express')
const server = express()

const renderer = require('vue-server-renderer').createRenderer({
  // 将渲染内容放到模板占位处 替换 <!--vue-ssr-outlet-->
  template: fs.readFileSync('./index.template.html', 'utf-8')
})

server.get('/', (req, res) => {
  const app = new Vue({
    template: `
     <div id='app'>
       <h1> {{ message }} </h1>
     </div>
  `,
    data: {
      message: 'LG-Hello'
    }
  })
  renderer.renderToString(app, (err, html) => {
    if (err) {
      return res.status(500).end('Internal Server Error.')
    }
    res.setHeader('Content-Type', 'text/html;charset=u')
    res.end(html)
  })
})
server.listen(3000, () => {
  console.log('server running at port 3000...')
})


