import { getMenu } from '@/api/getMenu'
import { SET_IS_GET_MENU } from '../mutation-types'

const menu = {
  state: {
    isGetMenu: false
  },
  actions: {
    GetMenu ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getMenu().then((res) => {
          commit(SET_IS_GET_MENU, true)
          resolve(res)
        })
      })
    }
  },
  mutations: {
    [SET_IS_GET_MENU]: (state, bool) => {
      state.isGetMenu = bool
    }
  }
}

export default menu
