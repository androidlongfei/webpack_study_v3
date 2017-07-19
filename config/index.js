var path = require('path')

console.log('index', path.resolve(__dirname, '../dist/index.html'));

module.exports = {
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../dist/index.html'), //入口html文件
        assetsRoot: path.resolve(__dirname, '../dist'), //根目录
        assetsSubDirectory: 'static', //静态资源目录,包括js,css,images
        assetsPublicPath: '/dist/', //部署到网站时的根目录
        productionGzip: false, //不压缩资源
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        assetsRoot: path.resolve(__dirname, '../dist'), //根目录
        port: 8088, // 测试服务器端口
        assetsSubDirectory: 'static', //静态资源目录
        assetsPublicPath: '/', //部署到网站时的根目录
        context: [ //代理路径

        ],
        proxypath: '', //代理服务器路径
        cssSourceMap: false
    }
}
