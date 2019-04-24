
<template>
<!-- For the sake of individuals who wish to use this project to create their own visualizations, I have done my best not to delete any of the code needed to manipulate the question screen. To optimise performance, delete whatever you dont need. -->
  <div class="qotd">
    <div class="all" :class="{blur: isBlurred}">
      <div class="question">
        <h1 class="questheader">How are you feeling right now?</h1>
        <div class="feeling">
          <!-- Emotion Inputs -->
          <input type="radio" name="emotion" id="amazing" value="Amazing" v-model="emotion">
          <label for="amazing">AMAZING</label>

          <input type="radio" name="emotion" id="good" value="Good" v-model="emotion">
          <label for="good">GOOD</label>

          <input type="radio" name="emotion" id="ok" value="OK" v-model="emotion">
          <label for="ok">OK</label>

          <input type="radio" name="emotion" id="notgreat" value="Not Great" v-model="emotion">
          <label for="notgreat">NOT GREAT</label>

          <input type="radio" name="emotion" id="awful" value="Awful" v-model="emotion">
          <label for="awful">AWFUL</label>
        </div>
        <!-- <p class="statement">I was born on <br> {{ pickeddate | moment("dddd, MMMM Do YYYY")}} </p> -->
        <!-- <p>formatted date: {{fixeddate}}</p> -->
        <!-- <datepicker
        :class= "{blur: isBlurred}"
        class="datepick"
        :initialView = " 'year' "
        :input-class = " 'pickerbox' "
        :calendar-class = " 'cal' " 
        :placeholder = 'dateholder'
        :disabled-dates= 'disdates'
        :full-month-name = 'monthname'
        :format = 'format'
        v-model = 'pickeddate'
        
      /> -->
        <!-- <p class="ask">I am roughly from (the): {{origin}}</p>
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
      <label for="international">International/Other</label> -->

        <!-- <p  class="answerButton button is-primary" :disabled="thanksVisible" @click="handleAns(one)">Drive</p>
      <p class="answerButton button is-primary"  :disabled="thanksVisible" @click="handleAns(two)">Walk</p>
      <p class="answerButton button is-primary"  :disabled="thanksVisible" @click="handleAns(three)">Bus</p>
      <p class="answerButton button is-primary"  :disabled="thanksVisible" @click="handleAns(four)">Bike&#47;Skate</p>
      <p class="answerButton button is-primary"  :disabled="thanksVisible" @click="handleAns(five)">Uber&#47;Lift</p>
      <p class="answerButton button is-primary"  :disabled="thanksVisible" @click="handleAns(six)">Other</p> -->
      

      <!-- <p class="ask">I came to CU for the: {{reason}}</p>
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
    </div> -->

      <p class="subbut" :class="{ready: emotion}" :disabled="thanksVisible" @click="handleAns(emotion)">Submit</p>
      </div>
    </div>
    <Thanks class="modal" :visible="thanksVisible" />
    <Error class="modal" :visible="errorVisible" />
  </div>
</template>
<script>

//import Datepicker from 'vuejs-datepicker';
import Error from '@/components/Error.vue'
import Thanks from '@/components/Thanks.vue'
import moment from 'moment'

