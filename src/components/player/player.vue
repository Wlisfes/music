<template>
    <div class="normal" v-show="playlist.length > 0">
        
        <!-- 全屏播放器 start -->
        <transition name="normal">
            <div class="mal-player" v-show="fullScreen">
                <div class="background">
                    <img :src="musicImage ? musicImage : songer_back_image" border="0" >
                </div>
                <header class="mal-header">
                    <div class="back" @click="backMiniplayer">
                        <i class="iconfont icon-fanhui"></i>
                    </div>
                    <div class="header-title" v-html="musicName"></div>
                    <p v-html="singerName"></p>
                </header>

                <!-- 唱盘 start -->
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper">
                            <div class="cd" :class="classNameplay">
                                <img :src="musicImage ? musicImage : songer_back_image" class="image">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 唱盘 end -->


                <!-- 底部操作区域 start -->
                <div class="play-opera">
                    <div class="play-progress">
                        <play-slide></play-slide>
                    </div>

                    <play-operators
                     @playpo="pause"
                     @prev="prev" 
                     @next="next">

                    </play-operators>
                </div>
                <!-- 底部操作区域 end -->
            </div>
        </transition>
        <!-- 全屏播放器 end -->


        <!-- 迷你播放器 start -->
        <transition name="mini">
            <div class="mini" v-show="!fullScreen" @click="openMiniplayer" @touchmove.prevent="move">
                <div class="mini-player">
                    <div class="mini-player-icon">
                        <div class="cd" :class="classNameplay">
                            <img :src="musicImage ? musicImage : songer_back_image" class="image">
                        </div> 
                    </div>
                    <div class="text">
                        <p v-html="musicName"></p>
                        <div class="desc" v-html="singerName"></div>
                    </div>
                    <div class="round">
                        <round-progress 
                            @playc="pause" 
                            :Time="CalcTime">
                        </round-progress>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 迷你播放器 end -->


        <audio ref="audioRef" 
            @ended="musicEnd" 
            @timeupdate="musicTime" 
            @durationchange="musicTionChange">
        </audio>
    </div>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex'
import playoperators from './play-operators'
import Roundprogress from './Round-progress'
import playslide from './play-slide'

export default {
    data() {
        return {
            //歌手图片
            musicImage: '',
            //歌曲名称
            musicName: '',
            //歌手姓名
            singerName: '',
            //歌曲url
            musicUrl: '',

            loops: false,


            //music播放进度
            currentTime: 0,

            //music总时长
            duraTion: 0,

            //SVG使用的进度
            CalcTime: 314
        }
    },
    computed: {
        ...mapGetters([
            'fullScreen',
            'playlist',
            'playIndex',
            'musicplay',
            'musicmode',
            'songer_back_image'
        ]),
        classNameplay() {
            return this.musicplay ? 'play' : 'pause'
        }
    },
    components: {
        'play-operators': playoperators,
        'round-progress': Roundprogress,
        'play-slide': playslide
    },
    methods: {
        ...mapMutations([
            'set_fullScreen',
            'set_musicplay',
            'set_musicmode',
            'set_playIndex'
        ]),
        //关闭全屏播放器
        backMiniplayer() {
            this.set_fullScreen(false)
            history.back()
        },
        //打开全屏播放器
        openMiniplayer() {
            this.set_fullScreen(true)
        },
        //获取歌曲url
        async _getsongurl() {
            let item = this.playlist[this.playIndex]

            console.log(item)
            this.musicImage = item.picUrl
            this.musicName = item.alname
            this.singerName = item.arname

            let res = await this.api.getsongurl({
                params: {
                    id: item.id
                }
            })

            if (res.code === 200) {
                this.musicUrl = res.data[0].url
                this.$refs.audioRef.src = res.data[0].url

                // this.$nextTick(() => {
                //     this.$refs.audioRef.play()

                // })
            }
        },
        //歌曲url发生变化执行播放
        chengeurl() {
            if(!this.musicUrl){
                return
            }

            if (this.musicplay) {
                return
            }

            this.$refs.audioRef.play()
            this.set_musicplay(true)
            

        },
        //播放模式执行
        _musicmode() {
            let mode = this.musicmode
            let index = this.playIndex
            let listIn = this.playlist.length

            switch (mode) {
                case 0:
                    if (index <= listIn - 1) {
                        index ++
                        this.set_playIndex(index)
                    } else {
                        this.set_playIndex(0)
                    }
                    break;
            
                default:
                    break;
            }
            
        },
        //歌曲播放完毕事件
        musicEnd() {
            this.$refs.audioRef.pause()
            this.set_musicplay(false)

            this._musicmode()
            console.log('播放完毕')
        },
        //歌曲播放循环事件 计算进度
        musicTime(e) {
            this.currentTime = e.target.currentTime
            
            this.CalcTime = 314 - (this.currentTime / this.duraTion) * 314
        },
        //加载足够长度可触发  获取总时长
        musicTionChange(e) {
            this.duraTion = e.target.duration
        },
        //播放 or 暂停 
        pause() {

            if (this.musicplay) {
                this.$refs.audioRef.pause()
                this.set_musicplay(false)
                
            } else {
                this.$refs.audioRef.play()
                this.set_musicplay(true)
                
            }
            
        },
        //上一首
        prev() {
            
        },
        //下一首
        next() {
            this._musicmode()
        }
    },
    watch: {
        playIndex() {
            this.pause()
            this._getsongurl()
        },
        musicUrl(newVal, oldVal) {
            this.chengeurl()
        },
        musicplay() {
            // if (this.musicplay) {
            //     this.$refs.audioRef.play()
            //     this.set_musicplay(false)
            // } else {
            //     this.$refs.audioRef.pause()
            //     this.set_musicplay(true)
            // }
        },
        fullScreen() {
            if(this.fullScreen) {
                history.pushState({page: 1}, "title 1","")
            }
        }
    },
    mounted() {
        // let m = document.querySelector('#app')
            // m.addEventListener('touchend', () => {

                // if(!this.musicUrl) {
                //     return
                // }

                // if(this.lops) {
                //     return
                // }


                // this.$refs.audioRef.play()
                // this.set_musicplay(true)
                
            // })
        window.addEventListener('popstate',() => {
            if(this.fullScreen) {
                this.set_fullScreen(false)
            }
        })
            
        
        
    }
}
</script>


