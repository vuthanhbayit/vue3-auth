import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { authPlugin } from '../src'
import { fetch } from './utils'

const app = createApp(App)

app.use(router).use(authPlugin, {
  router,
  fetch,
  local: {
    endpoints: {
      login: {
        url: '/front-store/auth/login',
        method: 'post',
      },
      user: {
        url: '/front-store/auth/user',
        method: 'get',
      },
      logout: false,
    },
    token: {
      property: 'data.token',
    },
    user: {
      propertyInLogin: 'data.user',
      propertyInFetch: 'data',
    },
  },
})

app.mount('#app')
