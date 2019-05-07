<template>
  <div class="welcome">
    <header>
      <video autoplay muted loop id="repVideo">
      <source src="@/assets/reperio.mp4" type="video/mp4">
      </video>
      <div class="headerbackground">
        <div class="headertext">
          <!-- <h1>Reperio</h1>
          <span>Where Data Visualization Meets Community</span> -->
        </div>
      </div>
    </header>
    <div class="snippet">
      <h2><em> What is it?</em></h2>
      <p>Reperio is, first and foremost, an attempt to use data visualization to give us insight into our community, and perhaps more importantly, to spark conversation, laughs, and serious consideration about our surroundings. The project uses the powerful <a href="https://vuejs.org/" target="_blank"> Vue.js</a> framework coupled with renowned data visualization tools like <a href="http://www.d3js.org" target="_blank">D3.js</a> and ECharts to create an interactive web application. This application is installed in any public area and collects user inputs which are then fed to a real-time <a href="https://firebase.google.com/" target="_blank">Firestore Database</a>. The other half of the application reads the data from the database and creates a live visualization to be displayed alongside the terminal.
      <br><br>
      Reperio is designed to be scalable, so it can be installed in almost any setting and accommodate thousands of user interactions. The visualizations showed here were part of a 10-week installation in the <a href="https://www.colorado.edu/atlas/" target="_blank">ATLAS Institute</a> at the University of Colorado Boulder.</p>
      <!-- <h2><router-link to="/inquiries">Installation Inquiries</router-link></h2> -->
    </div>
    
    
    
  </div>
</template>
<script>
export default {
  name:"Inquiries",
  mounted(){
    this.$store.state.loading=false;
  },
  
}
</script>
<style lang="scss" scoped>
#repVideo{
  width: 80%;
}

.welcome{
  left: 15%;
  width: calc(100% - 15%);
  position: relative;
}
.headertext{
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 80%;
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.8),black);
  background: url("../assets/header.png")no-repeat center center;
  background-size: contain;
  color: white;
  // background-position-x: 20%;
  

  h1{
    font-weight: 300;
    font-size: 50px;
  }
}
.headerbackground{
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 200px;
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.6),black) !important;
}
header{

  position: relative;
  width: 100%;
  box-shadow: 0px 0px 5px 5px rgba(0,0,0,.2);
  background: black;


}
.repInfo{
  width: 100%;
  color: white;
  background: rgba(0,0,0,.4);
  margin: auto;
  a{
    transition: all .2s;
    color: white;
    text-decoration: underline;
    &:hover{
      color: rgb(141,241,85);
    }
  }
  p{
    text-align: left;
    width: 80%;
    margin: auto;
    padding: 30px 0px;
  }
  .nextp{
    text-align: center;
    padding-top: 0px;
    padding-bottom: 40px;
  }
  h2{
    background: black;
    width: 100%;
    padding: 40px 0px;
    font-sizE: 2em;
  }
}
  
</style>