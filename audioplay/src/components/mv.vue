<template>
  <div class="wrap">
    <!-- 导航 -->
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li
            v-for="(item,index) in region"
            :key="index"
            :class="{active: item == tag}"
            @click="tag=item"
          >{{item}}</li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li
            v-for="(item,index) in type"
            :key="index"
            :class="{active: item == typeTag}"
            @click="typeTag=item"
          >{{item}}</li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li
            v-for="(item,index) in sort"
            :key="index"
            :class="{active: item == sortTag}"
            @click="sortTag=item"
          >{{item}}</li>
        </ul>
      </div>
    </div>
    <!-- 主体 -->
    <div class="mvs">
      <ul class="mv">
        <li v-for="(item,index) in mv" :key="index" @click="toMv(item.id)">
          <div class="img-wrap">
            <p class="num-wrap">
              <i class="iconfont icon-shouqi-copy"></i>
              {{item.playCount | filterNum}}
            </p>
            <img :src="item.cover" alt />
            <i class="iconfont icon-bofang"></i>
          </div>
          <p class="name">{{item.name}}</p>
        </li>
      </ul>
    </div>
    <!-- 底 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
      @current-change="mvCurrentPage"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mv",
  data() {
    return {
      region: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      tag: "全部",
      type: ["全部", "官方版", "原声", "现场版", "网易出品"],
      typeTag: "全部",
      sort: ["上升最快", "最热", "最新"],
      sortTag: "上升最快",
      mv: [],
      total: 0,
      // 当前页
      currentPage: 1
    };
  },
  methods: {
    toMv(id) {
      this.$router.push("/mvDetail?id=" + id);
    },
    // 请求全部数据
    mvlist() {
      axios
        .get("https://autumnfish.cn/mv/all", {
          params: {
            limit: 12,
            offset: (this.currentPage - 1) * 12,
            area: this.tag,
            type: this.typeTag,
            order: this.sortTag
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.count) {
            this.total = res.data.count;
          }
          this.mv = res.data.data;
        });
    },
    mvCurrentPage(val) {
      console.log(val);
      this.currentPage = val;
      axios
        .get("https://autumnfish.cn/mv/all", {
          params: {
            limit: 12,
            offset: (val - 1) * 12,
            area: this.tag,
            type: this.typeTag,
            order: this.sortTag
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.count) {
            this.total = res.data.count;
          }
          this.mv = res.data.data;
        });
    }
  },
  created() {
    this.mvlist();
  },
  watch: {
    tag() {
      this.currentPage = 1;
      this.mvlist();
    },
    typeTag() {
      this.currentPage = 1;
      this.mvlist();
    },
    sortTag() {
      this.currentPage = 1;
      this.mvlist();
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

.filter-wrap {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
}

.filter-wrap > div {
  margin-bottom: 30px;
  vertical-align: baseline;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.filter-wrap > div span {
  font-size: 14px;
  height: 100%;
}

.filter-wrap > div ul {
  display: flex;
}

.filter-wrap > div ul li:not(:last-child) {
  border-right: 1px solid #f2f2f1;
}

.filter-wrap > div li {
  color: grey;
  cursor: pointer;
  padding: 5px 20px;
  font-size: 14px;
}

.filter-wrap > div li.active {
  color: #dd6d60;
  background-color: #fcf6f5;
  border-radius: 20px;
}

/* 主体 */

.mvs .mv li {
  width: 250px;
  cursor: pointer;
}

.mvs .mv .img-wrap img {
  width: 100%;
  height: 140px;
  border-radius: 5px;
}

.mvs .mv {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.mvs .mv .img-wrap {
  width: 100%;
  position: relative;
}

.mvs .mv img {
  width: 100%;
  border-radius: 5px;
}

.mvs .mv .name {
  font-size: 15px;
  margin-bottom: 5px;
}

.mvs .mv .num-wrap {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  padding: 2px 5px 0 0;
  font-size: 15px;
}

.mvs .mv .num-wrap .icon-shouqi-copy {
  margin-right: 5px;
}

.mvs .mv .img-wrap .icon-bofang {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
  cursor: pointer;
}

.mvs .mv .img-wrap:hover .icon-bofang {
  opacity: 1;
  position: all 0.5s;
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