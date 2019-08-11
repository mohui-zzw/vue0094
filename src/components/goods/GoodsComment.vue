<template>
<div>
    <cmtbox :id='$route.params.id'></cmtbox>
</div>
</template>
<script>
import cmtbox from '@/components/subcomponents/comment'
export default {
name:'GoodsComment',
data() {
    return {
        
    }
},
components:{
    cmtbox
}
}
</script>
<style scoped>
</style>
