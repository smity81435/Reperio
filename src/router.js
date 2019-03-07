import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RepDisplay from './views/RepDisplay.vue'
import BivariateHexMap from './views/BivariateHexMap.vue'
import HorizontalChart from './views/HorizontalChart.vue'
import Birthdates from './views/Birthdates.vue'
import Origins from './views/Origins.vue'



Vue.use(Router)
Vue.use(require('vue-moment'))


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
    },
    {
      path: '/origins',
      name: "origins",
      component: Origins,
    },
    {
      path: '/birthdates',
      name: "birthdates",
      component: Birthdates,
    }
  ]
})
