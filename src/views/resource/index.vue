<template>
  <div class="resource">
    <resource-list></resource-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import resourceList from './components/list.vue'

export default Vue.extend({
  components: { resourceList },
  name: 'ResourceIndex'
})
</script>

<style lang="scss" scoped></style>
