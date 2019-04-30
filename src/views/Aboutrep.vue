<template>
  <div class="aboutPage page">
    <div class="infoBox">
      <h1>About Reperio</h1>
      <p>Reperio is a dynamic data visualization web-based application built by Douglas Scott Smith using the Vue.js Framework and and Google's
        Firestore realtime database.</p>
      <p>
        <strong> Reperio has two main goals:</strong> <br>
        <ul class="goallist">
          <li>1. Provide a proof of concept for the use of Vue.js, Firestore, and D3.js in real-time data visualization.</li>
          <li>2. Use data visualization in a manner that promotes healthy debate, positive thought, and laughter.</li>
        </ul>
        For more information please visit: <a href="http://dpower3.wordpress.com" target="_blank">Doug's Digital Design Blog</a> 
      </p>
      <div class="allcount">Total User Interaction Count: {{this.$store.state.mtvData.length+this.$store.state.commuteData.length+this.$store.state.originsData.length+this.$store.state.birthData.length+this.$store.state.emotionsData.length}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AboutRep",
  mounted(){
    this.$store.state.loading=false;
  }
}
</script>
<style lang="scss" scoped>
  .aboutPage {
    color: white;
    padding-top: 100px;
    
    background: url('../assets/aboutpic.png')no-repeat center center;
    background-size: cover;
  }

  .goallist {
    list-style: none;
    padding-left: 0px;

    li {
      margin: 10px 0px;
      font-weight: 600;

    }
  }

  .infoBox {
    width: 70%;
    // height: 60%;
    margin: auto;
    background: linear-gradient(rgba(0, 0, 0, .9), rgba(0, 0, 0, .6));
    border-radius: 15px;
    a{
      transition: .5s;
      text-decoration: underline;
      color: white;
      font-weight: bold;
      &:hover{
        cursor: pointer;
        color: rgb(141,241,85);
      }
    }

    h1 {
      margin: 40px auto;
      padding-top: 20px;
      font-size: 50px;
    }

    p {
      width: 90%;
      margin: auto;
      font-size: 20px;
    }
  }

  .allcount {
    margin-top: 50px;
    color: rgb(140, 241, 85);
    font-size: 50px;
    font-weight: 600;
    text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.329);
  }

</style>