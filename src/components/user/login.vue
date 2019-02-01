<template>
    <transition name="login">
        <div class="login">
            <div class="userlogin">
                <img :src="userInfo ? userInfo.avatarUrl : 'http://music.lipinghua.com/image/akari.jpg'" alt="" srcset="">
                
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
import { mapMutations,mapGetters } from 'vuex'
import axios from 'axios'
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
    computed: {
        ...mapGetters([
            'userInfo'
        ])
    },
    methods: {
        ...mapMutations([
            'set_userInfo'
        ]),
        //点击登录
        LoadSubmit() {
            this._phoneLogin()
        },
        //提交登录接口
        async _phoneLogin() {
            this.Tou.Loading({
                title: '登录中...'
            })

            let res = await this.api.phoneLogin({
                params: {
                    phone: this.phone,
                    password: this.password
                }
            })

            this.Tou.HideLoading()
            if (res.code == this.code.ROK) {
                localStorage.setItem('userInfo_', JSON.stringify(res.profile))
                this.set_userInfo(res.profile)
                this.back()
            } else {
                
            }
            // console.log(res)
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
    background-image url('http://music.lipinghua.com/image/user_login_bg2.jpg')
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
            width 30px
            height 30px
            position absolute
            left 10px
            top 10px
            background-image url('../../assets/image/down.png')
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
