import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementUI  from 'element-ui'
import './api/mock'
import 'element-ui/lib/theme-chalk/index.css'
import Cookie from 'js-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 添加全局前置导航守卫
router.beforeEach((to,from,next) => {
  // 判断token是否存在 存在则可以加入系统，否则会跳转到登录界面
  const token = Cookie.get('token')
  if (!token && to.name !== 'login') {
    next({name:'login'})
  } else if(token && to.name === 'login') {
    next({name:'home'})
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu',router)
  }
}).$mount('#app')
