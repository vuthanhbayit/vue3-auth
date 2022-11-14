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
import { useAuth } from '../src'
import { User } from './types/user'

const { logout, user } = useAuth<User>()

const onLogout = () => {
  logout()
}
</script>
