import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      posts: []
    }),

    mutations: {
      setPosts(state, data) {
        state.posts = data
      }
    },

    actions: {
      // 在服务端渲染期间务必让 action 返回一个 Promise
      async getPosts({ commit }) {
        // return new Promise()
        // const { data } = await axios.get('../mock/data.json')

        commit('setPosts', [{ title: '222' }, { title: '333' }, { title: '444' }])
      }
    }
  })
}
