import { createApp } from 'vue'
import App from 'src/app/App.vue'
import { router } from 'src/app/router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: false,
    },
  },
})
app.mount('#app')
