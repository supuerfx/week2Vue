import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/components/MainPage'
import LoginPage from '@/components/LoginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage
    },
    {
      path:'/',
      name:'LoginPage',
      component: LoginPage
    }
  ]
})
