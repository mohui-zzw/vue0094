<template>
<div>
    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a v-for="(item,index) in cates" :key='index' :class="['mui-control-item',item.id===0?'mui-active':'']" @click="getPhotoListByCateId(item.id)" data-wid="tab-top-subpage-1.html">
                    {{item.title}}
                </a>
            </div>
        </div>
    </div>
    <ul class="photo-list">
        <router-link v-for="item in list" :key="item.id" :to="`/home/photoinfo/${item.id}`" tag="li">
            <img v-lazy="item.img_url">
            <div class="info">
                <h1 class="info-title">{{item.title}}</h1>
                <div class="info-body">{{item.zhaiyao}}</div>
            </div>
        </router-link>
    </ul>
</div>
</template>
<script>
import mui from '@/lib/mui/js/mui.min.js'
import { Toast } from "mint-ui";
export default {
name:'PhotoList',
data() {
    return {
        cates:[],
        list:[]
    }
},
created() {
    this.getAllCategory()
    // 默认进入页面就会请求全部分类数据
    this.getPhotoListByCateId(0)
},
mounted() {
   mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    }); 
    
},
methods: {
    // 获取分类列表
    getAllCategory(){
        this.$http.get('api/getimgcategory').then(res=>{
            if(res.body.status===0){
                // 手动拼接出全部分类列表
                res.body.message.unshift({title:'全部',id:0})
                console.log(res.body.message)
                this.cates=res.body.message
            }else{
                Toast("加载分类列表失败");
            }
        })
    },
    getPhotoListByCateId(cateId){
        // 根据不同id获取图片列表
        this.$http.get(`api/getimages/${cateId}`).then(res=>{
            if(res.body.status===0){
                this.list=res.body.message
            }else{
                Toast("加载图片列表失败");
            }
        })
    }

},
}
</script>
<style scoped lang='less'>
*{
    touch-action: pan-y;
}
.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            color: #fff;
            text-align: left;
            position: absolute;
            bottom: 0;
            max-height: 84px;
            background-color: rgba(0,0,0,0.4);
            .info-title{
                font-size: 14px;
            }
            .info-body{
                font-size: 13px;
            }
        }
    }
}

</style>
