<template>
  <div>
    <router-link to="/">index</router-link>
    <router-link to="/about">about</router-link>
    <router-link to="/contact">contact</router-link>
    <router-link to="/protected?q=abc">protected</router-link>
    <button @click="onLogout">logout</button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '../'

const { logout } = useAuth()

const onLogout = () => {
  logout()
}
</script>
