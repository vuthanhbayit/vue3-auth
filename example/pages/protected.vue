<template>
  <div>
    protected
    <pre>{{ route.meta }}</pre>
    <pre>{{ user }}</pre>
    <div>loggedIn: {{ loggedIn }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useAuth } from '../../src'

const route = useRoute()
const { user, loggedIn } = useAuth()

console.log('protected', { route })
</script>

<route>
{
  meta: {
    layout: "empty",
    auth: true
  }
}
</route>
