<template>
  <transition name="fade" mode="in-out">
    <div class="thanks" v-if='visible'>
      <h1>{{response}}</h1>
    </div>
  </transition>
</template>
<script>
  export default{
    name: 'Thanks',
    props:{
      visible:{
        type: Boolean,
        default:  true,
        required: true,
      }
    },
    components:{

    },
    data(){
      return{
        response: "Your response has been recorded!",
      };
    },
    methods:{

    },
    created(){
      // setTimeout(()=>{
      //   alert("its happening.");
      //     this.pageContent="Question";
      // },5000);
    }
  }
  
</script>
<style lang="scss" >

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
  .thanks{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    box-shadow: 0px 0px 300px 300px rgba(255, 255, 255, 0.8);
    border: 5px solid white;
    width: 60vw;
    height:200px;
    
    background: linear-gradient(rgb(159, 250, 186),rgb(78, 190, 111));
    border-radius: 15px;
    color: rgb(255, 255, 255);
    text-shadow: 0px 0px 10px rgba(34, 34, 34, .7);
    font-weight: 700;
    margin: auto;
    margin-top: 30vh;
    transition: all 1s;
    padding: 20px;
    padding-bottom: 30px;
    z-index: 9999;
  }
</style>