export const TokenKey = 'Authorization'

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return localStorage.removeItem(TokenKey)
}

export const storeage = {
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key))
  },
  setItem: (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
  },
  removeItem: (key) => {
    return localStorage.removeItem(key)
  }
}
