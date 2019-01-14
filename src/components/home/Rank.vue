<template>
    <div class="Rank">
        <bscorll class="wrapper" ref="wrapper">
            <div class="wrapper-content">
                
                <!-- LOOK直播新声榜 -->
                <div class="mmen" v-if="toplist.length > 0">
                    <div class="mmen-title" @click="openRecommend"><h3>LOOK直播新声榜</h3><i class="iconfont icon-fanhui"></i></div>
                    <div class="mmen-list">
                        <div @click="selectPlayList(Item)" class="mmen-list-view" v-for="(Item,i) in recommendList" :key="i">
                            <img v-lazy="Item.picUrl" :alt="Item.name">
                            <div class="mmen-list-name">
                                <p v-html="Item.name"></p>
                            </div>
                            <p class="mmen-icon">
                                <i class="iconfont icon-erji"></i>
                                {{Item.playcount | nau}}
                            </p>
                        </div>
                    </div>
                </div>




            </div>



        </bscorll>

    </div>
</template>

<script>
import bscorll from '../base/bscorll'
import { mapMutations,mapGetters } from 'vuex'
export default {
    name: "Rank",
    data() {
        return {
            toplist: [],

            //官方榜
            guanlist: [],

            //推荐榜
            mmenlist: [],

            //全球榜
            globalist: []
        }
    },
    computed: {
        ...mapGetters([

        ])
    },
    methods: {
        ...mapMutations([

        ]),

        async _getToplist() {
            let res = await this.api.getToplist()

            if(res.code == this.code.ROK) {
                res.list.forEach((element,i) => {
                    console.log(element.name,i)
                });
            }
            console.log(res)
        }
    },
    created() {
        this._getToplist()
    },
    components: {
        bscorll
    }
}
</script>

<style lang="stylus" scoped>
.Rank {
    width 100%
    height calc(100vh - 88px)
    overflow hidden

    .wrapper {
        height 100%
        overflow hidden

        .wrapper-content {
            .mmen {
                .mmen-title {
                    font-size 18px
                    padding .3rem .16rem
                    display flex
                    align-items center

                    .iconfont {
                        transform rotateY(180deg)
                        font-size 14px
                        margin-left 5px
                    }
                }

                .mmen-list {
                    display flex
                    flex-wrap wrap
                    padding 0 .08rem

                    .mmen-list-view {
                        width 33.333333333%
                        box-sizing border-box
                        padding 0 .08rem
                        position relative
                        margin-bottom .2rem

                        >img {
                            width 100%
                            display block
                            border-radius 5px
                        }

                        .mmen-list-name {
                            font-size 12px
                            color #333
                            padding .12rem 0

                            >p {
                                display -webkit-box
                                -webkit-box-orient vertical
                                -webkit-line-clamp 2
                                overflow hidden
                            }
                        }

                        .mmen-icon {
                            position absolute
                            top: 3px
                            right .26rem
                            font-size 10px
                            color #fff

                            .iconfont {
                                font-size 10px
                                color #fff
                            }
                        }
                    }
                }
            }





        }
    }
}
</style>

