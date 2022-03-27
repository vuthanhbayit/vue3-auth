<h1 align="center" >🔑 Vue3 Auth</h1>

<p align="center">Zero-boilerplate authentication support for Vue 3!</p>

## Getting Started

```bash
$ yarn add vue3-auth
```

## Demo

This is [demo](https://github.com/vuthanhbayit/vue3-auth-demo) repo

## Setup

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
      propertyRole: 'role',
      propertyPermission: 'permissions',
      autoFetch: true,
    },
  },
})

app.mount('#app')
```

## Options
General options shared with all strategies. See AuthOption in [types.ts](https://github.com/vuthanhbayit/vue3-auth/blob/main/src/types.ts) for defaults.

### `baseUrl`
- Required

Plugin used ohmyfetch to call api. [see more](https://github.com/unjs/ohmyfetch#%EF%B8%8F-adding-baseurl)

### `redirect`
- Default
```
redirect: {
  login: '/login',
  logout: '/login',
  home: '/'
}
```
- `login`: User will be redirected to this path if login is required.
- `logout`: User will be redirected to this path if after logout, current route is protected.
- `home`: User will be redirected to this path after login if cannot redirect query.

### `watchLoggedIn`
- Default: `true`

When enabled (default) user will be redirected on login/logouts.

### `fullPathRedirect`
- Default: `true`

If true, use the full route path with query parameters for redirect

## Local provider

### Usage

To do a password based login by sending credentials in request body as a JSON object:

```vue
<template>
  <div>
    <form @submit.prevent="onLogin">
      <div>
        <label>Username</label>
        <input type="text" v-model="state.username" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="state.password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useAuth } from "vue3-auth";

const { login } = useAuth()

const state = reactive({
  username: '',
  password: ''
})

const onLogin = async () => {
  try {
    let response = await login(state)
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}
</script>
```

- After login
```vue
<!-- admin page -->
<template>
  <div>
    Username: {{ user.username }}
    Email: {{ user.email }}
    loggedIn: {{ loggedIn }}
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from "vue3-auth";

const { user, loggedIn } = useAuth()
</script>
```

### Options

### `endpoints`

- Default
```
endpoints: {
  login: { url: '/api/auth/login', method: 'post' },
  logout: { url: '/api/auth/logout', method: 'post' },
  user: { url: '/api/auth/user', method: 'get' },
}
```

### `token`

- Default

```
token: {
  property: 'token',
  type: 'Bearer',
  name: 'Authorization',
  prefix: '_token',
}
```

- `property` can be used to specify which field of the response JSON to be used for value. It can be false to directly use API response or being more complicated like auth.token.
- `type` Authorization header type to be used in `$fetch` requests.
- `name` Authorization header name to be used in `$fetch` requests.
- `prefix` Default prefix used in building a key for token `cookie` storage.

### `user`

- Default

```
user: {
  propertyInLogin: 'user',
  propertyInFetch: '',
  propertyRole: 'role',
  propertyPermission: 'permisison',
  autoFetch: true,
}
```

- `autoFetch`: By default, auth will load the user's info using a second HTTP request after a successful login.
- `propertyInLogin` can be used to specify which field of the response JSON to be used for value in `login` api.
- `propertyRole` get `role` in `user` data and to use functions `getRole`, `isRole` in `useAuth` composable.
- `propertyPermission` get `permisison` in `user` data and to use functions `getPermissions`, `hasPermission` in `useAuth` composable.
- `propertyInFetch` can be used to specify which field of the response JSON to be used for value in `fetch user` api.

## useAuth

```vue
<script lang="ts" setup>
import { useAuth } from 'vue3-auth'

const {
  login,
  logout,
  setToken,
  getToken,
  getUser,
  setUser,
  getRole,
  isRole,
  getPermissions,
  hasPermission,
  resetState,
  fetchUser,
  user,
  loggedIn
} = useAuth()
</script>
```

### `login`

```vue
<script lang="ts" setup>
import { reactive } from "vue";
import { useAuth } from 'vue3-auth'

const { login } = useAuth()

const state = reactive({
  username: '',
  password: ''
})

const onLogin = async () => {
  try {
    const data = await login(state)
    
    console.log('login success >>> ', data)
  } catch (e) {
    console.log('login error >>> ', e)
  }
}
</script>
```

### `logout`

```vue
<template>
  <div>
    <button @click="logout">logout</button>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from 'vue3-auth'

const { logout } = useAuth()
</script>
```

### `isRole` and `hasPermission`

By default `local.user.propertyRole = role` and `local.user.propertyPermission = permissions`.
```
local: {
  user: {
    propertyRole: 'role',
    propertyPermission: 'permissions',
  },
}
```
API `fetchUser` has `user` data:

```
user: {
  username: 'MR. Seven',
  age: 29,
  email: 'vuthanhbayit@gmail.com',
  role: 'manager',
  permissions: ['view.blog', 'create.blog']
}
```

```vue
<script lang="ts" setup>
import { useAuth } from 'vue3-auth'

const { isRole, hasPermission } = useAuth()

isRole('manager') // true
isRole('admin') // false
hasPermission('view.blog') // true
hasPermission('edit.role') // false
</script>
```

### Meta data auth
```vue
<!-- required page-->
<template>
  <div>
    This is required page
  </div>
</template>


<route>
{
  meta: {
    auth: true
  }
}
</route>
```

```vue
<!-- admin page-->
<template>
  <div>
    This is Admin page
  </div>
</template>


<route>
{
  meta: {
    auth: {
      role: "admin"
    }
  }
}
</route>
```

```vue
<!-- create blog -->
<template>
  <div>
    This is Create blog page
  </div>
</template>


<route>
{
  meta: {
    auth: {
      permission: "create.blog"
    }
  }
}
</route>
```


