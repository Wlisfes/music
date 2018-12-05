<template>
  <div id="app">
    <mheader @search="search"></mheader>
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
     search() {
       console.log(1)
        this.$router.push({ path: '/Home/search' })
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
