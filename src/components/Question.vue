<template>
  <div class="qotd">
    <div class="question" :class="{blur: isBlurred}">
      <p>This is where the question of the day goes!</p>

    </div>
    <div class="answer">
      <p class="answerButton"  @click="handleAns(one)">Answer 1</p>
      <p class="answerButton"  @click="handleAns(two)">Answer 2</p>
    </div>
    <transition name="fade">
        <Thanks
          class="modal"
          :visible="thanksVisible"
        />
    </transition>

   
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
.modal{
  transition: all 1s;
}

.qotd{
  border-radius: 5px;
  background: rgba(0,0,0,.6);
  width: 80vw;
  margin: auto;
  margin-top: 30%;
  padding: 10px;

}
.question{
  font-size: 40px;
  color: white;
  
}
.answer{
  border-radius: 5px;
  width: 50vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;

}
.answerButton{
  font-size: 36px;
  color: white;
  background: rgba(0,0,0,.6);
  padding: 20px;
  margin: 10px;
  &:hover{
    cursor: pointer;
  }
}

h3 {
  
}

ul {
  list-style-type: none;
  
}

li {
  display: inline-block;
  
}
a {
  // color: #42b983;
}
.blur{
    filter: blur(4px);
}
</style>
