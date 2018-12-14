<template>
    <div>
        singer
    </div>
</template>

<script>

export class Singer {
  // 传入一个对象
  constructor({id, name}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}

// 工厂方式创建类实例
export function createSinger(singer) {
  return new Singer({
    id: singer.id,
    name: singer.name
  })
}

const HOT_TITLE = '热门'
const HTO_NUM = 10

export default {
    data() {
        return {

        }
    },
    methods: {
        async _getSingerlist() {
            let res = await this.api.getSingerlist({
                params: {
                    limit: 100
                }
            })

            // console.log(res)
            let list = this._formatSingers(res.artists)

            console.log(list)
        },
        _formatSingers(list) {
            // 热门歌手
            let map = {
                hot: {
                title: HOT_TITLE,
                items: []
                }
            }
            // 填充歌手数据
            list.forEach((item, index) => {
                // 填充热门歌手数据
                if (index < HTO_NUM) {
                    map.hot.items.push(createSinger(item))
                }

                // 填充 a-z 字母
                let key = item.name
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                // 填充对应字母歌手数据
                map[key].items.push(createSinger(item))
            })


            // 得到有序列表
            let hot = []
            let others = []

            console.log(map)
            for (let key in map) {
                let value = map[key]
                if (value.title.match(/[a-zA-Z]/)) {
                    others.push(value)
                } else if (value.title === HOT_TITLE) {
                    hot.push(value)
                }
            }

            others.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
                // console.log(hot.concat(others))
            
            return hot.concat(others)
        }



    },
    created() {
        this._getSingerlist()
    },
    components: {
        
    }
}
</script>

<style scoped>

</style>
