import Vue from 'vue'
import Router from 'vue-router'
import Home from "./components/Home";
import store from "./store";

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    //  Lazy loading
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: () => import('./components/Ads/Ad'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./components/Ads/AdList'),
      beforeEnter: authGuard
    },
    {
      path: '/new',
      name: 'newAd',
      component: () => import('./components/Ads/NewAd'),
      beforeEnter: authGuard
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Auth/Login')
    },
    {
      path: '/registration',
      name: 'reg',
      component: () => import('./components/Auth/Registration')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('./components/User/Orders'),
      beforeEnter: authGuard
    },
    {
      path: '*',
      redirect: '/'
    },
  ],
  mode : 'history' // disable #
})

/**
 * Router Guard Function
 * check logIn members and redirect to login page
 * @param to
 * @param from
 * @param next
 */
function authGuard (to, from, next){
  if (store.getters.isUserLoggedIn)
  {
    next()
  }
  else
  {
    next('/login?loginError=true')
  }
}
