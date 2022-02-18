<template>
  <div class="login">
    <el-form
      :model="form"
      :rules="rules"
      class="login-form"
      ref="form"
      label-position="top"
      label-width="80px"
    >
      <el-form-item
        label="手机"
        prop="phone"
      >
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="isLoginLoading"
          class="login-btn"
          type="primary"
          @click="onSubmit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'
import { mapMutations } from 'vuex'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      isLoginLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^1\d{10}/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度6-18位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit () {
      try {
        // 1. 表单验证
        (this.$refs.form as Form).validate()
        // 2. 验证通过，提交表单
        this.isLoginLoading = true
        const { data } = await login(this.form)
        this.isLoginLoading = false

        // 3. 处理请求结果
        //  失败给出提示
        if (data.state !== 1) {
          return this.$message.error(data.message)
        } else {
          //  成功，全局记录登录状态，跳到首页
          this.setUser(data.content)
          this.$router.push({
            name: 'home'
          })
          this.$message.success('登录成功')
        }
      } catch (error) {
        console.log('登录失败', error)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
