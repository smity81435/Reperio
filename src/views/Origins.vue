<template>
  <div class="allSankey page">
    <h1 class="questionheader">Where are you from<br> and what brought you here?</h1>
    <h2 class="totalCount">User Interactions: {{this.$store.state.originsData.length}}</h2>
    <div class="vis">
        <GChart
          :settings= "{ packages: ['sankey'] }"
          type= "Sankey"
          :data= "gChartData"
          :events= "chartEvents"
          :options= "chartOptions"
          :resizeDebounce= "500"
          @ready="onChartReady"
        />
    </div>
    
    <div class="snippet">
      <h2>The Sankey Diagram: Analyzing Origins</h2>
      <p>Personally, I feel like the Sankey Diagram is one of the most visually pleasing data visualizations. The colorful flow of the weighted lines make it hard not to stare. This chart was designed to map the reasons that different groups of people come to campus, and I must admit it was hard to separate myself from the categories. The most common gripe about this chart was &quot;Well I don't really think I fit into any of these categories&quot;. While I feel like I made them as broad as possible, it became apparent that there might not be a perfect way to show this data without letting people put in their own answer.
      <br><br>
      <strong>Technical Notes:</strong>
      <br>
      From a technical perspective, the Sankey can be a little tricky to get set up, but it works pretty flawlessly once you get it going. The initial data required is immense, and an object is required for every possible link. For example, you need an object for Student from International with an associated count, and another object for International for Education. So there are two necessary objects for every single possible combination. For this particular diagram, that meant 70 hard-coded objects into an array just to start the visualization. Phew.
      <br>
      This library came from <a href="https://developers.google.com/chart/" target="_blank">GChart</a> &#40;Google's Data Visualization Library&#41;, and I was surprised to find that most of their code was written in D3.js. I figured that a company like Google would be writing their own visualization libraries, but I suppose not! 
      </p>
    </div>
  </div>

</template>
<script>
import { GChart } from 'vue-google-charts'
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
      chartData: initialChartData.slice(0),
      gChartData: initialChartData.slice(0),
      chartOptions: {
        chart:{
          title: "chart",
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
  watch:{

  },
  methods:{
    onChartReady(chart){
      chart.draw(this.chartData, this.chartOptions);
    },
    addNode(role,origin,reason) {  //ADD NODE FUNCTION 
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
        this.gChartData = this.chartData.slice(0);
    },
  },
  mounted(){
    for(var i = 0; i < this.$store.state.originsData.length ; i++){
      var node = this.$store.state.originsData[i];
      this.addNode(node.role, node.origin, node.reason);
    }
    this.$store.state.loading=false;
  }
}
</script>
<style lang="scss">

.vis{
  width: 90%;
  margin: 50px auto;

}
  
</style>

