<template>
  <div class="mainvis">
      <vue-snotify></vue-snotify>
      <h2>{{today}}</h2>
      <v-chart
      :options="option"
      />
    </div>
</template>
<script>
//imports
require('echarts-gl');
import ECharts from 'vue-echarts'
import moment from 'moment'
import * as Api from "@/api/Api.js"
import Snotify from 'vue-snotify'
import 'vue-snotify/styles/material.css'

//global data
var data = [[0,2,3],[0,23,3]];
var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a','10a','11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
var emotions = ['Amazing', 'Good', 'OK',
        'Not Great', 'Awful'];
var initialChartData=[["AMAZING",4,2,23,1],];

export default {
  name: 'Daychart',
  components:{
    'v-chart':ECharts,
  },
  props:{
    day:{
      type: Number,
      requried: true,
      default: 0,
    }
  },
  data(){
    return{
      tempData: initialChartData.slice(0),
      today: moment().format('MMMM Do YYYY'),
      option:{
        visualMap: {
          max: 10,
          // inRange: {
          //   color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          // }
        },
        xAxis3D: {
          type: 'category',
          data: hours
        },
        yAxis3D: {
          type: 'category',
          data: emotions
        },
        zAxis3D: {
          type: 'value'
        },
        grid3D: {
          boxWidth: 200,
          boxDepth: 80,
          light: {
            main: {
              intensity: 4
            },
            ambient: {
              intensity: .6
            }
          }
        },
        series:{
            type: 'bar3D',
            data: initialChartData.map(function (item) {
                return {
                    value: [item[3], item[0], item[4]]
                }
            }),
            //shading: 'color',
            label: {
              show: false,
              textStyle: {
                fontSize: 16,
                borderWidth: 1
              }
            },
            itemStyle: {
              opacity: 0.8
            },
            emphasis: {
              label: {
                textStyle: {
                  fontSize: 20,
                  color: '#900'
                }
              },
              itemStyle: {
                color: '#900'
              }
            }
        }
      },
    }
  },
  methods:{
    displayNotification(dtg) {
      var time = dtg;
      this.$snotify.success(time,'New Response!',{
        timeout: 5000,
      });
    },
    addNode(emotion,dtg,day,hour,month) {  //ADD NODE FUNCTION 
      this.newResponseShow = true;//turn on modal
      var thisMonth = moment().format("M");
      var thisDay = moment().format("D");
      setTimeout(()=>{
        this.newResponseShow = false; //turn off modal
        var hit=false;
        for(var i= 0; i < this.tempData.length; i ++){
            if( this.tempData[i][0]===emotion && this.tempData[i][1]===month && this.tempData[i][2]===day && this.tempData[3] === hour){
              console.log("MATCH!");
              let count = initialChartData[i][4];
              initialChartData.splice(i-1,1,[emotion,month,day,hour,count+1]);
              hit = true;
            }
        }
        if( hit === false){
          var count = 1;
          var node = [emotion,month, day, hour, count];
          initialChartData.push(node);
        }
        this.tempData = initialChartData.slice(0);
        this.displayNotification(dtg);
      },5000); //modal delay here
    },
  },
  mounted(){
    Api.listen((change) => {  //LISTENER FOR NEW DATA
        //console.log("New: ", change.doc.data());
        var node = change.doc.data();
        node.day = Number(node.day);
        node.hour=Number(node.hour);
        node.month=Number(node.month);
        this.addNode(node.emotion,node.dtg,node.day,node.hour,node.month);
    });
  },
}
</script>
<style lang="scss" scoped>
  .mainvis{
  margin: 0;
  width: 40vw;
  height: 30vw;

  // margin: auto;
}
</style>