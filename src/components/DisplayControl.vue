<template>
  <div>
    <div class="controlpanel">
      <h2 class="live">Current Display:<br> {{pickedViz}}</h2>
      <!-- TODAY -->
      <input type="radio" name="control" id="today" checked="checked" value="Today's Chart" v-model="pickedViz">
      <label class="displabel" for="today" @click="handleVizPick('Today')">Today: {{today}}</label>
      <!-- 1-day OVERVIEW -->
      <input type="radio" name="control" id="yes1" value="Last 6 Hours" v-model="pickedViz">
      <label class="displabel" for="yes1" @click="handleVizPick('6 Hours')">Last 6 hours</label>
      <!-- WEEK OVERVIEW -->
      <input type="radio" name="control" id="overview" value="Week Overview" v-model="pickedViz">
      <label class="displabel" for="overview" @click="handleVizPick('This Week')">This Week</label>
      <!-- 2-days OVERVIEW -->
      <input type="radio" name="control" id="yes2" value="This Month" v-model="pickedViz">
      <label class="displabel" for="yes2" @click="handleVizPick('This Month')">This Month</label>
      <!-- 3-days OVERVIEW -->
      <input type="radio" name="control" id="yes3" value="All Data" v-model="pickedViz">
      <label class="displabel" for="yes3" @click="handleVizPick('All Data')">All Data</label>
      <p class="subbut backbutt" @click="handleHome()">Back</p>
    </div>
    
  </div>
</template>
<script>
import moment from 'moment'
import {eventBus} from '../main.js'
import * as Api from '../api/Api.js'
import { setTimeout } from 'timers';
export default {
  name: 'DisplayControl',
  components:{
  },
  props:{
    currentPage:{
      type: String,
      required: true,
    },
    onGoBack:{
      type: Function,
      default: ()=> {},
    }
  },
  methods:{
    handleVizPick(pick){
      var today = "Today";
      Api.changeViz(pick);
      setTimeout(()=>{
        this.pickedViz = "Today"
        Api.changeViz(today)
      },60000);
    },
    handleHome(){
      console.log("clicked BACK!!!");
      this.onGoBack();
    }
  },
  data(){
    return{
      pickedViz: "Today's Chart",
      today: moment().format("dddd MMMM Do YY"),
    }
  },
  computed:{
  }  
}
</script>
<style lang="scss" scoped>
.displabel{
  background: white;
  color: rgba(140, 0, 255, 0.452);
}
input[type=radio]:checked+label{
  background: linear-gradient(rgb(162, 128, 224), rgb(135, 102, 196), rgb(180, 150, 235));
}
.live{
  color:rgba(140, 0, 255, 0.452)
}
label{
  font-weight: 700;
  width: 50vw;
}
.backbutt{
  
  box-shadow: none;
  border: 3px solid rgba(140, 0, 255, 0.452);
  color: rgba(140, 0, 255, 0.452);
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