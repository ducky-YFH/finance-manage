<template>
  <div class="header-container">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="10">
        <div class="grid-left">
          <img class="logo" src="./logo.png" alt />
          <span class="title">大黑帅管理后台</span>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-right">
          <img class="avatar" :src="user.avatar" alt />
          <div class="nameBox">
            <span class="welcome">欢迎</span>
            <span class="userName">{{ user.name }}</span>
          </div>
          <div class="select">
            <el-dropdown trigger="click" @command="handleSelect">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="showInfo">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect (command) {
      switch (command) {
        case 'showInfo':
          this.showInfo()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    showInfo () {
      this.$router.push('/showInfo')
    },
    logout () {
      // 清除本地token
      localStorage.removeItem('dhsToken')
      // 设置vuex stroe
      this.$store.dispatch('clearCurrentState')
      // 跳转
      this.$router.push('/login')
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 70px;
  background-color: #109d58;
  .grid-left {
    height: 70px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    .logo {
      height: 60px;
    }
    .title {
      margin-left: 15px;
      line-height: 70px;
      color: #fff;
      font-weight: 700;
      font-style: italic;
      font-size: 25px;
    }
  }
  .grid-right {
    height: 70px;
    width: 180px;
    display: flex;
    align-items: center;
    .avatar {
      height: 60px;
      border-radius: 50%;
    }
    .nameBox {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      padding: 0 20px;
      .welcome {
        color: #fff;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .userName {
        color: #dd91b1;
        font-weight: 600;
      }
    }
    .select {
      .el-dropdown-link {
        color: #fff;
        font-size: 20px;
      }
    }
  }
}
</style>
