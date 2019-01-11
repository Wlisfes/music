<template>
    <transition name="login">
        <div class="login">
            <div class="userlogin">
                <img src="http://lisfes.cn/public/image/akari.jpg" alt="" srcset="">
                
                <div class="back" @click="back"></div>
            </div>

            <div class="loginForm">
                <div class="log">
                    <input type="tel" max="11" placeholder="phone" v-model="phone" value="">
                </div>
                <div class="log">
                    <input type="password" max="18" placeholder="password" v-model="password" value="">
                </div>
            </div>
            
            <div class="logSubmit">
                <button class="Submit" @click="LoadSubmit">登录</button>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    name: 'login',
    data() {
        return {
            //手机号
            phone: '',

            //密码
            password: ''
        }
    },
    methods: {
        //点击登录
        LoadSubmit() {
            this._phoneLogin()
        },
        //提交登录接口
        async _phoneLogin() {
            let res = await this.api.phoneLogin({
                params: {
                    phone: this.phone,
                    password: this.password
                }
            })

            if (res.code == this.code.ROK) {
                
            } else {
                
            }
            console.log(res)
        }
    }

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
        position relative

        >img {
            width 4rem
            border-radius 100%
            will-change transform
            display block
        }

        .back {
            width 1.4rem
            height 1.4rem
            position absolute
            left 0
            top 0
            background-image url('http://lisfes.cn/public/image/ic_close.png')
            background-repeat no-repeat
            background-size cover
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
                line-height .68rem
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

    .logSubmit {
        padding 1rem .5rem

        .Submit {
            width 100%
            line-height 1.16rem
            background-color #409EFF
            border none
            font-size 16px
            color #fff
            display block
            border-radius .1rem
        }
    }
}


</style>
