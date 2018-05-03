import Mock from 'mockjs'
import loginAPI from './login'
import getMenu from './getMenu'

Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/getMenu/, 'get', getMenu)

export default Mock
