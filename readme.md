# webpack使用(v3.3)

相关文档

- [v2.2-中文](http://www.css88.com/doc/webpack2/guides/get-started/)
- [v3.3-英文](https://webpack.js.org/configuration/devtool/)
- [npm](https://www.npmjs.com/package/webpack)

## 安装

**1.安装nodejs**

[下载nodejs并安装](https://nodejs.org/en/download/)

**2.全局安装webpack**

```shell
npm install -g webpack
```

## 创建测试工程

初始化项目:

```shell
mkdir webpack_study_v3
cd webpack_study_v3
npm init
npm install webpack --save
```

## 命令行打包

### 简单打包

运行如下命令进行打包:

```shell
webpack hello.js hello.bundle.js
```

> `hello.js`:源文件

> `hello.bundle.js`:目标文件

生成以下信息:

```
Hash: 2aae56144f2493b9e53d
Version: webpack 3.3.0
Time: 64ms
          Asset     Size  Chunks             Chunk Names
hello.bundle.js  2.52 kB       0  [emitted]  main
   [0] ./hello.js 44 bytes {0} [built]
```

>

> Hash:哈希值

> Version:webpack版本

> Time:打包所花费的时间

> Asset:打包所生成的目标文件

> Size:文件的大小

> Chunks:模块编号

> Chunk Names:模块名

### 加参数进行打包

**以css-loader和style-loader为例子**

在命令行中打包

```
webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader' --watch --progress
```

在模块中引用

```
require('./style.css')
```

> `--module-bind`:模块绑定，就是所有.css文件都需要经过css-loader编译style-loader插入

> `watch`:监听.css文件的变化并重新打包

> `--progress`:显示打包进度

由以上可知在命令行中加参数进行打包比较繁琐,所以一般使用加载配置文件的形式进行打包

## 加载配置文件

1.加载默认配置文件

```shell
webpack
```

> 此命令默认会在项目的根目录寻找webpack.config.js文件并运行

2.加载指定的配置文件

```shell
webpack --config webpack.config.dev.js
```

> `--config`:用来指定需要加载的配置文件

3.配置package.json加载配置文件

```javascript
"scripts": {
  "test": "webpack --config webpack.config.js --progress --display-modules --colors --display-reasons",
  "build": "webpack --config webpack.config.prod.js",
  "dev": "webpack-dev-server --hot --open"
},
```

> `--display-modules`:显示加载的模块

> `--colors`:使用彩色显示log信息

> `--display-reasons`:显示加载模块的原因

> `--hot`:热更新

> `--open`:在浏览器中打开

运行`npm run dev`加载开发模式的配置文件,并启动测试服务器,然后可以在浏览器上访问.

运行`npm run test`加载开发模式的配置文件,并启动测试服务器。

运行`npm run build`加载发布模式的配置文件

## webpack.config.js配置文件参数详解

### 1.单文件入口

```javascript
module.exports = {
    entry: './src/script/main.js', // 入口文件
    output: {
        path: __dirname + './dist/js', // 目标文件路径
        filename: 'bundle.js' //目标文件名
    }
}
```

> `entry`:入口文件

> `path`:目标文件路径。webpack2之后必须是绝对路径

> > `__dirname`:当前脚本运行的目录

> `filename`:目标文件名

### 3.多文件入口,单文件出口

```javascript
module.exports = {
    entry: [__dirname + '/src/js/a.js', __dirname + '/src/js/b.js'],
    output: {
        path: __dirname + '/dist/js',
        filename: 'bundle.js'
    }
}
```

> `entry:[]`:数组中的文件相互之间没有依赖关系.多个入口文件最终会生成一个出口文件.

### 4.多文件入口,多文件出口

```javascript
module.exports = {
    entry: {
        main: __dirname + '/src/js/a.js',
        a: __dirname + '/src/js/b.js'
    },
    output: {
        path: __dirname + '/dist/js',
        // filename: 'bundle.js', //目标文件名
        filename: '[name].js'//根据入口文件生产目标文件
        //filename: '[name]-[hash].js' //根据入口文件生产目标文件
    }
}
```

> `filename: '[name].js'`:根据入口文件生成相应的出口文件。也就是说会在./dist/js目录下生成a.js和main.js文件.以上使用的是name占位符.

> > `filename`包括三种占位符号:`name`,`hash`,`chunkhash`.

> > 格式为`'[name].js'`,`'[name]-[hash].js'`,`'[name]-[chunkhash].js'`.也即是说hash和chunkhash不能共存.

> > 其中`name`表示文件名. `hash`表示本次打包的hash值. `chunkhash`表示文件的md5值,表示文件的唯一性.好处就是不让浏览器缓存文件.

### 5.html-webpack-plugin使用

目的:

```
将打包生成的js文件自动引入到html中.
```

文档:

- [plugins](https://webpack.js.org/configuration/plugins/#plugins)
- [npm:html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
- [github:html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
- [html-minifier](https://github.com/kangax/html-minifier#options-quick-reference)

安装:

```
npm install html-webpack-plugin --save-dev
```

使用:

```javascript
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: __dirname + '/src/script/a.js',
        a: __dirname + '/src/script/b.js'
    },
    output: {
        path: __dirname + '/dist', // 目标文件路径
        filename: 'js/[name]-[chunkhash].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html', //
            filename: 'index-[hash].html', //设置文件名
            inject: 'head' //将js插入到头部
            minify: {
                removeComments: true, //删除注释
                removeTagWhitespace: true //删除标签空格
                collapseWhitespace:true//移出空格
            }, //压缩html
            chunks:['main','a'],//引入指定的js文件
            excludeChunks:['b']//排除指定的js文件
        }) //将打包的js文件导入到html
    ]
}
```

> `template`:指定模版。就是将打包的js文件插入到该模版中。如果不指定就默认生成index.html.路径默认是__dirname.

> `filename`:设置文件名,可以用hash

> `inject:'head'`:将js文件插入到模版的head标签中.是插入到body标签中.

> `minify`:压缩html

> `chunks`:引入指定js文件.一般在多应用页面中使用

> `excludeChunks`:排除指定的js

运行`npm run dev`后生成的html文件如下:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script type="text/javascript" src="js/a-d66ad40059da80ddcca7.js"></script>
    <script type="text/javascript" src="js/main-cf59860a3c180120af24.js"></script>
</head>

<body>

</body>

</html>
```

由上可知打包的js文件已经插入到了模版文件的head标签中了。

### 6.babel-loader

目的:

```
将es6转化为es5
```

文档:

- [官网:babel-loader](http://babeljs.io/docs/setup/#installation)
- [npm:babel-loader](https://www.npmjs.com/package/babel-loader)
- [webpack:babel-loader](https://webpack.js.org/configuration/module/#rule-resource)
- [es版本](http://babeljs.io/docs/plugins/)

安装:

```
npm install babel-loader babel-core babel-preset-env --save-dev
```

> `babel-preset-env`:使用env版本的es6编译js文件

使用

```javascript
var htmlWebpackPlugin = require('html-webpack-plugin')
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
        }]
    },
    plugins: [
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
```

> `test:/\.js$`:正则表达式匹配所有js文件

> `exclude`:忽略node_modules和bower_components目录下js文件

> `include`:包含指定目录下js文件

> `loader`:使用babel-loader编译js文件

> `presets`:使用env版本的es6编译js。es有多个版本,例如env,es2015,es2016...

### 7.css-loader

目的:

```
将css文件模块化
```

文档:

- [webpack:css-loader](http://www.css88.com/doc/webpack2/loaders/css-loader/)
- [npm:css-loader](https://www.npmjs.com/package/css-loader)

安装:

```shell
npm install css-loader --save-dev
```

使用:

```javascript
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
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
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
```

> 先用css-loader编译css，使得css文件能模块化。再用style-loader将css文件模块中的内容以style标签的形式插入到html模版中.

### 8.postcss-loader

目的:

```
补全css样式,增强兼容性

例如:
原始css样式如下:
.div{
  display:flex;
}

经过postcss-loader的autoprefixer插件编译后样式如下:
.div{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
```

文档:

- [npm:postcss-loader](https://www.npmjs.com/package/postcss-loader)
- [github:postcss-loader](https://github.com/postcss/postcss-loader)

安装:

```shell
npm install postcss-loader autoprefixer --save-dev
```

> `autoprefixer`:是postcss-loader的一个插件.主要是根据浏览器来设置css样式后缀

使用:

```javascript
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
            }
        ]
    },
    plugins: [
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
```

> `importLoaders: 1`:使用postcss-loader处理@import进来的css文件

> css文件执行顺序postcss-loader -> css-loader -> style-loader

### 9.less-loader和sass-loader

目的:

```
将less文件和sass文件模块化
```

文档:

- [npm:less-loader](https://www.npmjs.com/package/less-loader)
- [npm:sass-loader](https://www.npmjs.com/package/sass-loader)

安装less

```shell
npm install less-loader less --save-dev
```

安装sass

```shell
npm install sass-loader node-sas --save-dev
```

使用:

```javascript
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
            }
        ],
    },
    plugins: [
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
```

> `less执行顺序`: less-loader -> postcss-loader -> css-loader -> style-loader

> `sass执行顺序`: sass-loader -> postcss-loader -> css-loader -> style-loader

### 10.html-loader

目的:

```
将html文件内容转化为字符串，再模块化
```

文档:

- [npm:html-loader](https://www.npmjs.com/package/html-loader)

安装:

```shell
npm install html-loader --save-dev
```

使用:

```javascript
{
    test: /\.html$/,
    use: [{
        loader: 'html-loader',
        options: {
            minimize: true
        }
    }],
}
```

### 11.url-loader和file-loader

目的:

```
将图片和字体文件模块化
```

文档:

- [npm:url-loader](https://www.npmjs.com/package/url-loader)
- [npm:file-loader](https://www.npmjs.com/package/file-loader)

安装:

```shell
npm install url-loader file-loader --save-dev
```

使用:

```javascript
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
```

> `limit: 8192`:当文件体积小于limit时, url-loader把文件转为Data URI的格式(就是base64)内联到引用的地方；当文件大于limit时, url-loader会调用file-loader, 把文件储存到输出目录, 并把引用的文件路径改写成输出后的路径

> `name: 'images/[name].[ext]'`:打包后的图片输出到images目录下,并保留原始文件名和扩展名

### 12.uglifyjs-webpack-plugin(发布版中使用)

目的

```
压缩js文件
```

安装

```shell
npm install uglifyjs-webpack-plugin --save-dev
```

使用

```javascript
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
plugins: [
    new UglifyJSPlugin({
        mangle: {
            // 跳过这些
            except: ['$super', '$', 'exports', 'require']
        }
    }) //压缩js
]
```

### 13.extract-text-webpack-plugin(发布板中使用)

目的

```
将style标签中的样式抽取合并到一个css文件中
```

文档:

- [v2.2](http://www.css88.com/doc/webpack2/plugins/extract-text-webpack-plugin/)

安装:

```shell
npm install --save-dev extract-text-webpack-plugin
```

使用:

```javascript
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module: {
    rules: [{
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
        }
    ],
},
plugins: [
    new ExtractTextPlugin('style.css')
]
```