export default {
  name: 'Question',
  props: {
    currentPage: {
      type: String,
      required: true,
    },
    onAnswerClick: {
      type: Function,
      default: () => {},
    },
  },
  components: {
    Thanks,
    Error,
  },
  data() {
    return {
      // format: "dd MMMM yyyy",
      // fixeddate: "",
      // monthname: true,
      // pickeddate: "",
      // dateholder: "Click here to pick a date",
      // disdates: {
      //   to: new Date(1919,0,1),
      //   from: new Date(2019,0,1),
      // },
      // month: "January",
      // day: "1",
      // year: 2000,
      emotion: "",
      // reason:"",
      // origin: "",
      // role:"",
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
  mounted() {

  },
  methods: {
    handleAns(emotion) {
      //console.log("clicked");
      if (emotion == "") {
        this.isBlurred = true;
        this.$store.state.controlsDisabled = true;
        this.errorVisible = true;
        setTimeout(() => {
          this.errorVisible = false;
          this.isBlurred = false;
          this.$store.state.controlsDisabled = false;
        }, 3000);
      } else {
        //Here we are building the date time group to be pushed to firebase. 
        var y = moment().format("YYYY");
        var mo = moment().format("MM");
        var d = moment().format("DD");
        var h = moment().format("HH");
        var m = moment().format("mm");
        var s = moment().format("ss");
        // '2019/04/03/22:22:31'
        var dtg = [y, mo, d, h, m, s];
        //console.log("front side: " + dtg);
        var newAns = {
          dtg: dtg,
          emotion: emotion,
        };
        this.isBlurred = true;
        this.thanksVisible = true;
        this.onAnswerClick(newAns);
        setTimeout(() => {
          this.emotion = ""
          this.thanksVisible = false;
          this.isBlurred = false;
        }, 4000);
      }
    },
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// .statement{
//   color: rgba(0, 162, 255, 0.658);
//   font-size: 40px;
// }
.all{
  margin-top: -50px;
}


.questheader {
  padding-top: 10px;
  font-size: 35px;
  margin-top: 150px;
  color: rgb(43, 43, 43) !important;
}

.notes {
  color: white;
}

.modal {
  transition: all 1s;
}

.qotd {
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

// .all{
//   //width: 90vw;
//   margin: auto;
//   p{
//     margin: 0px;
//     margin-top: 20px;
//     margin-bottom: 20px;
//   }
// }

// .datepick{
//   width: 60vw;
//   height: 10vh;

//   margin: auto;

//   padding: 40px;
//   margin-top: 100px;
//   margin-bottom: 130px;

// }
// input.pickerbox{
//   border-radius: 20px;
//   color: rgba(140, 0, 255, 0.452);

//   &::placeholder{
//     color: rgba(140, 0, 255, 0.452);
//   }
//   border: 5px solid rgba(140, 0, 255, 0.452);
//   width: 100%;
//   height: 100%;
//   font-size: 30px;
//   text-align: center;
//   background: white;
//   //color: rgba(0, 217, 255, 0.877);
//   box-shadow: 0px 5px 5px 3px rgba(0,0,0,.3);
//   font-weight: 600;
//   font-family: Avenir;
// }
// .prev disabled{
//   color: grey;
// }
//  .next disabled{
//   color: grey;
// }
// .cal{
//   width: 60vw !important;
//   //border:2px solid orange;
//   //background: red;
//   background: white !important;
//   border-radius: 10px;
//   color: rgba(140, 0, 255, 0.452);
//   box-shadow: 0px 5px 5px 3px rgba(0,0,0,.2);
// }


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

// .answerButton{
//   //height: 40px;
//   font-size: 36px;
//   color: rgba(0, 162, 255, 0.712);
//   background: linear-gradient(30deg, rgb(255, 101, 255),rgb(130, 35, 255),rgb(0, 153, 255));
//   padding: 20px;
//   padding-top: 8px;
//   border: 1px solid white;
//   margin: 40px;
//   border-radius: 40px;
//   font-weight: 700;
//   box-shadow: 3px 5px 14px 5px rgba(0,0,0,.6);
//   &:hover{
//     cursor: pointer;
//   }
// }

// ul {
//   list-style-type: none;
// }

// li {
//   display: inline-block;
// }

.blur {
  filter: blur(4px);
}

// .role{
//   width: 70vw;
//   top: 20vh;
//   display: grid;
//   grid-template-rows: 1fr 1fr 1fr 1fr;
//   grid-template-columns: 1fr 1fr 1fr ;
//   margin: auto;
//   label{
//     width: 125px;
//     background: linear-gradient(30deg, rgba(0, 107, 230, 0.644),rgba(0, 112, 218, 0.726),rgb(0, 153, 255));
//     color: rgba(244, 244, 255, 0.774);
//     margin-top: 20px;
//     padding: 20px;
//     border-radius: 20px;
//     border: 1px solid white;
//     box-shadow: 0px 5px 5px 5px rgba(0,0,0,.6);
//     font-size: 25px;
//   }
// }
//I am from the:
// .place{
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
//   grid-template-rows: 1fr 1fr 1fr ;
//   grid-row-gap: 10px;
//   width: 85vw;
//   margin: 0;
//   padding: 0;
//   margin: auto;
//   label{
//     width: 75%;
//     margin: auto;
//     color: white;
//     background: linear-gradient(30deg, rgb(255, 101, 255),rgb(130, 35, 255),rgb(0, 153, 255));
//     padding: 20px;
//     border-radius: 20px;
//     border: 1px solid white;
//     font-weight: 700;
//     font-size: 20px;
//     box-shadow: 0px 5px 5px 5px rgba(0,0,0,.6);
//   }
// }

//I came here for the
// .reasonask{
//   z-index: 999;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: 1fr 1fr 1fr;
//   grid-row-gap: 10px;
//   width: 80vw;
//   margin: 0;
//   margin: auto;
//   margin-bottom: 50px;
//   label{
//     width: 75%;
//     margin: auto;
//     color: white;
//     background: linear-gradient(30deg, rgb(255, 101, 255),rgb(130, 35, 255),rgb(0, 153, 255));
//     padding: 20px;
//     border-radius: 20px;
//     border: 1px solid white;
//     font-weight: 700;
//     font-size: 20px;
//     box-shadow: 0px 5px 5px 5px rgba(0,0,0,.6);
//   }
// }
//radio hide
input[type=radio]{
  display: none;
}
//input checked
input[type="radio"]:checked+label {
  transition: all 1s;
  box-shadow: 0px 5px 5px 3px rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.979);
}
#amazing+label {
  transition: all 1s;
  color: rgb(59, 102, 221);
  background: white;
  border: 3px solid rgba(62, 91, 223, 1);
}
#amazing:checked+label {
  background: linear-gradient(rgba(110, 161, 255, 0.884), rgba(54, 67, 255, 0.767), rgb(124, 130, 224));
  color: white;
}
#good+label {
  transition: all 1s;
  color: #68826A;
  background: white;
  border: 3px solid #68826A;
}
#good:checked+label {
  background: linear-gradient(rgb(139, 173, 142), #68826A, rgb(163, 199, 166));
  color: white;
}
#ok+label {
  transition: all 1s;
  color: rgb(135, 102, 196);
  background: white;
  border: 3px solid rgb(135, 102, 196);
}
#ok:checked+label {
  background: linear-gradient(rgb(162, 128, 224), rgb(135, 102, 196), rgb(180, 150, 235));
  color: white;
}
#notgreat+label {
  transition: all 1s;
  color: rgb(209, 161, 29);
  background: white;
  border: 3px solid rgb(209, 161, 29);
}
#notgreat:checked+label {
  background: linear-gradient(rgb(238, 207, 122), rgb(209, 161, 29), rgb(238, 202, 105));
  color: white;
}
#awful+label {
  transition: all 1s;
  color: #C84C5A;
  background: white;
  border: 3px solid #C84C5A;
}
#awful:checked+label {
  background: linear-gradient(rgb(236, 122, 135), #C84C5A, rgb(235, 147, 157));
  color: white;
}


