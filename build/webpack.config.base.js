var webpack = require('webpack')
var path = require('path')
var config = require('../config')
module.exports = {
    entry: './src/app.js',
    output: {
        publicPath: config.dev.assetsPublicPath,
        path: config.dev.assetsRoot, // 目标文件路径
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, '../'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: path.posix.join('dist', 'images/[name].[ext]')
                    }
                }]
            }
        ],
    }
}
