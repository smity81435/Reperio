<template>
  <div class="qotd">
    <div class="all":class="{blur: isBlurred}">
    <div class="question" >
      <p>I am a(n) : {{ role }}</p>

    <div class="role">
      <input type="radio" name="role" id="student" value="Student" v-model="role">
      <label for="student" >Student</label>
      <input type="radio" name="role" id="staff" value="Staff" v-model="role">
      <label for="staff">Staff</label>
      <input type="radio" name="role" id="other" value="Other" v-model="role">
      <label for="other">Other</label>
      </div>
    </div>

    <p class="ask">I am roughly from (the): {{origin}}</p>
    <div class="place" :class="{blur: isBlurred}">
      <input type="radio" name="origin" id="colorado" value="Colorado" v-model="origin">
      <label for="colorado">Colorado</label>

      <input type="radio" name="origin" id="west" value="West Coast" v-model="origin">
      <label for="west">West Coast</label>

      <input type="radio" name="origin" id="east" value="East Coast" v-model="origin">
      <label for="east">East Coast</label>

      <input type="radio" name="origin" id="south" value="South" v-model="origin">
      <label for="south">South</label>

      <input type="radio" name="origin" id="midwest" value="Midwest" v-model="origin">
      <label for="midwest">Midwest</label>

      <input type="radio" name="origin" id="sw" value="Southwest" v-model="origin">
      <label for="sw">Southwest</label>

      <input type="radio" name="origin" id="pnw" value="Pacific Northwest" v-model="origin">
      <label for="pnw">Pacific/PNW</label>

      <input type="radio" name="origin" id="international" value="International" v-model="origin">
      <label for="international">International/Other</label>

      <!-- <p  class="answerButton button is-primary" :disabled="thanksVisible" @click="handleAns(one)">Drive</p>
      <p class="answerButton button is-primary"  :disabled="thanksVisible" @click="handleAns(two)">Walk</p>
      <p class="answerButton button is-primary"  :disabled="thanksVisible" @click="handleAns(three)">Bus</p>
      <p class="answerButton button is-primary"  :disabled="thanksVisible" @click="handleAns(four)">Bike&#47;Skate</p>
      <p class="answerButton button is-primary"  :disabled="thanksVisible" @click="handleAns(five)">Uber&#47;Lift</p>
      <p class="answerButton button is-primary"  :disabled="thanksVisible" @click="handleAns(six)">Other</p> -->
    </div>

    <p class="ask">I came to CU for the: {{reason}}</p>
    <div class="reasonask">
      <input type="radio" name="reason" id="education" value="Education" v-model="reason">
      <label for="education">Education</label>

      <input type="radio" name="reason" id="rec" value="Recreation" v-model="reason">
      <label for="rec">Recreation</label>

      <input type="radio" name="reason" id="ent" value="Entertainment" v-model="reason">
      <label for="ent">Entertainment</label>

      <input type="radio" name="reason" id="loc" value="Location" v-model="reason">
      <label for="loc">Location</label>

      <input type="radio" name="reason" id="con" value="Convenience" v-model="reason">
      <label for="con">Convenience</label>

      <input type="radio" name="reason" id="oth" value="Other Reason" v-model="reason">
      <label for="oth">Other</label>
    </div>

    <p class="subbut" :disabled="thanksVisible" @click="handleAns(role,origin,reason)">Submit</p>

    <!-- <p class="notes"></p> -->


    </div>
        <Thanks
          class="modal"
          :visible="thanksVisible"
        />
        <Error
          class="modal"
          :visible="errorVisible"
        
        />
  </div>
