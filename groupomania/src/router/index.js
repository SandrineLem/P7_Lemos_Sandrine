import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
    
  },
  {
    path: '/inscription',
    name: 'Inscription',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Inscription.vue')
  },
  {
    path: '/myprofil',
    name: 'Myprofil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Myprofil.vue')
  },
  {
    path: '/updateProfil',
    name: 'Updateprofil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Updateprofil.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
