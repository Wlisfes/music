<template>
    <transition name="login">
        <div class="login">
            <div class="userlogin">
                <img src="http://lisfes.cn/public/image/akari.jpg" alt="" srcset="">
            </div>

            <div class="loginForm">
                <div class="log">
                    <input type="tel" placeholder="phone" value="">
                </div>
                <div class="log">
                    <input type="password" placeholder="password" value="">
                </div>

            </div>
            
        </div>
    </transition>
</template>


<script>
export default {
    
}
</script>


<style lang="stylus" scoped>
.login-enter-active,.login-leave-active {
    transition: all 0.3s
}

.login-enter,.login-leave-to {
    transform: translate3d(0, 100%, 0)
}

.login {
    position fixed
    left 0
    right 0
    bottom 0
    top 0
    // background-color #fff
    background-image url('http://lisfes.cn/public/image/user_login_bg.jpg')
    background-repeat no-repeat
    background-size cover
    display flex
    flex-direction column
    z-index 111

    .userlogin {
        padding .8rem .5rem
        display flex
        flex-direction column
        align-items center
        justify-content center

        >img {
            width 4rem
            height 4rem
            border-radius 100%
            will-change transform
            display block
        }
    }

    .loginForm {
        flex 1
        padding 0 .5rem

        .log {
            padding .24rem .24rem
            background-color rgba(255,255,255,.3)
            border-radius .1rem
            margin-top .32rem

            input {
                line-height .64rem
                width 100%
                background-color rgba(255,255,255,0)
                outline none
                display block
                color: #eee;
                font-size .4rem

                &::-webkit-input-placeholder {
                    color: #eee;
                    font-size .4rem
                }
            }
        }

    }



}


</style>
