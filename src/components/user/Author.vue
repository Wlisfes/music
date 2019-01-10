<template>
    <div class="Author">
        <div class="list">求支持</div>
        <div class="list">联系作者QQ（876451336）</div>
        <div class="list">Github</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus" scoped>
.Author {
    margin-top .32rem
    padding-left .32rem
    background-color #ffffff

    .list {
        width 100%
        box-sizing border-box
        font-size .38rem
        padding .32rem 0
        position relative

        &:after {
            content ""
            width 100%
            height 1px
            background-color #e4e4e4
            position absolute
            left 0
            bottom 0
            transform scaleY(0.5)
        }

        &:last-child {
            &:after {
                background-color #fff
            }
        }

           
    }
}
</style>

