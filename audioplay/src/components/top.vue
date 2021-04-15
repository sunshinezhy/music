<template>
  <el-header>
    <div>
      <i class="iconfont icon-tubiao-" @click="toHome"></i>
      <i class="iconfont icon-quanping" @click="getFullCreeen"></i>
    </div>
    <div class="search-wrap">
      <el-input
        placeholder="搜索"
        prefix-icon="el-icon-search"
        size="small"
        v-model="value"
        @change="toResult"
      ></el-input>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      value: "",
      n: 0
    };
  },
  methods: {
    toResult() {
      // 编程式导航
      this.$router.push("/result?keywords=" + this.value);
    },
    toHome() {
      if ("./discovery" === this.$route.path) {
        return;
      }
      this.$router.push("./discovery");
    },
    //  点击实现全屏和退出全屏
    getFullCreeen() {
      // this.btnStatus = this.btnStatus === 0 ? 1 : 0
      this.n++;
      this.n % 2 == 0
        ? this.outFullCreeen(document)
        : this.inFullCreeen(document.documentElement);
    },

    inFullCreeen(element) {
      let el = element;
      let rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;
      if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
      } else if (typeof window.ActiveXObject != "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    },

    outFullCreeen(element) {
      let el = element;
      let cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;
      if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
      } else if (typeof window.ActiveXObject != "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
}
.search-wrap {
  align-self: center;
}
/* 图标样式 */
.iconfont {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #dd6d60;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  line-height: 18px;
  margin-right: 10px;
}
.iconfont.icon-quanping {
  background-color: #84bb58;
}
</style>