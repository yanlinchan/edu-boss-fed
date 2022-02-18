<template>
  <div id="app">
    <h1>拉勾教育</h1>
    <!-- 根路由出口 -->
    <router-view />
    <p class="text">hello</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data () {
    return {
      a: 1,
      c: { b: 1 }
    }
  },

  methods: {
    test () {
      if (this.a) return true
      else return null
    }
  }
})
</script>

<style lang="scss" scoped>

.text {
  color: $warning-color;
}
</style>
