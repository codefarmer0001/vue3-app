import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Recharge from './components/Recharge.vue'
import Cashier from './components/Cashier.vue'
import ApiDoc from './components/ApiDoc.vue'
import Withdraw from './components/Withdraw.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Recharge },
  { path: '/cashier', component: Cashier },
  { path: '/api-doc', component: ApiDoc },
  { path: '/withdraw', component: Withdraw },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

createApp(App).use(router).mount('#app')
