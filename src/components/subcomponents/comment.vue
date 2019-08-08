<template>
<div class="cmt-comtainer">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type='primary' size='large' @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
        <div class="cmt-item" v-for="(item,index) in comments" :key="index">
            <div class="cmt-title">
                第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
            </div>
            <div class="cmt-body">{{item.content==='undefined'?'楼主很懒，什么都没留下':item.content}}</div>
        </div>
    </div>
    <mt-button type='danger' size='large' plain @click="getMore">加载更多</mt-button>
</div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
name:'comment',
props:{
    id:String
},
data() {
    return {
        pageIndex:1,
        comments:[],
        msg:''
    }
},
created() {
    this.getComments()
},
methods: {
    getComments(){
        this.$http.get(`api/getcomments/${this.id}?pageindex=${this.pageIndex}`).then(res=>{
            console.log(res.body)
            if(res.body.status===0){
                // this.comments=res.body.message//单纯讲数据覆盖
                // 每当获取新数据的时候，不要把老数据清空，而是拼接成了新数据
                this.comments=this.comments.concat(res.body.message)
            }else{
                Toast('获取评论失败')
            }
        })
    },
    getMore(){
        this.pageIndex++
        this.getComments()
    },
    postComment(){
        // 检测是否为空
        if(this.msg.trim().length===0){
            return Toast('请输入评论内容,不能为空')
        }
        this.$http.post("api/postcomment/"+this.$route.params.id,{content:this.msg.trim()}).then(res=>{
            console.log(this.$route.params)
            if(res.body.status===0){
                // 拼接出一个评论对象
                var cmt={user_name:'匿名用户',add_time:Date.now(),content:this.msg.trim()}
                this.comments.unshift(cmt)
                this.msg=''
            }else{
                Toast('发布评论失败,请重新发布')
            }
        })
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
