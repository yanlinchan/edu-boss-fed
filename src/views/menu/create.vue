<template>
  <div class="menu-create">
    <create-edit></create-edit>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createEdit from './components/create-edit.vue'

export default Vue.extend({
  components: { createEdit },
  name: 'MenuCreate'
})
</script>

<style scoped>
</style>
