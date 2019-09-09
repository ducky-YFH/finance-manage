<template>
  <div class="container">
    <div class="head404"></div>
    <div class="txtbg404">
      <div class="txtbox">
        <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
        <p class="paddingbox">请点击以下链接继续浏览网页</p>
        <p class="back">
          <span>>></span>&nbsp;&nbsp;
          <router-link to="/">返回网站首页</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container {
  background-color: #494949;
  width: 100%;
  height: 100%;
  .head404 {
    width: 580px;
    height: 234px;
    margin: 0 auto 50px auto;
    background: url("./head404.png") no-repeat;
  }

  .txtbg404 {
    width: 499px;
    height: 169px;
    margin: 10px auto 0 auto;
    background: url("./txtbg404.png") no-repeat;
    .txtbox {
      width: 390px;
      position: relative;
      top: 30px;
      left: 60px;
      color: #eee;
      font-size: 13px;
      p {
        margin: 5px 0;
        line-height: 18px;
      }
      .paddingbox {
        padding-top: 15px;
      }
      p a {
        color: #eee;
        text-decoration: none;
      }
      p a:hover {
        color: #fc9d1d;
        text-decoration: underline;
      }
      .back{
        margin-top: 20px;
      }
    }
  }
}
</style>
