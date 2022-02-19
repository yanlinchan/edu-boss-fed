<template>
  <div>
    <el-form :model="form">
      <el-form-item label="名称" required label-width="150px">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" required label-width="150px">
        <el-input type="number" v-model="form.sort"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrEditResourceCategory } from '@/services/resource-category'

export default Vue.extend({
  name: 'ResourceCategoryCreateOrEdit',
  props: {
    category: Object
  },
  data () {
    return {
      form: {
        id: undefined,
        name: '',
        sort: 0
      }
    }
  },

  methods: {
    async onSubmit () {
      if (this.category.id) {
        this.form.id = this.category.id
      } else {
        delete this.form.id
      }
      return await createOrEditResourceCategory(this.form)
    }
  },
  mounted () {
    if (this.category.id) {
      this.form = this.category
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
