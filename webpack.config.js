var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack')
var path = require('path')
module.exports = {
    entry: __dirname + '/src/app.js',
    output: {
        // publicPath: '/dist/',
        path: __dirname + '/dist', // 目标文件路径
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: "./", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新,
        port: 9090 // 设置默认监听端口，如果省略，默认为”8080“
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
                        name: 'images/[name].[ext]'
                    }
                }]
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热替换插件
        new webpack.NoEmitOnErrorsPlugin(),
        new htmlWebpackPlugin({
            template: 'index.html', //指定模版.就是将打包的js文件插入到该模版中
            inject: 'body' //将js插入到头部,
        }) //将打包的js文件导入到html
    ]
}