</template>
<script>
import Error from '@/components/Error.vue'
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
    Error,
  },
  data(){
    return{
      reason:"",
      origin: "",
      role:"",
      // one: "0",
      // two: "1",
      // three: "2",
      // four: "3",
      // five: "4",
      // six: "5",
      thanksVisible: false,
      errorVisible: false,
      isBlurred: false,
    }
  },
  methods:{
    handleAns(role,origin,reason){
      console.log("clicked");
      if(role===""||origin===""||reason===""){
        this.isBlurred = true;
        this.errorVisible= true;
        setTimeout(()=>{
          this.errorVisible=false;
          this.isBlurred=false;
        }, 3000);
      }else{
        var dtg = new Date();
        var time = dtg.toUTCString();
        var newAns= {
          role: role,
          origin: origin,
          reason: reason,
          time: time,
        }
        this.isBlurred=true;
        this.thanksVisible=true;
        setTimeout(()=>{
          this.role="";
          this.origin="";
          this.reason="";
          this.thanksVisible= false;
          this.isBlurred=false;
        },4000);
        //alert(newAns);
        this.onAnswerClick(newAns);
      }
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
  position: absolute;
  top: 30px;
  bottom: 0;
  right: 0;
  left: 0;
  //background: rgba(54, 238, 245, 0.6);
  width: 100vw;
  height: 100vh;
  padding: auto;
}

.all{
  width: 90vw;
  margin: auto;
  p{
    margin: 0px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.question{
  font-size: 25px;
  color: white;
  font-weight: 700;
  margin: 0;
  text-shadow: 0px 0px 15px black;

}


// .Box{
//   position: relative;
//   border-radius: 5px;
//   margin: auto;
//   margin-top: 100px;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: 1fr 1fr 1fr;
//   justify-content: center;
// }

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



.role{
  display: flex;
  justify-content: space-between;
  width: 70vw;
  margin: auto;
  label{
    width: 100px;
    background: linear-gradient(30deg, rgb(255, 101, 255),rgb(130, 35, 255),rgb(0, 153, 255));
    padding: 20px;
    border-radius: 20px;
    border: 1px solid white;
    box-shadow: 0px 5px 5px 5px rgba(0,0,0,.6);
    font-size: 25px;
  }
}
//I am from the:
.place{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr ;
  grid-row-gap: 10px;
  width: 85vw;
  margin: 0;
  padding: 0;
  margin: auto;
  label{
    width: 75%;
    margin: auto;
    color: white;
    background: linear-gradient(30deg, rgb(255, 101, 255),rgb(130, 35, 255),rgb(0, 153, 255));
    padding: 20px;
    border-radius: 20px;
    border: 1px solid white;
    font-weight: 700;
    font-size: 20px;
    box-shadow: 0px 5px 5px 5px rgba(0,0,0,.6);
  }
}

//I came here for the
.reasonask{
  z-index: 999;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 10px;
  width: 80vw;
  margin: 0;
  margin: auto;
  margin-bottom: 50px;
  label{
    width: 75%;
    margin: auto;
    color: white;
    background: linear-gradient(30deg, rgb(255, 101, 255),rgb(130, 35, 255),rgb(0, 153, 255));
    padding: 20px;
    border-radius: 20px;
    border: 1px solid white;
    font-weight: 700;
    font-size: 20px;
    box-shadow: 0px 5px 5px 5px rgba(0,0,0,.6);
  }
}

//radio hide
input[type=radio]{
  display: none;
}

//input checked
input[type="radio"]:checked+label{
   background: linear-gradient(rgba(115, 255, 110, 0.884),rgba(54, 255, 131, 0.767));
   box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.671);
   text-shadow: 0px 0px 5px rgba(0,0,0,.6);
   color: rgba(255, 255, 255, 0.979);
   
}


.ask{
  color: white;
  font-weight: 700;
  font-size: 25px;
  text-shadow: 0px 0px 5px rgba(0,0,0,.6);
}

.subbut{
  z-index: 9999;
  width: 50%;
  margin: auto !important;
  background: linear-gradient(lightgreen, green);
  padding: 10px;
  font-size: 30px;
  color: white;
  font-weight: 700;
  border-radius: 10px;
  border: 1px solid white;
  box-shadow: 0px 5px 10px 5px rgba(0,0,0,.6);
  
}
</style>
