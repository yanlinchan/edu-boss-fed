<template>
  <div>
    <el-form :model="form">
      <el-form-item label="资源名称" required label-width="150px">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="资源地址" required label-width="150px">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="资源分类" required label-width="150px">
        <el-select v-model="form.categoryId" placeholder="请选择资源分类">
          <el-option
            :label="category.name"
            :value="category.id"
            v-for="category in categories"
            :key="category.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源描述" label-width="150px">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateResource } from '@/services/resource'

export default Vue.extend({
  name: 'ResourceCreateOrEdit',
  props: {
    categories: [],
    resource: Object
  },
  data () {
    return {
      form: {
        id: undefined,
        name: '',
        categoryId: null,
        url: '',
        description: ''
      }
    }
  },

  methods: {
    async onSubmit () {
      if (this.resource.id) {
        this.form.id = this.resource.id
      } else {
        delete this.form.id
      }
      return await createOrUpdateResource(this.form)
    }
  },

  mounted () {
    if (this.resource.id) {
      this.form = this.resource
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
