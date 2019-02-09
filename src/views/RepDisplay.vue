<template>
  <div class="display">
    <h1 class="questionheader">Would you rather??</h1>
    <div class="visualization">
      <div
        class="datagroup"
        v-for="(count, index) in results"
        :key="index">
        <h2 class="groupname">{{responses[index]}}</h2>
        <d3-network
          class="nodegroup"
          ref="net"
          :net-nodes="buildNodeList(count, index)"
          :net-links="[]"
          :options="options"/>
        <p
          :class="{
            nodecount: true,
            winning: isWinning(count),
          }">
          {{ results[index] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import D3Network from 'vue-d3-network'
import * as Api from "@/api/Api.js"

const colors = ['#6ec6ff', '#64ffda'];
const responses= ['Eat Guano','Snort Wasabi'];

export default {
  components:{
    D3Network,
  },
  data(){
    return {
      responses: responses,
      importList: [
        
      ],
      // The number of responses for each option
      results: [],
      nodeSize:40,
      canvas:false,
      deg:10,
    }
  },

  methods: {
    buildNodeList(count, index) {
      var nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          id: i,
          _color: colors[index],
        });
      }
      return nodes;
    },
    isWinning(count) {
      return Math.max(...this.results) === count;
    },
  },
  computed:{
    options(){
      return{
        force: 500,
        size:{ w:400, h:400},
        nodeSize: this.nodeSize,
        nodeLabels: false,
        canvas: this.canvas,
      }
    }
  },
  mounted() {
    // Initialize number of responses in results data object
    for (var i = 0; i < this.responses.length; i++) {
      this.results.push(0);
    }

    // Update node lists every time an answer is received
    Api.listen((change) => {
      console.log(change);
      if (change.type === "added") {
        //console.log("New: ", change.doc.data());
        var node = change.doc.data();
        if (node.ans < 0 || node.ans >= this.results.length) {
          console.log('invalid answer number');
          return;
        }
        // Add an option
        this.results[node.ans] += 1;
        this.$forceUpdate();
      }

      if (change.type === "modified") {
        console.log("Modified: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed: ", change.doc.data());
      }
    });
    //console.log("this is the import list "+this.importList);
  }
}
</script>
<style lang="scss">
.nodecount{
  color: rgb(211, 102, 102);
  font-size: 36px;
  font-weight: 700;
  transition: all 1s;
}
.questionheader{
  color: white;
}
.groupname{
  color: white;
  font-size: 2em;
}
.visualization{
  //background: black;
  width: 90vw;
  display: flex;
  justify-content: space-around;
  margin: auto;
}
.datagroup{
  width: 50vw;
  height: 50vw;
  //background: rgba(0,0,0,.3);
  border-radius: 50%;
  margin: 10px;

}
.nodeGroup1{
  animation: rotation 20s infinite linear;
}
.nodeGroup2{
  animation: rotation 20s infinite linear;
}
@keyframes rotation {
		from {
				-webkit-transform: rotate(0deg);
		}
		to {
				-webkit-transform: rotate(359deg);
		}
}


body{
  font-family: 'PT Sans', sans-serif;
  background-color: #eee;
}
.title{
  position:absolute;
  text-align: center;
  left: 2em;
}
h1,a{
  //color: #1aad8d;
  text-decoration: none;
}
ul.menu {
  list-style: none;
  position: absolute;
  z-index: 100;
  min-width: 20em;
  text-align: left;
}
ul.menu li{
  margin-top: 1em;
  position: relative;
}

.nodecount {
  color: rgb(211, 102, 102);
}
.nodecount.winning {
  color: rgb(28, 255, 16);
  font-size: 50px;
  text-shadow: 0px 0px 10px white;
}
</style>