<style lang="stylus" scoped>
.normal {

    .mal-player {
        position fixed;
        left 0;right 0;
        top 0;bottom 0;
        z-index 150;
        background #222;

        .mal-header {
            position relative

            .back {
                width 40px;
                height 40px;
                position absolute;
                left 0;
                top 0;
                display flex;
                align-items center;
                justify-content center;

                .iconfont {
                    font-size 20px;
                    color #fff;
                }
            }

            .header-title {
                font-size 18px
                width: 70%;
                margin: 0 auto;
                line-height: 40px;
                text-align: center;
                -ms-text-overflow: ellipsis;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #fff;
            }

            p {
                line-height: 20px;
                text-align: center;
                font-size: 14px;
                color: #fff;
            }
        }

        .background {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: .6;
            -webkit-filter: blur(20px);
            filter: blur(20px);

            img {
                width 100%;
                height 100%;
            }
        }



        /******************************************/
        .middle {
            position: fixed;
            width: 100%;
            top: 80px;
            bottom: 170px;
            white-space: nowrap;
            font-size: 0;

            .middle-l {
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 70%;

                .cd-wrapper {
                    position: absolute;
                    left: 15%;
                    top: 0;
                    width: 70%;
                    height: 100%;

                    .cd {
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        border: 10px solid rgba(255, 255, 255, 0.1);
                        border-radius: 50%;

                        &.play {
                            animation: rotate 20s linear infinite;
                        }
                        &.pause {
                            animation-play-state: paused;
                            animation: rotate 20s linear infinite;
                            -webkit-animation-play-state:paused;
                        }

                        .image {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }

        &.normal-enter-active, &.normal-leave-active {
            transition: all 0.4s;

            .mal-header,.play-opera {
                transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
            }
        }

        &.normal-enter, &.normal-leave-to {
            opacity: 0;

            .mal-header {
                transform: translate3d(0, -100px, 0);
            }

            .play-opera {
                transform: translate3d(0, 100px, 0);
            }
        }


        .play-opera {
            position absolute;
            bottom 25px;
            height 100px;
            width 100%;

            .play-progress {
                display flex;
                align-items center;
                width 94%;
                margin 0 auto;
                height 50px;
            }

            
        }
    }
}
    

/***迷你播放器**********************************************/
.mini {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background #fff;

    .mini-player {
        height 60px;
        display: flex;
        flex-direction row
        align-items: center;
        position relative
        background-color rgb(245,245,245)

        .mini-player-icon {
            width 40px
            height 40px
            margin 0 10px 0 20px
            position relative

            .cd {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border-radius: 50%;

                &.play {
                    animation: rotate 20s linear infinite;
                }
                &.pause {
                    animation-play-state: paused;
                    animation: rotate 20s linear infinite;
                    -webkit-animation-play-state:paused;
                }

                .image {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
        }

        .text {
            flex 1
            overflow hidden
            display flex
            flex-direction column
            justify-content center

            >p {
                margin-bottom: 2px;
                line-height: 14px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 14px;
                color: #2e3030;
            }
            >.desc {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 11px;
                color: #2e3030
            }
        }

        .round {
            width 45px
            height 45px
            display flex
            justify-content center
            align-items center
            position relative
        }
    }
    
    &.mini-enter-active, &.mini-leave-active {
        transition: all 0.4s;
    }

    &.mini-enter, &.mini-leave-to {
        opacity: 0;
        transform: translate3d(0, 100px, 0);
    }
}
    

    




@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
