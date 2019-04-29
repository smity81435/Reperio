<template>
  <div class="mainvis">
      <!-- <h2>{{today}}</h2> -->
      <div id="eventchart" style="width: 100%"></div>
    </div>
</template>
<script>
//imports
//require('echarts-gl');
// import * as d3 from 'd3'
// global.d3 = d3
// import { select,event } from 'd3'

var d3 = require('d3');
global.d3= d3;
import eventDrops from 'event-drops'
import moment from 'moment'
import * as Api from '@/api/Api.js'

var initialChartData = [{
    name: 'Amazing',
    data: [{
      date: new Date('2019/04/03/22:22:31')
    }, ],
    drop: {
      color: 'green',
    }
  },
  {
    name: 'Good',
    data: [{
      date: new Date('2019/04/03/22:22:31')
    }, ],
    eventColor: 'green',
  },
  {
    name: 'OK',
    data: [{
      date: new Date('2019/04/03/22:22:31')
    }, ],
    eventColor: 'yellow',
  },
  {
    name: 'Not Great',
    data: [{
      date: new Date('2019/04/03/22:22:31')
    }, ],
    eventColor: 'orange',
  },
  {
    name: 'Awful',
    data: [{
      date: new Date('2019/04/03/22:22:31')
    }, ],
  },
];
var colors = [
  'rgb(65, 122, 196)',
  '#68826A',
  '#9B9DDB',
  'rgb(209, 161, 29)',
  '#C84C5A',
];
/* Color Theme Swatches in Hex */
// $Sunrise-Projector-1-hex: #243227;
// $Sunrise-Projector-2-hex: #68826A;
// $Sunrise-Projector-3-hex: #A5C77F;
// $Sunrise-Projector-4-hex: #FFD484;
// $Sunrise-Projector-5-hex: #C84C5A;
var times = [new moment('2019/04/03/22:22:00'),new moment()];
// The initial time range the chart draws
const defaultRange = {
  start: times[0],
  end: times[1],
};
// Build chart configuration object
const buildChartConfig = function(range = defaultRange) {
  return eventDrops({
    //color: d3.schemeSet1,
    axis: {
      fontSize: 16,
    },
    line: {
      height: 50,
      color: (line, index) => {
        return colors[index];
      },
    },
    metaballs: {
      blurDeviation: 10,
    },
    range: range,
    drop: {
      date: d => d.date,
      radius: 10,
    },
  });
};
//global data
export default {
  name: 'Daychart',
  components: {},
  props: {
    day: {
      type: Number,
      requried: true,
    },
  },
  data() {
    return {
      localCount: 0,
      chartData: initialChartData,
      today: moment().format('MMMM Do YYYY'),
    };
  },
  methods: {
    clearChart(){
      initialChartData = [{
          name: 'Amazing',
          data: [{
            date: new Date('2019/04/03/22:22:31')
          }, ],
          drop: {
            color: 'green',
          }
        },
        {
          name: 'Good',
          data: [{
            date: new Date('2019/04/03/22:22:31')
          }, ],
          eventColor: 'green',
        },
        {
          name: 'OK',
          data: [{
            date: new Date('2019/04/03/22:22:31')
          }, ],
          eventColor: 'yellow',
        },
        {
          name: 'Not Great',
          data: [{
            date: new Date('2019/04/03/22:22:31')
          }, ],
          eventColor: 'orange',
        },
        {
          name: 'Awful',
          data: [{
            date: new Date('2019/04/03/22:22:31')
          }, ],
        },
      ];
      this.chartData = [];
      d3.select('#eventchart').html('');
      var chart = buildChartConfig();
      this.redrawChart(chart);
      
    },
    redrawChart(chartConfig) {
      d3.select('#eventchart').data([this.cloneData(this.chartData)]).call(chartConfig);
    },
    findLargest() {
      var highest = -1;
      var highIndex = -1;
      for (var i = 0; i < 4; i++) {
        if (this.chartData[i].data.length > highest) {
          highest = this.chartData[i].data.length;
          highIndex = i;
        }
      }
      return this.chartData[highIndex].name;
    },
    addNode(emotion, dtg) { //ADD NODE FUNCTION 
      this.$store.state.lastResponse = emotion;
      var newBloop = {
        date: dtg
      };
      const emotionIndex = this.chartData.findIndex(obj => obj.name === emotion);
      if (emotionIndex > -1) {
        this.chartData[emotionIndex].data.push(newBloop);
      }
      this.$store.state.mostCommon = this.findLargest(this.chartData);
      //console.log('adding one in ' + emotion);
      //console.log(this.chartData);
      // d3.select('#eventchart').html('');
      // var chart = buildChartConfig();
      // this.redrawChart(chart);
    },
    cloneData(chartData) {
      var newChartData = [];
      chartData.forEach((c) => {
        newChartData.push(Object.assign({}, c));
      });
      return newChartData;
    },

    
  },
  created(){
    //d3.select('#eventdrops').data([repositoriesData]).call(chart);


    // Api.listenEmotions((change) => { //LISTENER FOR NEW DATA
    //   var node = change.doc.data();
    //   var dtg = node.dtg;
    //   var dateString = dtg[0] + "/" + dtg[1] + "/" + dtg[2] + "/" + dtg[3] + ":" + dtg[4] + ":" + dtg[5]
    //   //console.log(dateString);
    //   var newDateInput = new Date(dateString);
    //   this.addNode(node.emotion, newDateInput);
    //   this.localCount++;
    //   this.$store.state.dataCount = this.localCount;
    // });
    // Api.listenEmotions((change) => { //LISTENER FOR NEW DATA
    //   //console.log("New: ", change.doc.data());
    //   var node = change.doc.data();
    //   var dtg = node.dtg;
    //   var dateString = dtg[0] + "/" + dtg[1] + "/" + dtg[2] + "/" + dtg[3] + ":" + dtg[4] + ":" + dtg[5]
    //   //console.log(dateString);
    //   var newDateInput = new Date(dateString);
    //   this.addNode(node.emotion, newDateInput);
    //   this.localCount++;
    //   this.$store.state.dataCount = this.localCount;
    // });


    // Api.vizListen((change)=>{
    //   var startDate;
    //   var dispNode = change.data();
    //   this.$store.state.currentDisplay = dispNode.currentViz;
    //   switch(dispNode.currentViz){
    //     case "Today":
    //       startDate = new moment().startOf('day');
    //       break;
    //     case "6 Hours":
    //       startDate = new moment().subtract(6,'hours');
    //       break;
    //     case "This Week":
    //       startDate = new moment().startOf('week');
    //       break;
    //     case "This Month":
    //       startDate = new moment().startOf('month');
    //       break;
    //     case "All Data":
    //       startDate = new moment('2019/04/03/22:22:00');
    //       break;
    //     default:
    //       //console.log("Date Set Fail");
          
    //   }
    //   // delete existing chart
    //   d3.select('#eventchart').html('');
      
    //   // build new chart with updated range
    //   var chart = buildChartConfig({
    //     start: startDate,
    //     end: new moment(),
    //   });
    //   this.redrawChart(chart);
    // });
  },
  mounted(){
    var chartData = this.cloneData(initialChartData);
    d3.select("#eventchart").data([chartData]);
    var chart = buildChartConfig();
    this.redrawChart(chart);
        var inList =  this.$store.state.emotionsData;
    for(var i = 0; i < inList.length; i++){
      var node= inList[i];
      var dtg = node.dtg;
      var dateString = dtg[0] + "/" + dtg[1] + "/" + dtg[2] + "/" + dtg[3] + ":" + dtg[4] + ":" + dtg[5]
      var newDateInput = new Date(dateString);
      this.addNode(node.emotion, newDateInput);
    }
    this.redrawChart(chart);
  },
  beforeDestroy(){
    this.clearChart();
  }
}
</script>
<style lang="scss">
g.axis {
  font-size: 16px;
}
#eventcharts {
  margin: auto;
}
.line-label {
  font-weight: 700 !important;
  font-size: 15pt;
}
.drop {
  opacity: .6 !important;
}
.mainvis {
  margin: 0;
  width: 100vw;
  // margin: auto;
}
.tester {
  color: rgb(65, 122, 196);
  color: rgb(70, 168, 248);
  color: rgb(59, 247, 200);
  color: rgb(209, 161, 29);
  color: rgb(255, 97, 49);
}
</style>