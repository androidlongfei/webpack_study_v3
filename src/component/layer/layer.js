import layerHtml from './layer.html'
import layerLess from './layer.less'
import testScss from './test.scss'
import _ from 'underscore'

function layer() {
    return {
        name: 'layer',
        layerLess: layerLess,
        tpl: layerHtml
    }
}

export default layer
