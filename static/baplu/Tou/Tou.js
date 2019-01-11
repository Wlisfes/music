'use strict'

class Tou {
    constructor(){
        this.el = document.createElement('div')
        this.el.setAttribute('id', 'Tou')
        this.mask = false
        this.move = false
    }

    elonMove() {
        this.el.addEventListener('touchmove',(e) => {
            if (e.preventDefault && this.move) e.preventDefault()
        })
    }

    elChild() {
        document.querySelector("body").appendChild(this.el)
    }

    Toast(ops) {
        ops = ops || {}
        this.mask = ops.mask
        this.move = ops.move

        this.el.style.backgroundColor = this.mask ? 'rgba(0,0,0,.7)' : ''
        // this.elChild()
        // this.elonMove()
    }

}












export default new Tou()