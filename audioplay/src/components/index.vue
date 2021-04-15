<template>
  <el-container>
    <el-aside width="200px">
      <ul class="nav">
        <router-link tag="li" to="/discovery">
          <i class="iconfont icon-yinle1"></i>发现音乐
        </router-link>
        <router-link tag="li" to="/playlist">
          <i class="iconfont icon-gedan"></i>推荐歌单
        </router-link>
        <router-link tag="li" to="/music">
          <i class="iconfont icon-yinle"></i>最新音乐
        </router-link>
        <router-link tag="li" to="/mv">
          <i class="iconfont icon-mv"></i>最新MV
        </router-link>
      </ul>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style scoped>
.el-container {
  flex: 1;
  overflow: auto;
}
.el-aside {
  background-color: #ededed;
}
.el-main {
  padding: 10px 20px;
}

.el-main > div {
  max-width: 1100px;
  margin: 0 auto;
}
/* 导航样式 */
.nav li {
  list-style: none;
  padding-left: 30px;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  cursor: pointer;
}
.nav li:hover {
  background-color: #e7e7e7;
}
.nav li .iconfont {
  margin-right: 10px;
  font-size: 20px;
}
.nav .router-link-active {
  color: #dd6d60;
}
</style>