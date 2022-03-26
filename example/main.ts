import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { authPlugin } from '../'

const app = createApp(App)

app.use(router).use(authPlugin, {
  router,
  baseUrl: import.meta.env.VITE_BASE_URL,
  local: {
    endpoints: {
      login: {
        url: '/front-store/auth/login',
        method: 'post',
        propertyName: 'token',
      },
      user: {
        url: '/front-store/auth/user',
        method: 'get',
        propertyName: 'data',
      },
      logout: false,
    },
  },
})

app.mount('#app')
