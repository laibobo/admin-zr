<template>
  <div class="login">
    <article class="login-panel">
      <el-form ref="login-form"
        status-icon
        label-width="80px;"
        :model="loginForm"
        :rules="rules"
        :hide-required-asterisk="true">
        <el-form-item
          label="用户名"
          prop="username">
          <el-input
            v-model.trim="loginForm.username"
            placeholder="请输入用户名"
            autocomplete="off"
            @keyup.enter.native="submitForm"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password">
          <el-input
            v-model.trim="loginForm.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
            @keyup.enter.native="submitForm"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="isLoginLoading"
            @click="submitForm"
          > {{ isLoginLoading? '登录中':'登录' }}</el-button>
        </el-form-item>
      </el-form>
    </article>
  </div>
</template>
<style lang="scss" scoped>
  .login{
    background: rgb(169, 202, 193);
    height: 100%;
    width: 100%;
    position: absolute;
    .login-panel{
      background: #fff;
      width: 400px;
      margin-left: -200px;
      height: 300px;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-top: -200px;
      padding: 20px;
      box-sizing: border-box;
      box-shadow: 2px 1px 5px #565366;
      border-radius: 5px;
    }
  }
</style>
<script>
import { login } from '~/api/user'
export default {
  data() {
    return {
      isLoginLoading:false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  beforeRouteEnter(to,from,next){
    console.log('beforeRouteEnter')
    next()
  },
  methods: {
    submitForm() {
      if(this.isLoginLoading) return

      console.log(this.isLoginLoading,1111111)
      this.$refs['login-form'].validate((valid) => {
        if (valid) {
          this.isLoginLoading = true
          this.$store.dispatch('userLogin',this.loginForm).then(() => {            
            this.isLoginLoading = false
            this.$notify({
              title: '登录成功',
              message: '正在跳转页面...',
              type: 'success',
              duration: 1500,
              onClose:()=>{
                this.$router.push({ path: '/sysmanage/role' })
              }
            })
          }).catch(err => {
            this.isLoginLoading = false
            this.$notify({
              title:'登录失败',
              message: err,
              type: 'error',
              duration: 0
            })
          })
        }
      })
    }
  }
}
</script>
