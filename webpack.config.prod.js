var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
module.exports = {
    entry: __dirname + '/src/app.js',
    output: {
        publicPath: '/dist/',
        path: __dirname + '/dist', // 目标文件路径
        filename: 'js/[name]-[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'src'),
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
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            mangle: {
                // 跳过这些
                except: ['$super', '$', 'exports', 'require']
            }
        }), //压缩js
        new ExtractTextPlugin('css/[name].css'), // 抽离style中的css到单独的文件中
        new htmlWebpackPlugin({
            template: 'index.html', //指定模版.就是将打包的js文件插入到该模版中
            inject: 'body', //将js插入到头部,
            minify: {
                removeComments: true, //删除注释
                removeTagWhitespace: true, //移出空格
                collapseWhitespace: true //移出空格
            } //压缩html
        }) //将打包的js文件导入到html
    ]
}
