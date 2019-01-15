<template>
    <div class="singer">
        <bscorll class="wrapper"
                 ref="wrapper" 
                 :data="singers">
            <div class="wrapper-content" :class="{'active': !fullScreen && playIndex != -1}">
                <ul class="listView" v-for="(si,i) in singers" :key="i">
                    <li class="list-group">
                        <h2 class="list-group-title" v-html="i == 0 ? si.title + '门' : si.title"></h2>
                        <ul>
                            <li class="list-group-item" v-for="(item,j) in si.items" :key="j">
                                <img :src="item.avatar" alt="">
                                <span class="group-name" v-html="item.name"></span>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </bscorll>

        <div class="list-shortcut">
            <ul>
                <li class="item" v-for="(shor, u) in singers" :key="u">{{shor.title}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import pinyin from 'pinyin'
import bscorll from '../base/bscorll'
import { mapMutations,mapGetters } from 'vuex'

const HOT_NAME = '热'
const HOT_SINGERS = 10

class Singer {
    constructor ({id, name, avatar, aliaName}) {
        this.id = id
        this.name = name
        this.avatar = avatar
        this.aliaName = aliaName
    }
}

export default {
    data() {
        return {
            singers: []
        }
    },
    computed: {
        ...mapGetters([
            'fullScreen',
            'playIndex'
        ])
    },
    methods: {
        ...mapMutations([
            'set_songer_back_image'
        ]),
        //获取歌手数据
        async _getSingerlist() {
            let res = await this.api.getSingerlist({
                params: {
                    limit: 100
                }
            })

            if(res.code == this.code.ROK) {
                let s = res.artists
                s.map((item) => {
                    let py = pinyin(item.name[0], {
                        style: pinyin.STYLE_FIRST_LETTER
                    })

                    item.initial = py[0][0].toUpperCase()
                })

                this.singers = this._normalizeSinger(s)

                console.log(this.singers)
            }
        },
        _normalizeSinger(list) {
            // 热门歌手
            let map = {
                    hot: {
                    title: HOT_NAME,
                    items: []
                }
            }

            list.forEach((item, index) => {
                if (index < HOT_SINGERS) {
                    map.hot.items.push(new Singer({
                        id: item.id,
                        name: item.name,
                        avatar: item.img1v1Url,
                        aliaName: item.alias.join(' / ')
                    }))
                }

                const key = item.initial
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }

                map[key].items.push(new Singer({
                    id: item.id,
                    name: item.name,
                    avatar: item.img1v1Url,
                    aliaName: item.alias[0]
                }))
            })

            let hot = []
            let ret = []
            for (const key in map) {
                let val = map[key]
                if (val.title.match(/[A-Z]/)) {
                    ret.push(val)
                } else if (val.title === HOT_NAME) {
                    hot.push(val)
                }
            }

            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        }



    },
    created() {
        this._getSingerlist()
    },
    components: {
        bscorll
    }
}
</script>

<style lang="stylus" scoped>
.singer {
    width 100%
    height calc(100vh - 88px)
    overflow hidden
    position relative

    .wrapper {
        height 100%
        overflow hidden

        .wrapper-content {
            .listView {
                .list-group {
                    .list-group-title {
                        font-size .32rem
                        background rgba(0,0,0,.1)
                        color #fff
                        line-height .6rem
                        padding-left .3rem
                        margin-bottom .25rem
                    }
                    >ul {
                        padding-bottom .3rem

                        .list-group-item {
                            position relative
                            padding .15rem 0
                            margin 0 .15rem
                            display flex
                            align-items center
                            font-size .38rem
                            color #555

                            >img {
                                width 1.5rem
                                display block
                                border-radius .1rem
                            }

                            >span {
                                margin-left .5rem
                            }

                            &:after {
                                content: "";
                                width: 100%;
                                height: 1px;
                                background-color: #e4e4e4;
                                position: absolute;
                                left: 0;
                                bottom: 0;
                                transform: scaleY(0.5);
                            }
                        }
                    }
                }
            }
        }
        >.active {
            padding-bottom 60px
        }
    }

    .list-shortcut {
        position absolute
        right 5px
        top 0
        bottom 0
        display flex
        justify-content center
        align-items center
        font-family: Helvetica;
        width 20px
        
        >ul {
            .item {
                font-size 10px
                color #555
                font-weight 700
                line-height 20px
                width 20px
                text-align center
            }
        }
    }
}





</style>

