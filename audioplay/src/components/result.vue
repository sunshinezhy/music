<template>
  <div class="result-wrap">
    <div class="title-wrap">
      <h2>{{$route.query.keywords}}</h2>
      <p class="sub-title">找到{{songCount}}个结果</p>
    </div>
    <!-- tab标签页 -->
    <el-tabs @tab-click="change" v-model="name">
      <el-tab-pane label="歌曲" name="songs">
        <el-table :data="songslist" stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="音乐标题" width="300">
            <template slot-scope="scope">
              <div class="music-title">
                <p class="title" @click="getUrl(scope.row.id)">{{scope.row.name}}</p>
                <i class="iconfont icon-mv" @click="toMv(scope.row.mvid)" v-if="scope.row.mvid"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="歌手" prop="artists[0].name" width="200"></el-table-column>
          <el-table-column label="专辑" prop="album.name" width="450"></el-table-column>
          <el-table-column label="时长" prop="duration" :formatter="filterDate"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="songslist">
        <ul class="uls">
          <li v-for="(item,index) in songslist" :key="index" @click="toSongs(item.id)">
            <div class="img-wrap">
              <img :src="item.coverImgUrl" alt />
              <p>播放量:{{item.playCount | filterNum}}</p>
              <i class="iconfont icon-bofang"></i>
            </div>
            <div class="content">{{item.name}}</div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <ul class="mv uls">
          <li v-for="(item,index) in songslist" :key="index" @click="toMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <p class="num-wrap">
                <i class="iconfont icon-shouqi-copy"></i>
                {{item.playCount | filterNum}}
              </p>
              <i class="iconfont icon-bofang"></i>
              <div class="duration">{{filterDate(0,0,item.duration)}}</div>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="songCount"
      :current-page="currentPage"
      @current-change="rCurrent"
      :page-size="pageSize"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "result",
  data() {
    return {
      // 歌曲列表
      songslist: [],
      // 歌曲数量
      songCount: 0,
      name: "songs",
      songslist: [],
      currentPage: 1,
      // 页容量
      pageSize: 15
    };
  },
  methods: {
    toSongs(id) {
      this.$router.push("/songsDetail?id=" + id);
    },
    toMv(mvid) {
      this.$router.push("/mvDetail?id=" + mvid);
    },
    toMv(id) {
      this.$router.push("/mvDetail?id=" + id);
    },
    change() {
      console.log(this.name);
      if (this.name == "songs") {
        this.pageSize = 15;
        axios
          .get("https://autumnfish.cn/search", {
            params: {
              keywords: this.$route.query.keywords,
              type: 1,
              limit: 15,
              offset: (this.currentPage - 1) * 15
            }
          })
          .then(res => {
            console.log(res);
            this.songslist = res.data.result.songs;
            this.songCount = res.data.result.songCount;
          });
      } else if (this.name == "songslist") {
        this.pageSize = 15;
        axios
          .get("https://autumnfish.cn/search", {
            params: {
              keywords: this.$route.query.keywords,
              type: 1000,
              limit: 15,
              offset: (this.currentPage - 1) * 15
            }
          })
          .then(res => {
            console.log(res);
            this.songCount = res.data.result.playlistCount;
            this.songslist = res.data.result.playlists;
          });
      } else if (this.name == "mv") {
        this.pageSize = 12;
        axios
          .get("https://autumnfish.cn/search", {
            params: {
              keywords: this.$route.query.keywords,
              type: 1004,
              limit: 12,
              offset: (this.currentPage - 1) * 12
            }
          })
          .then(res => {
            console.log(res);
            this.songCount = res.data.result.mvCount;
            this.songslist = res.data.result.mvs;
          });
      }
    },
    // 分页点击事件
    rCurrent(val) {
      console.log(val);
      this.currentPage = val;
      this.change();
    },
    filterDate(row, column, cellValue) {
      var ms = cellValue,
        min = Math.floor((ms / 1000 / 60) << 0),
        sec = Math.floor((ms / 1000) % 60);
      if (sec == 0) {
        return "0" + min + ":00";
      }
      if (sec < 10) {
        return "0" + min + ":0" + sec;
      }
      return "0" + min + ":" + sec;
    },
    getUrl(id) {
      this.$store.commit("getUrl", id);
    }
  },
  created() {
    axios
      .get("https://autumnfish.cn/search", {
        params: {
          keywords: this.$route.query.keywords,
          type: 1,
          limit: 15
        }
      })
      .then(res => {
        console.log(res);
        this.songslist = res.data.result.songs;
        this.songCount = res.data.result.songCount;
      });
  },
  filters: {
    filterNum(val) {
      var res = val / 10000;
      console.log(res);
      return res > 10 ? parseInt(res) + "万" : val;
    }
  },
  watch: {
    $route() {
      this.change();
    }
  }
};
</script>

<style scoped>
.title-wrap {
  margin-bottom: 30px;
  display: flex;
  align-items: flex-end;
}

.sub-title {
  font-size: 15px;
  color: #bebebe;
  margin-left: 10px;
}

/* 标签页 */
.result-wrap >>> .el-tabs__item {
  font-size: 18px;
}

.result-wrap >>> .el-tabs__item.is-active {
  color: #c3473a;
}

.result-wrap >>> .el-tabs__active-bar {
  background-color: #c3473a;
}

.result-wrap >>> .el-tabs__item:hover {
  color: #c3473a;
}

/* 音乐标题样式 */
.music-title {
  display: flex;
}

.music-title .icon-mv {
  padding-left: 5px;
  color: #dd6d60;
}

/* 歌单样式 */
.uls {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.uls li {
  width: 200px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.uls img {
  width: 100%;
  border-radius: 5px;
}

.uls .img-wrap {
  position: relative;
  cursor: pointer;
}

.uls .img-wrap p {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 15px;
  padding-top: 2px;
  padding-right: 5px;
}

.uls .img-wrap .icon-bofang {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background-color: hsla(0, 0%, 100%, 8);
  color: #dd6d60;
  font-size: 24px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  opacity: 0;
}

.uls .img-wrap:hover .icon-bofang {
  opacity: 1;
  transition: all 0.5s;
}

.uls .content {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* MV样式 */
.mv li {
  width: 250px;
}

.mv .duration {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #fff;
  font-size: 15px;
}

.mv .name {
  font-size: 15px;
}

.mv .singer {
  font-size: 14px;
  color: #c5c5c5;
}

/* 分页样式 */
.el-pagination {
  margin-top: 50px;
  text-align: center;
}

.result-wrap
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #dd6d60;
}
</style>