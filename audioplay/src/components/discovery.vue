<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="230px">
      <el-carousel-item v-for="(item,index) in lb" :key="index">
        <img :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel>
    <!-- 标题 -->
    <h3 class="title">推荐歌单</h3>
    <!-- 推荐歌单 -->
    <ul class="recommend">
      <li v-for="(item,index) in gd" :key="index">
        <div class="img-wrap" @click="toSongs(item.id)">
          <div class="desc">{{ item.copywriter}}</div>
          <img :src="item.picUrl" alt />
          <i class="iconfont icon-bofang"></i>
          <p class="name">{{ item.name }}</p>
        </div>
      </li>
    </ul>
    <h3 class="title">最新音乐</h3>
    <!-- 最新音乐 -->
    <ul class="music">
      <li v-for="(item,index) in zy" :key="index">
        <div class="img-wrap" @click="getUrl(item.id)">
          <img :src="item.picUrl" alt />
          <i class="iconfont icon-bofang"></i>
        </div>
        <div class="info-wrap">
          <p class="name">{{item.name}}</p>
          <p class="singer">{{item.song.artists[0].name}}</p>
        </div>
      </li>
    </ul>
    <h3 class="title">推荐MV</h3>
    <!-- 推荐MV -->
    <ul class="mv">
      <li v-for="(item,index) in mv" :key="index">
        <div class="img-wrap" @click="toMv(item.id)">
          <p class="num-wrap">
            <i class="iconfont icon-shouqi-copy"></i>
            {{item.playCount}}
          </p>
          <img :src="item.picUrl" alt />
          <i class="iconfont icon-bofang"></i>
        </div>
        <p class="name">{{ item.copywriter }}</p>
        <p class="singer">{{ item.artistName }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "discovery",
  data() {
    return {
      lb: "",
      gd: "",
      zy: "",
      mv: "",
      musicUrl: ""
    };
  },
  created: function() {
    // 轮播图
    axios
      .get("https://autumnfish.cn/banner", {
        params: {}
      })
      .then(res => {
        this.lb = res.data.banners;
        //   console.log(res.data.banners)
      });
    // 推荐歌单
    axios
      .get("https://autumnfish.cn/personalized", {
        params: {
          limit: 10
        }
      })
      .then(res => {
        // console.log(res.data.result)
        this.gd = res.data.result;
      });
    // 最新音乐
    axios
      .get("https://autumnfish.cn/personalized/newsong", {
        params: {}
      })
      .then(res => {
        // console.log(res.data.result)
        this.zy = res.data.result;
      });

    // 最新MV
    axios
      .get("https://autumnfish.cn/personalized/mv", {
        params: {}
      })
      .then(res => {
        // console.log(res.data.result)
        this.mv = res.data.result;
      });
  },
  methods: {
    toSongs(id) {
      this.$router.push("/songsDetail?id=" + id);
    },
    toMv(id) {
      this.$router.push("/mvDetail?id=" + id);
    },
    getUrl(id) {
      this.$store.commit("getUrl", id);
    }
  }
};
</script>

<style scoped>
/* 走马灯 */
.el-carousel__item img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
/* 标题 */
.title {
  font-weight: normal;
  margin-bottom: 20px;
  padding-left: 8px;
}
ul {
  list-style: none;
}
/* 推荐歌单 */
.recommend {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
.recommend li {
  width: 200px;
  margin: 10px;
  overflow: hidden;
}

.recommend img {
  width: 200px;
  height: 200px;
}

.recommend .name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 14px;
}
.recommend .img-wrap {
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.recommend .desc {
  box-sizing: border-box;
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
.recommend li:hover .desc {
  top: 0;
  transition: all 0.5s;
}
.recommend .icon-bofang {
  position: absolute;
  right: 10px;
  bottom: 25px;
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

.recommend li:hover .icon-bofang {
  opacity: 1;
  transition: all 0.5s;
}

/* 最新音乐 */
.music {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.music img {
  width: 80px;
  height: 80px;
}

.music li {
  box-sizing: border-box;
  width: 50%;
  height: 100px;
  padding-left: 15px;
  display: flex;
  align-items: center;
}

.music li:hover {
  background-color: #f5f5f5;
}

.music .info-wrap {
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.music .singer {
  font-size: 14px;
  color: #808080;
}

.music .img-wrap {
  position: relative;
}

.music .img-wrap .icon-bofang {
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

.music .img-wrap:hover .icon-bofang {
  opacity: 1;
  transition: all 0.5s;
}
/* 推荐MV */
.mv {
  display: flex;
  justify-content: space-around;
}

.mv li {
  width: 250px;
  cursor: pointer;
}

.mv .img-wrap {
  width: 100%;
  position: relative;
}

.mv img {
  width: 100%;
  border-radius: 5px;
}

.mv .name {
  font-size: 15px;
  margin-bottom: 5px;
}

.mv .singer {
  font-size: 14px;
  color: #c5c5c5;
}

.mv .num-wrap {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  padding: 2px 5px 0 0;
  font-size: 15px;
}

.mv .num-wrap .icon-shouqi-copy {
  margin-right: 5px;
}

.mv .img-wrap .icon-bofang {
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

.mv .img-wrap:hover .icon-bofang {
  opacity: 1;
  position: all 0.5s;
}
</style>