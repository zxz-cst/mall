import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter);
const routes = [
    {
        path:'/',
        component:Main,
        name:'Main',
        redirect:'/home',
        children:[
            // {path:'/home',name:'home',component:Home},
            // {path:'/mail',name:'mail',component:Mail},
            // {path:'/user',name:'user',component:User},
            // 改为动态添加路由
        ]
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    }
]

const originalPush = VueRouter.prototype.push;  // 避免多次切换相同路由时报错
VueRouter.prototype.push = function(location) {
    return originalPush.call(this, location).catch(err => err)
};

const router = new VueRouter({
    routes
})

export default router
