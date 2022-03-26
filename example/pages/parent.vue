<template>
  <div>
    [parent]
    <router-link v-if="hasPermission('view1')" to="/parent/child1">
      child 1
    </router-link>
    <router-link v-if="hasPermission('view2')" to="/parent/child2">
      child 2
    </router-link>
    <router-link v-if="hasPermission('view3')" to="/parent/child3">
      child 3
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '../../'

const { hasPermission } = useAuth()
</script>

<route>
{
  meta: {
    layout: "empty",
    auth: {
      permission: "view1"
    }
  }
}
</route>
