'use strict'

class Tou {
    constructor(){
        this.mask = false
        this.move = true
        this.time = 3000
        

        this.ToastTitle = 'Toast'
        this.LocationTitle = 'Loading...'

        this.MoToatsTitle = 'MoToats'
        this.MoToatsText = 'MoToatsText'
        this.MotoastSuccessText = '确定'
        this.MotoastFailText = '取消'
        this.showFail = true
    }

    El(Element) {
        let El = document.createElement('div')
            El.setAttribute('id', 'Tou')
            El.appendChild(Element)
            this.ElementMove(El)
        return El
    }

    Success() {
        return 1
    }

    Fail() {
        return 0
    }

    ElementMove(Element) {
        Element.addEventListener('touchmove',(e) => {
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

    /**
     * 
     * @param { Object } ops
     * @param { String } title
     * @param { String } Text
     * @param { String } SuText
     * @param { String } FaText
     * @param { Boolean } backColor
     * @param { Boolean } showfail
     * @param { Function } success
     * @param { Function } fail
     */
    MoToats(ops) {
        ops = ops || {}
        this.MoToatsTitle = ops.title || this.MoToatsTitle
        this.MoToatsText = ops.Text || this.MoToatsText
        this.MotoastSuccessText = ops.SuText || this.MotoastSuccessText
        this.MotoastFailText = ops.FaText || this.MotoastFailText
        this.backColor = ops.backColor || this.backColor
        this.showFail = ops.showfail || this.showFail
        
        let Element = document.createElement('div')
        
        

        Element.setAttribute('id', 'Tou-MoToast')
        Element.innerHTML = `<div class="MoToas-tTitle">${this.MoToatsTitle}</div>
                             <div class="Motost-content">${this.MoToatsText}</div>
                             <div class="MotostBtn">
                                <div id="MoToastFail">${this.MotoastFailText}</div>
                                <div id="MoToastSuccess">${this.MotoastSuccessText}</div>
                             </div>
                            `

        let Fragment = document.createDocumentFragment()
        let ModeEl = this.backColor ? this.El(Element) : Element
            Fragment.appendChild(ModeEl)
            this.ElementChild(Fragment)
        
        document.querySelector("#MoToastSuccess").addEventListener('click',() => {
            ops.success ? ops.success({code:1}) : this.Success()
            this.ElementRemove(ModeEl)
        })
        if(this.showFail) {
            document.querySelector("#MoToastFail").addEventListener('click',() => {
                ops.fail ? ops.fail({code:1}) : this.Fail({code:0})
                this.ElementRemove(ModeEl)
            })
        } else {
            document.querySelector("MoToastFail").remove()
        }
    }



}

export default new Tou()