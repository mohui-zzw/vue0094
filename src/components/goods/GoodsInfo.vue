<template>
<div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter='enter' @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播图 -->
    <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <swiper :lunbotuList='lunbotuList' :isfull="false"></swiper>
            </div>
        </div>
    </div>
    <!-- 商品购买 -->
    <div class="mui-card">
        <div class="mui-card-header">{{goodsinfo.title}}</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p class="price">
                    市场价:<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                </p>
                <p>购买数量:<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                <p>
                    <mt-button type='primary' size='small'>立即购买</mt-button>
                    <mt-button type='danger' size='small' @click="addToShopCar">加入购物车</mt-button>
                </p>
            </div>
        </div>
    </div>
    <!-- 商品参数 -->
    <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p>商品货号:{{goodsinfo.goods_no}}</p>
                <p>库存情况:{{goodsinfo.stock_quantity}}</p>
                <p>上架时间:{{goodsinfo.add_time|dateFormat}}</p>
            </div>
        </div>
        <div class="mui-card-footer">
            <mt-button type='primary' size='large' plain @click="goDesc(id)">图文介绍</mt-button>
            <mt-button type='danger' size='large' plain @click="goCommmet(id)">商品评论</mt-button>
        </div>
    </div>
</div>
</template>
<script>
import { Toast } from "mint-ui";
import swiper from '@/components/subcomponents/swiper'
import numbox from '@/components/subcomponents/goodsinfo_numbox'
export default {
name:'GoodsInfo',
data() {
    return {
        id:this.$route.params.id,
        lunbotuList:[],//轮播数据
        goodsinfo:{},//商品信息
        ballFlag:false,
        selectedCount:1//
    }
},
components:{
    swiper,
    numbox
},
created() {
    this.getLunbotu()
    this.getGoodsInfo()
},
methods: {
    getLunbotu(){
        this.$http.get(`api/getthumimages/${this.id}`).then(res=>{
            if(res.body.status===0){
                res.body.message.forEach(item=>{
                    item.img=item.src
                })
                this.lunbotuList=res.body.message
            }
        })
    },
    getGoodsInfo(){
        this.$http.get(`api/goods/getinfo/${this.id}`).then(res=>{
            console.log(res.body)
            if(res.body.status===0){
                this.goodsinfo=res.body.message[0]
            }
        })
    },
    goDesc(id){
        // 点击使用编程式导航跳转到图文介绍
        this.$router.push({name:'GoodsDesc',params:{id}})
    },
    goCommmet(id){
        // 点击使用编程式导航跳转到评论
        this.$router.push({name:'GoodsComment',params:{id}})
    },
    addToShopCar(){
        //添加到购物车
        this.ballFlag=!this.ballFlag
        var goodsinfo={id:this.id,count:this.selectedCount,price:this.goodsinfo.sell_price,selected:true}
        this.$store.commit("addToCar",goodsinfo)
    },
    beforeEnter(el){
        el.style.transform="translate(0,0)";
    },
    enter(el,done){
        el.offsetWidth;

        //小球动画优化思路：
        //小球最终位置局限在一个分辨率下的 并且滚动条未滚动前
        //不断计算小球横向纵向坐标改变 进行动态计算
        // 让先得到购物车徽标的横纵坐标 与 小球原位置的横纵坐标进行 差值计算
        // domObject.getBoundingClientRect() 得到某个dom对象 距离最顶部和最底部的距离

        const ballPosition=this.$refs.ball.getBoundingClientRect()
    const badgePosition=document.getElementById('badge').getBoundingClientRect()
        const xDist=badgePosition.left-ballPosition.left
        const yDist=badgePosition.top-ballPosition.top
       el.style.transform=`translate(${xDist}px,${yDist}px)`;
       el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)"
       done()
    },
    afterEnter(el){
        this.ballFlag=!this.ballFlag
    },
    getSelectedCount(count){
        this.selectedCount=count
    }
},
}
</script>
<style scoped lang='less'>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 141px;
    }
}
</style>
