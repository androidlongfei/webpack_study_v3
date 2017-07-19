// 引入world.js 模块
require('./world')

// 引入style.css模块,需要加前缀
// require('style-loader!css-loader!./style.css')

// 引入style.css模块,不需要加前缀,已在命令行中设定
require('../css/style.css')

function test(hello) {
    console.log(hello);
}

test('hello,world');
