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
  // 监视构建 serverBundle -> 调用 update -> 更新 Renderer 渲染器
  // 监视构建 clientManifest -> 调用 update -> 更新 Renderer 渲染器

  return onReady
}