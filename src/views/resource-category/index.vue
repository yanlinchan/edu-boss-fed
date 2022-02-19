<template>
  <div class="menu">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <el-button size="small" @click="handleCreate">添加</el-button>
      </div>
      <el-table
        :data="categories"
        style="width: 100%">
        <el-table-column
          label="编号"
          min-width="150"
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          min-width="150">
        </el-table-column>
        <el-table-column
          label="创建时间"
          min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.createdTime | date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          min-width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog width="500px" title="资源" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <create-edit
        ref="dialog"
        :category="category"
      ></create-edit>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" :disabled="createOrEditLoading">取 消</el-button>
        <el-button type="primary" @click="onCreateOrEditSubmit" :loading="createOrEditLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourceCategories, deleteResourceCategory } from '@/services/resource-category'
import createEdit from './components/create-edit.vue'

export default Vue.extend({
  name: 'ResourceCategory',
  components: { createEdit },
  data () {
    return {
      categories: [],
      dialogFormVisible: false, // 对话框显示状态
      category: {}, // 当前操作分类
      createOrEditLoading: false // 对话框按钮加载状态
    }
  },
  methods: {
    async loadAllCategories () {
      const { data } = await getResourceCategories()
      if (data.code === '000000') {
        this.categories = data.data
      }
    },
    handleCreate () {
      this.category = {}
      this.dialogFormVisible = true
    },
    handleEdit (item: { id: number }) {
      this.category = item
      this.dialogFormVisible = true
    },
    handleDelete (item: { id: number }) {
      this.$confirm('确认删除吗?', '删除提示', {})
        .then(async () => {
          const { data } = await deleteResourceCategory(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllCategories()
          }
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    async onCreateOrEditSubmit () {
      this.createOrEditLoading = true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (this.$refs.dialog as any).onSubmit()
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.dialogFormVisible = false
      } else {
        this.$message.error(data.mesg)
      }
      this.createOrEditLoading = false
      this.loadAllCategories()
    }
  },
  created () {
    this.loadAllCategories()
  }
})
</script>

<style lang="scss" scoped></style>
