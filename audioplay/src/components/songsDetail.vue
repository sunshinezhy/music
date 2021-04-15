<template>
  <div class="wrap">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="ge.coverImgUrl" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ge.name}}</p>
        <div class="author-wrap">
          <img class="avatar" :src="creator.avatarUrl" />
          <span class="name">{{creator.nickname}}</span>
          <span class="time">{{$moment(ge.updateTime).format('YYYY-MM-DD')}} 创建</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item,index) in list" :key="index">
              {{item}}
              <span v-if="index<list.length-1" style="padding: 0;margin: 0;">/</span>
            </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介：</span>
          <span class="desc">{{creator.signature}}</span>
        </div>
      </div>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲列表" name="songslist">
        <el-table :data="tableData" style="width:100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column width="130px">
            <template slot-scope="scope">
              <div class="img-wrap">
                <img :src="scope.row.al.picUrl" class="pic" />
                <i class="el-icon-caret-right" @click="getUrl(scope.row.id)"></i>
              </div>
            </template>
          </el-table-column>
          <!--  @click="toMv(scope.row.mvid)" -->
          <el-table-column label="音乐标题" width="300px">
            <!-- <i class="iconfont icon-winfo-icon-bofang" v-if="mv>0" 
                style="color:#dd6b60;
            margin-left: 5px;width:10px;height:8px">-->
            <template slot-scope="scope">
              <p style="display: inline-block;">{{scope.row.name}}</p>
              <i
                class="iconfont icon-winfo-icon-bofang"
                v-if="scope.row.mv"
                @click="toMv(scope.row.al.id)"
                style="color:#dd6b60;
                            margin-left: 5px;width:10px;height:8px"
              ></i>
            </template>
          </el-table-column>
          <el-table-column label="歌手" prop="ar[0].name" width="180px"></el-table-column>
          <el-table-column label="专辑" prop="al.name" width="300px"></el-table-column>
          <el-table-column label="时长" prop="dt" width="140px" :formatter="filterTime"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="this.zong" name="comment">
        <div class="comment-wrap" v-if="this.remen.length>0">
          <p class="title">
            热门评论
            <span class="number">({{this.remen.length}})</span>
          </p>
          <div class="comments-wrap" v-for="item in remen" :key="item.commentId">
            <div
              class="item"
              style=" display: flex;padding-top: 20px;"
              v-if="item.beReplied.length<1"
            >
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" />
              </div>
              <div class="content-wrap">
                <div class="content" style="margin-bottom: 10px;">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="date">{{$moment(item.time).format('YYYY-MM-DD hh:mm:ss')}}</div>
              </div>
            </div>
            <div class="item" style=" display: flex;padding-top: 20px;" v-else>
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" />
              </div>
              <div class="content-wrap">
                <div class="content" style="margin-bottom: 10px;">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div
                  class="re-content"
                  style="padding:10px;background-color:#e6e5e6;
                                                                border-radius:5px;"
                >
                  <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">{{$moment(item.time).format('YYYY-MM-DD hh:mm:ss')}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="comment-wrap">
          <p class="title">
            最新评论
            <span class="number">({{this.length}})</span>
          </p>
          <div class="comments-wrap" v-for="item in zuixin" :key="item.commentId">
            <div
              class="item"
              style=" display: flex;padding-top: 20px;"
              v-if="item.beReplied.length<1"
            >
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" />
              </div>
              <div class="content-wrap">
                <div class="content" style="margin-bottom: 10px;">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="date">{{$moment(item.time).format('YYYY-MM-DD hh:mm:ss')}}</div>
              </div>
            </div>
            <div class="item" style=" display: flex;padding-top: 20px;" v-else>
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" />
              </div>
              <div class="content-wrap">
                <div class="content" style="margin-bottom: 10px;">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div
                  class="re-content"
                  style="padding:10px;background-color:#e6e5e6;
                                                            border-radius:5px;"
                >
                  <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">{{$moment(item.time).format('YYYY-MM-DD hh:mm:ss')}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="el-pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next"
            :page-size="pagesize"
            :total="length"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "details",
  data() {
    return {
      ge: {},
      //geshou:{},
      // gedan:[{
      //    // id:"",
      //     coverImgUrl:"",
      //     name:"",
      //     avatarUrl:"",
      //     nickname:"",
      //     signature:""
      // }],
      //songs:[],
      list: [],
      length: null, //分组总页数
      pagesize: 5, //每页的数据数量
      currentPage: 1, //页码
      activeName: "songslist",
      tableData: [],
      zuixin: [],
      remen: [],
      zong: null,
      creator: ""
    };
  },
  created() {
    //访问歌曲数据
    this.$axios
      .get("https://autumnfish.cn/playlist/detail", {
        params: {
          id: this.$route.query.id
        }
      })
      .then(res => {
        console.log(res);
        this.ge = res.data.playlist;
        this.list = res.data.playlist.tags;
        this.tableData = res.data.playlist.tracks;
        this.creator = res.data.playlist.creator;
      }),
      //热门评论
      this.$axios
        .get("https://autumnfish.cn/comment/playlist", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(res => {
          console.log(res);
          this.remen = res.data.hotComments;
        }),
      //最新评论
      this.$axios
        .get("https://autumnfish.cn/comment/playlist", {
          params: {
            id: this.$route.query.id,
            limit: 5,
            offset: (this.currentPage - 1) * 5
          }
        })
        .then(res => {
          console.log(res);
          this.length = null;
          this.zuixin = null;
          this.zuixin = res.data.comments;
          this.length = res.data.total;
          this.zong = "评论（" + (this.length + this.remen.length) + ")";
          //    console.log(this.zong)
          //  console.log(this.remen.length)
          //  console.log(this.zuixin.length)
        });
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      //console.log(this.$route.query.id)
    },
    toMv(id) {
      this.$router.push("/mvDetail?id=" + id);
    },
    getUrl(id) {
      this.$store.commit("getUrl", id);
    },
    filterTime(row, column, cellValue, index) {
      //return cellValue
      var mm = parseInt(cellValue / 1000 / 60);
      mm = mm >= 10 ? mm : "0" + mm;
      var ss = parseInt((cellValue / 1000) % 60);
      ss = ss >= 10 ? ss : "0" + ss;
      return mm + ":" + ss;
    },
    handleCurrentChange: function(currentPage) {
      //点击第几页
      this.currentPage = currentPage;
      console.log(this.currentPage);
      //重新访问数据，即获取所点击页码要展示的数据
      this.$axios
        .get("https://autumnfish.cn/comment/playlist", {
          params: {
            id: this.$route.query.id,
            limit: 5,
            offset: (this.currentPage - 1) * 5
          }
        })
        .then(res => {
          console.log(res);
          this.zuixin = res.data.comments;
          this.length = res.data.total;
        });
    }
  }
};
</script>
<style scoped>
ul {
  list-style: none;
}
.top-wrap {
  display: flex;
}
.top-wrap span {
  font-size: 17px;
}
.top-wrap .img-wrap {
  margin-right: 30px;
  width: 230px;
  height: 234px;
}
.top-wrap .img-wrap img {
  width: 230px;
  height: 230px;
}
.info-wrap {
  width: 754px;
  height: 234px;
}
.info-wrap > p {
  margin-bottom: 20px;
}
.top-wrap .info-wrap title {
  margin-bottom: 20px;
  width: 100%;
  height: 21px;
}
.top-wrap .info-wrap .author-wrap {
  width: 100%;
  height: 35px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 25px;
}
.top-wrap .info-wrap .author-wrap img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}
.top-wrap .info-wrap .author-wrap .name {
  margin-right: 10px;
}
.top-wrap .info-wrap .author-wrap .time {
  font-size: 14px;
}
.top-wrap .info-wrap .tag-wrap {
  display: flex;
  margin-bottom: 15px;
  width: 100%;
  height: 23px;
  align-items: flex-end;
}
.top-wrap .info-wrap span:first-child {
  margin-right: 10px;
}
.top-wrap .info-wrap .tag-wrap li {
  margin-right: 5px;
  font-size: 15px;
  display: inline-block;
}
.top-wrap .info-wrap .desc-wrap {
  width: 100%;
  height: 83px;
}
.top-wrap .info-wrap .desc-wrap span:last-child {
  font-size: 15px;
}

