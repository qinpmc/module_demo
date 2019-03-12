# 模块化 

This repository contains some require.js demos.The demos mainly come from these sites:
http://www.cnblogs.com/xiaohuochai/p/6847942.html;       
http://www.requirejs.cn/ 
https://juejin.im/post/5c17ad756fb9a049ff4e0a62 前端模块化详解(完整版)
https://zhuanlan.zhihu.com/p/32324311 JavaScript模块化 --- Commonjs、AMD、CMD、ES6 modules
 
 
## 模块化引入

### 无模块化
- 污染全局作用域。 因为每一个模块都是暴露在全局的，简单的使用，会导致全局变量命名冲突，当然，我们也可以使用命名空间的方式来解决。
 

### 什么是模块 
- 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起;
- 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信. 
 
 
### 初期解决方案

1. namespace模式 : 简单对象封装

- 作用: 减少了全局变量，解决命名冲突
- 问题: 数据不安全(外部可以直接修改模块内部的数据)


```
let myModule = {
  data: 'www.baidu.com',
  foo() {
    console.log(`foo() ${this.data}`)
  },
  bar() {
    console.log(`bar() ${this.data}`)
  }
}
myModule.data = 'other data' //能直接修改模块内部的数据
myModule.foo() // foo() other data
```
2. IIFE模式：匿名函数自调用(闭包)


### 模块化的好处
- 避免命名冲突(减少命名空间污染)
- 更好的分离, 按需加载
- 更高复用性
- 高可维护性


## CommonJS


Node 应用由模块组成，采用 CommonJS 模块规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。    
在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。


### 特点

所有代码都运行在模块作用域，不会污染全局作用域。
模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
模块加载的顺序，按照其在代码中出现的顺序。

### 基本语法

暴露模块：module.exports = value或exports.xxx = value
引入模块：require(xxx),如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径
 


### 模块的加载机制
CommonJS模块的加载机制是，输入的是被输出的**值的拷贝**。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。这点与ES6模块化有重大差异。

```
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

 
// main.js
var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;

console.log(counter);  // 3
incCounter();
console.log(counter); // 3
```  
  
上面代码说明，counter输出以后，lib.js模块内部的变化就影响不到counter了。   
这是因为counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值
 
示例 ：commonJS1

说明：  

1. 安装uniq
npm install uniq --save // 用于数组去重

2. 运行 node app.js 以node环境运行

3. 在浏览器使用：
全局安装: npm install browserify -g
局部安装: npm install browserify --save-dev
打包： browserify js/app.js -o js/dist/bundle.js




## AMD

CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数。     
由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。    
但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。  
AMD 规范：
https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88

### 特点
- AMD模块定义的方法非常清晰，不会污染全局环境，能够清楚地显示依赖关系。  
- AMD模式可以用于浏览器环境，并且允许非同步加载模块，也可以根据需要动态加载模块。   

本规范只定义了一个函数 "define"，它是全局变量。函数的描述为：     
 
```
 define(id?, dependencies?, factory);
 
 
//定义没有依赖的模块
define(function(){
   return 模块
})

//定义有依赖的模块
define(['module1', 'module2'], function(m1, m2){
   return 模块
})

引入使用模块:
require(['module1', 'module2'], function(m1, m2){
   使用m1/m2
})
 
```
 
不使用AMD的话，前端页面首先会发送多个请求，其次引入的js文件顺序不能搞错，否则会报错
 
 



 
 
 
后文专门介绍 AMD代表库 Requirejs。

## CMD

CMD规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD规范整合了CommonJS和AMD规范的特点.
CMD的加载方式是通过按需加载的方式，而不是必须在模块开始就加载所有的依赖。

```
定义暴露模块：
//定义没有依赖的模块
define(function(require, exports, module){
  exports.xxx = value
  module.exports = value
})

//定义有依赖的模块
define(function(require, exports, module){
  //引入依赖模块(同步)
  var module2 = require('./module2')
  //引入依赖模块(异步)
    require.async('./module3', function (m3) {
    })
  //暴露模块
  exports.xxx = value
})

//引入使用模块：
define(function (require) {
  var m1 = require('./module1')
  var m4 = require('./module4')
  m1.show()
  m4.show()
})

```

