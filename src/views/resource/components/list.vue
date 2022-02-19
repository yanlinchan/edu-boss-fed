<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCategories"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :disabled="isLoading"
            >查询搜索</el-button>
            <el-button
              @click="onReset"
              :disabled="isLoading"
            >重置</el-button>
          </el-form-item>
        </el-form>
        <div class="dividing-line">
          &nbsp;&nbsp;
          <el-button size="small" @click="handleCreate">添加</el-button>
          <el-button size="small" @click="$router.push({name: 'resource-category'})">资源分类</el-button>
        </div>
      </div>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          width="180"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          width="180"
          label="描述">
        </el-table-column>
        <el-table-column
          width="180"
          label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.createdTime | date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
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

      <!--
        total 总记录数
        page-size 每页大小
        分页组件会自动根据 total 和 page-size 计算出一共分多少页
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>

    <el-dialog width="500px" title="资源" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <create-edit
        ref="dialog"
        :categories="resourceCategories"
        :resource="currentResource"
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
import { Form } from 'element-ui'
import { getResourceCategories } from '@/services/resource-category'
import { getResourcePages, deleteResource } from '@/services/resource'
import CreateEdit from './create-edit.vue'

export default Vue.extend({
  components: { CreateEdit },
  name: 'ResourceList',
  data () {
    return {
      resources: [], // 资源列表
      form: {
        name: '',
        url: '',
        current: 1, // 当前页
        size: 5, // 每页大小
        categoryId: null // 资源分类
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true, // 加载状态

      dialogFormVisible: false, // 对话框显示状态
      currentResource: {}, // 当前操作资源
      createOrEditLoading: false // 对话框按钮加载状态
    }
  },

  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },

    async loadResources () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中状态
    },

    onSubmit () {
      this.form.current = 1 // 筛选查询从第 1 页开始
      this.loadResources()
    },

    handleCreate () {
      this.currentResource = {}
      this.dialogFormVisible = true
    },

    handleEdit (item: { id: number }) {
      this.currentResource = item
      this.dialogFormVisible = true
    },

    handleDelete (item: { id: number }) {
      this.$confirm('确认删除吗?', '删除提示', {})
        .then(async () => {
          const { data } = await deleteResource(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadResources()
          } else {
            this.$message.error(data.mesg)
          }
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },

    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第1页数据
      this.loadResources()
    },

    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources()
    },

    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1 // 重置回到第1页
      this.loadResources()
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
      this.loadResources()
    }
  },

  created () {
    this.loadResources()
    this.loadResourceCategories()
  }
})
</script>

<style lang="scss" scoped>
.dividing-line {
  border-top-style: solid;
  border-top-color: #EBEEF5;
  border-top-width: 1px;
  padding-top: 18px;
}
</style>
