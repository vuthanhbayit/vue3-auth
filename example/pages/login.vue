<template>
  <div>
    Login
    <div>
      phone:
      <input v-model="state.phone" type="text" />
    </div>
    <div>
      Password:
      <input v-model="state.password" type="text" />
    </div>

    <button @click="onSubmit">submit</button>

    <pre>{{ state }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useAuth } from '../../src'

const { login } = useAuth()

const state = reactive({
  phone: '0397153837',
  password: '123456',
})

const onSubmit = async () => {
  try {
    await login(state)
  } catch (e) {
    console.log({ e })
  }
}
</script>
