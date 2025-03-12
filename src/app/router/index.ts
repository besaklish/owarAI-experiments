import { createWebHistory, createRouter } from 'vue-router'
import { routes } from 'src/app/router/routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
