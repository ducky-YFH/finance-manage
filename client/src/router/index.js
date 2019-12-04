import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/index'
import Register from '../components/register/register'
import noFound from '../components/404/NotFind'
import Login from '../components/login/login'
import Home from '../components/home/home'
import showInfo from '../components/showInfo/showInfo'
import fundlist from '../components/fundlist/fundlist'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/showInfo', name: 'showInfo', component: showInfo },
        { path: '/fundlist', name: 'fundlist', component: fundlist }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      name: '404',
      component: noFound
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // !会对后面的变量进行转换, 如果变量为undefined或者null则转为true，其余一律为false，所以两个!!就是如果有数据就转为false然后再用一个!转回true
  const isLogin = !!localStorage.dhsToken
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
