<template>
<div class="cmt-comtainer">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120"></textarea>
    <mt-button type='primary' size='large'>发表评论</mt-button>
    <div class="cmt-list">
        <div class="cmt-item">
            <div class="cmt-title">
                第一楼&nbsp;&nbsp;用户：匿明用户&nbsp;&nbsp;发表时间：2012-12-12 12:12:12
            </div>
            <div class="cmt-body">锄禾日当午</div>
        </div>
    </div>
    <mt-button type='danger' size='large' plain>加载更多</mt-button>
</div>
</template>
<script>
export default {
name:'comment',
data() {
    return {
        
    }
},
created() {
    
},
methods: {
    getComments(){
        this.$http.get('api/getcomments/')
    }
},
}
</script>
<style scoped lang='less'>
.cmt-comtainer{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 10px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
