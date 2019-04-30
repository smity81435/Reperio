<template>
  <div class="expo page">
    <h1 class="questionheader">What is your favorite project in the ATLAS EXPO?</h1>
    <vue-word-cloud
      :words="words"
      
      :rotation-unit="turn"
      :rotation="rotation"
			:spacing="spacing"
      :color="([, weight]) => weight > 10 ? 'lightgreen' : weight >= 5 ? 'lightblue' : 'rgba(255,255,255.3)'"
      font-family="Avenir"
    />
  </div>
</template>
<script>
import VueWordCloud from 'vuewordcloud'
import json from '@/assets/expo.json'

export default {
  name: "expo",
  components:{
      VueWordCloud,
  },
  data(){
    return{
      turn: "turn",
      rotation: 90,
      spacing:0,
      expojson:json,
    words:[["Go ahead",3],["Pick One",5],],
    }
  },
  methods:{

  },
  created(){

  },
  mounted(){
    for(var i = 0; i < json.length; i++){
      //console.log(json[i].title);
      this.words.push([json[i].title,1]);
    }
  }
  
}
</script>
<style lang="scss" scoped>

</style>
