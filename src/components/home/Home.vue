<template>
    <div class="home">
        <bscroll class="wrapper" :data="lizedList">
            <div class="home-Conent">
                <div class="decorate"></div>

                <div class="home-swiper">
                    <swiper :options="swiperOption" ref="mySwiper" v-if="bannerList.length > 0">
                        <swiper-slide v-for="(ba,i) in bannerList" :key="i">
                            <img class="swiper-image" :src="ba.imageUrl" >
                        </swiper-slide>

                        <div class="swiper-pagination "  slot="pagination"></div>
                    </swiper> 
                </div>

                <!-- 每日推荐歌单 -->
                <div class="mmen" v-if="recommendList.length > 0">
                    <div class="mmen-title" @click="openRecommend"><h3>每日推荐</h3><i class="iconfont icon-fanhui"></i></div>
                    <div class="mmen-list">
                        <div @click="selectPlayList(Item)" class="mmen-list-view" v-for="(Item,i) in recommendList" :key="i">
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
                </div>

                <!-- 推荐歌单 -->
                <div class="mmen" v-if="lizedList.length > 0">
                    <div class="mmen-title" @click="openplayList"><h3>推荐歌单</h3><i class="iconfont icon-fanhui"></i></div>
                    <div class="mmen-list">
                        <div @click="selectPlayList(Item)" class="mmen-list-view" v-for="(Item,i) in lizedList" :key="i">
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
                
            </div>
        </bscroll>
        <router-view></router-view>
    </div>
</template>

<script>
import bscroll from '../base/bscorll'
import { mapMutations,mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    data() {
        return {
            //轮播图数据
            bannerList: [],
            //轮播图配置
            swiperOption: {
                loop: true,
                observer:true,
                observeParents:true,
                autoplay:true,
                pagination: {   
                    el: '.swiper-pagination',
                    clickable :true
                }
            },
            //推荐歌单数据
            lizedList: [],

            //每日推荐歌单数据
            recommendList: []
        }
    },
    computed: {
        ...mapGetters([
            'userInfo'
        ])
    },
    methods: {
        ...mapMutations([
            'set_songer_back_image'
        ]),
        //轮播图
        async _getbanner() {
            let res = await this.api.getbanner()
            
            if (res.code == this.code.ROK) {
                this.bannerList = res.banners
            }
        },
        //推荐歌单
        async _getlized() {
            let res = await this.api.getlized({
                params: {
                    limit: 6
                }
            })

            if (res.code == this.code.ROK) {
                this.lizedList = res.result
            }
        },
        //每日推荐歌单
        async _getRecommendResource() {
            if(!this.userInfo) {
                return false
            }

            let res = await this.api.getRecommendResource()

            if (res.code == this.code.ROK) {
                this.recommendList = res.recommend.slice(0,6)
            }
        },
        //选择某个推荐歌单
        selectPlayList(item) {
            this.$router.push({ path: `/Home/${item.id}` })
            this.set_songer_back_image(item.picUrl)
        },
        //查看每日推荐歌单
        openRecommend() {
            this.$router.push({ path: `/recommend` })
        },
        //查看推荐歌单
        openplayList() {
            this.$router.push({ path: `/playList` })
        },
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
        swiper,
        swiperSlide
    },
    created() {
        this._getbanner()
        this._getlized()
        this._getRecommendResource()
        
    },
    mounted() {
        
    }
}
</script>


<style scoped>
.home {
    width: 100%;
    height: calc(100vh - 88px);
    overflow: hidden;
}

.home .wrapper {
    height: 100%;
}

.home .decorate {
    position: absolute;
    top: -33vh;
    z-index: -10;
    background: #e24d37;
    width: 100%;
    height: 50vh;
    vertical-align: inherit;
}

.home-Conent {
    min-height: 110%;
}


/**轮播图************************************/
.home-swiper {
    margin: 0 .16rem;
}

.home-swiper .swiper-image {
    border-radius: .1rem;
}


/**推荐歌单************************************/
.mmen .mmen-title {
    font-size: 18px;
    padding: .3rem .16rem;
    display: flex;
    align-items: center;
}

.mmen .mmen-title .iconfont {
    transform: rotateY(180deg);
    font-size: 14px;
    margin-left: 5px;
}

.mmen .mmen-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 .08rem;
}

.mmen .mmen-list-view {
    width: 33.333333333%;
    box-sizing: border-box;
    padding: 0 .08rem;
    position: relative;
    margin-bottom: .2rem;
}

.mmen .mmen-list-view img {
    width: 100%;
    display: block;
    border-radius: 5px;
}

.mmen .mmen-list-name {
    font-size: 12px;
    color: #333;
    padding: .12rem 0;

}

.mmen .mmen-list-name p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.mmen .mmen-icon {
    position: absolute;
    top: 3px;
    right: .26rem;
    font-size: 10px;
    color: #fff;
}

.mmen .mmen-icon .iconfont {
    font-size: 10px;
    color: #fff;
}



</style>


