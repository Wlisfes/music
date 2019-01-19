<template>
    <div class="Round-progress play-operators" @click.stop.prevent="playc">
        <svg :width="32" :height="32" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
        <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" stroke-dasharray="314"
                stroke-dashoffset="263"/>
        </svg>
        <div class="icon">
            <img :src="musicplay ? pause : play" alt="" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

const play = require('../../assets/image/play.png')
const pause = require('../../assets/image/pause.png')

export default {
    data() {
        return {
            play: play,
            pause: pause
        }
    },
    computed: {
        ...mapGetters([
            'musicplay',
        ])
    },
    methods: {
        playc() {
            this.$emit('playc')
        }
    }
}
</script>

<style lang="stylus" scoped>
@import url('../../assets/css/playerIcon.css');
.Round-progress {
    position relative
    width 45px
    height 45px
    display flex
    justify-content center
    align-items center

    circle {
        stroke-width: 8px;
        transform-origin: center;

        &.progress-background {
            transform: scale(.9);
            stroke: hsla(0,0%,7%,.6);
        }

        &.progress-bar {
            transform: scale(.9) rotate(-90deg);
            stroke: #fd6c62;
        }
    }
    
    .icon {
        position absolute;
        left 0
        right 0
        top 0
        bottom 0
        margin auto
        width 32px
        height 32px
        display flex
        justify-content center
        align-items center

        >img {
            width 20px;
        }
    }
}

</style>

