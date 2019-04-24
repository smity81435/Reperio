import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RepDisplay from './views/RepDisplay.vue'
import Birthdates from './views/Birthdates.vue'
import Origins from './views/Origins.vue'
import Emotions from './views/Emotion.vue'
import Twochart from './views/TwoChart.vue'
import Expo from './views/Expo.vue'


Vue.use(Router)
Vue.use(require('vue-moment'))


export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/expo',
      name: 'expo',
      component: Expo
    },
    {
      path: '/repdisplay',
      name: 'repdisplay',
      component: RepDisplay
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
    },
    {
      path: '/emotions',
      name: "emotions",
      component: Emotions,
      },
      {
        path: '/twochart',
        name: "twochart",
        component: Twochart,
        },
  ]
})
