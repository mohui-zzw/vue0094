<template>
<div class="goodsdesc-container">
    <h3>{{info.title}}</h3>
    <hr>
    <div class="content" v-html="info.content"></div>
</div>
</template>
<script>
export default {
name:'GoodsDesc',
data() {
    return {
        info:{}//图文数据
    }
},
created() {
    this.getGoodsDesc()
},
methods: {
    getGoodsDesc(){
        this.$http.get(`api/goods/getdesc/${this.$route.params.id}`).then(res=>{
            console.log(res.body)
            if(res.body.status===0){
                this.info=res.body.message[0]
            }
        })
    }
},
}
</script>
<style scoped lang='less'>
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    .content{
        /deep/ img{
            width: 100%;
        }
    }
}
</style>
