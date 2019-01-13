<template>
    <div class="play">
        <div class="playlist">
            <div class="playlist-title" @click="openuser">我创建的歌单</div>
            <div class="playlist-el" v-show="userPlaylist && shwouser">
                <div class="fwel" @click="selectPlayLisy(pls)" v-for="(pls, i) in userPlaylist" :key="i">
                    <img :src="pls.coverImgUrl" alt="" srcset="">
                    <div class="fwel-content">
                        <p class="fwel-p1" v-html="pls.name"></p>
                        <p class="fwel-p2">{{pls.trackCount + '首'}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="playlist">
            <div class="playlist-title" @click="openstar">我创建的歌单</div>
            <div class="playlist-el" v-if="userStarlist && showstar">
                <div class="fwel" @click="selectPlayLisy(pls)" v-for="(pls, i) in userStarlist" :key="i">
                    <img :src="pls.coverImgUrl" alt="" srcset="">
                    <div class="fwel-content">
                        <p class="fwel-p1" v-html="pls.name"></p>
                        <p class="fwel-p2">{{pls.trackCount + '首'}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            shwouser: false,
            showstar: false
        }
    },
    props: {
        //用户创建的歌单
        userPlaylist: {
            type: Array,
            default: null
        },

        //用户收藏的歌单
        userStarlist: {
            type: Array,
            default: null
        }
    },
    methods: {
        ...mapMutations([
            'set_songer_back_image'
        ]),
        //打开用户歌单
        openuser() {
            this.shwouser = !this.shwouser
            this.$emit('openuser',this.shwouser)
        },
        //打开用户收藏
        openstar() {
            this.showstar = !this.showstar
            this.$emit('openstar',this.showstar)
        },
        //选择歌单
        selectPlayLisy(ops){
            console.log(ops)
            this.$router.push({ path: `/user/${ops.id}` })
            this.set_songer_back_image(ops.coverImgUrl)
        }
    }
}
</script>

<style lang="stylus" scoped>
.play {
    
    
    .playlist {
        padding-left .32rem
        margin-top .32rem
        background-color #fff

        .playlist-title {
            font-size .38rem
            color #555
            padding 0.32rem 0
            position relative
        }

        .playlist-el {
            transition: all 300ms;

            .fwel {
                display flex
                flex-direction row
                padding .15rem 1.5rem .15rem 0;
                position relative

                >img {
                    width 1.4rem
                    height 1.4rem
                    display block
                    border-radius .08rem
                    margin-right .15rem
                }

                &:after {
                    content ""
                    width 100%
                    height 1px
                    background-color #e4e4e4
                    position absolute
                    left 0
                    top 0
                    transform translateY(0.5)
                }

                .fwel-content {
                    display flex
                    flex-direction column
                    justify-content center
                    overflow hidden

                    .fwel-p1 {
                        font-size .38rem
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                    }
                    .fwel-p2 {
                        color #999
                        font-size .32rem
                    }
                }
            }
        }
        
        


    }
    


}

@keyframes el {
    0% {
        opacity 0
    }
    100% {
        opacity 1
    }
}


</style>
