<template>
    <div class="play-operators">
        <div class="play-flex">
            <i class="iconfont icon-next"></i>
            <!-- icon-loop icon-random  icon-next-->
        </div>
        <div class="play-flex">
            <i class="iconfont icon-prev"></i>
            <!-- icon-prev -->
        </div>
        <div class="play-flex">
            <i class="iconfont icon-bofangicon"></i>
            <!-- icon-stop  icon-bofangicon-->
        </div>
        <div class="play-flex">
            <i class="iconfont icon-test"></i>
            <!-- icon-test -->
        </div>
        <div class="play-flex">
            <i class="iconfont icon-like"></i>
            <!-- icon-like icon-dislike -->
        </div>
    </div>
</template>

<script>
export default {
    
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
    }
}


</style>
