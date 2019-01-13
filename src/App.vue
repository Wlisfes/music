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
import { mapMutations } from 'vuex'
import mheader from '@/components/nav/mheader'
import navtab from '@/components/nav/navtab'
import player from '@/components/player/player'
export default {
  name: "App",
  methods: {
      ...mapMutations([
          'set_userInfo'
      ]),
      //获取储存的用户数据
      getStorage() {
          let user = localStorage.getItem('userInfo_')
              this.set_userInfo(JSON.parse(user))
      }
  },
  created() {
    this.getStorage()
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
