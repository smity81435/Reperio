import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import Snotify from 'vue-snotify'

Vue.prototype.moment = moment
Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(Snotify);

const store = new Vuex.Store({
  state:{
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

import { mapState } from 'vuex';

new Vue({
  computed: mapState([
    'currentViz','day'
  ]),
  store,
  router,
  render: h => h(App)
}).$mount('#app')
