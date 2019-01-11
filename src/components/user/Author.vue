<template>
    <div class="Author">
        <div class="list">
            <a href="https://github.com/Wlisfes/music" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
        <div class="list">UT77243</div>
        <div class="list" @click="_getRecommendSongs">关于</div>
    </div>
</template>

<script>
export default {
    methods: {
        async _getRecommendSongs() {
            let res = await this.api.getRecommendSongs()

            console.log(res)
        }
    }
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
        color #555

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

        >a {
            color #555
            display block
        }

        &:last-child {
            &:after {
                background-color #fff
            }
        }

           
    }
}
</style>

