<template>
<div class="home" >
    
    <h2 class="pageIdentifier">{{currentPage}}</h2>
    <div class="bottomButtons" 
      v-if="buttonShow" 
      :disabled="this.$store.state.controlsDisabled">
      <p class="about" 
        @click="aboutClicked()"
        :onGoBack="()=>goBackHome()"
      >About Reperio</p>
      <p class="dispcontrols" @click="onControlClick()">Display Controls</p>
    </div>
    <transition name="fade">
      <component 
      :class="{blur: isBlurred}"
      :is="pageContent"
      :v-show="visible"
      :currentPage="currentPage"
      :currentAns="currentAns"
      :onGoBack="()=>goBackHome()"
      :onControlClick="()=>onControlClick()"
      :onAnswerClick="(newAns)=>answerClicked(newAns)"
      />
    </transition>
      
    <!-- <vue-snotify></vue-snotify> -->
  </div>
</template>

<script>
// @ is an alias to /src
import About from '@/components/About.vue'
import Question from '@/components/Question.vue'
import DisplayControl from '@/components/DisplayControl.vue'
import * as Api from "@/api/Api.js"
export default {
  name: 'home',
  components: {
    About,
    Question,
    DisplayControl,
    
  },
  props:{

  },
  data() {
    return {
      currentAns: "",
      currentPage: "TODAY'S QUESTION",
      pageContent: 'Question',
      visible: true,
      isBlurred: false,
      buttonShow: true,
      // isBlurred: false,
    };
  },
  methods: {
    onControlClick(){
      this.buttonShow = !this.buttonShow;
      this.currentPage = this.currentPage ==  "TODAY'S QUESTION" ? "DISPLAY CONTROLS" : "TODAY'S QUESTION";
      this.pageContent = this.pageContent == "Question" ? "DisplayControl" : "Question";
    },
    goBackHome(){
      this.buttonShow=true;
      this.pageContent="Question";
      this.currentPage="TODAY'S QUESTION";
    },
    aboutClicked(){
      this.buttonShow=false;
      // Click test
       //alert("About Clicked");
      this.currentPage="ABOUT";
      this.pageContent = "About";
    },
    answerClicked(newAns){
      //console.log("answer clicked: "+newAns);
      Api.addAnswer(newAns).then(()=>{
        // console.log("answer pushed to firebase");
      }).catch(function(){
        //console.log(error);
      });
      //Click Test
      //alert(newAns);
    },
  },
  created(){

  },
}
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.pageIdentifier{
  //@debugtext-shadow: 0px 0px 15px black;
  color: rgba(140, 0, 255, 0.2);
  font-size: 75px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: 900;
  opacity: 20%;
}
.about{

  color: rgba(140, 0, 255, 0.452);
  border: 3px solid rgba(140, 0, 255, 0.452);
  opacity: 1;
  background: white;
  padding: 10px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 20px;
}
.dispcontrols {
  font-size: 20px;
  box-shadow: none;
  padding: 10px;
  background: white;;
  color: rgb(73, 184, 121);
  font-weight: 700;
  border-radius: 10px;
  border: 3px solid rgb(73, 184, 121);
}
.bottomButtons{
  transition: all 1s;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 80px;
  left: 0px;
  right: 0px;
  width: 80vw;
  margin: auto;
  p{
    box-shadow: 0px 5px 5px 3px rgba(0,0,0,.2);
  }
}
@media only screen and (max-width: 600px){
  .bottomButtons{
    display: none;
  }
  .about{
    display: none;
  }
  
}

  
</style>
