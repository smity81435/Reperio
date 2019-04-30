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
    <div class="snippet">
      <h2>Live Event-Dropping of Community Emotional Status</h2>
        <p>
          Have you ever noticed that, when you are overwhelmed, it brings you relief to see that other people around you are also struggling? Misery loves company. In fact, I made this visualization with that in mind. As the end of the Spring semester approached, and everyone began losing their minds, I installed the Emotions chart in the ATLAS lobby for everyone to see. This public outward display of individual internal conditions, challenges us to see ourselves in our peers. As Abraham Lincoln once said, &quot;Tact is the ability to describe others as they see themselves&quot;.
          <br><br>
          <strong>Technical Notes:</strong>  
          <br>
        The chart element used in this visualiztion was especially difficult to implement in this app. This is primarily because all of the dependencies used for this chart element were of the same libraries as some of the other charts. The base library &#40;<a href="http://www.d3js.org" target="_blank">D3.js</a>&#41; for all of these visualizations has a number of smaller libraries used to augment the main library, and they tend to conflict with eachother if seperate versions of the same library exist within one application. I should also note that I placed a random motivational quote generator at the bottom of the visualization to curb the depressing effects of observing the emotional state of hundreds of college students.
        <br><br>
        On a scientific note, I noticed an interesting trend &#40;which I implore you to investigate yourself using the above visualization&#41; that early-risers tend to get a better start to the day. I cannot conclude that they have an overall better day from the data presented, but it does seem that there are considerably more &quot;Amazing&quot; and &quot;Good&quot; answers in the beginning of the morning. Curious, no? You can even begin to see waves of emotion throughout the day, probably correlating with eating schedules... but I can't be sure.
        </p>
      </div>
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
  left: 15%;
  width: calc(100% - 15%);
  position: relative;
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
  margin-top: 20px;
  
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

