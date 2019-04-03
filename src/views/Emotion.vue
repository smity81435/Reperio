<template>
  <div class="all">
    <p class="phantomTitle">REPERIO</p>
    <h1 class="dispheader">How are you feeling right now?</h1>
    <transition name="fade" mode="in-out">
      <div class="newResponse"
        v-if='newResponseShow'
        :opacity="modalopacity"
      >
        <p>New Response Received!</p>
      </div>
    </transition>
    <div class="vizes"
      :is="currentViz"
      :day="day"
      :dayPick="dayPick"
    >
    </div>
    <div class="qr"></div>
  </div>
</template>
<script>
//imports
import {eventBus} from '../main.js'
import Daychart from '@/components/Daychart'
import Weekcharts from '@/components/Weekcharts'
import * as Api from '../api/Api.js'
import moment from 'moment'

//export
export default {
  props:{

  },
  components:{
    Daychart,
    Weekcharts,
  },
  data(){
    return {
      currentViz:"Daychart",
      day: parseInt(moment().format("D")),
      dayPick: null,
      modalopacity: 1,
      newResponseShow: false,
    }
  },
  created(){


  },
  mounted(){
    Api.vizListen((doc) => {  //LISTENER FOR NEW DATA
      //console.log(change);
      var node = doc.data();
      this.currentViz = node.currentViz;
      this.dayPick = node.day;
            // if (change.type === "removed") {
      // }
    });
    
  }
}
</script>

<style lang="scss" scoped>
  .dispheader{
    font-size: 50px;
    color: rgb(204, 115, 204) !important;
  }
  .vizes{
    display: flex;
    justify-content: center;
    width: 80vw;
    margin: auto;
  }
  .phantomTitle{
    color: rgb(204, 115, 204);
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-weight: 700;
    opacity: .3;
    font-size: 100px;
    margin: 0;
    padding: 0;
  }
</style>

