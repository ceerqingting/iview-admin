// import { param2Obj } from '@/utils'

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return {
      code: 'Y',
      body: {
        token: '123456',
        username: username
      }
    }
  },
  logout: () => {
    return {
      code: 'Y',
      body: ''
    }
  }
}
