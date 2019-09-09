<template>
  <div class="index-container">
    <HeaderNav></HeaderNav>
    <div class="slider"></div>
    <Slidebar></Slidebar>
    <div class="home-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderNav from '../header_nav/header_nav'
import Slidebar from '../slidebar/slidebar'
export default {
  data () {
    return {}
  },
  methods: {
  },
  components: {
    HeaderNav,
    Slidebar
  }
}
</script>

<style lang="scss" scoped >
.index-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .homeBox {
    float: right;
    margin-left: 200px;
    width: 100%;
  }
  .home-box {
    position: relative;
    top: 0;
    left: 200px;
    width: calc(100% - 200px);
    height: calc(100% - 70px);
    overflow: auto;
  }
}
</style>
