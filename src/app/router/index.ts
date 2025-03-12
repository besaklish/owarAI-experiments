import { createWebHistory, createRouter } from 'vue-router'
import { routes } from 'src/app/router/routes'

const base = import.meta.env.BASE_PATH || '/'

export const router = createRouter({
  history: createWebHistory(base),
  routes,
})
