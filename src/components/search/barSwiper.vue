<template>
    <div class="china">
        <header class="chihaeder">
            <div class="nav" :class="{ 'active' : Index == 0 }" @click="changeTo(0)"><span>单曲</span></div>
            <div class="nav" :class="{ 'active' : Index == 1 }" @click="changeTo(1)"><span>专辑</span></div>
            <div class="nav" :class="{ 'active' : Index == 2 }" @click="changeTo(2)"><span>歌单</span></div>
            <div class="nav" :class="{ 'active' : Index == 3 }" @click="changeTo(3)"><span>歌手</span></div>
            <div class="nav" :class="{ 'active' : Index == 4 }" @click="changeTo(4)"><span>用户</span></div>
        </header>
        <swiper class="swiper" ref="myswiper" :options="swiperOption">
            <swiper-slide>
                <chinasingle :single="singleList" v-if="singleList.length > 0"></chinasingle>
            </swiper-slide>
            <swiper-slide>2</swiper-slide>
            <swiper-slide>3</swiper-slide>
            <swiper-slide>4</swiper-slide>
            <swiper-slide>5</swiper-slide>
        </swiper>
    </div>
</template>

<script>
import chinasingle from './chinasingle'
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
                        console.log(this.activeIndex)
                    }
                }
            },

            //单曲数据
            singleList: []

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
                    keywords: this.seval
                }
            })

            if(res.code == this.code.ROK) {
                switch (this.Index) {
                    case 0:
                        this.singleList = res.result.songs
                        break;
                
                    default:
                        break;
                }
            }
        }
    },
    watch: {
        seval() {
            this._getSearch()
        }
    },
    components: {
        chinasingle
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
