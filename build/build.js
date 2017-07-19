// https://github.com/shelljs/shelljs
require('shelljs/global') // 在node 中使用shell

var path = require('path')
var config = require('../config')
//
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config.prod.js')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
console.log('assetsPath', assetsPath);
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})
