import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.root = 'http://www.liulongbin.top:3005';

import 'mint-ui/lib/style.css'

import {Header,Swipe, SwipeItem,Button} from 'mint-ui'

Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入时间插件
import moment from 'moment'
Vue.filter('dateFormat',(dataStr,pattern='YYYY-MM-DD HH:mm:ss')=>{
  return moment(dataStr).format(pattern)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
