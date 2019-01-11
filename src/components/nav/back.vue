<template>
    <header class="SgerHeader">
        <div class="back" @click="back">
            <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="backTitle" v-html="Title"></div>
    </header>
</template>

<script>
export default {
    props: {
        Title: {
            type: String,
            default: ''
        }
    }
}
</script>


<style lang="stylus" scoped>
.SgerHeader {
    height 46px
    position relative
    display flex
    background-color #e24d37
    
    .back {
        display flex
        width 46px
        align-items center
        justify-content center
        box-sizing border-box

        .iconfont {
            font-size 20px
            font-weight bolder
            color #fff
        }
    }

    .backTitle {
        flex-grow 1
        max-width calc(100% - 46px)
        font-size 18px
        display flex
        align-items center
        color #fff
        padding-right 46px
        justify-content center
    }
}
</style>
