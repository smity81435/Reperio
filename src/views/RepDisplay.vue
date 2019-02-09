<template>
  <div class="display">
    <h1 class="questionheader">Would you rather??</h1>
    <div class="visualization">
      <div class="datagroup group1">
        <h2 class="groupname groupname1">Eat Guano</h2>
        <d3-network class="nodeGroup1" ref='net' :net-nodes="nodeList1"  :options="options"
         />
         <p class="nodecount count1"  
            v-bind:style="
              [(this.nodeList1.length >= this.nodeList2.length) ? {'color':'rgb(28, 255, 16)', 'text-shadow': '0px 0px 10px white', 'font-size':'50px'} : {'color':'rgb(211, 102, 102)'}]"
            >{{this.nodeList1.length}}</p>
      </div>
      <div class="datagroup group2">
        <h2 class="groupname groupname2">Snort Wasabi</h2>
        <d3-network class="nodeGroup1" ref='net' :net-nodes="nodeList2"  :options="options" />
        <p class="nodecount count2" v-bind:style="
              [(this.nodeList2.length >= this.nodeList1.length) ? {'color':'rgb(28, 255, 16)', 'text-shadow': '0px 0px 10px white', 'font-size':'50px'} : {'color':'rgb(211, 102, 102)'}]"
              >{{this.nodeList2.length}}</p>
      </div>
    </div>
  </div>
</template>

<script>

import D3Network from 'vue-d3-network'
import * as Api from "@/api/Api.js"

export default {
  components:{
    D3Network,
  },
  data(){
    return{
      importList: [
        
      ],
      nodeList1: [
        // { id: 1,_color: '#6ec6ff'},
        // { id: 2,_color: '#6ec6ff'},
        // { id: 3,_color: '#6ec6ff'},
        // { id: 4,_color: '#6ec6ff'},
        // { id: 5,_color: '#6ec6ff'},
      ],
      nodeList2:[
        // { id: 1,_color: '#64ffda'},
        // { id: 2,_color: '#64ffda'},
        // { id: 3,_color: '#64ffda'},
        // { id: 4,_color: '#64ffda'},
        // { id: 5,_color: '#64ffda'},
        // { id: 6,_color: '#64ffda'},
        // { id: 7,_color: '#64ffda'},
        // { id: 8,_color: '#64ffda'},
        // { id: 9,_color: '#64ffda'},
        // { id: 10,_color: '#64ffda'},
        // { id: 11,_color: '#64ffda'},
      ],
      links: [
        { sid: 1, tid: 2 },
        { sid: 2, tid: 8 },
        { sid: 3, tid: 4 },
        { sid: 4, tid: 5 },
        { sid: 5, tid: 6 },
        { sid: 7, tid: 8 },
        { sid: 5, tid: 8 },
        { sid: 3, tid: 8 },
        { sid: 7, tid: 9 }
      ],
      nodeSize:40,
      canvas:false,
      deg:10,
    }
  },
  created(){
    //this.$api.dispatch(initRealtimeListener);
    Api.listen(this.nodeList1, this.nodeList2);
  },
    methods:{

  },
  computed:{
    options(){
      return{
        force: 500,
        size:{ w:400, h:400},
        nodeSize: this.nodeSize,
        nodeLabels: false,
        canvas: this.canvas
      }
    }
  },
  mounted(){
    if(this.nodeList1.length > this.nodeList2.length){
      num1.classList.add('winning');
      num2.classList.remove('winning');
    }else if(this.nodeList1.length < this.nodeList2.length){
      num1.classList.remove('winning');
      num2.classList.add('winning');
    }
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
.winning{
  color: rgb(28, 255, 16);
}
</style>

