import Vue from 'vue'
import App from './App'
import router from './router'

import 'mint-ui/lib/style.css'

import {Header} from 'mint-ui'

Vue.component(Header.name,Header)

import './lib/mui/css/mui.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
