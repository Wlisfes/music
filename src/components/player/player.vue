<template>
    <div class="normal">
        <transition name="normal">
            <div class="mal-player" v-show="fullScreen">
                <div class="background">
                    <img src="" border="0" >
                </div>
                <header class="mal-header">
                    <div class="back" @click="backMiniplayer">
                        <i class="iconfont icon-fanhui"></i>
                    </div>
                    <div class="header-title">刀剑神域</div>
                    <p>刀剑神域</p>
                </header>

                <!-- 唱盘 start -->
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper">
                            <div class="cd play">
                                <img src="" class="image">
                            </div>
                        </div>
                    </div>



                </div>
                <!-- 唱盘 end -->



            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'fullScreen'
        ])   
    },
    methods: {
        ...mapMutations([
            'set_fullScreen'
        ]),
        //关闭全屏播放器
        backMiniplayer() {
            this.set_fullScreen(false)
        }
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
                    font-size 24px;
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
                padding-top: 80%;

                .cd-wrapper {
                    position: absolute;
                    left: 10%;
                    top: 0;
                    width: 80%;
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
    }

    .normal-enter-active, .normal-leave-active {
        transition: all 0.4s;

        .mal-header {
            transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
    }

    .normal-enter, .normal-leave-to {
        opacity: 0;

        .mal-header {
            transform: translate3d(0, -100px, 0);
        }
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
