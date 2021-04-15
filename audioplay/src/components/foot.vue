<template>
  <el-footer>
    <audio :src="musicUrl" controls autoplay></audio>
  </el-footer>
</template>

<script>
export default {
  name: "foot",
  computed: {
    musicUrl() {
      return this.$store.state.musicUrl;
    }
  }
};
</script>

<style scoped>
.el-footer {
  background-color: #f1f3f4;
  padding: 0;
}
audio {
  width: 100%;
}
</style>