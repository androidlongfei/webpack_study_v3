var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var config = require('./config')
module.exports = {
    entry: './src/app.js',
    output: {
        publicPath: config.dev.assetsPublicPath,
        path: config.dev.assetsRoot, // 目标文件路径
        filename: '[name].js'
    },
    devtool: 'source-map',
    devServer: { //webpack-dev-server配置
        historyApiFallback: true, //不跳转
        noInfo: true,
        inline: true, //实时刷新浏览器
        hot: true // 热替换
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function(loader) {
                                return [
                                    require('autoprefixer')() // autoprefixer插件
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function(loader) {
                                return [
                                    require('autoprefixer')() // autoprefixer插件
                                ]
                            }
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            strictMath: true,
                            noIeCompat: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function(loader) {
                                return [
                                    require('autoprefixer')() // autoprefixer插件
                                ]
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }, {
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
                        name: path.posix.join(config.dev.assetsSubDirectory, 'images/[name].[ext]')
                    }
                }]
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'dev'
        }), //定义编译前的环境变量
        new webpack.HotModuleReplacementPlugin(), //热替换插件
        new htmlWebpackPlugin({
            template: 'index.html', //指定模版.就是将打包的js文件插入到该模版中
            inject: 'body' //将js插入到头部,
        }) //将打包的js文件导入到html
    ]
}
