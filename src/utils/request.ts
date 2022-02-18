import axios from 'axios'
import store from '@/store'

const request = axios.create({
})

// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.access_token) {
    if (config.headers) config.headers.Authorization = user.access_token
    else config.headers = { Authorization: user.access_token }
  }
  return config
}, err => {
  return Promise.reject(err)
})

export default request
