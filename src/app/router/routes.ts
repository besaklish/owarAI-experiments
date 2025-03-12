import TopView from 'src/features/top/views/TopView.vue'
import NotFoundView from 'src/features/top/views/NotFoundView.vue'

export const routes = [
  { path: '/', component: TopView },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]
