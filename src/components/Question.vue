<template>
  <div class="qotd">
    <div class="question" :class="{blur: isBlurred}">
      <p>Would you rather???</p>

    </div>
    <div class="Box" :class="{blur: isBlurred}">
      <p class="answerButton"  @click="handleAns(one)">EAT GUANO</p>
      <p class="answerButton"  @click="handleAns(two)">SNORT WASABI</p>
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
  background: rgba(54, 238, 245, 0.6);
  width: 80vw;
  margin: auto;
  
  padding: 10px;

}
.question{
  font-size: 40px;
  color: white;
  font-weight: 700;

}

.Box{
  position: relative;
  border-radius: 5px;
  margin: auto;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  
}

.answerButton{
  height: 40px;
  font-size: 36px;
  color: white;
  background: rgba(0,0,0,.6);
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  font-weight: 700;
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
