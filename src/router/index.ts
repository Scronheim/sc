import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/system',
      name: 'system',
      component: () => import('../views/System.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/Users.vue')
    },
    {
      path: '/monitoring',
      name: 'monitoring',
      component: () => import('../views/monitoring/Monitoring.vue')
    },
    {
      path: '/monitoring/:id',
      name: 'monitoring object',
      component: () => import('../views/monitoring/MonitoringObject.vue')
    },
    {
      path: '/objects',
      name: 'objects',
      component: () => import('../views/Objects.vue')
    },
    {
      path: '/searches',
      name: 'searches',
      component: () => import('../views/Searches.vue')
    },
  ]
})

export default router
