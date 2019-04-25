<template>
  <div class="display">
    <h1 class="questionheader">How do you get to campus every day?</h1>
    <div class="visualization">
      <div
        v-for="(nodeList, index) in nodeLists"
        :class="{
          datagroup: true,
          winnit: isWinning(index),
          }"
        :key="index">
        <h2 
          :class="{
            groupname: true,
            winner: isWinning(index),
          }"
        >{{responses[index]}}</h2>
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
    <h2 class="totalCount">User Interactions: {{this.$store.state.commuteData.length}}</h2>
  </div>
</template>
<script>
import D3Network from 'vue-d3-network'
const colors = ['#F54657', '#1CFF88','#28CCB6','#FF58A6','#9332FF','#FFF541'];
const responses= ['Drive','Walk','Bus','Bike/Skate','Uber/Lyft','Other'];
export default {
  components:{
    D3Network,
  },
  data(){
    return {
      modalopacity: 1,
      newResponseShow: false,
      responses: responses,
      importList: [
      ],
      // The number of responses for each option
      nodeLists: [],
      deg:10,
      winner:false,
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
      return winningNumber ===  this.nodeLists[index].length;
    },
    getOptions(index) {
      var numNodes = this.nodeLists[index].length;
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
        size:{ w: 200, h: 400 },
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
    for(var z =0; z < this.$store.state.commuteData.length;z++){
      var node = this.$store.state.commuteData[z];
      this.addNode(node.ans);
    }
    // Update node lists every time an answer is received
    // Api.listenCommute((change) => {
    //   //console.log(change);
    //   if (change.type === "added") {
    //     //console.log("New: ", change.doc.data());
    //     var node = change.doc.data();
    //     this.addNode(node.ans);
    //   }
    //   if (change.type === "modified") {
    //     //console.log("Modified: ", change.doc.data());
    //   }
    //   if (change.type === "removed") {
    //     //console.log("Removed: ", change.doc.data());
    //   }
    // });
    //console.log("this is the import list "+this.importList);
  },
  beforeDestroy(){
    this.nodeLists=[];
  }
}
</script>
<style lang="scss">

.display{
  position: relative;
  //background: url('../assets/tabback.png')no-repeat center center;
  width: 100%;
  height: 100%;
}
.nodecount{
  color: rgb(211, 102, 102);
  font-size: 36px;
  font-weight: 700;
  transition: all 1s;
}
.questionheader{
  color: white;
  font-size: 50px;
  text-shadow: 0px 0px 10px black;
  margin-top: 50px;
}
.groupname{
  color: white;
  font-size: 1.5em;
  padding-top: 20px;
  text-shadow: 0px 0px 10px black;
}
.visualization{
  //background: black;
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin: 50px auto;
}
.datagroup{
  background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0));
  border-radius: 5px;
  margin: 10px;
  padding-left: 15px;
  padding-right: 15px;
}
.nodegroup{
  animation: rotation 20s infinite linear;
  overflow: visible !important;
  
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
}
h1,a{
  //color: #1aad8d;
  text-decoration: none;
}
.nodecount {
  color: rgb(211, 102, 102);
}
.nodecount.winning {
  color: rgb(28, 255, 16);
  font-size: 50px;
  text-shadow: 0px 0px 10px white;
}
.winner{
  transition: all 1s;
  font-size: 3em;
}
.winnit{
  background: linear-gradient(rgba(111, 253, 158, 0.808),rgba(0,0,0,0));
}
.newResponse{
  transition: all 1s;
  z-index: 9999;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: linear-gradient(rgba(87, 244, 255, 0.8),rgba(33, 177, 158, 0.8));
  width: 55vw;
  height: 20vh;
  margin: auto;
  padding: auto;
  border-radius: 10px;
  border: 1px solid white;
  
  box-shadow: 0px 0px 100px 75px rgba(255, 91, 233, 0.6);
  p{
    color: white;
    font-size: 60px;
    font-weight: 700;
    opacity: 1;
    
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

