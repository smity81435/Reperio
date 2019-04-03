<template>
  <div class="allSankey">
    <p class="phantomTop">REPERIO</p>
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
        <GChart
          :settings= "{ packages: ['sankey'] }"
          type= "Sankey"
          :data= "gChartData"
          :options= "chartOptions"
          :events="chartEvents"
          :resizeDebounce="500"
          @ready="onChartReady"
        />
    </div>
    <div class="qr"></div>
  </div>
</template>
<script>
import { GChart } from 'vue-google-charts'
import * as Api from "@/api/Api.js"
//initialize database for the chart
var initialChartData = [
  ['category','capacity','count'],
  ['Staff','West Coast',2],
  ['Staff','East Coast',2],
  ['Staff','South',2],
  ['Staff','Midwest',2],
  ['Staff','Southwest',2],
  ['Staff','Colorado',2],
  ['Staff','Pacific Northwest',2],
  ['Staff','International',2],
  ['Student','West Coast',2],
  ['Student','East Coast',2],
  ['Student','South',2],
  ['Student','Midwest',2],
  ['Student','Southwest',2],
  ['Student','Colorado',2],
  ['Student','Pacific Northwest',2],
  ['Student','International',2],
  ['Other','West Coast',2],
  ['Other','East Coast',2],
  ['Other','South',2],
  ['Other','Midwest',2],
  ['Other','Southwest',2],
  ['Other','Colorado',2],
  ['Other','Pacific Northwest',2],
  ['Other','International',2],
  ['Colorado','Education',1],
  ['Colorado','Recreation',1],
  ['Colorado','Entertainment',1],
  ['Colorado','Location',1],
  ['Colorado','Convenience',1],
  ['Colorado','Other Reason',1],
  ['West Coast','Education',1],
  ['West Coast','Recreation',1],
  ['West Coast','Entertainment',1],
  ['West Coast','Location',1],
  ['West Coast','Convenience',1],
  ['West Coast','Other Reason',1],
  ['East Coast','Education',1],
  ['East Coast','Recreation',1],
  ['East Coast','Entertainment',1],
  ['East Coast','Location',1],
  ['East Coast','Convenience',1],
  ['East Coast','Other Reason',1],
  ['South','Education',1],
  ['South','Recreation',1],
  ['South','Entertainment',1],
  ['South','Location',1],
  ['South','Convenience',1],
  ['South','Other Reason',1],
  ['Midwest','Education',1],
  ['Midwest','Recreation',1],
  ['Midwest','Entertainment',1],
  ['Midwest','Location',1],
  ['Midwest','Convenience',1],
  ['Midwest','Other Reason',1],
  ['Southwest','Education',1],
  ['Southwest','Recreation',1],
  ['Southwest','Entertainment',1],
  ['Southwest','Location',1],
  ['Southwest','Convenience',1],
  ['Southwest','Other Reason',1],
  ['Pacific Northwest','Education',1],
  ['Pacific Northwest','Recreation',1],
  ['Pacific Northwest','Entertainment',1],
  ['Pacific Northwest','Location',1],
  ['Pacific Northwest','Convenience',1],
  ['Pacific Northwest','Other Reason',1],
  ['International','Education',1],
  ['International','Recreation',1],
  ['International','Entertainment',1],
  ['International','Location',1],
  ['International','Convenience',1],
  ['International','Other Reason',1]

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
      chartOptions: {
        chart: {
          //title: "chart",
        },
        height: 500,
        sankey: {
          node: {
            width: 4,
            nodePadding: 50,
            label:{
              fontName: 'Avenir',
              color: 'white',
              bold: true,
              fontSize: 20,
            }
          },
          link: {
            color:{
              fillOpacity: 1,
            },
           colorMode: 'gradient',
          },
        }
      }
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
    Api.listenOrigins((change) => {  //LISTENER FOR NEW DATA
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
.phantomTop{
  font-size: 100px;
  position:absolute;
  bottom: 20px;
  left: 20px;
  padding: 0;
  margin: 0;
  

}

.qr{
  width: 15vw;
  height: 15vw;
  background: url('../assets/qr.png')no-repeat;
  position: absolute;
  background-size: contain;
  bottom: 0px;
  right: 0px;
}


.allSankey{
  background: linear-gradient(rgba(0,0,0,.8),black);
  width: 100vw;
  height: 100vh;
  padding-top: 30px;
  h1{
    color: white;
    font-weight: 700;
  }
}


.vis{
  width: 90vw;
  margin: auto;
  margin-top: 20vh;
}


.phantom{
  width: 100vw;
  height: 100vh;
  background:linear-gradient(black, rgba(0,0,0,.8));
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 100px;
  text-shadow: 0px 0px 3px rgba(118,118,118,.3);
}


</style>

