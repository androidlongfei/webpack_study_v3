var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')
module.exports = {
    entry: __dirname + '/src/app.js',
    output: {
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
        new htmlWebpackPlugin({
            template: 'index.html', //指定模版.就是将打包的js文件插入到该模版中
            inject: 'body' //将js插入到头部,
        }) //将打包的js文件导入到html
    ]
}
