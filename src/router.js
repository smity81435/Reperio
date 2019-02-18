import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RepDisplay from './views/RepDisplay.vue'
import BivariateHexMap from './views/BivariateHexMap.vue'
import HorizontalChart from './views/HorizontalChart.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/repdisplay',
      name: 'repdisplay',
      component: RepDisplay
    },
    {
      path: '/hexmap',
      name: 'hexmap',
      component: BivariateHexMap,
    },
    {
      path: '/horzchart',
      name:'horzchart',
      component: HorizontalChart,
    }
  ]
})