// 'rgb(65, 122, 196)' ,
// '#68826A' , 
// '#9B9DDB' ,
// 'rgb(209, 161, 29)' ,
// '#C84C5A' ,
// .ask{

//   color: white;
//   font-weight: 700;
//   font-size: 25px;
//   text-shadow: 0px 0px 5px rgba(0,0,0,.6);
// }

.subbut {
  z-index: 9999;
  width: 25vw;
  margin: auto !important;
  margin-top: 20px !important;
  background: rgba(255, 255, 255, .8);
  padding: 10px;
  font-size: 30px;
  color: rgb(73, 184, 121);
  font-weight: 700;
  border-radius: 10px;
  border: 3px solid rgb(73, 184, 121);
  //box-shadow: 0px 5px 5px 3px rgba(0, 0, 0, .3);

  &:hover {
    cursor: pointer;
  }

}

label {
  transition: all 1s;
  box-shadow: inset 0px 0px 3px 5px rgb(233, 233, 233);
  width: 30vw;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
}

.feeling {
  font-weight: 700;
  color: rgba(140, 0, 255, 0.452);
  font-size: 35px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // display: grid;
  // grid-template-columns: 1fr;
}

.question{
  background: white;
  box-shadow: 0px 5px 5px 3px rgba(0,0,0,.3);
  border-radius: 10px;
  padding-bottom: 10px;
  width: 75vw;
  margin: auto;
}
.ready{
  transition: all 1s;
  background: linear-gradient(rgb(50, 201, 100),rgb(35, 143, 71),rgb(101, 212, 138));
  color: white;
  box-shadow: 0px 5px 5px 3px rgba(0, 0, 0, .3);
}
@media only screen and (max-width: 600px) {
  .questheader {
    font-size: 25px;
    font-weight: 300;
    width: 75vw;
    margin: auto;
  }
  .feeling {
    margin-top: 10px;
    font-size: 18px;
  }
  .subbut {
    font-size: 25px;
    padding: 5px;
  }

}

</style>
