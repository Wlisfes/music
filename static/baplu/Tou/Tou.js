'use strict'

class Tou {
    constructor(){
        this.el = document.createElement('div')
        this.el.setAttribute('id', 'Tou')
        this.mask = false
        this.move = true
        this.time = 3000
        

        this.ToastTitle = 'Toast'
        this.LocationTitle = 'Loading...'
    }

    ElementMove() {
        this.el.addEventListener('touchmove',(e) => {
            if (e.preventDefault && this.move) e.preventDefault()
        })
    }

    ElementChild(Element) {
        document.body.appendChild(Element)
    }

    ElementRemove(Element) {
        Element.remove()
    }

    Toast(ops) {
        ops = ops || {}
        this.time = ops.time || this.time
        this.ToastTitle = ops.title || this.ToastTitle

        let Element = document.createElement('div')
        

        Element.setAttribute('id', 'Tou-Toast')
        Element.style.animation = `Tou-Toast ${this.time}ms 1`
        Element.innerHTML = this.ToastTitle

        this.ElementChild(Element)
        let t = setTimeout(() => {
            this.ElementRemove(Element) || clearTimeout(t)
        }, this.time)
    }

    Loading(ops) {
        ops = ops || {}
        this.LocationTitle = ops.title || this.LocationTitle

        let Element = document.createElement('div')

        Element.setAttribute('id', 'Tou-Loading')
        Element.innerHTML = `<div class="sk-circle">
                                <div class="sk-circle1 sk-child"></div>
                                <div class="sk-circle2 sk-child"></div>
                                <div class="sk-circle3 sk-child"></div>
                                <div class="sk-circle4 sk-child"></div>
                                <div class="sk-circle5 sk-child"></div>
                                <div class="sk-circle6 sk-child"></div>
                                <div class="sk-circle7 sk-child"></div>
                                <div class="sk-circle8 sk-child"></div>
                                <div class="sk-circle9 sk-child"></div>
                                <div class="sk-circle10 sk-child"></div>
                                <div class="sk-circle11 sk-child"></div>
                                <div class="sk-circle12 sk-child"></div>
                            </div>`

        
        let node = document.createElement("span")

        node.style.paddingTop = '10px'
        node.appendChild(document.createTextNode(this.LocationTitle))
        
        Element.appendChild(node)
        this.ElementChild(Element)
    }

    HideLoading() {
        this.ElementRemove(document.querySelector("#Tou-Loading"))
    }
}

export default new Tou()