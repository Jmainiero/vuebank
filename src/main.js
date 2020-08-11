//Primary
import Vue from 'vue';
import App from './App.vue';

//Vuex
import Vuex from 'vuex';
import store from './store/main.js';
Vue.use(Vuex);

//Router
import VueRouter from 'vue-router';
import router from './router';
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
 