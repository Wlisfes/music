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
    }




}