import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
Vue.prototype.$http = axios
Vue.prototype.formatScale2 = function(row, column, cellVal) {
  // console.info(cellVal)
  if (typeof cellVal === 'undefined' || cellVal === null) {
    return ''
  } else if (cellVal === 0) {
    return 0
  }
  return cellVal.toFixed(2)
}
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
