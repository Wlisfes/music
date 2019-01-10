<template>
    <transition name="playMmen">
        <div class="mmen">
            <bscroll class="wrapper" 
            :data="lizedList" 
            :pullup="pullup" 
            @scrollToEnd="BscrollToEnd">
                <div class="wrapper-content">
                    <div class="mmen-list">
                        <div @click="selectItem(Item)" class="mmen-list-view" v-for="(Item,i) in lizedList" :key="i">
                            <img v-lazy="Item.picUrl" :alt="Item.name">
                            <div class="mmen-list-name">
                                <p v-html="Item.name"></p>
                            </div>
                            <p class="mmen-icon">
                                <i class="iconfont icon-erji"></i>
                                {{Item.playCount | nau}}
                            </p>
                        </div>
                    </div>
                </div>
            </bscroll>
        </div>
    </transition>
</template>

<script>
import bscroll from '../base/bscorll'
import { mapMutations } from 'vuex'
export default {
    name: 'playList',
    data() {
        return {
            //列表数据
            lizedList: [],
            //列表数据长度初始值
            limit: 30,

            //派发滚动到底部事件
            pullup: true,
            //下拉是否结束
            pullupStatus: true,
        }
    },
    methods: {
        ...mapMutations([
            'set_songer_back_image'
        ]),
        //推荐歌单
        async _getlized() {
            let res = await this.api.getlized({
                params: {
                    limit: this.limit
                }
            })

            if (res.code == this.code.ROK) {
                this.lizedList = res.result
                this.pullupStatus = true
            }
        },
        //滚动到底部
        BscrollToEnd(e) {
            if (this.pullupStatus) {
                this.pullupStatus = false

                if(this.limit < 150) {
                    let limit = this.limit + 30
                    this.limit = limit
                    this._getlized()
                } else {
                    console.log('没有更多了')
                    this.pullupStatus = true
                }
            }
        },
        //选择某个歌单
        selectItem(item) {
            this.$router.push({ path: `/Home/${item.id}` })
            this.set_songer_back_image(item.picUrl)

        }
    },
    created() {
        this._getlized()
    },
    filters: {
        nau(val) {
            if (val < 10000) return '1万'
            if (val > 99999999) return '9999万+'
            return parseInt(val/10000) + '万'
        }
    },
    components: {
        bscroll
    }
}
</script>

<style lang="stylus" scoped>
.playMmen-enter-active,.playMmen-leave-active {
    transition all 0.3s
}

.playMmen-enter,.playMmen-leave-to {
    transform translate3d(100%, 0, 0);
    opacity 0
}

.mmen {
    position fixed;
    left 0;
    top 0;
    right 0;
    bottom 0;
    background-color #fff;

    .wrapper {
        height: 100%;

        .wrapper-content {
            padding .16rem 0;
        }
    }

    .mmen-list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 .08rem;

        .mmen-list-view {
            width: 33.333333333%;
            box-sizing: border-box;
            padding: 0 .08rem;
            position: relative;
            margin-bottom: .2rem;

            >img {
                width: 100%;
                display: block;
                border-radius: 5px;
            }

            .mmen-list-name {
                font-size: 12px;
                color: #333;
                padding: .12rem 0;
            }

            .mmen-icon {
                position: absolute;
                top: 3px;
                right: .26rem;
                font-size: 10px;
                color: #fff;
            }
        }
    }
}
</style>





