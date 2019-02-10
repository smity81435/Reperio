<template>
  <div class="display">
    <h1 class="questionheader">Would you rather??</h1>
    <div class="visualization">
      <div
        class="datagroup"
        v-for="(nodeList, index) in nodeLists"
        :key="index">
        <h2 class="groupname">{{responses[index]}}</h2>
        <d3-network
          class="nodegroup"
          ref="net"
          :net-nodes="nodeList"
          :net-links="[]"
          :options="getOptions(index)"/>
        <p
          :class="{
            nodecount: true,
            winning: isWinning(index),
          }">
          {{ nodeList.length }}
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
      nodeLists: [],
      deg:10,
    }
  },

  methods: {
    addNode(index) {
      const nodeList = this.nodeLists[index];
      nodeList.push({
        id: nodeList.length,
        _color: colors[index],
      });
    },
    isWinning(index) {
      var winningNumber = Math.max(...this.nodeLists.map(nodeList => nodeList.length));
      return winningNumber === this.nodeLists[index].length;
    },
    getOptions(index) {
      var numNodes = this.nodeLists[index].length;
      var nodeSize=30;
      var force= 500;
      if(numNodes >= 20 && numNodes <= 50){
          nodeSize = 60-numNodes;
          force = force-numNodes;
        }else if(numNodes > 50){
          nodeSize=15;
          force = force/(numNodes/10);
        }
      return {
        force: force,
        size:{ w: 400, h: 400 },
        nodeSize: nodeSize,
        nodeLabels: false,
        canvas: false,
      }
    }
  },
  mounted() {
    // Initialize number of responses in results data object
    for (var i = 0; i < this.responses.length; i++) {
      this.nodeLists.push([]);
    }

    // Update node lists every time an answer is received
    Api.listen((change) => {
      console.log(change);
      if (change.type === "added") {
        //console.log("New: ", change.doc.data());
        var node = change.doc.data();
        this.addNode(node.ans);
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
.nodegroup{
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

