<template>
    <transition name="search">
        <div class="search">
            <back :Title="title"></back>
            
            <div class="search-view">
                <bscorll class="wrapper" 
                         ref="wrapper">
                    <div class="wrapper-content">



                    </div>
                </bscorll>
            </div>
        </div>
    </transition>
</template>


<script>
import back from '../nav/back'
import bscorll from './bscorll'
import load from './load'
export default {
    name: "search",
    data() {
        return {
            title: 'search'
        }
    },
    methods: {
        
    },
    created() {
        
    },
    components: {
        bscorll,
        back,
        load
    }
}
</script>


<style lang="stylus" scoped>
.search {
    position: fixed;
    z-index: 100;
    width: 100%;
    top: 0;
    bottom: 0;
    background: #f2f3f4;

    .search-view {
        height calc(100% - 46px)
        overflow hidden
        .wrapper {
            height 100%
            overflow hidden
            .wrapper-content {






            }






        }
    }
}

.search-enter-active,.search-leave-active {
    transition: all 0.3s
}

.search-enter,.search-leave-to {
    transform: translate3d(100%, 0, 0)
}
</style>