.wrap >>> .el-tabs__item.is-active {
  color: salmon;
}
.wrap >>> .el-tabs__active-bar {
  background-color: salmon;
}
.wrap >>> .el-tabs__item {
  font-size: 18px;
}
.wrap >>> .el-tabs__item:hover {
  color: salmon;
}

.pic {
  width: 70px;
  height: 70px;
  border-radius: 5px;
  display: block;
}
.img-wrap {
  position: relative;
  width: 70px;
}
.img-wrap .el-icon-caret-right {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: #dd6b60;
  font-size: 25px;
  border-radius: 50%;
  background: hsla(0, 0%, 100%, 0.8);
  display: flex;
  justify-content: center;
}
.tab-bar {
  list-style: none;
  display: flex;
  justify-content: flex-end;
}
.tab-bar li {
  font-size: 15px;
  margin-right: 20px;
  cursor: pointer;
}
.tab-bar li.active {
  color: salmon;
}

.comment-wrap {
  width: 100%;
  height: auto;
  margin-bottom: 70px;
}
.comment-wrap .title {
  font-size: 20px;
}
.comment-wrap .title .number {
  font-size: 15px;
}
.commments-wrap {
  width: 100%;
  height: 85px;
  display: flex;
}
.comment-wrap .commments-wrap .item {
  display: flex;
  padding-top: 20px;
}
.comment-wrap .item .icon-wrap {
  width: 50px;
  height: 65px;
  margin-right: 15px;
}
.comment-wrap .item .icon-wrap img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.comment-wrap .item .content-wrap {
  width: 930px;
  height: 65px;
  padding-bottom: 20px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.comment-wrap .commments-wrap .item .content-wrap .content {
  width: 930px;
  height: 19px;
  margin-bottom: 10px;
}
.comment-wrap .item .content-wrap .name {
  color: #517eaf;
  font-size: 14px;
}
.comment-wrap .item .content-wrap .comment {
  font-size: 14px;
}
.comment-wrap .item .date {
  width: 930px;
  height: 16px;
  color: #bebebe;
  font-size: 14px;
}

.el-pagination {
  margin-top: 30px;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
}
.wrap >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #dd6d60;
}
.wrap >>> .el-pagination.is-background .el-pager li:hover {
  color: #dd6d60;
}
</style>