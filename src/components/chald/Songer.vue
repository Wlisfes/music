<template>
    <transition name="Songer">
        <div class="Sger">
            <div class="bgurl" :style="{ 'background-image': 'url('+ songer_back_image +')','pointer-events': 'auto'}"></div>
            <header class="SgerHeader">
                <div class="back" @click="back">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="backTitle" v-html="header"></div>
            </header>
            <bscroll 
                class="SgerBscll" 
                :listenScroll="bscll.listenScroll" 
                @scroll="_scroll" 
                :data="trackslist">
                <div class="BscllCont">
                    <div class="playList">
                        <section  class="tracks" v-if="trackslist.length > 0">
                            <div class="tracksTi">
                                <div class="playAll">
                                    <i class="iconfont icon-tag3"></i>
                                    <div>
                                        播放全部
                                        <span>(共{{playAll}}首)</span>
                                    </div>
                                </div>
                                <div class="playColl">
                                    <i class="iconfont icon-shoucang"></i>
                                    <span>收藏 ({{playlist.subscribedCount | star}})</span>
                                </div>
                            </div>
                            <ul :class="{ 'active' : !fullScreen }">
                                <li class="playli" @click="openMalplayer(ks, i)" v-for="(ks, i) in trackslist" :key="i">
                                    <div class="playli-In">{{i+1}}</div>
                                    <div class="playli-Ct">
                                        <h2>{{ks.name}}</h2>
                                        <p>{{ks.arname +' - '+ ks.alname}}</p>
                                    </div>
                                    <div class="playli-Icon">
                                        
                                    </div>
                                    <div class="playli-Icon">
                                        <i class="iconfont icon-dian1"></i>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        <load v-if="trackslist.length == 0 && load"></load>
                        <note v-if="trackslist.length == 0 && !load"></note>
                    </div>
                </div>
            </bscroll>
        </div>
    </transition>
</template>


<script>
import bscroll from '../base/bscorll'
import load from '../base/load'
import note from '../base/nodata'
import { mapGetters,mapMutations } from 'vuex'

export default {
    data() {
        return {
            bscll: {
              //  pullup: true,          //派发滚动到底事件
             //   pullupCode: true,      //滚动加载是否完成
                listenScroll: true,    //派发滚动事件
            },
            //标题文字
            header: '返回',
            //歌单id
            id: '',
            //歌单数据
            playlist: {},
            //共多少歌曲
            playAll: 0,
            //歌单中的部分歌曲
            trackslist: [],
            //加载中
            load: true
        }
    },
    computed: {
        ...mapGetters([
            'songer_back_image',
            'fullScreen'
        ])
    },
    methods: {
        ...mapMutations([
            'set_fullScreen',
            'set_playlist',
            'set_playIndex'
        ]),
        //获取歌单id和背景图
        getrouterData() {
            this.id = this.$route.params.id
        },
        //获取歌单详情数据
        async _getplaylistdet() {
            try {
                let res = await this.api.getplaylistdet({
                    params: {
                        id: this.id
                    }
                })

                    if (res.code && res.code == 200) {
                        let tracks = res.playlist.tracks
                        let cks = []

                        this.playAll = tracks.length
                        this.playlist = res.playlist
                        this.header = res.playlist.name

                        //修改歌单数据结构
                        tracks.forEach(element => {
                            cks.push({
                                picUrl: element.al.picUrl,
                                id: element.id,
                                name: element.name,
                                arname: element.ar[0].name,
                                alname: element.al.name,
                                subscribedCount: element.subscribedCount
                            })
                        })

                    this.trackslist = cks
                    this.load = false
                } else {
                    this.trackslist = []
                    this.load = false
                }
            } catch (error) {
                this.trackslist = []
                this.load = false
            }
        },
        //点击歌曲播放
        openMalplayer(item, i) {

            console.log(item)

            this.set_playIndex(i)
            this.set_fullScreen(true)
            this.set_playlist(this.trackslist)

        },
        //bscrell组件滚动事件
        _scroll(e) {
            console.log(e)
            
        }

    },
    filters: {
        star(val) {
            if (val < 10000) return 125
            if (val > 99999999) return '9999万+'
            var i = (val / 10000).toFixed(1)

            return i + '万'
        }
    },
    created() {
        this.getrouterData()
        this._getplaylistdet()
        // console.log(this.SONGER_BACK_IMAGE)
    },
    components: {
        bscroll,
        load,
        note
    }
}
</script>


<style lang="stylus" scoped>
.Songer-enter-active,.Songer-leave-active {
    transition all 0.3s
}

.Songer-enter,.Songer-leave-to {
    transform translate3d(100%, 0, 0);
    opacity 0
}

.Sger {
    position fixed
    z-index 100
    width 100%
    top 0
    bottom 0
    background #f2f3f4

    .bgurl {
        position absolute
        width 100%
        height 0
        padding-top 100%
        transform-origin top
        background-size cover
        background-position 0 50%
        filter blur(1px)
    }

    .SgerHeader {
        height 44px
        position relative
        display flex
        background-color rgba(226,77,55,1)
        box-sizing border-box
        padding-right 46px
        
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
            line-height 44px
            color #fff
            text-align center
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }


}



.SgerBscll {
    height calc(100% - 44px)
    overflow hidden

    .BscllCont {
        padding-top 60%
        min-height 100%
        box-sizing border-box
        display flex
        flex-direction column

        .playList {
            flex-grow 1
            background-color #fff
            border-top-left-radius 10px
            border-top-right-radius 10px
            overflow hidden

            .tracks {
                ul{
                    padding-bottom: 20px;
                }

                .tracksTi {
                    height 50px
                    position relative
                    display flex
                    flex-direction row

                    &:before {
                        content ""
                        width 100%
                        height 1px
                        position absolute
                        border-top 1px solid #e4e4e4
                        transform scaleY(0.5)
                        left 0
                        bottom -1px
                    }

                    .playAll {
                        flex-grow 1
                        padding 0 10px
                        display flex
                        align-items center

                        .iconfont {
                            font-size 28px
                        }

                        >div {
                            font-size 16px
                            color #000
                            padding 0 10px

                            >span {
                                font-size 12px
                                color #999
                            }
                        }
                    }

                    .playColl {
                        width 130px
                        display flex
                        align-items center
                        justify-content center
                        background-color #FF0000

                        .iconfont {
                            font-size 22px
                            color #fff
                        }

                        >span {
                                font-size 14px
                                color #fff
                                padding 0 2px
                            }
                    }

                }

                .playli {
                    height 50px
                    position relative
                    display flex
                    flex-direction row

                    &:before {
                        content ""
                        width 100%
                        height 1px
                        position absolute
                        border-top 1px solid #e4e4e4
                        transform scaleY(0.5)
                        left 40px
                        bottom -1px
                    }

                    .playli-In {
                        width 44px
                        display flex
                        align-items center
                        justify-content center
                        font-size 14px
                    }

                    .playli-Icon {
                        width 50px
                        display flex
                        align-items center
                        justify-content center
                    }

                    .playli-Ct {
                        width calc(100% - 144px)
                        display flex
                        flex-direction column
                        justify-content center
                        overflow hidden

                        h2 {
                            font-size 16px
                            font-weight 500
                            overflow hidden
                            text-overflow ellipsis
                            white-space nowrap
                            color #000
                        }

                        p {
                            font-size 12px
                            overflow hidden
                            text-overflow ellipsis
                            white-space nowrap
                            color #999
                        }
                    }
                }
                >.active {
                    padding-bottom 80px;
                }
            }
        }
    }
}




</style>

