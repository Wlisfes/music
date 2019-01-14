<template>
    <div class="Author">
        <div class="Atus">
            <div class="list">
                <a href="https://github.com/Wlisfes/music" target="_blank" rel="noopener noreferrer">Github</a>
            </div>
            <div class="list">UT77243</div>
            <div class="list">关于</div>
        </div>

        <div class="Atue" v-if="userInfo">
            <div class="dropOut" @click="logout">退出登录</div>
        </div>
    </div>
</template>

<script>
import { mapMutations,mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'userInfo'
        ])
    },
    methods: {
        ...mapMutations([
            'set_userInfo'
        ]),
        //退出登录
        logout() {
            let self = this
            this.Tou.MoToats({
                backColor: true,
                title: 'MUSIC提示',
                Text: '确定退出当前账号吗？',
                success(res) {
                    self.set_userInfo('')
                    // localStorage.removeItem('userInfo_')
                }
            })

        }
    }
}
</script>

<style lang="stylus" scoped>
.Author {
    .Atus {
        margin-top .32rem
        padding-left .32rem
        background-color #ffffff

        .list {
            width 100%
            box-sizing border-box
            font-size .38rem
            padding .32rem 0
            position relative
            color #555

            &:after {
                content ""
                width 100%
                height 1px
                background-color #e4e4e4
                position absolute
                left 0
                bottom 0
                transform scaleY(0.5)
            }

            >a {
                color #555
                display block
            }

            &:last-child {
                &:after {
                    background-color #fff
                }
            }

            
            }
    }

    .Atue {
        padding .32rem 0
        font-size .38rem

        .dropOut {
            padding .32rem 0
            background-color #ffffff
            text-align center
        }
    }
}
</style>

