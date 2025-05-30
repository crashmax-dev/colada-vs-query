import { PiniaColada } from '@pinia/colada'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './app.vue'
import { router } from './router'

const app = createApp(App)

app.use(router)

// pinia
const pinia = createPinia()
app.use(pinia)
app.use(PiniaColada, {
  pinia,
  queryOptions: {
    gcTime: 300_000,
    staleTime: 5_000,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  },
})

// tanstack
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        gcTime: 300_000,
        staleTime: 5_000,
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  },
})

app.mount('#app')
