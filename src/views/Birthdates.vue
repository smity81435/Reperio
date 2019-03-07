<template>
  <div class="all">
    <p class="phantom">REPERIO</p>
    <h1>When is your Birthday?</h1>
    <transition name="fade" mode="in-out">
      <div class="newResponse"
        v-if='newResponseShow'
        :opacity="modalopacity"
      >
        <p>New Response Received!</p>
      </div>
    </transition>
    <div class="vis">
      <v-chart
      :options="polar"
      />


    </div>
    <div class="qr"></div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/polar'

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
      newResponseShow: false,
      //chartData: initialChartData.slice(0),
      //gChartData: initialChartData.slice(0),
      polar: {
        color: ['rgba(71,209,255,.5)'],
        title: {
          text: 'Birthdays'
        },
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
            color: '#0FFF77',
            
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
              return val[2]*4;
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
    addNode(julian, year) {  //ADD NODE FUNCTION 
      this.newResponseShow = true;//turn on modal
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
    Api.listen((change) => {  //LISTENER FOR NEW DATA
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
h1{
  font-size: 50px;
}
.vis{
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


</style>

