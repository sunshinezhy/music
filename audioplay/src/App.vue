<template>
  <div id="app">
    <top />
    <index />
    <foot />
  </div>
</template>

<script>
import top from './components/top'
import index from './components/index'
import foot from './components/foot'

export default {
  name: 'App',
  components:{
    top,
    index,
    foot
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
