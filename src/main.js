// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import App from './App'
import router from './router'
import store from '@/store'
import AppDate from '@/components/AppDate'
import VueMce from 'vue-mce';

Vue.use(VueMce);

Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDKFdgSuQjOfTmf73DRN4i4rwcdAmPUVD8',
  authDomain: 'fire-forum-2d854.firebaseapp.com',
  databaseURL: 'https://fire-forum-2d854.firebaseio.com',
  projectId: 'fire-forum-2d854',
  storageBucket: 'fire-forum-2d854.appspot.com',
  messagingSenderId: '899951441742'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
