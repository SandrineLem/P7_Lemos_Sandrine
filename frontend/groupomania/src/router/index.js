import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue';
import Profile from '../views/Profile.vue';

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path:'/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/message',
    name: 'Message',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Message.vue') 
  },
  {
    path: '/Update/Profile',
    name: 'UpdateProfile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UpdateProfile.vue') 
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes 
})

export default router
