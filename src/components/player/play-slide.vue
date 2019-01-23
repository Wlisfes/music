<template>
    <div class="play-slide">
        <div class="Time" v-html="calcTime"></div>
        <div class="Time-slide">
            <div class="Time-slide-wrapper" @click="slideClick">
                <div class="slide" ref="slide">
                    <div class="progress" ref="progress"></div>
                    <div class="slide-btn" 
                        ref="slideBtn" 
                        @touchstart.prevent="slideTouchstart" 
                        @touchmove.prevent="slideTouchmove" 
                        @touchend.prevent="slideTouchend">
                        <div class="btn"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="Time" v-html="calcTion"></div>
    </div>
</template>

<script>
export default {
    props: {
        //歌曲总时长
        Tion: {
            type: Number,
            default: 0
        },
        //歌曲播放进度
        Time: {
            type: Number,
            default: 0
        }
    },
    computed: {
        calcTime() {
            return this.calc(this.Time)
        },
        calcTion() {
            return this.calc(this.Tion)
        }
    },
    methods: {
        //时间转换
        calc(val) {
            if (Math.floor(val/60) >= 10) {
                return Math.floor(val/60)+":"+(val%60/100).toFixed(2).slice(-2)
            } else {
                return '0' + Math.floor(val/60)+":"+(val%60/100).toFixed(2).slice(-2)
            }
        },
        slideTouchstart(e) {
            this.slideLeft = this.$refs.slideBtn.getBoundingClientRect().left
            this.X = e.touches[0].pageX
            console.log(e)
        },
        slideTouchmove(e) {
            // console.log(e)
        },
        slideTouchend(e) {
            let X1 = e.changedTouches[0].pageX
    
            console.log(this.X, X1)
        },
        slideClick(e) {
            let pageX = e.pageX
            
        }
    },
    watch: {
        //监听Time动态修改进度条
        Time(newTime) {
            let W = this.$refs.slide.offsetWidth
            let T = this.Time / this.Tion
            this.$refs.progress.style.width = W * T + 'px'
            this.$refs.slideBtn.style.transform = 'translate3d('+ (W - 10) * T + 'px' +',0,0)'
        }
    },
    mounted() {
        console.log(this.$refs.progress)
    }
}
</script>

<style lang="stylus" scoped>
.play-slide {
    width 100%;
    height 50px
    display flex
    flex-direction row
    align-items center
    box-sizing border-box
    padding 10px 0

    .Time {
        font-size .24rem
        color #ffffff
        padding 0 .3rem
    }

    .Time-slide {
        flex 1
        .Time-slide-wrapper {
            height 30px
            .slide {
                position relative
                height 4px
                background-color rgba(0,0,0,.3)
                top 13px
                .progress {
                    position absolute
                    height 100%
                    background-color #e24d37
                }

                .slide-btn {
                    position absolute
                    width 30px
                    height 30px
                    left -8px
                    top -13px

                    .btn {
                        position relative
                        top 7px
                        left 7px
                        box-sizing border-box
                        width 16px
                        height 16px
                        border 5px solid #f1f1f1
                        border-radius 50%
                        background #d44439
                    }
                }
            }
        }
    }
}
</style>
