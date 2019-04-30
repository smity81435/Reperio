<template>
  <div class="twoall page">
    <h1 class="questionheader">Would you rather?</h1>
    <div class="bichart">
      <div class="chartbase one">
        <h2>Be Awarded $5 Billion USD</h2>
        <d3-network class="nodegroup" :net-nodes="nodeListOne" :options="getOptions(0)" :net-links="[]" :selection="{nodes: nodeListOne}"/>
        <h2 class="winning">{{nodeListOne.length}}</h2>
      </div>
      <div class="chartbase">
        <h2>Live for 500 Years</h2>
        <d3-network class="nodegroup" :net-nodes="nodeListTwo" :net-links="[]" :options="getOptions(1)" :selection="{nodes: nodeListTwo}"/>
        <h2>{{nodeListTwo.length}}</h2>
      </div>
    </div>
    <div class="snippet">
      <h2>The First Visualization: the D3 Node Network</h2>
      <p>
        For the first visualization, I wanted to break the ice. No one had heard of my project yet, and if it was to be displayed in public, I wanted their first reaction to be a good one. I thought over lots of possible questions &#40;including the nipple-fingers or finger-nipples question&#41; but decided on the time-tested money vs. longevity. I was pleasantly surpised to find that people would answer this question through the terminal even before I was able to get the visualization working. From that moment, I knew Reperio would succeed.
        <br>
        C.R.E.A.M.
        <br><br>
        <strong>Technical Notes:</strong>
        <br>
        Before I could begin to pull interesting emotional data from the community using Reperio, I had to first discover how to intertwine <a href="http://d3js.org" target="_blank">D3.js</a> with the <a href="http://www.vuejs.org" target="_blank">Vue.js</a> framework. If you are familiar with D3, then you probably know how crazy the data update cycle is. If you are not, imagine giving a letter to your friend to give to the post office to give back to your mother just to have it show up in your mailbox with a stamp that says &quot;INVALID RETURN ADDRESS&quot;. It can be confusing. This is compounded by the fact that I was new to Vue and how it manages its data via lifecycle hooks. <br><br>
      I quickly discovered that Vue would be a powerful tool, but it would also require me to do some out-of-the-box thinking to get everything working. So, for this first visualization, I decided to keep it simple. 
      </p>
    </div>
    <h2 class="totalCount">User Interactions: {{this.$store.state.mtvData.length}}</h2>
  </div>
</template>
<script>

import D3Network from 'vue-d3-network'

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
    for(var i = 0; i < this.$store.state.mtvData.length; i++){
      var node = this.$store.state.mtvData[i];
      if(node.ans == 0){
        this.nodeListOne.push(
          {
            id: this.nodeListOne.length,
            _color: "rgb(140, 241, 85)",
          }
        );
        this.lastAns="Take the Money!"
      }else{
        this.nodeListTwo.push(
          {
            id: this.nodeListTwo.length,
            _color: "rgb(223, 85, 241)",
          }
        );
        this.lastAns= "Live For 500 Years!";
      }
    }
    this.$store.state.loading=false;
  }
}
</script>
<style lang="scss" scoped>

.twoall{
  //color:rgb(223, 85, 241);
  color: white;
}
.bichart{
  
  width: 80%;
  margin: 50px auto;
  display: flex;
  justify-content: space-around;
  overflow: visible;
}
.chartbase{
  background: linear-gradient(rgba(255,255,255,.05),rgba(156, 255, 172, 0.1));
  //border: 2px solid rgb(255,255,255);
  padding: 20px 0px;
  width: 40%;
  border-radius: 15px;
  box-shadow: 0px 5px 5px 3px rgba(0,0,0,.2);
}
.one{
  background: linear-gradient(rgba(0, 0, 0, 0.493),rgba(0, 0, 0, 0.63));
  box-shadow: 0px 10px 5px 3px rgba(0, 0, 0, 0.432);
}
</style>
