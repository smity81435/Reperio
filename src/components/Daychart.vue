<template>
  <div class="mainvis">
      <vue-snotify></vue-snotify>
      <!-- <h2>{{today}}</h2> -->
      <div id="eventchart" style="width: 90%"></div>
    </div>
</template>
<script>
//imports
require('echarts-gl');
import * as d3 from 'd3'
global.d3 = d3;
import eventDrops from 'event-drops'
import moment from 'moment'
import * as Api from "@/api/Api.js"
import Snotify from 'vue-snotify'
import 'vue-snotify/styles/material.css'

var chartData = [
  {
    name: 'Amazing',
    data:[{date: new Date('2019/04/03/22:22:31')},],
  },
  {
    name: 'Good',
    data:[{date: new Date('2019/04/03/22:22:31')},],
  },
    {
    name: 'OK',
    data:[{date: new Date('2019/04/03/22:22:31')},],
  },
    {
    name: 'Not Great',
    data:[{date: new Date('2019/04/03/22:22:31')},],
  },
    {
    name: 'Awful',
    data:[{date: new Date('2019/04/03/22:22:31')},],
  },
];
var chart = eventDrops({
	range: {
		start: new Date('04/01/2019 6:00:00 aM'),
    	end: new Date(),
  	},
  	drop: {
	  	date: d => d.date,
  	},
});

//global data
export default {
  name: 'Daychart',
  components:{
  },
  props:{
    day:{
      type: Number,
      requried: true,
    },
  },
  data(){
    return{
      today: moment().format('MMMM Do YYYY'),
      bloopList: chartData,
    }
  },
  methods:{
    displayNotification(dtg) {
      var time = dtg;
      this.$snotify.success(time,'New Response!',{
        timeout: 5000,
      });
    },
    addNode(emotion,dtg) {  //ADD NODE FUNCTION 
    var newBloop = {date: dtg};
      for(var i = 0; i < this.bloopList.length; i++){
        if(this.bloopList[i].name === emotion){
          console.log(this.bloopList[i].data[0].date);
          this.bloopList[i].data.push(newBloop);
          chartData = this.bloopList;

        }
      }
      this.displayNotification(emotion);
    },

  },
  created(){
    
    //d3.select('#eventdrops').data([repositoriesData]).call(chart);
    Api.listenEmotions((change) => {  //LISTENER FOR NEW DATA
        console.log("New: ", change.doc.data());
        var node = change.doc.data();
        this.addNode(node.emotion,node.dtg);
    });
  },
  mounted(){
  d3.select("#eventchart").data([this.bloopList]).call(chart);
  },
}
</script>
<style lang="scss" scoped>
#eventcharts{
  width: 80vw;

}
  .mainvis{
  margin: 0;
  width: 80vw;
  height: 60vh;

  // margin: auto;
}
</style>