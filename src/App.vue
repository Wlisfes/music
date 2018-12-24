<template>
  <div id="app">
    <mheader></mheader>
    <navtab></navtab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import mheader from '@/components/nav/mheader'
import navtab from '@/components/nav/navtab'
import player from '@/components/player/player'
export default {
  name: "App",
  methods: {
     
  },
  components: {
    mheader,
    navtab,
    player
  }
}
</script>

<style>


</style>
