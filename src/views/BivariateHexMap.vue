<template>
  <div class="display">
    <H1>Where are you from?</H1>
    <svg width="960" height="600"></svg>
    
  </div>
</template>
<script>
import * as Api from "@/api/Api.js"
import * as HexMap from "@/api/hexbin.js"
export default {
  
}
</script>
<style lang="scss">

.nation {
  fill: #ddd;
}

.states {
  fill: none;
  stroke: #fff;
  stroke-linejoin: round;
}

.hexagon {
  stroke: #fff;
}
  
</style>