// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as api from './api/api'
import VueLazyLoad from 'vue-lazyload'
import VueAwesomeSwiper  from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'



Vue.config.productionTip = false
Vue.prototype.api = api
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad, {
  error: require('../static/image/load.png'),
  loading: require('../static/image/load.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
