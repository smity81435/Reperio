<template>
  <div class="aboutReperio">
    <h1>REPERIO</h1>
    <p>Reperio is a dynamic data visualization built by Douglas Smith using the Vue Framework and and Google's Firestore realtime database. Reperio is periodically updated with new questions and higher-level visualizations, so be sure to check in often!</p>
    <p>
      <strong> There are two goals of the project:</strong> <br>
      1. Provide a proof of concept for the use of Vue.js, Firestore, and D3.js in real-time data visualization.
      <br><br>
      2. Use data visualization in a manner that promotes healthy debate, positive thought, and laughter. 
      <br><br>
      For more information please visit Doug's design blog at: dpower3.wordpress.com 

    </p>
    <div class="back" @click="()=>onGoBack()">
    <button class="backButton">Back</button>
    </div>
  </div>

</template>
<script>
  export default{
    props:{
      onGoBack:{
        type: Function,
        default: ()=>{},
      }
    },
    components:{

    },
    name: "About",
    data(){
      return{
        
      }

    },


  }
</script>
<style lang="scss">
  button{
    border-radius: 20px;
    border: 1px white solid;
    position: fixed;
    top: 10px;
    left: 10px;
    font-size: 30px;
    font-weight: 700;
    padding: 15px;
    background: rgba(190, 32, 253, 0.938);
    color: rgb(255, 255, 255);
    box-shadow: 0px 0px 5px 5px rgba(0,0,0,.5);
    
  }
  .aboutReperio{
    
    border-radius: 5px;
    color: white;
    margin: 0;
    padding: 0;
    padding: 40px;
    width: 60vw;
    background: rgba(0,0,0,.8);
    margin: auto;
    p{
      font-size: 20px;
      font-weight: 400;
    }
    
  }
  
</style>