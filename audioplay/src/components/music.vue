<template>
  <div class="wrap">
    <ul class="tab-bar">
      <li
        v-for="item in tags"
        :key="item.id"
        :class="{ active:item.id==tag }"
        @click="tag = item.id"
      >{{item.name}}</li>
    </ul>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column width="130">
        <template slot-scope="scope">
          <el-image style="width: 70px;height: 70px;" :src="scope.row.album.picUrl" fit="cover"></el-image>
          <i class="iconfont icon-bofang" @click="getUrl(scope.row.id)"></i>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" width="300">
        <template slot-scope="scope">
          <div class="music-title">
            <p class="title">{{scope.row.name}}</p>
            <i class="iconfont icon-mv" v-if="scope.row.mvid" @click="toMv(scope.row.mvid)"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="artists[0].name" label="歌手" width="180"></el-table-column>
      <el-table-column prop="album.name" label="专辑" width="300"></el-table-column>
      <el-table-column prop="duration" :formatter="filterDate" label="时长"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "music",
  data() {
    return {
      tags: [
        {
          name: "全部",
          id: 0
        },
        {
          name: "华语",
          id: 7
        },
        {
          name: "欧美",
          id: 96
        },
        {
          name: "日本",
          id: 8
        },
        {
          name: "韩国",
          id: 16
        }
      ],
      tag: "0",
      tableData: []
    };
  },
  created() {
    this.$axios.get("https://autumnfish.cn/top/song").then(res => {
      console.log(res);
      this.tableData = res.data.data;
    });
  },
  watch: {
    tag() {
      console.log(this.tag);
      this.$axios
        .get("https://autumnfish.cn/top/song", {
          params: {
            type: this.tag
          }
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
        });
    }
  },
  methods: {
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
    },
    toMv(mvid) {
      this.$router.push("/mvDetail?id=" + mvid);
    }
  }
};
</script>

<style scoped>
.tab-bar {
  list-style: none;
  display: flex;
  justify-content: flex-end;
}

.tab-bar li {
  margin-right: 10px;
  color: gray;
  font-size: 15px;
  cursor: pointer;
}

.tab-bar li.active {
  color: #dd6d60;
}

.el-table th,
.el-table tr {
  font-weight: 400;
}

.el-table .cell {
  position: relative;
}

.el-table .icon-bofang {
  position: absolute;
  top: 33px;
  left: 33px;
  width: 25px;
  height: 25px;
  color: #dd6d60;
  font-size: 12px;
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
}

/* 音乐标题样式 */
.music-title {
  display: flex;
}

.music-title .icon-mv {
  padding-left: 5px;
  color: #dd6d60;
}

.wrap >>> .el-table td {
  border-bottom: none;
}

.wrap >>> .el-table th.is-leaf {
  border-bottom: none;
}
</style>