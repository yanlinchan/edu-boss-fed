import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

async function refreshToken () {
  return await axios.post(
    '/front/user/refresh_token',
    qs.stringify({ refreshtoken: store.state.user.refresh_token })
  )
}

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

// 响应拦截器
let isRefreshing = false // 控制刷新 token 的状态m
let requests: (() => void)[] = [] // 存储刷新 token 期间过来的 401 请求
request.interceptors.response.use(response => {
  // 状态码 2xx 进入这里
  // 有的接口返回都是 200，然后把错误信息封装在 response 里面
  return response
}, async err => {
  // 4xx 5xx 进入这里
  if (err.response) {
    // 收到响应，但是状态码不是 2xx
    const { status } = err.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效 (没有提供 token、token 是无效的、token 过期了)

      // 如果有 refresh_token 则尝试使用它获取新的 token
      // 没有 refresh_token 直接返回登录页面
      if (!store.state.user) {
        redirectLogin()

        return Promise.reject(err)
      }

      // 尝试刷新 token
      if (!isRefreshing) {
        isRefreshing = true
        return await refreshToken().then(res => {
          //    成功了 -> 把本次失败的请求重新发出去
          if (res.data.success) {
            store.commit('setUser', res.data.content)
            // 把 requests 中的请求重新发出
            requests.forEach(cb => cb())
            // 清空已经重发的请求
            requests = []
            return request(err.config)
          } else {
            // refresh_token 无效
            throw new Error('参数错误')
          }
        }).catch(error => {
          //    失败了 -> 跳转到登录页面
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false
        })
      }
      // 刷新状态下，把请求挂起放到 requests 数组中
      return new Promise(resolve => {
        requests.push(() => resolve(request(err.config)))
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误')
    }
  } else if (err.request) {
    // 请求没有收到响应
    Message.error('请求超时，请刷新重试')
  } else {
    // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败${err.message}`)
  }
  return Promise.reject(err)
})

export default request
