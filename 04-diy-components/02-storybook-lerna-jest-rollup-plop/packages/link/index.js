import LgLink from './src/link.vue'

LgLink.install = Vue=> {
  Vue.component(Link.name, LgLink)
}
export default LgLink