<template>
  <div class="all">
    <h2 class="totalcount">User Interactions: {{this.$store.state.emotionsData.length}}</h2>
    <h1 class="questionheader">Our Emotions</h1>
    <div class="vizbox">
      <p class="subtitle">Tracking our Emotions through Spring of 2019</p>
      <div :is="Daychart" >
      </div>
    </div>
    <div class="quotebox">
      <p class="quotetext"><q>{{this.quote}}</q></p>
      <p class="quoteauthor">-{{this.author}}</p>
    </div>
    <!-- <div class="console"></div> -->
    <!-- <transition name="fade" mode="in-out">
      <div class="newResponse" v-if='newResponseShow' :opacity="modalopacity">
        <p>New Response Received!</p>
      </div>
    </transition> -->
  </div>
</template>
<script>
//imports


import Daychart from '@/components/Daychart'
import * as Api from '../api/Api.js'
import moment from 'moment'

//export
export default {
  props:{

  },
  components:{
    Daychart,
    

  },
  data(){
    return {
      Daychart: "Daychart",
      day: parseInt(moment().format("D")),
      dayPick: null,
      modalopacity: 1,
      newResponseShow: false,
      quote: "",
      author: "",
    }
  },
  created(){
     Api.quoteListen((change)=>{
      var node = change.doc.data();
      this.quote= node.quote;
      this.author=node.author;
    });
  },
  mounted(){

    
  }
}
</script>

<style lang="scss" scoped>
.all{
  position: relative;
  width: 100%;
  height: 100%;
}
// .console{
//   position: absolute;
//   bottom: 0px;
//   right: 50px;
//   width: 200px;
//   height: 350px;
//   background: url("../assets/console.png")no-repeat center center;
//   background-size: cover;
// }
.statTitle {
  font-size: 16pt;
}
.stat {
  font-size: 30px;
  font-weight: 600;
  position: absolute;
  padding: 0px;
  bottom: 40%;
  left: 0px;
  right: 0px;
  margin: auto;
  color: rgb(87, 150, 114);
}
.bottomStats {
  display: flex;
  justify-content: space-between;
  width: 40vw;
  position: absolute;
  bottom: -100px;
  left: 20px;
}
.statTab {
  padding: 10px;
  position: relative;
  background: linear-gradient(white,rgba(255,255,255,.8));
  height: 200px;
  width: 200px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, .2);
}
// .dispheader {
//   z-index: -999;
//   position: absolute;
//   left: 50px !important;
//   top: 100px !important;
//   font-size: 80px;
//   color: rgba(140, 0, 255, 0.2) !important;
//   margin: 0;
//   font-weight: 700 !important;
// }
.subtitle {
  font-size: 30px;
  color: rgb(53, 141, 115);
  font-weight: 700;
  margin: 50px auto;
  margin-top: 10vh;
  padding-top: 10px;
}

.vizbox {
  background: linear-gradient(white,rgb(228, 255, 249));
  box-shadow: 0px 5px 5px 3px rgba(0, 0, 0, .2);
  width: 100%;
  margin: auto;
}
.quotebox{
  background: white;
  width: 50vw;
  font-weight: 600;
  font-size: 20px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 5px 5px 3px rgba(0,0,0,.2);
}
.quotetext{
  font-size: 24px;
  color: rgba(0,0,0,.8);
}
.quoteauthor{
  color: rgb(53, 141, 115);
}

</style>

