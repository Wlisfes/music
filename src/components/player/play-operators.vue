<template>
    <div class="play-operators">
        <div class="play-flex i-right">
            <i class="iconfont" :class="musicmodeclassName" @click.stop="mode"></i>
            <!-- icon-loop icon-random  icon-next-->
        </div>
        <div class="play-flex i-right">
            <i class="iconfont icon-prev" @click.stop="prev"></i>
            <!-- icon-prev -->
        </div>
        <div class="play-flex i-center">
            <i tag="i" class="iconfont" :class="musicplayclassName" @touchend.stop.prevent="playpo"></i>
            <!-- icon-stop  icon-bofangicon-->
        </div>
        <div class="play-flex i-left">
            <i class="iconfont icon-test" @click.stop="next"></i>
            <!-- icon-test -->
        </div>
        <div class="play-flex i-left">
            <i class="iconfont icon-like" @click.stop="star"></i>
            <!-- icon-like icon-dislike -->
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'musicplay',
            'musicmode'
        ]),
        musicplayclassName() {
            return this.musicplay ? 'icon-stop' : 'icon-bofangicon'
        },
        musicmodeclassName() {
            return this.musicmode == 0 ? 'icon-next' : this.musicmode == 1 ? 'icon-loop' : 'icon-random'
        }
    },
    methods: {
        prev() {
            this.$emit('prev')
        },
        next() {
            this.$emit('next')
        },
        mode() {
            this.$emit('mode')
        },
        star() {
            this.$emit('star')
        },
        playpo() {
            this.$emit('playpo')
        }
    }
}
</script>

<style lang="stylus" scoped>
@import url('../../assets/css/playerIcon');
.play-operators {
    display flex;
    align-items center;
    height 40px;

    .play-flex {
        flex 1;
        color #f1f1f1

        .iconfont {
            font-size 30px;
        }

        &:first-child {
            .iconfont {
                font-size 25px;
            }
        }

        &:nth-child(3) {
            padding 0 20px;

            .iconfont {
                font-size 40px;
            }
        }

    }



    .i-left {
            text-align left;
    }

    .i-right {
        text-align right;
    }

    .i-center {
        text-align center;
    }
}


</style>
