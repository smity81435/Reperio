import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Interface from './views/Interface.vue'
import RepDisplay from './views/RepDisplay.vue'
import Birthdates from './views/Birthdates.vue'
import Origins from './views/Origins.vue'
import Emotions from './views/Emotion.vue'
import Twochart from './views/TwoChart.vue'
import AboutRep from './views/Aboutrep.vue'
import Inquiries from './views/Inquiries.vue'

Vue.use(Router)
Vue.use(require('vue-moment'))
export default new Router({
  mode: "history",
  linkExactActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/interface',
      name: 'User Interface',
      component: Interface
    },
    {
      path: '/inquiries',
      name: 'Installation Inquiries',
      component: Inquiries
    },
    {
      path: '/home',
      name: 'Welcome to Reperio',
      component: Home
    },
    {
      path: '/repdisplay',
      name: 'Our Commute',
      component: RepDisplay
    },
    {
      path: '/origins',
      name: "Our Origins",
      component: Origins,
    },
    {
      path: '/birthdates',
      name: "Our Birthdates",
      component: Birthdates,
    },
    {
      path: '/emotions',
      name: "Our Emotions",
      component: Emotions,
      },
    {
      path: '/twochart',
      name: "Money Vs. Time",
      component: Twochart,
      },
    {
      path: '/aboutreperio',
      name: "About Reperio",
      component: AboutRep,
      },
  ]
})
