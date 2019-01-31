import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RepDisplay from './views/RepDisplay.vue'

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
    }
  ]
})
