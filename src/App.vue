<template>
  <div id="app">
    <router-view

    />
  </div>
</template>
<script>
import * as Api from "@/api/Api.js";

Api.initialize();
export default {
  data(){
    return{

    }
  },
  methods:{

  }
  
}
</script>
<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: fixed;
  top:0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: linear-gradient(rgba(255,255,255,.6),rgba(96, 155, 114, 0.507));

 // color: #2c3e50;
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
