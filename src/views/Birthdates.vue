<template>
  <div class="all">
    <p class="phantom">REPERIO</p>
    <h1>Where are you from? <br> &amp; <br> What brought you here?</h1>
    <transition name="fade" mode="in-out">
      <div class="newResponse"
        v-if='newResponseShow'
        :opacity="modalopacity"
      >
        <p>New Response Received!</p>
      </div>
    </transition>
    <div class="vis">

    </div>
    <div class="qr"></div>
  </div>
</template>
<script>
import echart from 'echarts'
import * as Api from "@/api/Api.js"
//initialize database for the chart
var initialChartData = [
[1,1,10],
[30,1,10],
[60,1,10],
[90,1,10],
[120,1,10],
[150,1,10],
[180,1,10],
[210,1,10],
[240,1,10],
[270,1,10],
[300,1,10],
[330,1,10],
[355,1,10]
];

export default {
  components:{
    GChart, 
  },
  data(){
    return {
      chartEvents:{
        select: () => {
          this.onChartReady();
        },
      },
      modalopacity: 1,
      newResponseShow: false,
      chartData: initialChartData.slice(0),
      gChartData: initialChartData.slice(0),

    }
  },
  methods:{
    onChartReady(chart){
      chart.draw(this.chartData, this.chartOptions);
    },
    addNode(role,origin,reason) {  //ADD NODE FUNCTION 
      this.newResponseShow = true;//turn on modal
      setTimeout(()=>{

        this.newResponseShow = false; //turn off modal
        //search for first link and increase link size
        for(var i= 0; i < this.chartData.length; i ++){
            if( this.chartData[i][0]===role && this.chartData[i][1]===origin){
              this.chartData[i][2]++;
            }
        }
        //search for next link and increase link size
        for(var z= 0; z < this.chartData.length; z ++){
            if( this.chartData[z][0]===origin && this.chartData[z][1]===reason){
              this.chartData[z][2]++;
            }
        }
        this.gChartData = this.chartData.slice(0); //update chart data with this data
      },5000); //modal delay here
    },
  },

  computed:{

  },

  watch: {
    chartData: () => {
      //console.log('chartData changed');
    },
  },
  mounted(){
    // Update node lists every time an answer is received
    Api.listen((change) => {  //LISTENER FOR NEW DATA
      //console.log(change);
      if (change.type === "added") { //if node is added to Firestore
        //console.log("New: ", change.doc.data());
        var node = change.doc.data();
        this.addNode(node.role, node.origin, node.reason);
      }
      // if (change.type === "modified") {
      // }
      // if (change.type === "removed") {
      // }
    });
  }
}
</script>
<style lang="scss">



</style>

