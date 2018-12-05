<template>
    <div class="nav" @touchmove.prevent="move">
        <div class="navtab">
            <router-link to="/Home">
                <div class="tab">
                    <span>推荐</span>
                </div>
            </router-link>
        </div>
        <div class="navtab">
            <router-link to="/Rank">
                <div class="tab">
                    <span>排行</span>
                </div>
            </router-link>
        </div>
        <div class="navtab">
            <router-link to="/Singer">
                <div class="tab">
                    <span>歌手</span>
                </div>
            </router-link>
        </div>
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
.nav {
    height: 44px;
    background-color: #e24d37;
    overflow: hidden;
    display: flex;
    flex-direction: row;
}

.nav .navtab, a {
    flex: 1;
    color: #e4e4e4;
    font-size: 16px;
}

.navtab .tab {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.router-link-exact-active {
    color: #fff;
    font-weight: 700;
}

.navtab .tab span {
    border-bottom: 2px solid #e24d37;
    padding: 0 10px;
}

.navtab .router-link-active span  {
    border-bottom: 2px solid #e24d37;
}

.navtab .router-link-exact-active span {
    border-bottom: 2px solid #fff;
}


</style>

