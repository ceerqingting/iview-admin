import { loginByUsername, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { SET_TOKEN, SET_USERNAME } from '../mutation-types'

const user = {
  state: {
    username: '',
    token: getToken()
  },
  mutations: {
    [SET_TOKEN]: (state, token) => {
      state.token = token
    },
    [SET_USERNAME]: (state, username) => {
      state.username = username
    }
  },
  actions: {
    Login ({ commit, state }, userInfo) {
      return loginByUsername(userInfo).then((res) => {
        commit(SET_TOKEN, res.token)
        setToken(res.token)
        return Promise.resolve(res)
      })
    },
    LogOut ({ commit, state }) {
      return logout(state.token).then(() => {
        commit(SET_TOKEN, '')
        removeToken()
        return Promise.resolve()
      })
    },
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit(SET_TOKEN, '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
