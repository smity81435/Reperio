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
    position: fixed ;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    box-shadow: 0px 0px 300px 300px rgba(0, 0, 0, .8);
    width: 60vw;
    height: 100px;
    background: linear-gradient(rgb(107, 241, 148),rgb(78, 190, 111));
    border-radius: 5px;
    color: rgb(255, 255, 255);
    font-weight: 700;
    margin: auto;
    transition: all 1s;
    padding: 20px;
    padding-bottom: 30px;
  }
</style>