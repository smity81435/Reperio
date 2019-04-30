<template>
  <div class="allBD page">
    <h1 class="questionheader">When is your Birthday?</h1>
    <div class="visPolar">
      <v-chart :options="polar" />
    </div>
    <div class="snippet">
      <h2>The Polar-Plot: Visualizing Age Rings</h2>
      <p>
      This Polar-Plot of birthdates (all input by users into the terminal) is an interesting measure of public honesty. While most people put their actual birthday, some people would answer the same birthday every time they passed the visualization, or put outlandish answers. While usually this would be frowned upon in data visualization, they tend to help Reperio accomplish its goal. If a user experiences joy from putting in erroneous entries, that is ok. Reperio was built with the primary intention of fostering human emotions and conversations. In fact, these abstract answers can lead to even more conversations later on.  
      <br><br>
      <strong>Technical Notes:</strong>  
      <br>
      While the <a href="">ECharts</a> library has an impressive number of different visualizations, I found out the hard way that most of the higher-lever documentation is in Chinese. For this reason, I spent many hours plugging different variables into the chart options to try to get it to behave as I wanted. Another challenge of this chart was getting time to be plotted in a spiral. The dates move around the visualization like a clock, and the further away from the center of the visualization, the closer you get to the present year. This took a bit of math to get down, but luckily I had already worked out some of it in an <a href="http://creative.colorado.edu/~dosm6711/web/projects/asteroid/asteroid.html" target="_blank">Asteroid Mining Game</a> I made a few years back for a class project.
      </p>
      </div>
    <h2 class="totalCount">User Interactions: {{tempData.length}}</h2>

  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/polar'

//initialize database for the chart
var initialChartData=[];
export default {
  components:{
    'v-chart':ECharts,
  },
  props:{
  },
  watch:{
    $route(){
      alert("Fuck!");
    }
  },
  data(){
    var axisData=[];
    for(let i = 0; i <365; i++){
      axisData.push(i);
    }
    return {
      data: initialChartData.slice(0),
      tempData: initialChartData.slice(0),
      modalopacity: 1,
      maxIndex:0,
      mostRecent: 0,
      mostRecentYear: 1999,
      //chartData: initialChartData.slice(0),
      //gChartData: initialChartData.slice(0),
      polar: {
        color: ['rgba(140,241,85, 0.445)'],
        polar: {
          center: ['50%', '50%']
        },
        axisTick:{

        },
        legend:{
          show: false,
        },
        axisLabel:{
          show: true,
          showMinLabel: true,
          showMaxLabel: false,
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Avenir',
          fontSize:30,
        },
        angleAxis: {
          boundaryGap: false,
          splitLine:{
            show: true,
            lineStyle: {
              color: "white",
              type: 'solid',
            }
          },
          type: 'category',
          data: axisData,
          // data:['January','February','March','April','May','June','July','August','September','October','November','December'],
          axisLine:{
            show:true,
            symbol: 'arrow',
            lineStyle:{
              color: 'white',
              type:'solid',
            }
          },
          axisLabel:{
            type: 'category',
            interval:30,
            fontSize: 30,
            formatter: function(value){
              var text = "";
              if(value >= 0 && value <31){
                text = "January";
              }else if(value >= 31 && value < 59){
                text = "February"
              }else if(value >= 59 && value < 90){
                text = "March"
              }else if(value >= 90 && value < 120){
                text = "April"
              }else if(value >= 120 && value < 151){
                text = "May"
              }else if(value >= 151 && value < 181){
                text = "June"
              }else if(value >= 181 && value < 212){
                text = "July"
              }else if(value >= 212 && value < 243){
                text = "August"
              }else if(value >= 243 && value < 273){
                text = "September"
              }else if(value >= 273 && value < 304){
                text = "October"
              }else if(value >= 304 && value < 334){
                text = "November"
              }else if(value >= 334 && value < 365){
                text = "December"
              }
              return text;
            },
            color: 'white',
            margin: 20,
          },

        },
        radiusAxis: {
          z: 99,
          min: 1919,
          max: 2019,
          axisLabel:{
            showMaxLabel: true,
            fontWeight: 'bold',
            
            fontSize: 20,
            formatter: function(value){
              return value;
            },
            color: 'white',
            
          },
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'Birthday',
            type: 'scatter',
            showSymbol: true,
            data: initialChartData,
            symbol: 'circle',
            symbolSize: function(){
              return 8;
            },
            animationDelay: function(idx){
              return idx*5;
            }

          }
        ],
        animationDuration: 500
      }
    }
  },
  methods:{
    checkHighest(arr){
      if (arr.length === 0) {
          return -1;
      }
      var max = arr[0][2];
      var maxIndex = 0;
      for (var i = 1; i < arr.length; i++) {
          if (arr[i][2] > max) {
              maxIndex = i;
              max = arr[i][2];
          }
      }
      return maxIndex;
    },
    addNode(julian, year) {  //ADD NODE FUNCTION 
      // this.newResponseShow = true;//turn on modal
      this.mostRecent = julian;
      this.mostRecentYear = year;
        // this.newResponseShow = false; //turn off modal
        //search for first link and increase link size
        var hit=false;
        //console.log("This is it:" + this.tempData);
        for(var i= 0; i < this.tempData.length; i ++){
            if( this.tempData[i][0]===year && this.tempData[i][1]===julian){
              //console.log("MATCH!");
               let count = initialChartData[i][2];
              initialChartData.splice(i-1,1,[year,julian,count+2]);
              //initialChartData[i][2]+=2;
              //console.log(initialChartData[i][2]);
              hit = true;
            }
        }
        if( hit === false){
          var node = [year, julian, 5];
          initialChartData.push(node);
          //console.log(node);
        }
        this.tempData = initialChartData.slice(0);
    },
  },
  mounted(){
    for(var i = 0; i < this.$store.state.birthData.length; i++){
      var node = this.$store.state.birthData[i];
      this.addNode(node.julian,node.year);
    }
    this.$store.state.loading=false;
  },
  beforeDestroy(){
    this.tempData=[];
    initialChartData=[];
  }
}
</script>
  <style lang="scss" scoped>
  .dispQ{
    color: white;
    font-size: 50px;
    position: absolute;
    top: 20px;
    left: 0px;
    right: 0px;
  }
  .tester{
    color: rgba(0, 255, 115, 0.445);
  }
  .visPolar{
    width: 100%;
    height: 80%;
    overflow: visible;


  }
  .echarts{
    width: 80%;
    height: 100%;
    margin: auto;
    
  }

  .blur{
    filter: blur(2px);
  }
  .stats{
    background: linear-gradient(rgba(252, 251, 251, 0.1),rgba(197, 255, 182, 0.24));
    position: absolute;
    bottom: 20px;
    left: 20px;
    //color: rgba(0, 162, 255, 1);
    //border: 1pt solid rgba(0, 217, 255, 0.87);
    border-radius: 5px;
    padding: 30px;
    box-shadow: 0px 5px 5px 3px rgba(0,0,0,.2);
  }
  .statlist{
    list-style: none;
    text-align: left;
    padding: 0px;
    margin: 0px;
    display: block;
    color:white;
    li{
      padding-left:0px;
      font-size: 20px;
      font-weight: 600;
    }
  }
</style>

