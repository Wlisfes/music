<template>
    <transition name="user">
        <div class="user" @touchmove.prevent="move">
            <back :Title="backTitle"></back>

            <div class="userbox" @click="openLogin">
                <div class="userTitle">
                    <img src="http://lisfes.cn/public/image/akari.jpg" alt="" srcset="">
                    <p class="userName">未登录</p>
                </div>
            </div>


            <author></author>

            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
import author from './Author'
import back from '../nav/back'
export default {
    name: "user",
    data() {
        return {
            //标题
            backTitle: 'Admin'
        }
    },
    methods: {
        //跳转登录页面
        openLogin() {
            this.$router.push({ path: `/user/login` })
            
        }
        
    },
    components: {
        author,
        back
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


</style>



