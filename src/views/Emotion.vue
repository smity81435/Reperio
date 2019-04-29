<template>
  <div class="allEmo">
    <h2 class="totalCount">User Interactions: {{this.$store.state.emotionsData.length}}</h2>
    <h1 class="questionheader">Our Emotions</h1>
    <div class="vizbox">
      <p class="subtitle">Tracking our Emotions through Spring of 2019</p>
      <div :is="Daychart" >
      </div>
    </div>
    <div class="quotebox">
      <p class="quotetext"><q>{{this.quote}}</q></p>
      <p class="quoteauthor">-{{this.author}}</p>
    </div>
    <p class="snippet">The most recent visualization displayed in the ATLAS building was a live emotional-health tracker of the people passing through the lobby. I realized that this data could be potentially saddening on occasion, so I added a random funny/motivational quote generator to make it a little less daunting. The chart element used in this visualiztion was especially <em>not</em> meant to be used in framework like Vue, so there was a lot of guesswork and jerry-rigging to get the data and chart to communicate properly.</p>
    <!-- <div class="console"></div> -->
    <!-- <transition name="fade" mode="in-out">
      <div class="newResponse" v-if='newResponseShow' :opacity="modalopacity">
        <p>New Response Received!</p>
      </div>
    </transition> -->
  </div>
</template>
<script>
//imports
import Daychart from '@/components/Daychart'
import moment from 'moment'

//export
export default {
  props:{
  },
  components:{
    Daychart,
  },
  data(){
    return {
      Daychart: "Daychart",
      day: parseInt(moment().format("D")),
      dayPick: null,
      modalopacity: 1,
      newResponseShow: false,
      quote: "Whatever you do, always give 100%... unless you are donating blood.",
      author: "Bill Murray",
    }
  },
  created(){
    //  Api.quoteListen((change)=>{
    //   var node = change.doc.data();
    //   this.quote= node.quote;
    //   this.author=node.author;
    // });
  },
  mounted(){
    this.$store.state.loading=false;
  }
}
</script>

<style lang="scss" scoped>
.allEmo{
  position: relative;
  width: 85vw;


}
// .console{
//   position: absolute;
//   bottom: 0px;
//   right: 50px;
//   width: 200px;
//   height: 350px;
//   background: url("../assets/console.png")no-repeat center center;
//   background-size: cover;
// }
.statTitle {
  font-size: 16pt;
}
.stat {
  font-size: 30px;
  font-weight: 600;
  position: absolute;
  padding: 0px;
  bottom: 40%;
  left: 0px;
  right: 0px;
  margin: auto;
  color: rgb(87, 150, 114);
}
// .bottomStats {
//   display: flex;
//   justify-content: space-between;
//   width: 40vw;
//   position: absolute;
//   bottom: -100px;
//   left: 20px;
// }
.statTab {
  padding: 10px;
  position: relative;
  background: linear-gradient(white,rgba(255,255,255,.8));
  height: 200px;
  width: 200px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, .2);
}
// .dispheader {
//   z-index: -999;
//   position: absolute;
//   left: 50px !important;
//   top: 100px !important;
//   font-size: 80px;
//   color: rgba(140, 0, 255, 0.2) !important;
//   margin: 0;
//   font-weight: 700 !important;
// }
.subtitle {
  font-size: 30px;
  color: rgb(53, 141, 115);
  font-weight: 700;
  margin: 50px auto;
  margin-top: 10vh;
  padding-top: 10px;
}

.vizbox {
  background: linear-gradient(white,rgb(250, 247, 255));
  box-shadow: 0px 5px 5px 3px rgba(0, 0, 0, .2);
  width: 100%;
  margin: auto;
}
.quotebox{
  background: white;
  width: 80%;
  font-weight: 600;
  font-size: 18px;
  margin: 20px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 5px 5px 3px rgba(0,0,0,.2);
}
.quotetext{
  font-size: 24px;
  color: rgba(0,0,0,.8);
}
.quoteauthor{
  color: rgb(53, 141, 115);
}

</style>

