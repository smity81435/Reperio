<template>
  <div class="aboutReperio">
    <h1>REPERIO</h1>
    <p>Reperio is a dynamic data visualization built by Douglas Smith.</p>
    <div class="back" @click="()=>onGoBack()">
    <button>Back</button>
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
    position: fixed;
    top: 5px;
    left: 5px;
    font-size: 30px;
    background: rgba(0,0,0,.6);
    color: white;
    outline: 2px solid white;
  }
  .aboutReperio{
    color: white;
    margin: 0;
    padding: 0;
    width: 60vw;
    background: rgba(0,0,0,.6);
    margin: auto;
    
  }
  
</style>