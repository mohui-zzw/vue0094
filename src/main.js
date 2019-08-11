import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car=JSON.parse(localStorage.getItem('car')||'[]')

var store=new Vuex.Store({
  state:{//this.$store.state.***
    car//购物车中商品的数据，
  },
  mutations:{//this.$store.commit('方法的名称','按需传递唯一的参数')
    addToCar(state,goodsinfo){
      //点击加入购物车，把商品信息保存到store的car中

      var flag=false
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count+=parseInt(goodsinfo.count)
          flag=true
          return true
        }
      })
      if(!flag){
        state.car.push(goodsinfo)
      }

      //当更新car之后，把car数组存储到 本地的 localStorage 中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
      //修改购物车中的商品的数量值
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count=parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFormCar(state,id){
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected=info.selected
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{//this.$store.getters.***
    getAllCount(state){
      var c=0;
      state.car.forEach(item=>{
        c+=item.count
      })
      return c
    },
    getGoodsCount(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.count
      })
      return o
    },
    getGoodsSelected(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o={
        count:0,//勾选的数量
        amount:0//勾选的总价
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count+=item.count
          o.amount+=item.price*item.count
        }
      })
      return o
    }
  }
})


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
  store,
  render: h => h(App)
})
