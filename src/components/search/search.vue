<template>
    <transition name="search">
        <div class="search">
            <header class="se" @touchmove.prevent="move">
                <div class="back" @click="back"><i class="iconfont icon-fanhui"></i></div>
                <div class="sechinput">
                    <input class="input-s" v-model="Sevalue" type="text" value="" placeholder="搜索歌曲、歌手" />
                    <div class="down" v-show="Sevalue" @click="EmptySearch">
                        <img :src="down" alt="" />
                    </div>
                </div>
            </header>
            
            <div class="search-view">
                
                <barswiper :seval="Sevalue" v-show="Sevalue"></barswiper>




                

            </div>
        </div>
    </transition>
</template>


<script>
import back from '../nav/back'
import barswiper from './barswiper'
const down = require('../../assets/image/down.png')

export default {
    name: "search",
    data() {
        return {
            down: down,
            Sevalue: '', 
        }
    },
    methods: {
        //清空搜索
        EmptySearch() {
            this.Sevalue = ""
        }
        
    },
    created() {
        
    },
    components: {
        barswiper
    }
}
</script>


<style lang="stylus" scoped>
.search {
    position: fixed;
    z-index: 100;
    width: 100%;
    top: 0;
    bottom: 0;
    background: #f2f3f4;

    .se {
        height 46px
        position relative
        display flex
        flex-direction row
        background-color #e24d37

        .back {
            width 46px
            display flex
            justify-content center
            align-items center
            
            .iconfont {
                font-size 20px
                font-weight bolder
                color #fff
            } 
        }

        .sechinput {
            flex-grow 1
            padding 8px 40px 8px 0
            display flex
            align-items center

            .input-s {
                flex 1
                line-height 20px
                color #ffffff
                border none 
                font-size 14px
                outline medium
                background-color #e24d37
                cursor text
                padding 5px 0
            }
            input::-webkit-input-placeholder {
                color rgb(230,230,230)
            }

            .down {
                padding 10px
                position absolute
                right 0

                >img {
                    width 18px
                }
            }
        }
    }

    .search-view {
        height calc(100% - 46px)
        overflow hidden
        

    }
}

.search-enter-active,.search-leave-active {
    transition: all 0.3s
}

.search-enter,.search-leave-to {
    transform: translate3d(100%, 0, 0);
    opacity 0
}
</style>

