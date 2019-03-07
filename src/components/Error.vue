<template>
  <transition name="fade" mode="in-out">
    <div class="error" v-if='visible'>
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
        response: "Please Choose a Date",
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
  .error{
    position: fixed ;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    box-shadow: 0px 0px 100px 50px rgba(179, 24, 24, 0.8);
    width: 70vw;
    height: 100px;
    background: linear-gradient(rgb(241, 107, 125),rgb(185, 36, 36));
    border-radius: 15px;
    color: rgb(255, 255, 255);
    font-weight: 700;
    margin: auto;
    transition: all 1s;
    padding: auto;
    padding-bottom: 30px;
  }
</style>