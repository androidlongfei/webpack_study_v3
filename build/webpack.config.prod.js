var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config.base')
var htmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('../config')
module.exports = merge(baseWebpackConfig, {
    output: {
        publicPath: config.build.assetsPublicPath,
        path: config.build.assetsRoot, // 目标文件路径
        filename: path.posix.join(config.build.assetsSubDirectory, 'js/[name]-[chunkhash].js')
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
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
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
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
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
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
                })
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'pro'
        }), //定义编译前的环境变量
        new UglifyJSPlugin({
            mangle: {
                // 跳过这些
                except: ['$super', '$', 'exports', 'require']
            }
        }), //压缩js
        new htmlWebpackPlugin({
            template: 'index.html', //指定模版.就是将打包的js文件插入到该模版中
            inject: 'body', //将js插入到头部,
            minify: {
                removeComments: true, //删除注释
                removeTagWhitespace: true, //移出空格
                collapseWhitespace: true //移出空格
            } //压缩html
        }), //将打包的js文件导入到html
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new ExtractTextPlugin(path.posix.join(config.build.assetsSubDirectory, 'css/[name].css'))
    ]
})
