<template>
  <div class="all">
      <div class="popUp"
        v-if='newResponseShow'
        :opacity="modalopacity"
      >
        <p>New Response Received!</p>
      </div>
    <!-- <p class="phantom">REPERIO</p> -->
    <h1 class="dispQ">When is your Birthday?</h1>
    <transition name="fade" mode="in-out">

    </transition>
    <div class="visPolar">
      <v-chart
      :options="polar"
      :class="{blur: newResponseShow}"
      />


    </div>
    <div class="stats">
      <ul class="statlist">
        <li class="total">Total Count: {{tempData.length}} Responses</li>
        <li class="mpm">Most Common Entry: {{moment().dayOfYear(tempData[this.checkHighest(this.tempData)][1]).format("MMMM Do")}}</li>
        
        <li class="last">Last Entry: {{moment().dayOfYear(this.mostRecent).format("MMMM Do") + " " + this.mostRecentYear}}</li>
      </ul>
    </div>
    <div class="qr"></div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/polar'
import moment from 'moment'
import * as Api from "@/api/Api.js"

//initialize database for the chart
var initialChartData = [

];
export default {
  components:{
    'v-chart':ECharts,
  },
  data(){

    // for (let i = 0; i <= 360; i++) {
    //     let t = i / 180 * Math.PI
    //     let r = Math.sin(2 * t) * Math.cos(2 * t) *100
    //     data.push([r, i])
    // }
    var axisData=[];
    for(let i = 0; i <365; i++){
      axisData.push(i);
    }
    //initialChartData.push([1935,150,10]);
    for(let o = 0; o < 20; o++){
      let year = Math.floor(Math.random()*(2002-1970)+1970);
      let date = Math.floor(Math.random()*(364-1)+1);
      let v = 5;
      initialChartData.push([year,date,v]);
    }
    
    return {

      data: initialChartData.slice(0),
      tempData: initialChartData.slice(0),
      modalopacity: 1,
      newResponseShow: true,
      maxIndex:0,
      mostRecent: 0,
      mostRecentYear: 1999,
      //chartData: initialChartData.slice(0),
      //gChartData: initialChartData.slice(0),
      polar: {
        color: ['rgba(140, 0, 255, 0.2)'],
        polar: {
          center: ['50%', '50%']
        },
        axisTick:{

        },
        legend:{
        },
        axisLabel:{
          show: true,
          showMinLabel: true,
          showMaxLabel: false,
          color: '#47D1FF',
          fontWeight: 'bold',
          fontFamily: 'Avenir',
          fontSize:30,
        },
        angleAxis: {
          boundaryGap: false,
          splitLine:{
            show: true,
            lineStyle: {
              color: "#47D1FF",
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
              color: '#47D1FF',
              type:'solid',
            }
          },
          axisLabel:{
            type: 'category',
            interval:30,
            fontSize: 30,
            formatter: function(value, index){
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
            color: 'rgba(0, 162, 255, 0.712)',
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
            color: 'rgba(0, 162, 255, 0.712)',
            
          },
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'Birthdays',
            type: 'scatter',
            showSymbol: true,
            data: initialChartData,
            symbol: 'circle',
            symbolSize: function(val){
              return val[2]*3;
            },
            animationDelay: function(idx){
              return idx*5;
            }

          }
        ],
        animationDuration: 2000
      }

    }
  },
  methods:{
    // onChartReady(chart){
    //   chart.draw(this.chartData, this.chartOptions);
    // },
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
      this.newResponseShow = true;//turn on modal
      this.mostRecent = julian;
      this.mostRecentYear = year;
      setTimeout(()=>{
        this.newResponseShow = false; //turn off modal
        //search for first link and increase link size
        var hit=false;
        //console.log("This is it:" + this.tempData);
        for(var i= 0; i < this.tempData.length; i ++){
            if( this.tempData[i][0]===year && this.tempData[i][1]===julian){
              console.log("MATCH!");
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
        

      },5000); //modal delay here
      
    },
  },

  computed:{

  },

  watch: {
    
    // chartData: () => {
    //   //console.log('chartData changed');
    // },
  },
  mounted(){
    
    // Update node lists every time an answer is received
    Api.listenBirthday((change) => {  //LISTENER FOR NEW DATA
      //console.log(change);
      if (change.type === "added") { //if node is added to Firestore
        //console.log("New: ", change.doc.data());
        var node = change.doc.data();
        this.addNode(node.julian, node.year);
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
  .dispQ{
    color: rgba(0, 162, 255, 0.712) !important;
    font-size: 50px;
    margin-top: 0px
  }
  .tester{
    color: rgba(140, 0, 255, 0.452);
  }
  .phantom{
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: rgba(0, 162, 255, 0.712);
  }

  .visPolar{
    width: 90vw;
    height: 90vh;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
  }
  .echarts{
    width: 100%;
    height: 100%;
  }
  .popUp{
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0px;
    right: 0px;
    bottom: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    background: none;
    z-index: 9999;

    p{
      font-size: 80px;
      font-weight: 700;
      color: white;
      margin: auto;
      padding: 20px;
      background: radial-gradient(rgba(0, 217, 255, 0.5), rgba(0, 217, 255, 0.87));
      width: auto;
      border-radius: 10px;
      border: 2px solid rgba(0, 217, 255, 0.87);
    }
  }
  .blur{
    filter: blur(2px);
  }
  .stats{
    height: 100vh;
    position: relative;
    color: rgba(0, 217, 255, 0.87);
  }
  .statlist{
    position: fixed;
    top: 20px;
    left: 20px;
    margin: auto;
    list-style: none;
    text-align: left;
    padding: 0px;
    display: block;
    color:rgba(140, 0, 255, 0.452);
    li{
      padding-top: 30px;
      padding-left:0px ;
      font-size: 20px;
      font-weight: 600;
    }
  }

      




</style>

