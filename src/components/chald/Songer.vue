<template>
    <transition name="Songer">
        <div class="Songer">
            Songer
        </div>
    </transition>
</template>




<style scoped>
.Songer-enter-active,.Songer-leave-active {
    transition: all 0.3s
}

.Songer-enter,.Songer-leave-to {
    transform: translate3d(100%, 0, 0)
}

.Songer {
    position: fixed;
    z-index: 100;
    width: 100%;
    top: 0;
    bottom: 0;
    background: #f2f3f4;
}


</style>
