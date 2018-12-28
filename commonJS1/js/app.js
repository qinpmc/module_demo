// 引入第三方库，应该放置在最前面
let uniq = require('uniq')
let module1 = require('./src/module1')
let module2 = require('./src/module2')
let module3 = require('./src/module3')

module1.foo() //module1
module2() //module2
module3.foo() //foo() module3
console.log(uniq(module3.arr)) //[ 1, 2, 3 ]
