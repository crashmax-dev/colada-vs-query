import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./pages/home.vue'),
    },
    {
      path: '/pinia',
      component: () => import('./pages/pinia.vue'),
    },
    {
      path: '/pinia-2',
      component: () => import('./pages/pinia-2.vue'),
    },
    {
      path: '/query',
      component: () => import('./pages/query.vue'),
    },
  ],
})
