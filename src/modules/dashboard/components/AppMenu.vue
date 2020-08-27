<template>

</template>

<script>
export default {
  name: 'AppMenu',
  props: {
    value: Boolean
  },
  data: () => ({
    items: [
      { title: 'Home', icon: 'dashboard', url: '/dashboard', exact: true }
    ]
  })
}
</script>

<style>
</style>
