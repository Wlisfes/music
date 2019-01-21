<template>
    <div class="sngle">
        <bseroll :data="single" class="wrapper">
            <div class="wrapper-content" :class="{'active': !fullScreen && playIndex != -1}">
                <section class="playlist" v-if="single.length > 0">
                    <div class="listBox" :class="{'active' : !ops.alias}" v-for="(ops, i) in single" :key="i" @click="openplay(ops, i)">
                        <div class="listBox-content">
                            <h2 v-html="ops.name"></h2>
                            <p>{{ops.alname}}</p>
                            <p>{{ops.alias}}</p>
                        </div>

                        <div class="list-icon"></div>
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
        single: {
            type: Array,
            defautl: []
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
            'set_fullScreen',
            'set_playlist',
            'set_playIndex'
        ]),
        //选择某一首搜索单曲
        openplay(ops, i) {
            console.log(ops, i)
            this.set_playIndex(i)
            this.set_fullScreen(true)
            this.set_playlist(this.single)
        }
    },
    components: {
        bseroll,
        nota
    }
}
</script>

<style lang="stylus" scoped>
.sngle {
    height 100%

    .wrapper {
        height 100%
        .wrapper-content {
            .playlist {
                padding-bottom .5rem
                .listBox {
                    overflow hidden
                    padding .1rem .2rem
                    position relative
                    display flex
                    flex-direction row

                    .listBox-content {
                        flex-grow 1
                        overflow hidden
                        >h2 {
                            font-size 14px
                            font-weight 500
                            overflow hidden
                            text-overflow ellipsis
                            white-space nowrap
                            color #000
                        }
                        >p {
                            font-size 12px
                            overflow hidden
                            text-overflow ellipsis
                            white-space nowrap
                            color #999
                        }
                    }

                    .list-icon {
                        width 2.6rem
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
                >.active {
                    padding .24rem .2rem
                }
            }



        }
        >.active {
            padding-bottom 60px
        }
    }
}
</style>

