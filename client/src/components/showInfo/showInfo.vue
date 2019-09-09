<template>
  <div class="showInfo-container">
    <div class="container-left">
      <span class="avatar">
        <img :src="user.avatar" alt />
      </span>
    </div>
    <div class="container-right">
      <div class="info-box">
        <div class="userName">
          <i class="fa fa-child" aria-hidden="true"></i>
          <span>{{ user.name }}</span>
        </div>
        <div class="identity">
          <i class="fa fa-meh-o"></i>
          <span>{{ user.identity == 'employee' ? '普通员工' : '管理员' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style lang="scss" scoped>
.showInfo-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .container-left {
    background-color: #fff;
    width: 30%;
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
      position: relative;
      left: 50%;
      top: 50%;
      margin-left: -50px;
      margin-top: -130px;
      img{
        height: 100%;
      }
    }
  }
  .container-right {
    width: 70%;
    padding-left: 20px;
    background-color: #ecebec;
    .info-box {
      width: 300px;
      height: 150px;
      position: relative;
      top: 50%;
      margin-top: -150px;
      .userName,
      .identity {
        font-weight: bold;
        font-size: 25px;
        line-height: 75px;
      }
      .userName {
      }
      .identity {
      }
    }
  }
}
</style>
