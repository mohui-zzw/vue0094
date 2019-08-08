import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomeContainer from '@/components/tabbar/HomeContainer'
import MemberContainer from '@/components/tabbar/MemberContainer'
import SearchContainer from '@/components/tabbar/SearchContainer'
import ShopcarContainer from '@/components/tabbar/ShopcarContainer'
import NewsList from '@/components/news/NewsList'
import NewsInfo from '@/components/news/NewsInfo'
import PhotoList from '@/components/photos/PhotoList'
import PhotoInfo from '@/components/photos/PhotoInfo'

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      name:'HomeContainer',
      component:HomeContainer
    },
    {
      path:'/member',
      name:'MemberContainer',
      component:MemberContainer
    },
    {
      path:'/search',
      name:'SearchContainer',
      component:SearchContainer
    },
    {
      path:'/shopcar',
      name:'ShopcarContainer',
      component:ShopcarContainer
    },
    {
      path:'/home/newslist',
      name:'NewsList',
      component:NewsList
    },
    {
      path:'/home/NewsInfo/:id',
      name:'NewsInfo',
      component:NewsInfo
    },
    {
      path:'/home/photolist',
      name:'PhotoList',
      component:PhotoList
    },
    {
      path:'/home/photoinfo/:id',
      name:'PhotoInfo',
      component:PhotoInfo
    },

  ],
  linkActiveClass:'mui-active'//将默认的高亮类 router-link-active 改为 mui-active
})
