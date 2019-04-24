<template>
  <div class="twoall">
    <h1>Would you rather?</h1>
    <h2>Total Interactions: {{totalInteractions}}</h2>
    <h2>Last Answer: {{lastAns}}</h2>
    <div class="chartbase">
      <h2>Be Awarded $5 Billion USD</h2>
      <d3-network
        class="nodegroup"
        :net-nodes="nodeListOne"
        :options="getOptions(0)"
        :net-links="[]"
        :selection="{nodes: nodeListOne}"
        />
    
    </div>
    <div class="chartbase">
      <h2>Live for 500 Years</h2>
      <d3-network
        class="nodegroup"
        :net-nodes="nodeListTwo"
        :net-links="[]"
        :options="getOptions(1)"
        :selection="{nodes: nodeListTwo}" />
    </div>
    
  </div>
</template>
<script>
import D3Network from 'vue-d3-network'
import * as Api from "@/api/Api.js"
export default {
  name:"Twochart",
  components:{
    D3Network,
  },
  data(){
    return{
      totalInteractions:0,
      nodeListOne:[],
      nodeListTwo:[],
      lastAns: "",

    }
  },
  methods:{
    getOptions(index) {
      var numNodes =0;
      if(index==0){
        numNodes = this.nodeListOne.length;
      }else{
        numNodes = this.nodeListTwo.length;
      }
      var nodeSize=30;
      var force= 500;
      if(numNodes >= 10 && numNodes <= 30){
          nodeSize = 25;
          force = 200;
        }else if(numNodes > 30){
          nodeSize= 100/(numNodes/10);
          force = 200/(numNodes/25);
        }
      return {
        force: force,
        size:{ w: 210, h: 400 },
        nodeSize: nodeSize,
        nodeLabels: false,
        canvas: false,
      }
    }
  },
  mounted(){
    Api.listenTwoCharts((change) => {
      //console.log(change);
      if (change.type === "added") {
        this.totalInteractions++;
        var node = change.doc.data();
        if(node.ans==0){
          this.nodeListOne.push(
            {
              id: this.nodeListOne.length,
              _color: "lightgreen",
            }
          );

          this.lastAns="Take the Money!"
        }else{
          this.nodeListTwo.push(
            {
              id: this.nodeListTwo.length,
              _color: "blue",
            }
          );
          this.lastAns= "Live For 500 Years!";
        }
        //this.addNode(node.ans);
      }
    });
  }

  
}
</script>
<style lang="scss" scoped>

</style>
