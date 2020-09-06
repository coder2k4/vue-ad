import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
import BuyModal from './components/Shared/BuyModal'

Vue.config.productionTip = false
Vue.component('appBuyModal', BuyModal)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyDvcfvCk8NC-t1e_atlND_iXTk0si2Kr8Q',
      authDomain: 'vue-spa-ad.firebaseapp.com',
      databaseURL: 'https://vue-spa-ad.firebaseio.com',
      projectId: 'vue-spa-ad',
      storageBucket: 'vue-spa-ad.appspot.com',
      messagingSenderId: '323817670233',
      appId: '1:323817670233:web:0768ec551c88be5e'
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) { this.$store.dispatch('autoLoginUser', user) }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
