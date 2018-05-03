import axios from 'axios'
import store from '@/store'
import { getToken, TokenKey } from '@/utils/auth'
import { Message } from 'iview'
import Router from '../router'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers[TokenKey] = getToken()
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use((response) => {
  const res = response.data
  if (res.code !== 'Y') {
    Message.error({
      content: '操作失败：' + res.body,
      duration: 10,
      closable: true
    })
    return Promise.reject(res.body)
  }
  return res.body
}, error => {
  const status = error.response.status
  if (status === 401) {
    store.dispatch('FedLogOut').then(() => {
      location.reload()
    })
  } else if (status === 403) {
    Router.push('/403')
  }
  return Promise.reject(error)
})

export default service
