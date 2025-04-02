import NotFoundView from 'src/features/top/views/NotFoundView.vue'
import { paths } from 'src/shared/router/paths'

export const routes = [
  { path: paths.top, component: () => import('src/features/top/views/TopView.vue') },
  {
    path: paths.script.normTwist,
    component: () => import('src/features/script.norm-twist/views/NormTwistScriptView.vue'),
  },
  {
    path: paths.dynamicUI.dynamicUI,
    component: () => import('src/features/dynamic-ui/views/DynamicUIView.vue'),
  },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]
