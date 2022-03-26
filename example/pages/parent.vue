<template>
  <div>
    [parent]
    <router-link to="/parent/child1">child 1</router-link>
    <router-link to="/parent/child2">child 2</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'parent',
}
</script>

<route>
{
  meta: {
    layout: "empty",
    auth: true
  }
}
</route>
