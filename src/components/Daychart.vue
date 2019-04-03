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
var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a','7a', '8a', '9a','10a','11a','12p', '1p', '2p', '3p', '4p', '5p','6p', '7p', '8p', '9p', '10p', '11p'];
var emotions = ['Amazing', 'Good', 'OK','Not Great', 'Awful'];
var chartData=[["Amazing",4,2,23,1],["Ok",4,2,23,1]];
var vizData=[[0,"Ok",1]];

export default {
  name: 'Daychart',
  components:{
    'v-chart':ECharts,
  },
  props:{
    day:{
      type: Number,
      requried: true,
    },
    dayPick:{
      type: Number,
      requried: true,
    }
  },
  data(){
    return{
      tempData: chartData.slice(0),
      today: moment().format('MMMM Do YYYY'),
      option:{
        visualMap: {
          max: 10,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
          },
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
            data: vizData,
            shading: 'color',
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
    updateVizData(){
      for(var z=0; z < chartData.length; z++){
        if(chartData[z][2] === this.day){
          //console.log("Insideloop");
          var newNode = [chartData[z][3],chartData[z][0],chartData[z][4]];
          vizData.push(newNode);

          // for(var v = 0; v < vizData.length; v++){
          //   console.log("Insideloop");
          //   if (chartData[z][0] == vizData[v][1] && chartData[z][2] == vizData[v][0]){
          //     vizData[v][2]++;
          //     console.log("vizcounting");
          //   }
          //   else{
          //     var newNode = [chartData[z][3],chartData[z][0],chartData[z][4]];
          //     vizData.push(newNode);
          //     console.log("nodeAddedtoviz",newNode);
          //   }
          // }

        }
      }
    },
    displayNotification(dtg) {
      var time = dtg;
      this.$snotify.success(time,'New Response!',{
        timeout: 5000,
      });
    },
    addNode(emotion,dtg,day,hour,month) {  //ADD NODE FUNCTION 
      var node = [emotion,month, day, hour, 1];
      console.log("addNode Called:", emotion);
      console.log(this.tempData);
      //this.newResponseShow = true;//turn on modal
      var thisMonth = moment().format("M");
      var today = moment().format("D");
      var hit=false;
      for(var i= 0; i < this.tempData.length; i ++){
          console.log("Compare: ",this.tempData[i]);
          console.log("New: ",node);
          if(this.tempData[i][0] === node[0] && this.tempData[i][1] == node[1]&& this.tempData[i][2] == node[2] && this.tempData[i][3] == node[3]){
            this.tempData[i][4]++;
            console.log("MATCH! Iterating...",this.tempData[i][4]);
            
            hit = true;
          }
      }
      if(hit == false){
        this.tempData.push(node);
        console.log("adding new node");
      }
      chartData = this.tempData.slice(0);
      this.updateVizData();

        //this.displayNotification(dtg);
    },

  },
  created(){
    Api.listen((change) => {  //LISTENER FOR NEW DATA
        console.log("New: ", change.doc.data());
        var node = change.doc.data();
        node.day = parseInt(node.day);
        node.hour=parseInt(node.hour);
        node.month=parseInt(node.month);
        this.addNode(node.emotion,node.dtg,node.day,node.hour,node.month);
    });
  },
  mounted(){

  },
}
</script>
<style lang="scss" scoped>
  .mainvis{
  margin: 0;
  width: 80vw;
  height: 60vh;

  // margin: auto;
}
</style>