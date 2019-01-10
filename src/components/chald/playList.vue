<template>
    <div class="mmen">
        <div class="mmen-list">

                4564564
        </div>
    </div>
</template>

<script>
export default {
    name: 'playList'
}
</script>

<style lang="stylus" scoped>
.mmen {
    position fixed;
    left 0;
    top 0;
    right 0;
    bottom 0;

    .mmen-list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 .08rem;

        .mmen-list-view {
            width: 33.333333333%;
            box-sizing: border-box;
            padding: 0 .08rem;
            position: relative;
            margin-bottom: .2rem;

            >img {
                width: 100%;
                display: block;
                border-radius: 5px;
            }

            .mmen-list-name {
                font-size: 12px;
                color: #333;
                padding: .12rem 0;
            }

        }
    }
}
</style>





