<template>
  <div class="container">
    <div class="logo">
      <img src="./logo.png" alt="">
    </div>
    <section class="login-box">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('ruleForm')">登录</el-button>
          <router-link to="/register">
            <el-button type="primary">点击注册</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export default {
  data () {
    return {
      ruleForm: {
        email: '',
        pass: ''
      },
      rules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
        ],
        pass: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {min: 6, max: 30, message: '长度在6到30之间', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loginForm =
          {
            email: this.ruleForm.email,
            password: this.ruleForm.pass
          }
          this.$axios.post('/api/users/login', loginForm)
            .then(res => {
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              const { token } = res.data
              localStorage.setItem('dhsToken', token)
              // 解释token
              const decode = jwt_decode(token)
              // token存储到decode中
              this.$store.dispatch('setCheckout', !this.isEmpty(decode))
              this.$store.dispatch('setUser', decode)
              this.$router.push('/index')
            })
        } else {
          this.$message({
            message: '登录信息有错'
          })
          return false
        }
      })
    },
    isEmpty (value) {
      return (value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f1f3f4;
  background: url("./background.jpg") no-repeat center;
  background-size: cover;
  .logo{
    text-align: center;
    padding-top: 40px;
  }
  .login-box {
    text-align: center;
    position: absolute;
    width: 400px;
    left: 50%;
    top:50%;
    margin-left: -200px;
    margin-top: -200px;
    padding: 30px 30px 20px 10px;
    text-align: center;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 5px 10px 20px 0.5px#f4b07f;
    .el-select {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>
