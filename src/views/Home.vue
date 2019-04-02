<template>
<div class="home" >
    
    <h2 class="pageIdentifier">{{currentPage}}</h2>
    <h2 class="about" @click="aboutClicked()">About Reperio</h2>
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
      // isBlurred: false,
    };
  },
  methods: {
    onControlClick(){
      this.currentPage = this.currentPage ==  "TODAY'S QUESTION" ? "DISPLAY CONTROLS" : "TODAY'S QUESTION";
      this.pageContent = this.pageContent == "Question" ? "DisplayControl" : "Question";
    },
    goBackHome(){
      this.pageContent="Question";
    },
    aboutClicked(){
      // Click test
      // alert("About Clicked");
      // this.currentPage="About";
      this.pageContent = "About";
    },
    answerClicked(newAns){
      //console.log("answer clicked: "+newAns);
      Api.addAnswer(newAns).then((docref)=>{
        // console.log("answer pushed to firebase");
      }).catch(function(error){
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
  z-index: 9999;
  position: fixed;
  bottom: 50px;
  right: 20px;
  color: rgba(140, 0, 255, 0.452);
  border: 3px solid rgba(140, 0, 255, 0.452);
  opacity: 1;
  background: white;
  padding: 10px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 20px;
}
@media only screen and (max-width: 600px){
  .pageIdentifier{
    display: none;
  }
  .about{
    display: none;
  }
  
}

  
</style>
