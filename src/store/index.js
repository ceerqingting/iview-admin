import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import user from './modules/user'
import menu from './modules/menu'
import tagsView from './modules/tagsView'
import * as getters from './getters'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    user,
    menu,
    tagsView
  },
  getters,
  strict: debug,
  plugins: debug ? [createLogger({
    collapsed: true
  })] : []
})

export default store
