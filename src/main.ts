import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import dayjs from 'dayjs'

// 加载全局样式
import './styles/index.scss'

Vue.config.productionTip = false

Vue.filter('date', (date: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format)
})

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