AMD和CMD的区别：

- 1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible（尽可能的懒加载，也称为延迟加载，即在需要的时候才加载）。

- 2. CMD 推崇依赖就近，AMD 推崇依赖前置。

 
## ES6模块化

```
/** 定义模块 math.js **/
var basicNum = 0;
var add = function (a, b) {
    return a + b;
};
export { basicNum, add };


/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99 + basicNum);
}
 
```

```

// export-default.js
export default function () {
  console.log('foo');
  
  
// import-default.js
import customName from './export-default';
customName(); // 'foo'
 

```


**ES6 模块与 CommonJS 模块的差异** 

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。  
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。   

```
// ES6 模块
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4

// ES6 模块的运行机制与 CommonJS 不一样。ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

```



## UMD（Universal Module Definition - 通用模块定义）
UMD是AMD和CommonJS的一个糅合。AMD是浏览器优先，异步加载；CommonJS是服务器优先，同步加载。      
既然要通用，怎么办呢？那就先判断是否支持node.js的模块，存在就使用node.js；再判断是否支持AMD（define是否存在），存在则使用AMD的方式加载。这就是所谓的UMD。       

```

((root, factory) => {
  if (typeof define === 'function' && define.amd) {
    //AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    //CommonJS
    var $ = requie('jquery');
    module.exports = factory($);
  } else {
    //都不是，浏览器全局定义
    root.testModule = factory(root.jQuery);
  }
})(this, ($) => {
  //do something...  这里是真正的函数体
});

```

 

## Requirejs

基本语法：   
 define(id?, dependencies?, factory);     
 
 
### 入口文件
 
 
require.js在加载的时候会检查data-main属性，当requireJS自身加载执行后，就会再次异步加载data-main属性指向的main.js。    
这个main.js是当前网页所有逻辑的入口，理想情况下，整个网页只需要这一个script标记，利用requireJS加载依赖的其它文件.  

```
<script data-main="scripts/main" src="js/require.js"></script>
```


### 模块

1. 简单的值对

```
define({
    color: "black",
    size: "unisize"
});
```

2. 函数式定义

```

define(function () {
    //Do setup work here
    return {
        color: "black",
        size: "unisize"
    }
});

```

3. 存在依赖的函数式定义

```
// moduleB.js
define({
    add: function(n){
        return n+1;
    }
});

//存在依赖的函数式定义
define(['moduleB'], function(b) {
    var num = 10;
    return b.add(num);
    }
);
```


### 路径配置

由于requireJS总是动态地请求依赖的JS文件，所以必然涉及到一个JS文件的路径解析问题，requireJS默认采用一种baseUrl + moduleID的解析方式，requireJS对它的处理遵循如下规则：

- 1、在没有使用data-main和config的情况下，baseUrl默认为当前页面的目录
- 2、在有data-main的情况下，main.js前面的部分就是baseUrl，比如上面的js/
- 3、在有config的情况下，baseUrl以config配置的为准
- 上述三种方式，优先级由低到高排列.
- 如果一个module ID符合下述规则之一，其ID解析会避开常规的"baseUrl + paths"配置，而是直接将其加载为一个相对于当前HTML文档的脚本：     
  1、以 ".js" 结束；2、包含 URL 协议，如 "http:" or "https:"

```
如下所示，require()函数所依赖的模块路径为'js/moduleA.js'
 
// main.js
require.config({
    baseUrl: 'js/lib',
    paths:{
        'moduleA':'moduleA.min'
    }
})

require(['js/moduleA.js'], function(a){
    console.log(a);
});
```

### 路径
示例：路径demo1

 路径demo1
    |- vendor
         |- require.js
    |- index1.html
    |- main1.js
    |- moduleA.js

