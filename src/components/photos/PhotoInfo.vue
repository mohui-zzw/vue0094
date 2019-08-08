<template>
<div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
        <span>发表时间：{{photoinfo.add_time|dateFormat}}</span>
        <span>点击：{{photoinfo.click}}次</span>
    </p>
    <hr>

    <!-- 缩略图区 -->
    <div class="thumbs">
        <vue-preview :slides="list" @close="handleClose" height='100'></vue-preview>
    </div>
    <!-- 图片内容区 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 评论区 -->
    <cmt-box :id="id"></cmt-box>
</div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from '@/components/subcomponents/comment'
export default {
name:'PhotoInfo',
data() {
    return {
        id:this.$route.params.id,
        photoinfo:{},
        list:[]
    }
},
components:{
    'cmt-box':comment
},
created() {
    this.getPhotoInfo()
    this.getThumbs()
},
methods: {
    getPhotoInfo(){
        this.$http.get(`api/getimageInfo/${this.id}`).then(res=>{
            if(res.body.status===0){
                this.photoinfo=res.body.message[0]
            }else{
                Toast("加载图片详情失败");
            }
        })
    },
    // 获取缩略图
    getThumbs(){
        this.$http.get(`api/getthumimages/${this.id}`).then(res=>{
            if(res.body.status===0){
                res.body.message.forEach(item => {
                    item.w=600
                    item.h=400
                    item.msrc=item.src
                });
                console.log(res.body.message)
                this.list=res.body.message
            }else{
                Toast("加载缩略图失败");
            }
        })
    },
    handleClose () {
        console.log('close event')
      }
},
}
</script>
<style scoped lang='less'>
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26A2FF;
        text-align: center;
        font-size: 15px;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    
}
.thumbs {
/deep/ .my-gallery {
display: flex;
flex-wrap: wrap;
figure {
width: 30%;
margin: 5px;
img {
width: 100%;
}
}
}
}
</style>
