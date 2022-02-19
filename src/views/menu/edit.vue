<template>
  <div class="menu-create">
    <create-or-edit :is-edit="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createOrEdit from './components/create-edit.vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: {
    createOrEdit
  },
  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
