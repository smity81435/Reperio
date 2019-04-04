<template>
    <div id="eventchart"></div>
</template>
<script>
  import * as d3 from 'd3'
  import eventDrops from 'event-drops'
  var chartData = [
    {
      name: 'Amazing',
      data:[{date: new Date('2019/04/03/22:22:31')}],
    },
    {
      name: 'Good',
      data:[{date: new Date('2019/04/03/22:22:31')}],
    },
      {
      name: 'OK',
      data:[{date: new Date('2019/04/03/22:22:31')}],
    },
      {
      name: 'Not Great',
      data:[{date: new Date('2019/04/03/22:22:31')}],
    },
      {
      name: 'Awful',
      data:[{date: new Date('2019/04/03/22:22:31')}],
    },
  ];
export default {
  name: 'blooplines',
  template: '<div></div>',
  mounted(){
    const chart = eventdrops();
    d3.select("#eventchart").data([chartData]).call(chart);
  }


}
</script>
<style lang="scss" scoped>
  #eventchart{
    width: 100%;
    height: 100%;
  }
  
</style>