<template>
  <div class="inquiries page">
    <div class="content">
      <h1>Installing Reperio</h1>
      <p>Reperio is designed to be scalable, and installed in virtually any public setting. If you feel like you want to get to know your community a little more, or get them to know themselves, please send me an email with some details!</p>
      <button id="emailButt" v-on:click="sendIt()">Let's Do This!</button>
    </div>
  </div>
</template>
<script>

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
  font-weight: 600;
  &:hover{
    cursor: pointer;
    transform: translateY(-10px);
    box-shadow: 0px 5px 5px 3px rgba(0,0,0,.2);
    background: linear-gradient(rgba(109, 235, 176, 0.7),rgba(109, 235, 176,.8),rgba(109, 235, 176,.7)) !important;
    
  }
  margin-top: 20px;
}
.inquiries{
  height: 100%;
  color: white;
  background: url("../assets/install.png")no-repeat center center;
  background-size: cover;
}
.content{
  position: absolute;
  width: 50%;
  left: 40px;
  top: 30%;
  background: linear-gradient(black,rgba(0,0,0,.8),rgba(0,0,0,.6));
  border-radius: 15px;
  padding-top: 40px;
  p{
    //text-align: left;
    font-size: 20px;
    width: 60%;
    margin: auto;
  }
}
</style>