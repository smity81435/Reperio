<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>
<script>
import * as Api from "@/api/Api.js";

Api.initialize();
export default {
  
}
</script>
<style lang="scss">
body{
  background: url("./assets/tabback.png")no-repeat center center;
  background-attachment: fixed;
  background-size: cover;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    //color: #2c3e50;
    &.router-link-exact-active {
      //color: #42b983;
    }
  }
}
</style>
