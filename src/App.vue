<template>
  <div id="app" @mousemove.stop="move">
    <mheader></mheader>
    <navtab></navtab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import mheader from '@/components/nav/mheader'
import navtab from '@/components/nav/navtab'
export default {
  name: "App",
  methods: {
        move() {
            return false
        }
  },
  components: {
    mheader,
    navtab
  }
}
</script>

<style>


</style>
