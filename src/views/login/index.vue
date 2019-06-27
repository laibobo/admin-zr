<template>
  <div class="login">
    <article class="login-panel">
      <el-form ref="login-form" :model="loginForm" label-width="80px;">
        <el-form-item label="用户名">
          <el-input
            v-model.trim="loginForm.username"
            placeholder="请输入用户名"
            required
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model.trim="loginForm.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('login-form')"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </article>
  </div>
</template>
<style lang="sass" scoped>
  .login{
    background: rgb(169, 202, 193);
    height: 100%;
    width: 100%;
    position: absolute;
    .login-panel{
      width: 400px;
      height: 300px;
      position: fixed;
      background: #fff;
      right: 300px;
      padding: 20px;
      bottom: 100px;
      box-sizing: border-box;
      box-shadow: 2px 1px 5px #565366;
      border-radius: 5px;
    }
  }
</style>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$store.dispatch('userLogin',this.loginForm).then(() => {
        console.log('pass')
        this.$router.push({ path: '/sysmanage/user' })
      }).catch(err => {
        console.log('nopass')
        // this.$message.error(err)
      })
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
         
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  }
}
</script>
