<template>
  <div class="mv-container">
    <!-- mv详情 -->
    <div class="left">
      <!-- mv详情 播放页面 -->
      <h3 class="title">mv详情</h3>
      <video controls="controls" :src="playmv"></video>

      <!-- mv详情 简介 -->

      <div class="info-wrap">
        <div class="singer-info">
          <img :src="artistUrl" alt />
          <span class="name">{{detailmv.artistName}}</span>
        </div>

        <h2 class="title">{{detailmv.name}}</h2>
        <div class="footer-info">
          <span class="time">发布：{{detailmv.publishTime}}</span>
          <span class="count">播放：{{detailmv.playCount | filterNum}}次</span>
        </div>
        <p class="desc">{{detailmv.desc}}</p>
      </div>
      <!-- 评论区 -->
      <div class="comment-wrap" v-if="hotcomment.length>0">
        <p class="title">
          热门评论
          <span>({{hotcomment.length}})</span>
        </p>
        <ul class="comments">
          <li class="item" v-for="item in hotcomment" :key="item.id">
            <img :src="item.user.avatarUrl" alt />
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length>0">
                <span class="name">{{item.beReplied[0].user.nickname}}</span>
                <span class="comment">{{item.beReplied[0].content}}</span>
              </div>

              <div class="date">{{$moment(item.time).format('YYYY-MM-DD hh:mm:ss')}}</div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap" v-if="comment.length>0">
        <p class="title">
          最新评论
          <span>({{comment.length}})</span>
        </p>
        <ul class="comments">
          <li class="item" v-for="item in comment" :key="item.commentId">
            <img :src="item.user.avatarUrl" alt />
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length>0">
                <span class="name">{{item.beReplied[0].user.nickname}}</span>
                <span class="comment">{{item.beReplied[0].content}}</span>
              </div>
              <!-- <div class="date">{{item.time}}</div> -->
              <div class="date">{{$moment(item.time).format('YYYY-MM-DD hh:mm:ss')}}</div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next"
        :page-size="pagesize"
        :total="length"
      >
        <!-- layout="prev, pager, next"
        :total="1000"-->
      </el-pagination>
      <!-- <el-pagination background
                layout="prev, pager, next"
                :total="length"
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
                >
      </el-pagination>-->
    </div>
    <!-- 相关推荐 -->
    <div class="right">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <ul class="mv">
          <li v-for="item in listmv" :key="item.id" @click="toMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <p class="count">
                <i class="iconfont icon-bofang"></i>
                <span>{{item.playCount | filterNum}}</span>
              </p>
              <i class="iconfont icon-bofang"></i>
              <p class="duration">{{item.duration | filterTime}}</p>
            </div>
            <div class="info-wrap">
              <p class="name">{{item.name}}</p>
              <p class="singer">{{item.artistName}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "playmv",
  data() {
    return {
      id: "", //mvid
      length: null, //分组总页数
      pagesize: 5, //每页的数据数量
      currentPage: 1,
      playmv: [], //播放mv
      artistUrl: "", //歌手头像
      listmv: [], //相关推荐
      detailmv: {}, //mv详情
      hotcomment: [], //热门评论
      comment: [], //最新评论
      length: 0 //分组总页数
      // pageSize:5, //每页的数据数量
      // currentPage:1 //当前页码
    };
  },
  methods: {
    toMv(id) {
      this.id = id;
      this.getData();
    },
    getData() {
      //mv播放
      this.$axios
        .get("https://autumnfish.cn/mv/url", {
          params: {
            id: this.id
          }
        })
        .then(res => {
          console.log(this.id);
          console.log(res);
          this.playmv = res.data.data.url;
        });
      //mv详情接口
      this.$axios
        .get("https://autumnfish.cn/mv/detail", {
          params: {
            mvid: this.id
          }
        })
        .then(res => {
          console.log(res);
          this.detailmv = res.data.data;

          //歌手头像
          this.$axios
            .get("https://autumnfish.cn/artists", {
              params: {
                id: this.detailmv.artistId
              }
            })
            .then(res => {
              console.log(res);
              this.artistUrl = res.data.artist.img1v1Url;
            });
        });
      //相关mv接口
      this.$axios
        .get("https://autumnfish.cn/simi/mv", {
          params: {
            mvid: this.id
          }
        })
        .then(res => {
          console.log(res);
          this.listmv = res.data.mvs;
          // // this.$axios.get('https://autumnfish.cn/artists',{
          // //     params:{
          // //         id:this.id
          //     }
          // })
        });
      //mv评论 热门评论
      this.$axios
        .get("https://autumnfish.cn/comment/mv", {
          params: {
            id: this.id
          }
        })
        .then(res => {
          console.log(res);
          this.hotcomment = res.data.hotComments;
        });
      //mv评论 最新评论
      this.$axios
        .get("https://autumnfish.cn/comment/mv", {
          params: {
            id: this.id,
            limit: 5,
            offset: (this.currentPage - 1) * 5
          }
        })
        .then(res => {
          console.log(res);
          this.comment = res.data.comments;
          this.length = res.data.total;
        });
    },
    handleCurrentChange: function(currentPage) {
      //点击第几页
      this.currentPage = currentPage;
      //console.log(this.currentPage)
      //重新访问数据，即获取所点击页码要展示的数据
      this.$axios
        .get("https://autumnfish.cn/comment/mv", {
          params: {
            id: this.id,
            limit: 5,
            offset: (this.currentPage - 1) * 5
          }
        })
        .then(res => {
          //console.log(res)
          this.comment = res.data.comments;
          this.length = res.data.total;
        });
    }
  },
  created() {
    this.id = this.$route.query.id;
    console.log(this.$route.query.id);
    this.getData();
  },
  //过滤器
  filters: {
    //时长
    filterTime(val) {
      console.log(val);
      var mm = parseInt(val / 1000 / 60);
      mm = mm >= 10 ? mm : "0" + mm;
      var ss = parseInt((val / 1000) % 60);
      ss = ss >= 10 ? ss : "0" + ss;
      return mm + ":" + ss;
    },
    filterNum(val) {
      return val / 10000 > 10 ? parseInt(val / 10000) + "万" : val;
    }
  }
};
</script>
<style  scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.mv-container {
  display: flex;
}
/* mv详情 播放页面*/
.left {
  margin-right: 35px;
  width: 700px;
}
.left .title {
  margin-bottom: 20px;
}
.left video {
  width: 100%;
  height: 390px;
  margin-bottom: 20px;
  outline: none;
  border-radius: 5px;
}
/* mv详情 简介 */
.singer-info {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
}
.singer-info img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
}
.info-wrap {
  margin-bottom: 50px;
}
.info-wrap .title {
  font-size: 30px;
}
.info-wrap .footer-info {
  color: #bebebe;
  font-size: 14px;
}
.info-wrap .footer-info .time {
  margin-right: 25px;
}
.info-wrap p {
  font-size: 15px;
  margin-top: 20px;
}
/* 评论区样式 */
.comment-wrap .title {
  font-size: 25px;
}
.comment-wrap .title span {
  font-size: 20px;
}
.comments {
  list-style: none;
}
.comments .item {
  display: flex;
  padding-top: 20px;
}
.comments .item img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.comments .content-wrap {
  margin-left: 20px;
  padding-bottom: 20px;
  font-size: 14px;
}
.comments .content,
.re-content {
  margin-bottom: 10px;
}
.comments .content .name,
.re-content .name {
  color: #517eaf;
}
.comments .date {
  color: #bebebe;
}
.comments .re-content {
  padding: 10px;
  background-color: #e6e5e6;
  border-radius: 5px;
}
/* 相关推荐 */
.right {
  flex: 1;
  height: 500px;
}
.right .title {
  margin-bottom: 20px;
}
.mvs {
  padding: 10px;
  display: flex;
  align-items: center;
}
.mv li {
  height: 125px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;

  cursor: pointer;
}
.mv .img-wrap {
  width: 180px;
  position: relative;
  margin-right: 10px;
}
.mv img {
  width: 180px;
  height: 102px;
  border-radius: 5px;
}
.mv .count {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  color: #ffffff;
  font-size: 15px;
  padding: 2px 5px 0 0;
}
.mv .count > .icon-bofang {
  font-size: 12px;
  margin-right: 5px;
}
.mv .duration {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #fff;
  font-size: 15px;
}
.img-wrap > .icon-bofang {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  color: #dd6d60;
  background-color: hsla(0, 0%, 100%, 0.8);
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  opacity: 0;
}
.img-wrap:hover > .icon-bofang {
  opacity: 1;
  transition: all 0.5s;
}
.info-wrap {
  -webkit-box-flex: 1;
  flex: 1;
}
.info-wrap .name {
  font-size: 15px;
}
.info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
  margin: 0;
}
/* 分页器 */
.el-pagination {
  margin-top: 50px;
  text-align: center;
}
.mv-container
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #dd6d60;
}
</style>