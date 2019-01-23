<template>
    <div class="play-slide">
        <div class="Time">00:00</div>
        <div class="Time-slide">
            <div class="Time-slide-wrapper">

            </div>
        </div>
        <div class="Time">00:00</div>
    </div>
</template>

<script>
export default {
    name: "playslide"
}
</script>

<style lang="stylus" scoped>
.play-slide {
    width 100%;
    height 50px
    display flex
    flex-direction row
    align-items center
    box-sizing border-box
    padding 10px 0

    .Time {
        font-size .24rem
        color #ffffff
        padding 0 .3rem
    }

    .Time-slide {
        flex 1
        .Time-slide-wrapper {
            height 30px
            
        }
    }
}
</style>
