// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入iconfont.css文件
import  './assets/fonts/iconfont.css'

import App from './App'
import router from './router'

// 导入axios
import axios from 'axios'
// 给Vue实例对象设置一个名为 $axios 的属性
Vue.prototype.$axios = axios

//引入vuex
import Vuex from 'vuex'

import store from './store/index'
// 使用vuex
Vue.use(Vuex)

// 引入moment
import moment from 'moment'
Vue.prototype.$moment = moment

Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
