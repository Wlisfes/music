<template>
    <transition name="user">
        <div class="user" @touchmove.prevent="move">
            <back :Title="backTitle"></back>

            <bscroll class="wrapper">
                <div class="wrapper-content" :class="{'active': !fullScreen}">
                    <div class="userbox" @click="openLogin">
                        <div class="userTitle">
                            <img :src="userInfo ? userInfo.avatarUrl : 'http://lisfes.cn/public/image/akari.jpg'" alt="" srcset="">
                            <p class="userName" v-html="userInfo ? userInfo.nickname : '未登录'"></p>
                        </div>
                    </div>

                    <userplaylist 
                    :userPlaylist="userPlaylist"
                    :userStarlist="userStarlist" 
                    @openuser="openuser" 
                    v-show="userInfo">
                    </userplaylist>
                    <author></author>
                </div>
            </bscroll>
            
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import bscroll from '../base/bscorll'
import author from './Author'
import userplaylist from './userplaylist'
import back from '../nav/back'
export default {
    name: "user",
    data() {
        return {
            //标题
            backTitle: 'Admin',

            //用户创建歌单
            userPlaylist: [],

            //用户收藏歌单
            userStarlist: []
        }
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'fullScreen'
        ])
    },
    methods: {
        //跳转登录页面
        openLogin() {
            if(!this.userInfo) {
                this.$router.push({ path: `/user/login` })
            }
        },
        //获取用户歌单
        async _getUserPlaylist() {
            if(this.userInfo && this.userInfo.userId != "") {
                let res = await this.api.getUserPlaylist({
                    params: {
                        uid: this.userInfo.userId
                    }
                })
                
                if (res.code == this.code.ROK) {
                    let play = res.playlist
                    let userStarlist = [], userPlaylist = []

                    play.forEach(element => {
                        if (element.userId == this.userInfo.userId) {
                            userPlaylist.push(element)
                        } else {
                            userStarlist.push(element)
                        }
                    })

                    this.userPlaylist = userPlaylist
                    this.userStarlist = userStarlist
                }
            }
        },
        //用户歌单打开 or 关闭
        openuser(ops) {
            console.log(ops)
        }
      
    },
    created() {
        this._getUserPlaylist()
        console.log(this.fullScreen)
    },
    watch: {
        userInfo() {
            this._getUserPlaylist()
        }
    },
    components: {
        author,
        back,
        userplaylist,
        bscroll
    }
}
</script>

<style lang="stylus" scoped>
.user-enter-active,.user-leave-active {
    transition: all 0.3s
}

.user-enter,.user-leave-to {
    transform: translate3d(-100%, 0, 0)
}

.user {
    position: fixed;
    z-index: 100;
    width: 100%;
    top: 0;
    bottom: 0;
    background: #EDECE8;

    .wrapper {
        height calc(100% - 46px)
        overflow hidden

        .wrapper-content {
            min-height 100%

            .userbox {
                padding .5rem
                display flex
                flex-direction column
                align-items center
                justify-content center
                background-color #ffffff

                .userTitle {

                    >img {
                        width 4rem
                        height 4rem
                        border-radius 100%
                        will-change transform
                        display block
                    }

                    .userName {
                        font-size .48rem
                        padding-top .4rem
                        letter-spacing 4px
                        color #333333
                        text-align center
                        height 1rem
                        box-sizing border-box
                    }
                }

            }

        }
        .active {
            padding-bottom 80px
        }

    }





}


</style>



