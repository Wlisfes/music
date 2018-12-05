<template>
  <div id="app">
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
     
  },
  components: {
    mheader,
    navtab
  }
}
</script>

<style>


</style>