```
// index1.html 文件  通过data-main 引入和自身同目录的main1.js

  <!--在有data-main的情况下，main1.js前面的部分就是baseUrl，比如此处的/ -->
  <script data-main="main1" src="vendor/require.js"></script>
  
// main1.js  引用模块 moduleA

require(["moduleA"],function(a){
    ...
}

 moduleA 地址： 没有其他配置，和main.js同目录

```



示例：路径demo2
 路径demo2
    |- js
         |-lib
             |-moduleA2.js
         |- main.js
         |- moduleA.js
    |- vendor
         |- require.js
         |-moduleA3.js
    |- index1.html
 
```
// index1.html 文件  通过data-main 引入 js文件夹下 main.js，这里使得baseUrl 为js
<script data-main="js/main" src="vendor/require.js"></script>

main.js 第一个引入 ： moduleA 的地址应为 js 文件夹下 moduleA.js
require(["moduleA"],function(a){
	console.log(a);
})

//main.js 第二个引入 ：指定moduleA2的 paths 为 "lib/moduleA2"，则引入的文件为 baseUrl（ 即index1.html中指定的 js）+lib/moduleA2
//为:js/lib/moduleA2.js

require.config({
  paths:{
	"moduleA2" : "lib/moduleA2"  
  }
}); 
require(["moduleA2"],function(a){
	console.log(a);
}) 

//main.js 第三个引入 ：指定了 paths 为 ../vendor/moduleA3，同上，则引入的文件为 js+ ../vendor/moduleA3,即为vendor/moduleA3

require.config({
  paths:{
	"moduleA3" : "../vendor/moduleA3"  
  }
}); 
require(["moduleA3"],function(a){
	console.log(a);
})

```

示例：路径demo3

 路径demo3
    |- js
         |-lib
             |-moduleA2.js
         |- main.js
         |- moduleA.js
    |- vendor
         |- require.js
         |- moduleA3.js
    |- index1.html
    
注意： 解析的路径均以index.html 实际位置为参考   

```
main.js 第一个引入 ：指定baseUrl 为js，moduleA 的paths为 moduleA，则引入的文件为 js/moduleA.js

require.config({
  baseUrl:"js",
  paths:{
	"moduleA" : "moduleA"  
  }
}); 
require(["moduleA"],function(a){
	console.log(a);
}) 


// 原理同上， 引入 js/lib/moduleA2.js
require.config({
  baseUrl:"js/lib",
  paths:{
	"moduleA2" : "moduleA2"  
  }
}); 
require(["moduleA2"],function(a){
	console.log(a);
}) 
 

 // 原理同上， 引入 vendor/moduleA3.js
require.config({
  baseUrl:"vendor",
  paths:{
	"moduleA3" : "moduleA3"  
  }
}); 
require(["moduleA3"],function(a){
	console.log(a);
}) 
 
```



### requireJS简单包装CommonJS
只要在commonJS代码的外层简单包裹一层函数，就可以在浏览器端直接运行.
示例： commonJS

```
// a.js
define(function(require,exports,module){
	var a = 100;
	module.exports.a = a;
})

// b.js
define(function(require,exports,module){
	var result  = require("./a");
	console.log(result.a);
})

```

### 懒加载
AMD保留了commonjs中的require、exprots、module这三个功能。可以不把依赖罗列在dependencies数组中。而是在代码中用require来引入
示例：懒加载

```
// main.js
define(function(){
	console.log("main");
	document.onclick = function(){
		require(["./vendor/moduleB"],function(b){
			b.test();
		});
	}
});

//moduleB.js
define(function(){
　　console.log('a');
    return {
        test : function(){
            console.log('a.test');
        }
    }
})
```

### shim

shim属性为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置，即加载非规范的模块。   

举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。    
具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性


```
require.config({
　　　　shim: {

　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}
　　　　}
　　});

```

示例：shim



### 引入 Jquery/domReady等

参见示例： jquery引入 / domready



















 






















 