<template>
  <div class="aboutReperio">
    <div class="info">
      <h1>REPERIO</h1>
      <p>Reperio is a dynamic data visualization built by T.A.M. Major Douglas Smith using the Vue Framework and and Google's
        Firestore realtime database. Reperio is periodically updated with new questions and higher-level visualizations,
        so be sure to check in often!</p>
      <p>
        <strong> There are two goals of the project:</strong> <br>
        1. Provide a proof of concept for the use of Vue.js, Firestore, and D3.js in real-time data visualization.
        <br><br>
        2. Use data visualization in a manner that promotes healthy debate, positive thought, and laughter.
        <br><br>
        For more information please visit Doug's design blog at: dpower3.wordpress.com
      </p>
    </div>
    <div class="back" @click="()=>handleClick()">
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
    methods:{
      handleClick(){
        this.onGoBack();
      }
    }


  }
</script>
<style lang="scss">
  button{
    border-radius: 10px;
    border: 3px rgba(140, 0, 255, 0.452) solid;
    font-size: 20px;
    font-weight: 700;
    padding: 10px;
    background: white;
    color: rgba(140, 0, 255, 0.452);
    box-shadow:  0px 5px 5px 3px rgba(0,0,0,.2);
    margin-top: 15px;
    
  }
  .info{
    border-radius: 10px;
    background: rgba(0,0,0,.6);
    padding: 10px;
    box-shadow: 0px 5px 5px 3px rgba(0,0,0,.2);
  }
  .aboutReperio{
    border-radius: 5px;
    color: white;
    margin: 0;
    padding: 0;
    padding: 40px;
    width: 60vw;
    background: white;
    margin: auto;
    box-shadow: 0px 5px 5px 3px rgba(0,0,0,.2);
    p{
      font-size: 20px;
      font-weight: 400;
    }
    
  }
  
</style>