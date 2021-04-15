<template>
  <div class="wrap">
    <!-- 头部标签 -->
    <div class="top-card" v-if="tp">
      <div class="img-wrap">
        <img :src="tp.coverImgUrl" alt />
      </div>
      <div class="content-wrap">
        <p class="tag">精品歌单</p>
        <p class="title">{{tp.name}}</p>
        <p class="info">{{tp.description}}</p>
      </div>
      <img :src="tp.coverImgUrl" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <!-- 主体内容 -->
    <div class="tab-container">
      <ul class="tab-bar">
        <li
          v-for="item in tagArr"
          :key="item.id"
          :class="{active:item == tag}"
          @click=" tag=item "
        >{{item}}</li>
      </ul>
      <ul class="img-wrap">
        <li v-for="(item,index) in playlists" :key="index" @click="toSongs(item.id)">
          <div class="desc">播放量：{{ item.playCount | filterNum }}</div>
          <img :src="item.coverImgUrl" alt />
          <i class="iconfont icon-bofang"></i>
          <p class="name">{{item.description}}</p>
        </li>
      </ul>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrent"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "playlist",
  data() {
    return {
      tp: {},
      tagArr: [
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
        "治愈",
        "旅行"
      ],
      tag: "全部",
      playlists: "",
      total: 0,
      // 当前页
      currentPage: 1
    };
  },
  created: function() {
    // 精品歌单
    this.getTopList(),
      // 歌单列表
      this.getPlayLists();
  },
  watch: {
    tag() {
      this.currentPage = 1;
      // 精品歌单
      this.getTopList(),
        // 歌单列表
        this.getPlayLists();
    }
  },
  methods: {
    toSongs(id) {
      this.$router.push("/songsDetail?id=" + id);
    },
    // 获取精品歌单
    getTopList() {
      axios
        .get("https://autumnfish.cn/top/playlist/highquality", {
          params: {
            limit: 1,
            cat: this.tag
          }
        })
        .then(res => {
          // console.log(res)
          if (res.data.more) {
            this.tp = res.data.playlists[0];
          } else {
            this.tp = false;
          }
        });
    },
    // 获取歌单列表
    getPlayLists() {
      axios
        .get("https://autumnfish.cn/top/playlist", {
          params: {
            limit: 10,
            offset: (this.currentPage - 1) * 10,
            cat: this.tag
          }
        })
        .then(res => {
          console.log(res);
          this.playlists = res.data.playlists;
          this.total = res.data.total;
        });
    },

    handleCurrent(val) {
      console.log(val);
      this.currentPage = val;
      this.getPlayLists();
    }
  },
  // 局部过滤器
  filters: {
    filterNum(val) {
      var res = val / 10000;
      console.log(res);
      return res > 10 ? parseInt(res) + "万" : val;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}

.top-card {
  display: flex;
  padding: 20px;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

.top-card .img-wrap {
  margin-right: 10px;
  z-index: 1;
}

.top-card .img-wrap img {
  width: 160px;
  height: 160px;
}

.top-card .content-wrap {
  z-index: 1;
}

.top-card .content-wrap .tag {
  color: #dfac67;
  border: 1px solid #dfac67;
  width: 100px;
  height: 30px;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
  line-height: 30px;
  cursor: pointer;
}

.top-card .content-wrap .title {
  color: #fff;
  padding-top: 10px;
}

.top-card .content-wrap .info {
  color: #888482;
  font-size: 14px;
  padding-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}

.top-card .bg {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-filter: blur(20px);
  filter: blur(20px);
}

.top-card .bg-mask {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.tab-container {
  padding-top: 30px;
}

.tab-container .tab-bar {
  display: flex;
  justify-content: flex-end;
}

.tab-container .tab-bar li {
  font-size: 15px;
  color: grey;
  margin-right: 20px;
  cursor: pointer;
}

.tab-container .tab-bar li.active {
  color: #dd6d60;
}

.tab-container .img-wrap {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
  margin-top: 20px;
}

.tab-container .img-wrap li {
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.tab-container .img-wrap li img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}

.tab-container .img-wrap li {
  width: 200px;
  margin: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.tab-container .img-wrap li .name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
}

.tab-container .img-wrap li .desc {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 14px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  max-height: 50px;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  top: -50px;
}

.tab-container .img-wrap li:hover .desc {
  top: 0;
  transition: all 0.5s;
}

.tab-container .img-wrap li .icon-bofang {
  position: absolute;
  right: 5px;
  bottom: 50px;
  width: 35px;
  height: 35px;
  color: #dd6d60;
  font-size: 25px;
  border-radius: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: hsla(0, 0%, 100%, 0.8);
  opacity: 0;
}

.tab-container .img-wrap li:hover .icon-bofang {
  opacity: 1;
  transition: all 0.5s;
}

.tab-container .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #dd6d60;
  color: #fff;
}

.el-pagination {
  margin-top: 50px;
  text-align: center;
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
}

.wrap >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #dd6d60;
}
</style>