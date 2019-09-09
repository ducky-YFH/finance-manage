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
  const isLogin = !!localStorage.dhsToken
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
