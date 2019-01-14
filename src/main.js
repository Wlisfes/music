// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import * as api from './api/api'
import * as code from './api/status'
import Tou from '../static/baplu/Tou/Tou'
import '../static/baplu/Tou/Tou.css'
import VueLazyLoad from 'vue-lazyload'
import VueAwesomeSwiper  from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import fastclick from 'fastclick'
import VueTouch  from 'v-touch'


fastclick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.api = api
Vue.prototype.code = code
Vue.prototype.Tou = Tou



Vue.use(VueAwesomeSwiper)
Vue.use(VueTouch)
Vue.use(VueLazyLoad, {
  error: require('../static/image/load.png'),
  loading: require('../static/image/load.png')
})

//全局返回
Vue.prototype.back = () => {
  router.go(-1)
}
//IOS下用来阻止touchmove事件
Vue.prototype.move = () => {
  return false
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
