<template>
  <div class="slide-container">
    <el-col :span="3">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#109d58"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <router-link to="/home">
          <el-menu-item index="1">
            <i class="el-icon-menu icon"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="(item) in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i class="icon" :class="'fa ' + item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <router-link v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'sliderbar',
  data () {
    return {
      items: [
        {
          icon: 'fa-money',
          name: '资金管理',
          path: 'fund',
          children: [{path: 'fundlist', name: '资金流水'}]
        },
        {
          icon: 'fa-asterisk',
          name: '信息管理',
          path: 'info',
          children: [{path: 'showInfo', name: '个人信息'}]
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.slide-container {
  width: 200px;
  .el-menu-vertical-demo {
    position: absolute;
    border-top: 1px solid #0d7e46;
    border-right: 1px solid #109d58;
    height: calc(100% - 71px);
    // height: 90%;
    .el-menu-item {
      min-width: 200px;
    }
    .icon {
      color: #fff;
    }
  }
  .el-icon-arrow-down::before {
    color: #fff;
  }
}
</style>
