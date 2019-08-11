<template>
<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
</div>
</template>
<script>
import mui from '@/lib/mui/js/mui.min.js'
export default {
name:'goodsinfo_numbox',
props:["max"],
watch: {
    'max':(newVal,oldVal)=>{
        mui('.mui-numbox').numbox().setOption('max',newVal)
    }
},
methods: {
    countChanged(){
        //每当文本框数据被修改，立即把最新的数据传递给父组件
        this.$emit("getcount",parseInt(this.$refs.numbox.value))
    }
},
mounted() {
    mui('.mui-numbox').numbox()
},
}
</script>
<style scoped>
</style>
