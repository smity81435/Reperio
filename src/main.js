import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import VueAnalytics from 'vue-analytics'
//import * as d3 from 'd3'

Vue.prototype.moment = moment
Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueAnalytics,{
  id:'UA-115721916-5',
});


const store = new Vuex.Store({
  state:{
    loading: false,
    currentViz: 'Daychart',
    day: 0,
    dataCount: 666,
    mostCommon: 'Amazing',
    lastResponse: 'Awful',
    controlsDisabled: false,
    responsesCount:[0,0,0,0,0],
    currentDisplay:"Today",
    startTime: new moment('2019/04/03/22:22:00'),
    endTime: new moment(),
    birthData:[],
    mtvData:[],
    originsData:[],
    commuteData:[],
    emotionsData:[],
  },
  mutations:{
    setViz(state,payload){
      state.currentViz = payload.pick;
      state.day = payload.day;
    }
  },
  actions:{


  }
  
});


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
