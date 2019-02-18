<template>
  <div class="qotd">
    <div class="all">
    <div class="question" :class="{blur: isBlurred}">
      <p>How do you get to campus every day?</p>
    </div>
    <div class="Box" :class="{blur: isBlurred}">
      <p  class="answerButton button is-primary" @click="handleAns(one)">Drive</p>
      <p class="answerButton button is-primary"  @click="handleAns(two)">Walk</p>
      <p class="answerButton button is-primary"  @click="handleAns(three)">Bus</p>
      <p class="answerButton button is-primary"  @click="handleAns(four)">Bike&#47;Skate</p>
      <p class="answerButton button is-primary"  @click="handleAns(five)">Uber&#47;Lift</p>
      <p class="answerButton button is-primary"  @click="handleAns(six)">Other</p>
    </div>
    <p class="notes"></p>
    <transition name="fade">
        <Thanks
          class="modal"
          :visible="thanksVisible"
        />
    </transition>
    </div>
  </div>
</template>
<script>
import Thanks from '@/components/Thanks.vue'
export default {
  name: 'Question',
  props: {
    currentPage:{
      type: String,
      required: true,
    },
    onAnswerClick:{
      type: Function,
      default: ()=> {},
    }
  },
  components:{
    Thanks,
  },
  data(){
    return{
      one: "0",
      two: "1",
      three: "2",
      four: "3",
      five: "4",
      six: "5",
      thanksVisible: false,
      isBlurred: false,
    }
  },
  methods:{
    handleAns(newAns){
      this.isBlurred=true;
      this.thanksVisible=true;
      setTimeout(()=>{
        this.thanksVisible= false;
        this.isBlurred=false;
      },4000);
      //alert(newAns);
      this.onAnswerClick(newAns);
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.notes{
  color: white;
}
.modal{
  transition: all 1s;
}
.qotd{
  border-radius: 5px;
  //background: rgba(54, 238, 245, 0.6);
  width: 100vw;
  height: 100vh;
  padding: auto;

}
.all{
  height: 50vh;
  width: 80vw;
  margin: auto;
}
.question{
  font-size: 40px;
  color: white;
  font-weight: 700;
  text-shadow: 0px 0px 15px black;
}
.Box{
  position: relative;
  border-radius: 5px;
  margin: auto;
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: center;
}
.answerButton{
  //height: 40px;
  font-size: 36px;
  color: white;
  background: linear-gradient(30deg, rgb(255, 101, 255),rgb(130, 35, 255),rgb(0, 153, 255));
  padding: 20px;
  padding-top: 8px;
  border: 1px solid white;
  margin: 40px;
  border-radius: 40px;
  font-weight: 700;
  box-shadow: 3px 5px 14px 5px rgba(0,0,0,.6);
  &:hover{
    cursor: pointer;
  }
}
ul {
  list-style-type: none;
}
li {
  display: inline-block;
}
.blur{
    filter: blur(4px);
}
</style>
