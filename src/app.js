import Layer from './component/layer/layer.js'
import css from './css/common.css'

const App = function() {
    const num = 100
    let dom = document.getElementById('app')
    let layer = new Layer()
    dom.innerHTML = layer.tpl
    console.log(layer)
}

new App()
