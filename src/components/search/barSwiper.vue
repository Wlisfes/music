<template>
    <div class="china">
        <header class="chihaeder">
            <div class="nav" :class="{ 'active' : Index == 0 }" @click="changeTo(0)"><span>单曲</span></div>
            <div class="nav" :class="{ 'active' : Index == 1 }" @click="changeTo(1)"><span>专辑</span></div>
            <div class="nav" :class="{ 'active' : Index == 2 }" @click="changeTo(2)"><span>歌手</span></div>
            <div class="nav" :class="{ 'active' : Index == 3 }" @click="changeTo(3)"><span>歌单</span></div>
            <div class="nav" :class="{ 'active' : Index == 4 }" @click="changeTo(4)"><span>用户</span></div>
        </header>
        <swiper class="swiper" ref="myswiper" :options="swiperOption">
            <swiper-slide>
                <load v-if="singleListload && Index == 0"></load>
                <chinasingle v-else :single="singleList"></chinasingle>
            </swiper-slide>
            <swiper-slide>
                <load v-if="albumlistload && Index == 1"></load>
                <album v-else :album="albumlist"></album>
            </swiper-slide>
            <swiper-slide>
                <load v-if="singerlistload && Index == 2"></load>
                <singer v-else :singer="singerlist"></singer>
            </swiper-slide>
            <swiper-slide>
                <load v-if="songlistload && Index == 3"></load>
                <playlist v-else :play="songlist"></playlist>
            </swiper-slide>
            <swiper-slide>
                <load v-if="userlistload && Index == 4"></load>
                <userlist v-else :user="userlist"></userlist>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import chinasingle from './chinasingle'
import album from './Album'
import singer from './singer'
import playlist from './playlist'
import userlist from './userlist'
import load from '../base/load'
let self = null

export default {
    props: {
        seval: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            //swiper配置
            Index: 0,
            swiperOption: {
                observer:true,
                observeParents:true,
                on: {
                    slideChangeTransitionEnd: function(e) {
                        self.Index = this.activeIndex
                    }
                }
            },

            //接口配置
            type: 1,
            limit: 30,


            //单曲数据
            singleList: [],
            singleListload: true,

            //专辑数据
            albumlist: [],
            albumlistload: true,

            //歌手数据
            singerlist: [],
            singerlistload: true,

            //歌单数据
            songlist: [],
            songlistload: true,

            //用户数据
            userlist: [],
            userlistload: true

        }
    },
    beforeCreate() {
        self = this
    },
    methods: {
        //切换导航
        changeTo(n) {
            this.$refs.myswiper.swiper.slideTo(n)
            this.Index = n

        },
        //搜索请求
        async _getSearch() {
            if(!this.seval) {
                
                return
            }
            let res = await this.api.getSearch({
                params: {
                    keywords: this.seval,
                    type: this.type,
                    limit: this.limit
                }
            })

            if(res.code == this.code.ROK) {
                //查看5大区域数据
                switch (this.Index) {
                    case 0:
                        //单曲数据
                        if(res.result.songs && res.result.songs.length > 0) {
                            let tracks = res.result.songs
                            let ids = ""
                            tracks.forEach(element => {
                                ids += `${element.id},`
                            })

                        //获取歌曲信息
                        let kst = await await this.api.getSongDetail({
                                params: {
                                    ids: ids.substring(0, ids.length -1)
                                }
                            })

                            //重新处理数据结构
                            if (kst.code === this.code.ROK) {
                                let kstsongs = kst.songs
                                let kstplay = []
                                kstsongs.forEach(element => {
                                    kstplay.push({
                                        picUrl: element.al.picUrl,
                                        id: element.id,
                                        name: element.name,
                                        arname: element.ar[0].name,
                                        alname: element.al.name,
                                        alias: element.alia[0] || 'OccupyArtists'
                                    })
                                })
                                this.singleList = kstplay
                            } else {
                                //歌曲数据获取不成功直接把搜索内容渲染
                                let cks = []
                                tracks.forEach(element => {
                                    cks.push({
                                        picUrl: element.artists[0].img1v1Url,
                                        id: element.id,
                                        name: element.artists[0].name+ '-' +element.album.name,
                                        arname: element.artists[0].name,
                                        alname: element.name,
                                        alias: element.alias[0]
                                    })
                                })
                                this.singleList = cks
                            }
                        } else {
                            this.singleList = []
                        }
                        this.singleListload = false
                        break;

                    case 1:
                        //专辑数据
                        if (res.result.albums && res.result.albums.length > 0) {
                            this.albumlist = res.result.albums
                        } else {
                            this.albumlist = []
                        }
                        this.albumlistload = false
                        break;

                    case 2:
                        //歌手数据
                        if (res.result.artists && res.result.artists.length > 0) {
                            this.singerlist = res.result.artists
                        } else {
                            this.singerlist = []
                        }
                        this.singerlistload = false
                        break;

                    case 3:
                        //歌单数据
                        if (res.result.playlists && res.result.playlists.length > 0) {
                            this.songlist = res.result.playlists
                        } else {
                            this.songlist = []
                        }
                        this.songlistload = false
                        break;

                    case 4:
                        //用户数据
                        if (res.result.mvs && res.result.mvs.length > 0) {
                            this.userlist = res.result.mvs
                        } else {
                            this.userlist = []
                        }
                        this.userlistload = false
                        break;
                    default:
                        break;
                } 
            }
        }
    },
    watch: {
        seval() {
            this.singleListload = true,
            this.albumlistload = true,
            this.singerlistload = true,
            this.songlistload = true,
            this.userlistload = true
            this._getSearch()
        },
        Index() {
            switch (this.Index) {
                case 0:
                    this.type = 1
                    this._getSearch()
                    break;
                case 1:
                    this.type = 10
                    this._getSearch()
                    break;
                case 2:
                    this.type = 100
                    this._getSearch()
                    break;
                case 3:
                    this.type = 1000
                    this._getSearch()
                    break;
                case 4:
                    this.type = 1004
                    this._getSearch()
                    break;
                default:
                    break;
            }
        }
    },
    components: {
        chinasingle,
        album,
        singer,
        playlist,
        userlist,
        load
    }
}
</script>

<style lang="stylus" scoped>
.china {
    height 100%

    .chihaeder {
        height 40px
        background-color #e24d37
        display flex
        flex-direction row

        .nav {
            width 20%
            font-size 15px
            text-align center
            color #ffffff
            line-height 40px
            transition all 300ms
        }
        .active {
            position relative

            &:before {
                content ""
                width 35px
                height 3px
                background-color #ffffff;
                border-radius 2px
                position absolute
                left 50%
                transform translateX(-50%)
                bottom 5px
            }
        }
    }


    .swiper {
        height calc(100% - 40px)
    }

}
</style>
