<template>
  <div>
    
    <div class="controlpanel">
      <h2 class="live">Current Display:<br> {{pickedViz}}</h2>
      <!-- TODAY -->
      <input type="radio" name="control" id="today" checked="checked" value="Today's Chart" v-model="pickedViz"  >
      <label for="today" @click="handleVizPick('Daychart',todayDay)" >Today: {{today}}</label>
      <!-- WEEK OVERVIEW -->
      <input type="radio" name="control" id="overview" value="Week Overview" v-model="pickedViz">
      <label for="overview" @click="handleVizPick('Weekcharts',7)">Week Overview</label>
      <!-- 1-day OVERVIEW -->
      <input type="radio" name="control" id="yes1" v-bind:value="yesterday1" v-model="pickedViz">
      <label for="yes1" @click="handleVizPick('Daychart',1)">{{yesterday1}}</label>
      <!-- 2-days OVERVIEW -->
      <input type="radio" name="control" id="yes2" v-bind:value="yesterday2" v-model="pickedViz">
      <label for="yes2" @click="handleVizPick('Daychart',2)">{{yesterday2}}</label>
      <!-- 3-days OVERVIEW -->
      <input type="radio" name="control" id="yes3" v-bind:value="yesterday3" v-model="pickedViz"> 
      <label for="yes3" @click="handleVizPick('Daychart',3)">{{yesterday3}}</label>
      <!-- 4-days OVERVIEW -->
      <input type="radio" name="control" id="yes4" v-bind:value="yesterday4" v-model="pickedViz">
      <label for="yes4" @click="handleVizPick('Daychart',4)">{{yesterday4}}</label>
    </div>
  <p class="subbut backbutt" @click="handleHome()">Home</p>
  </div>
</template>
<script>
import moment from 'moment'
import {eventBus} from '../main.js'
import * as Api from '../api/Api.js'

export default {
  name: 'DisplayControl',
  components:{
  },
  props:{
    currentPage:{
      type: String,
      required: true,
    },
    onControlClick:{
      type: Function,
      default: ()=> {},
    }
  },
  methods:{
    handleVizPick(pick,day){
      Api.changeViz(pick,day);
    },
    handleHome(){
      this.onControlClick();
    }
  },
  data(){
    return{
      pickedViz: "Today's Chart",
      today: moment().format("dddd MMMM Do YY"),
      todayDay: moment().format("D"),
      yesterday1: moment().subtract(1, 'days').format("dddd MMMM Do"),
      YDD1: moment().subtract(1,'days').format("D"),
      yesterday2: moment().subtract(2, 'days').format("dddd MMMM Do"),
      yesterday3: moment().subtract(3, 'days').format("dddd MMMM Do"),
      yesterday4: moment().subtract(4, 'days').format("dddd MMMM Do"),
    }
  },
  computed:{

  }

  
}
</script>
<style lang="scss" scoped>
label{
  font-weight: 700;
  width: 50vw;
}

.backbutt{
  position: absolute;
  top: 100px; 
  left: 20px;
  width: 100px;
  box-shadow: none;
}
.controlpanel{
  font-size: 25px;
  color: violet;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 70vh;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
}
  
</style>