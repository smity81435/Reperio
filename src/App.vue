<template>
  <div id="app">
    <div class="sidebar">
      <h1 class="ghost">REPERIO</h1>
      <h2>{{path}}</h2>
      <br>
      <h2>Visualizations from<br>Spring 2019</h2>
      <ul>
        <router-link class="gothere" tag="li" to="/expo">ATLAS EXPO Ratings</router-link>
        <router-link class="gothere" tag="li" to="/emotions">Our Emotions</router-link>
        <router-link class="gothere" tag="li" to="/birthdates">Our Birthdates</router-link>
        <router-link class="gothere" tag="li" to="/origins">Our Origins</router-link>
        <router-link class="gothere" tag="li" to="/repdisplay">How We Commute</router-link>
        <router-link class="gothere" tag="li" to="/twochart">Money or Time?</router-link>
      </ul>
      <h2>Other Links</h2>
      <ul>
        <router-link class="gothere" tag="li" to="/aboutRep">About Reperio</router-link>
        <router-link class="gothere" tag="li" to="/atlas">About ATLAS</router-link>
        <router-link class="gothere" tag="li" to="/signup">Newsletter</router-link>
      </ul>

    </div>
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
      path: this.$route.name,
    }
  },
  methods:{

  },
  created(){
    document.documentElement.style.overflow = 'hidden';
    this.$store.state.birthData = Api.fetchData("birthdates");
    this.$store.state.mtvData = Api.fetchData("mtv");
    this.$store.state.originsData = Api.fetchData("origins");
    this.$store.state.commuteData = Api.fetchData("commute");
    this.$store.state.emotionsData = Api.fetchData("emotions");
  },
  watch:{
    $route(to){
      this.path=to.name;
    }
  },
}
</script>
<style lang="scss">
.questionheader{
  color: white;
  font-size: 50px;
  text-shadow: 0px 0px 10px black;
  margin-top: 50px;
}
.totalCount{
  position: absolute;
  color:  rgb(17, 236, 116);
  width: 30%;
  margin: auto;
  bottom: 50px;
  
}
.router-link-exact-active{
  color: white;
}
.winning{
  color: rgb(140,241,85);
  font-size: 2em;
}
.ghost{
  position: absolute;
  bottom: 0px;
  right: 20px;
  color: rgba(255,255,255,.1);
  font-size: 50px;


}
.sidebar{
  h2{
    margin-top: 30%;
    font-size: 18px;
    color: white;
  }
  background: linear-gradient(rgba(255,255,255,.05),rgba(156, 255, 172, 0.1));
  width: 15vw;
  ul{
    list-style: none;
    padding: 0px;
    li{
      color: rgba(255,255,255,.4);

    }
  }
}
.gothere{
  transition: all .2s;
  &:hover{
    color: white;
    background: rgb(104,77,103);
    cursor: pointer;
    box-shadow: inset 0px 0px 3px 3px rgba(0,0,0,.1);
  }
  border-radius: 15px;
  width: 80%;
  margin: 10px auto;
}

#app {
   // background: linear-gradient(rgb(135,92,123),rgb(54,57,77));

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: fixed;
  padding: 0px;
  margin: 0px;
  top:0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: linear-gradient(rgb(135,92,123),rgb(54,57,77));
  background-size: cover;
  background-attachment:fixed;
  display: grid;
  grid-template-columns: 1fr 6fr;
  
  //background: linear-gradient(rgba(255,255,255,.6),rgba(96, 155, 114, 0.507));

 // color: #2c3e50;
}
#nav {
  //padding: 30px;
  a {
    font-weight: bold;
    //color: #2c3e50;
    &.router-link-exact-active {
      //color: #42b983;
    }
  }
}
</style>
