// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as api from './api/api'
import VueLazyLoad from 'vue-lazyload'
import VueAwesomeSwiper  from 'vue-awesome-swiper'
import wu from '../static/baplu/wu-ui/wu-ui'
import '../static/baplu/wu-ui/wu-ui.css'
import 'swiper/dist/css/swiper.css'
import fastclick from 'fastclick'


fastclick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.api = api
Vue.prototype.wu = wu
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad, {
  error: require('../static/image/load.png'),
  loading: require('../static/image/load.png')
})

//全局返回
Vue.prototype.back = () => {
  router.go(-1)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
