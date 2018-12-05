<template>
    <transition name="search">
        <div class="search">
            search
        </div>
    </transition>
</template>


<script>
export default {
    
}
</script>


<style scoped>
.search {
    position: fixed;
    z-index: 100;
    width: 100%;
    top: 0;
    bottom: 0;
    background: #f2f3f4;
}

.search-enter-active,.search-leave-active {
    transition: all 0.3s
}

.search-enter,.search-leave-to {
    transform: translate3d(100%, 0, 0)
}
      


</style>

