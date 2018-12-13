<template>
    <transition name="Songer">
        <div class="Sger">
            <header class="SgerHeader">
                <div class="back" @click="back">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="backTitle" v-html="header"></div>
            </header>
            564564
        </div>
    </transition>
</template>


<script>
export default {
    data() {
        return {
            header: '返回',
            id: ''
        }
    },
    methods: {
        //
        getrouterData() {
            this.id = this.$route.params.id
            console.log(this.$route.params)
        },
        Toast() {
            console.log(1)
            this.wu.showToast({
                title: '操作成功',
                mask: false,
                icon: 'icon-success',
                duration: 3000
            })
        },
        async _getplaylistdet() {
            let res = await this.api.getplaylistdet({
                id: this.id
            })

            console.log(res)
        }

    },
    created() {
        this.getrouterData()
        this._getplaylistdet()
    }
}
</script>


<style lang="stylus" scoped>
.Songer-enter-active,.Songer-leave-active {
    transition all 0.3s
}

.Songer-enter,.Songer-leave-to {
    transform translate3d(100%, 0, 0)
}

.Sger {
    position fixed
    z-index 100
    width 100%
    top 0
    bottom 0
    background #f2f3f4

    .SgerHeader {
        height 44px
        position relative
        display flex
        
        .back {
            display flex
            width 46px
            align-items center
            justify-content center
            padding-left 6px
            box-sizing border-box

            .iconfont {
                font-size 24px
                font-weight bolder
            }
        }

        .backTitle {
            flex-grow 1
            max-width calc(100% - 46px)
            font-size 18px
            display flex
            align-items center
        }
    }
}




</style>

