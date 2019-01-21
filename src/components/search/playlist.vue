<template>
    <div class="play">
        <bseroll :data="play" class="wrapper">
            <div class="wrapper-content" :class="{'active': !fullScreen && playIndex != -1}">
                <section class="playlist" v-if="play.length > 0">
                    <div class="listBox" @click="selectPlayList(ops)" v-for="(ops, i) in play" :key="i">
                        <div class="listimage">
                            <img v-lazy="ops.coverImgUrl" alt="" srcset=""/>
                        </div>
                        <div class="listBox-content">
                            <h2 v-html="ops.name"></h2>
                            <p>
                                <span v-if="ops.trackCount">{{ ops.trackCount + '首音乐'}}</span>
                                <span v-if="ops.creator.nickname">{{ 'by '+ ops.creator.nickname}}</span>
                                <span v-if="ops.playCount">{{ops.playCount | nau}}</span>
                            </p>
                        </div>
                    </div>
                </section>
                <nota v-else></nota>
            </div>
        </bseroll>
    </div>
</template>

<script>
import bseroll from '../base/bscorll'
import nota from '../base/nodata'
import { mapGetters,mapMutations } from 'vuex'
export default {
    props: {
        play: {
            type: Array,
            default: []
        }
    },
    computed: {
        ...mapGetters([
            'fullScreen',
            'playIndex'
        ])
    },
    methods: {
        ...mapMutations([
            'set_songer_back_image'
        ]),
        //选择歌单
        selectPlayList(ops) {
            this.$router.push({ path: `/search/searchplay/${ops.id}` })
            this.set_songer_back_image(ops.coverImgUrl)
        },
    },
    filters: {
        nau(val) {
            if (val < 10000) return '播放1万次'
            if (val > 99999999) return '播放9999万次+'
            return `播放${parseInt(val/10000)}万次`
        }
    },
    components: {
        bseroll,
        nota
    }
}
</script>

<style lang="stylus" scoped>
.play {
    height 100% 
    .wrapper {
        height 100%
        .wrapper-content {
            .playlist {
                padding-bottom .5rem
                .listBox {
                    overflow hidden
                    position relative
                    display flex
                    flex-direction row
                    padding-left .2rem
                    .listimage {
                        width 1.8rem
                        height 1.7rem
                        box-sizing border-box
                        padding .1rem .3rem .1rem 0
                        >img {
                            width 1.5rem
                            height 1.5rem
                            display block
                            border-radius .1rem
                        }
                    }
                    .listBox-content {
                        flex-grow 1
                        overflow hidden
                        display flex
                        flex-direction column
                        justify-content center
                        padding .1rem .3rem .1rem 0
                        position relative

                        >h2 {
                            font-size 14px
                            font-weight 500
                            overflow hidden
                            text-overflow ellipsis
                            white-space nowrap
                            color #000
                        }
                        >p {
                            font-size 10px
                            overflow hidden
                            text-overflow ellipsis
                            white-space nowrap
                            color #999
                        }
                        &:before {
                            content ""
                            width 100%
                            height 1px
                            position absolute
                            border-top 1px solid #ccc8c8
                            transform scaleY(0.5)
                            left: 0
                            bottom -1px
                        }
                    }
                }
            }
        }
        >.active {
            padding-bottom 60px
        }
    }
}
</style>
