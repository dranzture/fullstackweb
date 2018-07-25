import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueResource from 'vue-resource'
import Login from '../src/Login.vue'
import Users from '../src/Users.vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {
    path: '/', component: Login
  },
  {
    path: '/users', component: Users
  },
]
const router = new VueRouter({
  routes: routes,
  mode: 'history',

});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
