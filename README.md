<h1 align="center" >🔑 Vue3 Auth</h1>

<p align="center">Zero-boilerplate authentication support for Vue 3!</p>

## Getting Started

```bash
$ yarn add vue3-auth
```

## Features

## Example

```ts
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { authPlugin } from 'vue3-auth'

const app = createApp(App)

app.use(router).use(authPlugin, {
  router,
  baseUrl: import.meta.env.VITE_BASE_URL,
  fullPathRedirect: true,
  watchLoggedIn: true,
  redirect: {
    login: '/login',
    logout: '/login',
    home: '/',
  },
  local: {
    endpoints: {
      login: { url: '/api/auth/login', method: 'post' },
      logout: { url: '/api/auth/logout', method: 'post' },
      user: { url: '/api/auth/user', method: 'get' },
    },
    token: {
      property: 'token',
      type: 'Bearer',
      name: 'Authorization',
      prefix: '_token',
    },
    user: {
      propertyInLogin: 'user',
      propertyInFetch: '',
      autoFetch: true,
    },
  },
})

app.mount('#app')

```