<template>
  <div class="weekcharts">
    <div class="sidevis">
      <h2>Our Feelings Over the Last Week</h2>
      <ul>
        <li class="sidechart chart2">
          <p>{{yesterday2}}</p>      
              <IEcharts
              :option='option2'
              />
        </li>
        <li class="sidechart chart3">
          <p>{{yesterday3}}</p>    
              <IEcharts
              :option='option3'
              />
        </li>
        <li class="sidechart chart4">
          <p>{{yesterday4}}</p>
              <IEcharts
              :option='option4'
              />
        </li>
        <li class="sidechart chart5">
          <p>{{yesterday5}}</p> 
              <IEcharts
              :option='option5'
              />
        </li>
        <li class="sidechart chart6">
          <p>{{yesterday5}}</p> 
              <IEcharts
              :option='option6'
              />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//imports
import IEcharts from 'vue-echarts-v3/src/lite.js'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/legend'
import moment from 'moment'
import * as Api from '@/api/Api.js'

//global data
var data2 = [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]];
var data3 = [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]];
var data4 = [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]];
var data5 = [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]];
var data6 = [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]];
var emotions = ['Amazing', 'Good', 'OK',
        'Not Great', 'Awful'];
var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a','10a','11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
export default {
  name: 'Weekcharts',
  components:{
    IEcharts,
  },
  data(){
    return{
      today: moment().format("MMMM Do YYYY"),
      yesterday2: moment().subtract(1, 'days').format("dddd MMM Do"),
      yesterday3: moment().subtract(2, 'days').format("dddd MMM Do"),
      yesterday4: moment().subtract(3, 'days').format("dddd MMM Do"),
      yesterday5: moment().subtract(4, 'days').format("dddd MMM Do"),
      yesterday6: moment().subtract(5, 'days').format("dddd MMM Do"),
      option2:{
        height: 100,
        legend: {
         data: emotions,
        },
        xAxis: [
          {
            type: 'value',
            scale: false,
            data: hours,
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        series: [
          {
            name: 'Amazing',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data2[0],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Good',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data2[1],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'OK',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data2[2],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Not Great',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data2[3],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Awful',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data2[4],
            color: "rgba(0,0,0,1)",
          }
        ],
      },
      option3:{
        height: 100,
        xAxis: [
          {
            type: 'value',
            scale: false,
            data: hours,
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        series: [
          {
            name: 'Amazing',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data:data3[0],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Good',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data3[1],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'OK',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data3[2],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Not Great',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data3[3],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Awful',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data3[4],
            color: "rgba(0,0,0,1)",
          }
        ],
      },
      option4:{
        height: 100,
        title: {
        },
        xAxis: [
          {
            type: 'value',
            scale: false,
            data: hours,
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        series: [
          {
            name: 'Amazing',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data:data4[0],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Good',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data4[1],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'OK',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data4[2],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Not Great',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data4[3],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Awful',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data4[4],
            color: "rgba(0,0,0,1)",
          }
        ]
      },
      option5:{
        height: 100,
        title: {
        },
        xAxis: [
          {
            type: 'value',
            scale: false,
            data: hours,
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        series: [
          {
            name: 'Amazing',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data:data5[0],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Good',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data5[1],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'OK',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data5[2],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Not Great',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data5[3],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Awful',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data5[4],
            color: "rgba(0,0,0,1)",
          }
        ]

      },
      option6:{
        height: 100,
        title: {
        },
        xAxis: [
          {
            type: 'value',
            scale: false,
            data: hours,
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        series: [
          {
            name: 'Amazing',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data:data6[0],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Good',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data6[1],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'OK',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data6[2],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Not Great',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data6[3],
            color: "rgba(0,0,0,1)",
          },
          {
            name: 'Awful',
            type: 'scatter',
            large: true,
            symbolSize: 5,
            data: data6[4],
            color: "rgba(0,0,0,1)",
          }
        ]

      },
    }
  },
  mounted(){
  },
}
</script>
<style lang="scss" scoped>
.sidevis{
  width: 40%;
  //position: absolute;
  padding: 20px 20px;
  ul{
    list-style: none;
    padding-left: 0px;
  }
}
.sidechart{
  height: 200px;
}
  
</style>