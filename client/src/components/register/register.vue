<template>
  <div class="container">
    <div class="logo">
      <img src="./logo.png" alt />
    </div>
    <section class="register-box">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select v-model="ruleForm.identity" placeholder="选择身份">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <router-link to="/login">
            <el-button type="success">转到登录</el-button>
          </router-link>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    let checkPass = (rule, value, callback) => {
      if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        email: '',
        pass: '',
        checkPass: '',
        identity: ''
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          {min: 2, max: 30, message: '长度在2到30个字符之间'}
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
        ],
        pass: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {min: 6, max: 30, message: '长度在6到30之间', trigger: 'blur'}
        ],
        checkPass: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          {min: 6, max: 30, message: '长度在6到30之间', trigger: 'blur'},
          { validator: checkPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const registerForm =
          {
            name: this.ruleForm.userName,
            email: this.ruleForm.email,
            password: this.ruleForm.pass,
            identity: this.ruleForm.identity
          }
          this.$axios.post('/api/users/register', registerForm)
            .then(res => {
              this.$message({
                message: '账号注册成功',
                type: 'success'
              })
              this.$router.push('/login')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
  .logo {
    text-align: center;
    padding-top: 40px;
  }
  .register-box {
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
