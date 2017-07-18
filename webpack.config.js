module.exports = {
    entry: './src/script/main.js', // 入口文件
    output: {
        path: __dirname + '/dist/js', // 目标文件路径
        filename: 'bundle.js' //目标文件名
    }
}
