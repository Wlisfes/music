<template>
    <div class="Rank">
        <bscorll class="wrapper"
                 ref="wrapper" 
                 :data="list">
            <div class="wrapper-content" :class="{'active': !fullScreen && playIndex != -1}">

                <!-- 官方榜 -->
                <div class="pelist" v-if="guanlist.length > 0">
                    <div class="pelist-title"><h2>官方榜</h2></div>
                    <div class="pelist-box" v-for="(item, i) in guanlist" :key="i" @click="selectPlayList(item)">
                        <div class="pelist-image">
                            <img :src="item.coverImgUrl" alt="" srcset="">
                        </div>
                        <div class="pelist-paly">
                            <p v-for="(tr, j) in item.tracks" :key="j">{{ j+1 + '. ' + tr.first + '-' + tr.second}}</p>
                        </div>

                        <span class="prspan" v-html="item.updateFrequency"></span>
                    </div>
                </div>

                <!-- 推荐榜 -->
                <div class="mmen" v-if="mmenlist.length > 0">
                    <div class="mmen-title"><h3>推荐榜</h3></div>
                    <div class="mmen-list">
                        <div class="mmen-list-view" v-for="(me,i) in mmenlist" :key="i" @click="selectPlayList(me)">
                            <div class="mmen-list-view-image">
                                <img v-lazy="me.coverImgUrl" :alt="me.name">
                                <span class="prspan" v-html="me.updateFrequency"></span>
                            </div>
                            <div class="mmen-list-name">
                                <p v-html="me.name"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 更多榜单 -->
                <div class="mmen" v-if="molist.length > 0">
                    <div class="mmen-title"><h3>更多榜单</h3></div>
                    <div class="mmen-list">
                        <div class="mmen-list-view" v-for="(mo,i) in molist" :key="i" @click="selectPlayList(mo)">
                            <div class="mmen-list-view-image">
                                <img v-lazy="mo.coverImgUrl" :alt="mo.name">
                                <span class="prspan" v-html="mo.updateFrequency"></span>
                            </div>
                            <div class="mmen-list-name">
                                <p v-html="mo.name"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </bscorll>
        <router-view></router-view>
    </div>
</template>

<script>
import bscorll from '../base/bscorll'
import { mapMutations,mapGetters } from 'vuex'
export default {
    name: "Rank",
    data() {
        return {
            list: [],

            //官方榜
            guanlist: [],

            //推荐榜
            mmenlist: [],

            //跟多榜单
            molist: []
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
        //榜单
        async _getToplist() {
            let res = await this.api.getToplist()

            if(res.code == this.code.ROK) {
                res.list.forEach((element,i) => {
                    if(element.ToplistType) {
                        this.guanlist.push(element)
                    } else if (i > 0 && i < 10) {
                        this.mmenlist.push(element)
                    } else {
                        if(i != res.list.length - 1) {
                            this.molist.push(element)
                        }
                    }
                })
                this.list = res.list
            }
        },
        //选择某个推荐歌单
        selectPlayList(item) {
            console.log(item)
            this.$router.push({ path: `/Rank/${item.id}` })
            this.set_songer_back_image(item.coverImgUrl)
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
            .pelist {
                padding .15rem 0 .15rem .15rem
                margin-bottom .2rem

                .pelist-title {
                    font-size .4rem
                    color #000
                    padding .2rem 0
                }
                
                .pelist-box {
                    display flex
                    flex-direction row
                    padding-top .15rem
                    position relative

                    .pelist-image {
                        position relative
                        overflow hidden
                        >img {
                            width 3rem
                            border-radius .1rem
                            margin-right .25rem
                        }
                    }

                    .pelist-paly {
                        flex 1
                        display flex
                        flex-direction column
                        font-size .36rem
                        line-height .8rem
                        justify-content center
                        padding-right .4rem
                        position relative

                        >p {
                            overflow hidden
                            text-overflow ellipsis
                            white-space nowrap
                        }

                        &:after {
                            content: "";
                            width: 100%;
                            height: 1px;
                            background-color: #e4e4e4;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            transform: scaleY(0.5);
                        }
                    }

                    .prspan {
                        font-size .24rem
                        color #fff
                        position absolute
                        left .15rem
                        bottom .15rem
                    }
                }
            }

            .mmen {
                padding-bottom .15rem 
                margin-bottom .2rem

                .mmen-title {
                    font-size .4rem
                    padding .3rem .16rem
                    display flex
                    align-items center
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
                        margin-bottom .32rem

                        .mmen-list-view-image {
                            position relative

                            >img {
                                width 100%
                                display block
                                border-radius .1rem
                            }
                            .prspan {
                                font-size .24rem
                                color #fff
                                position absolute
                                left .15rem
                                bottom .15rem
                            }
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

