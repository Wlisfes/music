'use strict'

export default {
    set_songer_back_image(state, url) {
        state.songer_back_image = url
    },
    set_fullScreen(state, flag) {
        state.fullScreen = flag
    },
    set_playlist(state, list) {
        state.playlist = list
    },
    set_playIndex(state, index) {
        state.playIndex = index
    },
    set_musicplay(state, status) {
        state.musicplay = status
    },
    set_musicmode(state, i) {
        state.musicmode = i
    },
    set_userInfo(state, info) {
        state.userInfo = info
    }




}