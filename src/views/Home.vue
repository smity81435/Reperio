<template>
<div class="home" >
    <h1 id="reperio">REPERIO</h1>
    <h2 class="pageIdentifier">{{currentPage}}</h2>
    <h2 class="about" @click="aboutClicked()"><strong>?</strong></h2>
    <transition name="fade">
      <component 
      :class="{blur: isBlurred}"
      :is="pageContent"
      :v-show="visible"
      :currentPage="currentPage"
      :currentAns="currentAns"
      :onGoBack="()=>goBackHome()"
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
import * as Api from "@/api/Api.js"
export default {
  name: 'home',
  components: {
    About,
    Question,
    
  },
  data() {
    return {
      currentAns: "",
      currentPage: "QUESTION OF THE WEEK",
      pageContent: 'Question',
      visible: true,
      isBlurred: false,
      // isBlurred: false,
    };
  },
  methods: {
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
      console.log("answer clicked: "+newAns);
      Api.addAnswer(newAns).then((docref)=>{
        console.log("answer pushed to firebase");
      }).catch(function(error){
        console.log(error);
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
#reperio{
  z-index: -5;
  background: -webkit-linear-gradient(rgb(90, 142, 167), rgb(0, 0, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 100px;
  font-weight: 300;
  position: fixed;
  bottom: 50px;
  left: 10px;
  margin: 0;
  opacity: .4;

}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.pageIdentifier{
  text-shadow: 0px 0px 15px black;
  color: white;
  font-size: 30px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: 900;
}
.about{
  z-index: 9999;
  position: fixed;
  bottom: 65px;
  right: 20px;
  color: white;
  opacity: 1;
  background: rgba(0,0,0,.6);
  padding: 20px;
  border-radius: 30px;
  font-weight: 300;

}


  
</style>
