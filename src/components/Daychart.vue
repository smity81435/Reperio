<template>
  <div class="mainvis">
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

//global data
var data = [[0,2,3],[2,1,4],[3,3,5],[4,2,6],];
var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a','10a','11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
var emotions = ['Amazing', 'Good', 'OK',
        'Not Great', 'Awful'];

export default {
  name: 'Daychart',
  components:{
    'v-chart':ECharts,
  },
  data(){
    return{
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
            data: data.map(function (item) {
                return {
                    value: [item[1], item[0], item[2]]
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
    // addNode(emotion,time,day) {  //ADD NODE FUNCTION 
    //   this.newResponseShow = true;//turn on modal
    //   setTimeout(()=>{
    //     this.newResponseShow = false; //turn off modal
    //     var hit=false;

    //     for(var i= 0; i < this.tempData.length; i ++){
    //         if( this.tempData[i][0]===year && this.tempData[i][1]===julian){
    //           console.log("MATCH!");
    //            let count = initialChartData[i][2];
    //           initialChartData.splice(i-1,1,[year,julian,count+2]);
    //           hit = true;
    //         }
    //     }
    //     if( hit === false){
    //       var node = [year, julian, 5];
    //       initialChartData.push(node);
    //     }
    //     this.tempData = initialChartData.slice(0);
    //   },5000); //modal delay here
    // },
  },
  mounted(){
    // Api.listen((change) => {  //LISTENER FOR NEW DATA
    //   if (change.type === "added") { //if node is added to Firestore
    //     //console.log("New: ", change.doc.data());
    //     var node = change.doc.data();
    //     this.addNode(node.emotion, node.time,node.day);
    //   }
    //   // if (change.type === "modified") {
    //   // }
    //   // if (change.type === "removed") {
    //   // }
    // });
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