<template>
  <div class="allAboutit">
    <div class="info">
      <h1>About Reperio</h1>
      
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
      <p class="allcount">Project Total User Interaction Count: {{this.$store.state.mtvData.length+this.$store.state.commuteData.length+this.$store.state.originsData.length+this.$store.state.birthData.length+this.$store.state.emotionsData.length}}</p>
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
.allcount{
  color: rgb(140,241,85);
  font-size: 40px;
  font-weight: 600;
  margin-top: 50px;
  text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.329);
}
  .allAboutit{
    color: white;
    width: 100%;
    height: 100%;
    padding-top: 100px;
    position: relative;
    background: linear-gradient(rgba(255,255,255,.05),rgba(156, 255, 172, 0.1));
  }
  .info{
    width: 60%;
    height: 80%;
    margin: auto;
    h1{
      margin: 40px auto;
      font-size: 50px;

    }
  }
</style>