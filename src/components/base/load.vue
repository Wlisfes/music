<template>
    <div class="load">
        <div class="load-icon">
            <div class="icon">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus" scoped>
.load {
    display flex
    justify-content center
    align-items center
    padding 50px

    .load-icon {
        width 70px
        height 70px
        border-radius: 50%;
        border: 5px solid #BEBEBE;
        border-left: 5px solid #498aca;
        border-right: 5px solid #e24d37;
        border-top: 5px solid #50E651;
        border-bottom: 5px solid #E3EF45;
        animation: loading 1s linear infinite;
        display flex
        justify-content center
        align-items center

        .icon {
            width 50px
            height 50px
            border-radius: 50%;
            border: 5px solid #BEBEBE;
            border-left: 5px solid #498aca;
            border-right: 5px solid #e24d37;
            border-top: 5px solid #50E651;
            border-bottom: 5px solid #E3EF45;
            animation: loadicon 1s linear infinite;
        }
    }
}
@keyframes loading {
    from{
        transform:rotate(0deg)
    }
    to{
        transform:rotate(360deg)
    }
}
@keyframes loadicon {
    from{
        transform:rotate(720deg)
    }
    to{
        transform:rotate(0deg)
    }
}
</style>
