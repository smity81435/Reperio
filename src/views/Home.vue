<template>
  <div class="welcome">
    <header>
      <video autoplay muted loop id="repVideo">
      <source src="@/assets/reperio.mp4" type="video/mp4">
      </video>
      <div class="headertext">
      <h1>Reperio</h1>
      <span>Where Data Visualization Meets Community</span>
      </div>
    </header>
    <div class="repInfo">
      <h2>What is it?</h2>
      <p>Reperio is first and foremost an attempt to use data visualization to give us insight into our community, and perhaps more importantly to spark conversation, laughs, and serious consideration about our surroundings. The project uses the powerful <a href="https://vuejs.org/" target="_blank"> Vue.js</a> famework coupled with reknown data visualization tools like <a href="http://www.d3js.org" target="_blank">D3.js</a> and ECharts to create an interactive web application to be installed in any public area and collect user inputs. Those inputs are fed to a real-time <a href="https://firebase.google.com/" target="_blank">Firestore Database</a>, which inturn is read by the web app and updates the visualization.</p>
      <p>Reperio is designed to be scalabe, so it can be installed in almost any setting and accommodate thousands of user interactions. The visualizations showed here were part of a 10-week installation in the <a href="https://www.colorado.edu/atlas/" target="_blank">ATLAS Institute</a> at the University of Colorado Boulder.</p>
      <h2><router-link to="/inquiries">Installation Inquiries</router-link></h2>
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
  width: 100%;
  height: 100%;
  position: relative;
}
.headertext{
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 20%;
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.8),black);
  color: white;
  h1{
    font-weight: 300;
    font-size: 50px;
  }
}
header{
  position: relative;
  width: 100%;
  box-shadow: 0px 0px 5px 5px rgba(0,0,0,.2);
  background: black;

}
.repInfo{
  width: 80%;
  color: white;
  margin: auto;
  a{
    transition: all .2s;
    color: white;
    text-decoration: underline;
    &:hover{
      color: rgb(141,241,85);
    }
  }
}
  
</style>