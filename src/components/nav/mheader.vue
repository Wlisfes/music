<template>
    <div class="m-header" @touchmove.prevent="move">
        <div class="meun"><i class="iconfont icon-menu"></i></div>
        <h1 class="m-title">MUSIC</h1>
        <router-link to="/search" class="search" tag="div">
            <div class="linkci">
                <i class="iconfont icon-sousuo"></i>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    methods: {
        move() {
            return false
        }
    }
}
</script>


<style scoped>
.m-header {
    height: 44px;
    position: relative;
    background-color: #e24d37;
    overflow: hidden;
}

.m-header .m-title {
    line-height: 44px;
    font-weight: 700;
    color: #f1f1f1;
    letter-spacing: 3px;
    font-size: 18px;
    text-align: center;
}

.m-header .meun {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;top: 0;
}

.m-header .iconfont {
    font-size: 24px;
    color: #fff;
}

.m-header .search {
    width: 44px;
    height: 44px;
    position: absolute;
    right: 0;top: 0;
}

.m-header .search .linkci {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
