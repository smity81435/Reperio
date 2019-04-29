<template>
  <div class="inquiries">
    <div class="content">
      <h1>Installation Inqueries</h1>
      <p>Reperio is designed to be scalable, and installed in virtually any public setting. If you feel like you want to get to know your community a little more, or get them to know themselves, fill out the form below and let us know what you have in mind!</p>
      <button id="emailButt" v-on:click="sendIt()">Email Douglas Smith</button>
    </div>
  </div>
</template>
<script>
import pushMessage from '@/api/Api.js'
import install from '@/assets/install.png'
export default {
  name: "Inquiries",
  data(){
      return{
        fullName:"",
        email:"",
        subject:"",
        message:"",
      }
  },
  methods:{
    sendIt(){
      var subject="Reperio Installation"
      location.href = "mailto:smithdouglas25@gmail.com?subject="+subject;
      
    }
  },
  mounted(){
    this.$store.state.loading=false;
  }
}
</script>
<style lang="scss" scoped>
#emailButt{
  font-family: 'Avenir';
  transition: all .5s;
  font-size: 20px;
  font-weight: 200;
  //padding: 20px;
  color: white;
  padding: 20px;
  margin: 25px;
  border-radius: 5px;
  border: 1pt solid rgba(255,255,255,.6);
  box-shadow: none;
  background: linear-gradient(rgba(255,255,255,.2),rgba(255,255,255,.3),rgba(255,255,255,.1)) !important;
  &:hover{
    cursor: pointer;
    transform: translateY(-10px);
    box-shadow: 0px 5px 5px 3px rgba(0,0,0,.2);
    background: linear-gradient(rgba(109, 235, 176, 0.5),rgba(109, 235, 176,.7),rgba(109, 235, 176,.5)) !important;
  }
  margin-top: 20px;
}
.inquiries{
  color: white;
  background: url("../assets/install.png")no-repeat center center;
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
}
.content{
  background: linear-gradient(black,rgba(0,0,0,.8),rgba(0,0,0,0));
  padding-top: 40px;
  p{
    width: 60%;
    margin: auto;
  }
}
</style>