<template>
    <transition name="playMmen">
        <div class="mmen">
            <back :Title="backTitle"></back>

            <bscroll class="wrapper" 
            :data="recommendList">
                <div class="wrapper-content">
                    <div class="mmen-list" v-if="recommendList.length > 0">
                        <div @click="selectItem(Item)" class="mmen-list-view" v-for="(Item,i) in recommendList" :key="i">
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

                    <load v-if="recommendList.length == 0"></load>
                </div>
            </bscroll>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
import bscroll from '../base/bscorll'
import back from '../nav/back'
import load from '../base/load'
import { mapMutations } from 'vuex'
export default {
    name: 'playList',
    data() {
        return {
            //列表数据
            recommendList: [],

            //标题
            backTitle: '每日推荐'
        }
    },
    methods: {
        ...mapMutations([
            'set_songer_back_image'
        ]),
        //推荐歌单
        async _getRecommendResource() {
            let res = await this.api.getRecommendResource()

            if (res.code == this.code.ROK) {
                this.recommendList = res.recommend
            }
        },
        //选择某个歌单
        selectItem(item) {
            this.$router.push({ path: `/recommend/${item.id}` })
            this.set_songer_back_image(item.picUrl)
        }
    },
    created() {
        this._getRecommendResource()
    },
    filters: {
        nau(val) {
            if (val < 10000) return '1万'
            if (val > 99999999) return '9999万+'
            return parseInt(val/10000) + '万'
        }
    },
    components: {
        bscroll,
        back,
        load
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
        height: calc(100% - 46px);
        overflow hidden

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





