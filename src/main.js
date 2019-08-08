import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
// 请求地址根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 设置post时 表单数据的格式的组织形式
Vue.http.options.emulateHTTP = true;

import 'mint-ui/lib/style.css'

// import {Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'

// Vue.use(Lazyload);

// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
import MintUI from 'mint-ui'
Vue.use(MintUI)

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入时间插件
import moment from 'moment'
Vue.filter('dateFormat',(dataStr,pattern='YYYY-MM-DD HH:mm:ss')=>{
  return moment(dataStr).format(pattern)
})

import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
