import { createRouter, createWebHistory } from 'vue-router'
import IntroFunk from '../modules/intro/IntroFunk.vue'
import Join from '../modules/join/Join.vue'
import Home2 from '../modules/home/Home2.vue'
import Profil from '../modules/profil/Profil.vue'
import clothes from '../modules/clothes/clothes.vue'
import CartPage from '../modules/clothes/CartPage.vue'
import Login from '../modules/login/Login.vue'

const routes = [
  { path: '/', component: IntroFunk },
  { path: '/histoire', component: () => import('../modules/histoire/HistoirePage.vue') },
  { path: '/login', component: Login },
  { path: '/join', component: Join },
  { path: '/home', component: Home2 },
  { path: '/profil', component: Profil },
  { path: '/clothes', component: clothes },
  { path: '/cart', component: CartPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router