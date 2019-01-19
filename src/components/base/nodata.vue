<template>
    <div class="note">
        <img :src="nota" alt="" srcset=""/>
        <p v-html="text"></p>
    </div>
</template>

<script>
const nota = require('../../assets/image/nota.png')
export default {
    props: {
        text: {
            type: String,
            default: '哈哈！没有搜索结果，傻逼了吧！'
        }
    },
    data() {
        return {
            nota: nota
        }
    }
}
</script>

<style lang="stylus" scoped>
.note {
    display flex
    flex-direction column
    align-items center
    justify-content center
    padding-top 30px
    font-size .42rem

    >img {
        width 2.4rem
        height 2.4rem
        display block
        margin-bottom .2rem
    }
}
</style>

