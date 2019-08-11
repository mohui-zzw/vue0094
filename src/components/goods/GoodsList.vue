<template>
<div class="goods-list">
    <!-- a标签跳转 -->

    <!-- <router-link class="goods-item" v-for="item in goodlist" :key="item.id" :to="`/home/goodsinfo/${item.id}`" tag="div">
        <img :src="item.img_url" alt="">
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
            <p class="price">
                <span class="now">￥{{item.sell_price}}</span>
                <span class="old">￥{{item.market_price}}</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩{{item.stock_quantity}}件</span>
            </p>
        </div>
    </router-link> -->

    <!-- 通过 $router js代码跳转 -->

    <div class="goods-item" v-for="item in goodlist" :key="item.id" @click="getDetail(item.id)">
        <img :src="item.img_url" alt="">
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
            <p class="price">
                <span class="now">￥{{item.sell_price}}</span>
                <span class="old">￥{{item.market_price}}</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩{{item.stock_quantity}}件</span>
            </p>
        </div>
    </div>
    <mt-button type='danger' size='large' @click='getMore'>加载更多</mt-button>
</div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
name:'GoodsList',
data() {
    return {
        pageindex:1,//页数
        goodlist:[]//商品列表数组
    }
},
created() {
    this.getGoodsList()
},
methods: {
    getGoodsList(){
        // 获取商品列表
        this.$http.get(`api/getgoods?pageindex=${this.pageindex}`).then(res=>{
            if(res.body.status===0){
                console.log(res.body.message)
                // this.goodlist=res.body.message
                this.goodlist=this.goodlist.concat(res.body.message)
            }else{
                Toast("获取商品列表失败");
            }
        })
    },
    getMore(){
        this.pageindex++
        this.getGoodsList()
    },
    getDetail(id){
        // 使用js导航跳转
        // 注意：this.$route和this.$router不同
        // this.$route是路由参数对象,所有路由中的参数parmas,query都属于他
        // this.$router是一个路由导航对象,用它可以方便的 使用 js代码 实现路由的前进后退 跳转到新的url地址
    //    1.基本
    //    this.$router.push(`/home/goodsinfo/${id}`)
        // 2.传递对象
        // this.$router.push({path:`/home/goodsinfo/${id}`})
        // 3.传递一个命名的路由
        this.$router.push({name:'GoodsInfo',params:{id}})
    }
},
}
</script>
<style scoped lang='less'>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 8px;
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>
