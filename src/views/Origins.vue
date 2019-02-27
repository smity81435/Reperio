<template>
  <div class="all">
    <h1>Where are you from? <br> And what brough you here?</h1>
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
          :data= "chartData"
          :options= "chartOptions"
          :events="chartEvents"
          :resizeDebounce="500"
        />
    </div>
  </div>
  
</template>
<script>
import { GChart } from 'vue-google-charts'
import * as Api from "@/api/Api.js"
export default {
  components:{
    GChart, 
  },
  data(){
    return {
      chartEvents:{
      },
      //colors:['rgba(255,0,0,1)','#b2df8a','#fb9a99','#fdbf6f','#cab2d6','#ffff99','#1f78b4','#33a02c'],
      modalopacity: 1,
      newResponseShow: false,
      //responses: responses,
      importList: [
      ],
      // The number of responses for each option
      nodeLists: [],
      deg:10,
      winner:false,
      chartData: [
        ['category','capacity','count'],
        ['Staff','West Coast',1],
        ['Staff','East Coast',1],
        ['Staff','South',1],
        ['Staff','Midwest',1],
        ['Staff','Southwest',1],
        ['Staff','Colorado',1],
        ['Staff','Pacific Northwest',1],
        ['Staff','International',1],
        ['Student','West Coast',1],
        ['Student','East Coast',1],
        ['Student','South',1],
        ['Student','Midwest',1],
        ['Student','Southwest',1],
        ['Student','Colorado',1],
        ['Student','Pacific Northwest',1],
        ['Student','International',1],
        ['Other','West Coast',1],
        ['Other','East Coast',1],
        ['Other','South',1],
        ['Other','Midwest',1],
        ['Other','Southwest',1],
        ['Other','Colorado',1],
        ['Other','Pacific Northwest',1],
        ['Other','International',1],
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
        ['International','Other Reason',1],
      ],
      chartOptions: {
        chart: {
          //title: 'Tester Sankey',
          //subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
        sankey: {
          node: {
            colors: this.colors
          },
          link: {
           colorMode: 'gradient',
           colors: this.colors
          },
        }
      }
    }
  },
  methods:{
    addNode(role,origin,reason) {
      //const data = this.chartData;
      let r = role;
      let o = origin;
      let re =  reason;

      this.newResponseShow = true;
      setTimeout(()=>{
        this.newResponseShow = false;
        console.log(r + " " + " " + o + " " + re);
        for(var i= 0; i < this.chartData.length; i ++){
          console.log(this.chartData[i][0]);
            if( this.chartData[i][0]===r && this.chartData[i][1]===o){
              this.chartData[i][2]++;
              //console.log("added: " + r + " from " + o);
              console.log(this.chartData[i][2]);
            }
        }
        for(var z= 0; z < this.chartData.length; z ++){
            if( this.chartData[z][0]===o && this.chartData[z][1]===re){
              this.chartData[z][2]++;
              //console.log("added: " + o + " because " + re);
              console.log(this.chartData[z][2]);
            }
        }
      },5000);
    },
  },
  computed:{

  },
  mounted(){
    // Update node lists every time an answer is received
    Api.listen((change) => {
      //console.log(change);
      if (change.type === "added") {
        //console.log("New: ", change.doc.data());
        var node = change.doc.data();
        this.addNode(node.role, node.origin, node.reason);
      }
      if (change.type === "modified") {
        //console.log("Modified: ", change.doc.data());
      }
      if (change.type === "removed") {
        //console.log("Removed: ", change.doc.data());
      }
    });
    //console.log("this is the import list "+this.importList);
  }
  
}
</script>
<style lang="scss">
.all{
  h1{
    color: white;
    font-weight: 700;
  }
}
.vis{
  width: 90vw;
  margin: auto;
}

</style>

