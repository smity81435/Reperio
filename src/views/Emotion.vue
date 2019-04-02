<template>
  <div class="all">
    <p class="phantom">REPERIO</p>
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
      :is="this.pick"
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
      pick: "Daychart",
      modalopacity: 1,
      newResponseShow: false,
    }
  },
  created(){

  },
  mounted(){
    eventBus.$on('vizPicked', pick => {
      this.pick = pick;
      console.log("got it: "+this.pick);
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
</style>

