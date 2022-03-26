<template>
  <div>
    thuong-hieu
    <div>
      <pre>{{ $route.params }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<route>
{
  path: "/thuong-hieu/:a?/:b?/:c?",
  name: "thuong-hieu",
  meta: { layout: "", auth: false }
}
</route>
