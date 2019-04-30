<template>
  <div id="app">
    <div class="warning" v-show="windowW < 800">
    </div>
    <h1 class="ghost">REPERIO</h1>
    <div class="sidebar" v-show="windowW > 800">
      
      <div class="logobox" :class="{spinning: this.$store.state.loading}"></div>
      <h2>{{path}}</h2>
      <br>
      <h2>Visualizations from<br>Spring 2019</h2>
      <ul>
        <router-link class="gothere" tag="li" to="/home">Home</router-link>
        <!-- <router-link class="gothere" tag="li" to="/expo">ATLAS EXPO Ratings</router-link> -->
        <router-link class="gothere" tag="li" to="/emotions">Our Emotions</router-link>
        <router-link class="gothere" tag="li" to="/birthdates">Our Birthdates</router-link>
        <router-link class="gothere" tag="li" to="/origins">Our Origins</router-link>
        <router-link class="gothere" tag="li" to="/repdisplay">How We Commute</router-link>
        <router-link class="gothere" tag="li" to="/twochart">Money or Time?</router-link>
      </ul>
      <h2>Other Links</h2>
      <ul>
        <router-link class="gothere" tag="li" to="/aboutreperio">About</router-link>
        <router-link class="gothere" tag="li" to="/inquiries">Inquiries</router-link>
        <li class="gothere" ><a href="http://dpower3.wordpress.com" target="_blank">Process</a></li>
      </ul>
    </div>
    <transition name="component-fade" mode="out-in">
      <router-view class="therest"/>
    </transition>
  </div>
</template>
<script>
// import logo from '@/assets/logo.png';
// import stop from '@/assets/stop.png';
import * as Api from "@/api/Api.js";
//import * as d3 from 'd3'
//var d3 = require('d3');
Api.initialize();
export default {
  components:{
  },
  data(){
    return{
      path: this.$route.name,
      loading: false,
      desktop: true,
      windowW: 900,
    }
  },
  methods:{

  },
  beforeCreate(){
      this.$store.state.birthData = Api.fetchData("birthdates");
      this.$store.state.mtvData = Api.fetchData("mtv");
      this.$store.state.originsData = Api.fetchData("origins");
      this.$store.state.commuteData = Api.fetchData("commute");
      this.$store.state.emotionsData = Api.fetchData("emotions");
  },
  created(){
    document.documentElement.style.overflow = 'hidden';
    
  },
  mounted(){
    // this.$nextTick(() => {
    //   window.addEventListener('resize', () => {
    //     this.windowW = window.innerWidth
    //   });
    // });
    this.$router.beforeResolve((to,from,next)=>{
      this.$store.state.loading=true;
      next()
    });
  },
  watch:{
    $route(to){
      this.path=to.name;
    }
  },
}
</script>
<style lang="scss">
//menu
.sidebar {
  position: fixed;
  left: 0px;
  height: 100vh;
  width: 100vw/7;
  background: linear-gradient(rgba(255, 255, 255, .05), rgba(156, 255, 172, 0.1));
  width: 15vw;
  h2 {
    font-size: 18px;
    color: white;
  }
  ul {
    list-style: none;
    padding: 0px;
    li {
      color: rgba(255, 255, 255, .4);
      a {
        color: rgba(255, 255, 255, .4);
        &:hover {
          color: white;
          cursor: pointer;
        }
      }
    }
  }
}
.gothere {
  transition: all .5s;
  &:hover {
    color: white;
    background: rgb(104, 77, 103);
    cursor: pointer;
    box-shadow: inset 0px 0px 3px 3px rgba(0, 0, 0, .1);
  }
  border-radius: 15px;
  width: 80%;
  margin: 10px auto;
}
.router-link-active {
  color: white !important;
  font-weight: 600;
}

//content
#app {
  // background: linear-gradient(rgb(135,92,123),rgb(54,57,77));
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  height: 100vh;
  text-align: center;
  // background: linear-gradient(rgb(135, 92, 123), rgb(54, 57, 77));
  background-size: cover;
  background-attachment: fixed;
  overflow-y: scroll;
  //background: linear-gradient(rgba(255,255,255,.6),rgba(96, 155, 114, 0.507));
  // color: #2c3e50;
}

//mobile warning
.warning {
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  height: 50%;
  width: 90%;
  text-align: center;
  border-radius: 10px;
  margin: auto;
  background: url('./assets/stop.png')no-repeat center center;
  background-size: cover;

}

//logospinner
.logobox {
  width: 100px;
  height: 100px;
  margin: 20px auto;
  background: url('./assets/logo.png')no-repeat center center;
  background-size: cover;
}

.spinning {
  -webkit-animation: rotate 2s infinite linear;
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotateY(0deg);
  }
  to {
    -webkit-transform: rotateY(359deg);
  }
}

//component transition
.component-fade-enter-active,
.component-fade-leave-active {
  transition: all .7s ease-in-out;
}
.component-fade-enter,
.component-fade-leave-to
/* .component-fade-leave-active for <2.1.8 */
  {
  transform: translateY(50px);
  opacity: 0;
}

//app-wide styling
.snippet {
  background: rgba(0,0,0,.8);
  width: 100%;
  margin: auto;
  color: white;
  h2{
    padding: 40px;
  }
  p{
    padding-bottom: 100px;
    width: 60%;
    margin: auto;
    text-align: left;
  }
  a{
    color: white;
    text-decoration: underline;
    font-weight: bold;
  }
}

.questionheader {
  color: white;
  //position: absolute;
  font-size: 50px;
  text-shadow: 0px 0px 10px black;
  width: 100%;
}

.totalCount {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 200px;
  color: rgb(17, 236, 116);
  margin: auto;
  background: rgba(0,0,0,.8);
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, .2);
  border-radius: 10px;
  padding: 20px 10px;
  font-size: 18px;
}

.winning {
  color: rgb(140, 241, 85);
  font-size: 2em;
}

.ghost {
  z-index: 999;
  position: fixed;
  bottom: 0px;
  right: 20px;
  color: rgba(255, 255, 255, .1);
  font-size: 50px;
}
.page{
  left: 15%;
  width: calc(100% - 15%);
  height: 100%;
  position: relative;
  overflow-y: scroll;
}
</style>
