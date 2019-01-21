<template>
    <div class="singer">
        <bseroll :data="singer" class="wrapper">
            <div class="wrapper-content" :class="{'active': !fullScreen && playIndex != -1}">
                <section class="playlist" v-if="singer.length > 0">
                    <div class="listBox" @click="Singerplaylist(ops)" v-for="(ops, i) in singer" :key="i">
                        <div class="listimage">
                            <img v-lazy="ops.img1v1Url" alt="" srcset=""/>
                        </div>
                        <div class="listBox-content">
                            <h2>
                                {{ops.name}}
                                <span v-if="ops.trans">{{ '（'+ops.trans+'）' }}</span>
                            </h2>
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
        singer: {
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
        //歌手歌单
        Singerplaylist(item) {
            console.log(item)
            this.$router.push({ path: `/search/singer/${item.id}` })
            this.set_songer_back_image(item.picUrl)
        }
    },
    components: {
        bseroll,
        nota
    }
}
</script>

<style lang="stylus" scoped>
.singer {
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
                            border-radius .75rem
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

                            >span {
                                font-size 12px
                                overflow hidden
                                text-overflow ellipsis
                                white-space nowrap
                                color #999
                            }
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
