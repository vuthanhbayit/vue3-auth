<template>
  <div>
    thuong-hieu
    <pre>{{ route }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
