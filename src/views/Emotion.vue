<template>
  <div class="all">
    <p class="phantomTitle">REPERIO</p>
    <h1 class="dispheader">THE FINAL PUSH</h1>
    <div class="vizbox">
      <p class="subtitle">Tracking our Emotions through Spring of 2019</p>
      <div :is="Daychart" :day="day" :dayPick="dayPick">
       
      </div>
       <p>Current Display: {{this.$store.state.currentDisplay}} </p>
    </div>
    <div class="quotebox">
      <p class="quotetext"><q>{{this.quote}}</q></p>
      <p class="quoteauthor">-{{this.author}}</p>
    </div>
    <div class="bottomStats">
      <div class="statTab">
        <p class="statTitle">Total Interactions</p>
        <p class="stat">{{this.$store.state.dataCount}}</p>
      </div>
      <div class="statTab">
        <p class="statTitle">Most Common Emotion</p>
        <p class="stat">{{this.$store.state.mostCommon}}</p>
      </div>
      <div class="statTab">
        <p class="statTitle">Last Response</p>
        <p class="stat">{{this.$store.state.lastResponse}}</p>
      </div>
    </div>

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

<style lang="scss"scoped>
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
  bottom: -20px;
  left: 20px;
}

.statTab {
  position: relative;
  padding: 10px;
  background: white;
  height: 200px;
  width: 200px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, .2);
}

.dispheader {
  z-index: -999;
  position: absolute;
  left: 10px;
  top: 0px;
  font-size: 80px;
  color: rgba(140, 0, 255, 0.2) !important;
  margin: 0;
  font-weight: 700 !important;

}

.subtitle {
  font-size: 30px;
  color: rgb(53, 141, 115);
  font-weight: 700;
  margin: 50px auto;
  margin-top: 10vh;

}

.phantomTitle {
  color: white;
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-weight: 700;
  opacity: .3;
  font-size: 100px;
  margin: 0;
  padding: 0;
}

.vizbox {
  background: white;
  box-shadow: 0px 5px 5px 3px rgba(0, 0, 0, .2);

}
.quotebox{
  background: white;
  width: 50vw;
  font-weight: 600;
  font-size: 24px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 5px 5px 3px rgba(0,0,0,.2);
}
.quotetext{
  font-size: 28px;
  color: rgba(0,0,0,.8);
}
.quoteauthor{
  color: rgb(53, 141, 115);
}

</style>

