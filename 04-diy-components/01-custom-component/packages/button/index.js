import Button from './src/Button.vue'

Button.install = Vue => {
  // 注册全局组件
  Vue.component(Button.name, Button)
}
export default Button