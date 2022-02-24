# xmcommon

一个js 通用库, 将一些常用的函数之类的，移到这里方便使用

- 准备用typescript重写这个库，并计划正式发布它的1.0版本。
- 第一个改写版0.9提交，一下就准备单元测试与兼容性测试
- 警告：这个版本改动比较大，可能存在重大bug! 请使用0.1.9这个稳定版
- Warning: This version has changed a lot, and there may be major bugs! Please use the stable version 0.1.9

## 当前的版本，是正在开发的中的版本，未完成测试，请不要使用。

- github: https://github.com/zdhsoft/xmcommon
- npm: https://www.npmjs.com/package/xmcommon

## 目录

[TOC]

## 安装

npm install xmcommon

# 主要模块说明

- datetimeUtils 日期时间相关的处理工具函数
- utils 一些常用的工具类函数
- watchRequire 监控文化变化的函数
- SimpleCode 一种换位加编码的类
- getLogger 取日志对象的函数
- setGetLogger 设置getLogger函数的函数，用于替换现有的getLogger函数
- codeUtils 一些编码相关的函数，有md5，sha254，base64等函数
- error_common, error_utils 通用错误信息和错误相关函数
- common_ret 通用返回的类
- bitUtils 二进制标志的工具类
- CNYCurrency 中文货币类
- BufferWapper 一个buffer读写的包装类
- list_sturct 包含了队列和堆栈的简单实现。

# 版本变更说明
## 0.9.20
- 2022-2-24
- \* 修改fileExistsSync描述错误
## 0.9.19

- 2022-2-23
- \+ utils增加isDirSync, isFileSync方法
- \* 更新依赖库的版本
## 0.9.18
- 2022-01-23
- \+ 增加基于数组实现的Queue和Stack两个类

## 0.9.17
- 2022-01-22
- \+ utils增加一组选项默认值方法 stringOpts, intOpts, numberOpts, boolOpts, objectOpts, 当传入参数不是指定类型时，会返回默认值
- \+ utils增加一个方法limitString，超过指定的长度，会自动截取指定的长度

## 0.9.16
- 2022-01-07
- \+ 给common_ret增加assignFrom方法
- \+ 增加ICommonRetBase的定义
- \- 删除datatimeUtils的version方法
- \+ datetimeUtils增加getDateString和getTimeString方法

## 0.9.15
- 2022-01-05
- \* 更新依赖库的版本
- \* 优化utils.formatNumber函数
## 0.9.14
- 2022-01-05
- \+ 增加utils.calcMaxPage方法
- \+ 增加utils.roundPageInfo方法
## 0.9.13
- 2021-12-02
- \* 将一些any类型改为unknown类型

## 0.9.12
- 2021-11-29
- \* CNYCurrency类的format方法，增加无千分位分隔符的参数

## 0.9.11
- 2021-11-16
- \* 使用prettier格式化代码
- \* 使用eslint对代码进行检查
## 0.9.10
- 2021-11-15
- \* 修复shortpath的bug
## 0.9.8
- 2021-11-15
- \* 优化日志管理类，增加创建接口和设置猫缺省接口。
## 0.9.7
- 2021-11-12
- \+ 日志增加log方法
- \* 更新部分依赖包
## 0.9.6
- 2021-09-29
- \* 修改common_ret和XCommonRet的设置error的参数类型定义为number
## 0.9.5
- 2021-09-28
- \* 增加类的导出

## 0.9.4
- 2021-09-28
- \* 更新readme.md

## 0.9.3
- 2021-09-28
- \+ 增加一个XCommonRet替代common_ret，主要不是支持泛型
## 0.9.2
- 2021-09-05
- \+ 增加一个BufferWapper类

## 0.9.1
- 2021-09-03
- \* 解决不能引入的问题

## 0.9.0
- 2021-09-02
- \* 将通用库使用typescript改写，改写量比较大，还没有全面的测试，这个版本请慎用，请尽量用0.1.9这个版本。
- \* 增加一些单元测试例子

## 0.1.9
- 2021-05-08
- \* 依赖的lodash库，出现安全警告，在这里更新依赖库
## 0.1.8
- 2021-04-28
- \- 标注httpcall为@deprecated  计划在未来的版中，准备删除这个
- \* 为common_ret增加toString等方法内容。

## 0.1.5 - 0.1.7
- 2020-12-24
- \+ 增加fileExists判断文件或目录是否存在
- \* 修复makedirs存在的bug
- \+ 增加renameFile方法

## 0.1.4
- 2020-08-20
- \+ 增加watchRequire注意事项说明
- \* 更新lodash的库

## 0.1.3
- 2020-06-05
- \+ 增加utils.randomInteger,随机整数
- \+ 增加utils.randomScope,随机范围整数
- \+ 增加utils.randomBetween,随机整数，批定开始和结束值
- \* 更新依赖包的版本

## 0.1.2

- 2019-07-20
- \* 优化utils.formatPercentage生成成
- \+ 增加utils.roundPercentage，将百分比的值精度控制到 0.0001%

## 0.1.1

- 2019-07-14
- \* 收到github提示，说依赖的lodash有问题，所以这里升级一下 lodash , 还是高级别的
- \* We found a potential security vulnerability in one of your dependencies.

## 0.1.0

- 2019-07-14
- \* fixbug 修复utils.mkdirSync在linux下，使用绝对路径会失败的bug
- \+ 增加utils.mkdirSyncEx，用于返回具体的错误信息
- \+ 增加utils.formatPercentage，用于生成百分比字符串

## 0.0.22

- 2019-07-04
- \* 修改index.d.ts，增加允许默认值参数定义

## 0.0.21

- 2019-06-28
- \* fixbug: 不能正确识别增加CNYCurrency类型的对象
- \+ 增加CNYCurrency.isCurrency函数，判断是否是CNYCurrency类型
- \+ datetimeUtils增加比较日期的时间差函数

## 0.0.20

- 2019-06-26
- \* 原生成中文货币大写存在问题，重新找了一个新的版本替换 来源:https://www.jb51.net/article/89661.htm
- \+ 增加多情况货币测试
- \* 修复乘除的bug, 对于自乘与自除，返回的是boolean，判断成功失败
- \* 优化人民币大写生成, 主要有小于1元的情况，分为0的时候，要加整
- \* 增加生成大写，index.d.ts定义

## 0.0.17

- 2019-06-24
- \* 增加CNYCurrency构造函数默认值0, 如果传入null或undefined也视为0, 测试CNYCurrency 1-100000000之间的值
- \+ CNYCurrency 增加assign赋值函数
- \* 将index.d.ts中的utils.JsonParse的定义返回值由{}改为any

## 0.0.16

- 2019-06-03
- \* 修复生成大写的bug，主要是百==>佰  千==>仟

```js
let m = [];
let c = new CNYCurrency(-12345);
m.push(c);
m.push(c.add(109999));
m.push(c.sub(10));
m.push(c.div(0.01));
m.push(c.mul(10));
m.push(c.mul(0.01));

let tt = new CNYCurrency(0);
tt.selfAdd(2805307.04);
tt.selfAdd(4323515.28);
tt.selfAdd(2805307.04);
tt.selfAdd(3281107.13);
m.push(tt);


for(let mm of m) {
    console.log(mm.value, mm.intValue, mm.toString(), mm.format(true, true), mm.Chinese());
}

//输出结果
//-12345 -1234500 -12345.00 ￥-1,2345.00 负壹万贰仟叁佰肆拾伍元整
//97654 9765400 97654.00 ￥9,7654.00 玖万柒仟陆佰伍拾肆元整
//-12355 -1235500 -12355.00 ￥-1,2355.00 负壹万贰仟叁佰伍拾伍元整
//-1234500 -123450000 -1234500.00 ￥-123,4500.00 负壹佰贰拾叁万肆仟伍佰元整
//-123450 -12345000 -123450.00 ￥-12,3450.00 负拾贰万叁仟肆佰伍拾元整
//-123.45 -12345 -123.45 ￥-123.45 负壹佰贰拾叁元肆角伍分
//13215236.49 1321523649 13215236.49 ￥1321,5236.49 壹仟叁佰贰拾壹万伍仟贰佰叁拾陆元肆角玖分
```

## 0.0.15

- 2019-06-01
- \+ 增加CNYCurrency 中文货币类

## 0.0.14

- 2019-04-20
- \* 优化index.d.ts部分注释, 将object变化any, 将[string]变化string[] 这样在typescript的可以正常使用
- \+ codeUtils增加MD5FromArgs
- \+ CHttpCall 增加 asyncJsonPost 和 asyncJsonGet方法

## 0.0.13

- 2019-03-28
- \* 优化index.d.ts部分注释
- \+ utils增加options对参数解析的方法  用于node启动后，传入参数的接收处理

```js
let {utils} = require("../lib/utils");
let v = ["../tt", "--env", "aaaaa", "--version", "1.0.0", "aaaaa", "--flag", "true", "-aaaaa"];
let k = utils.options(v);
console.log(JSON.stringify(k, null, 2));
//对于参数接收用  let k = utils.options(process.argv);
```

运行结果

```json
{
  "_": [
    "../tt",
    "aaaaa",
    "-aaaaa"
  ],
  "args": {
    "env": "aaaaa",
    "version": "1.0.0",
    "flag": "true"
  }
}
```

## 0.0.12

- 2019-02-18
- \+ 修改readme.md说明

## 0.0.10

- 2019-02-18
- \+ 增加index.d.ts，使用的时候，可以在vscode有代码提示说明了

## 0.0.9

- 2019-02-10
- \+ datetimeUtils 增加diffLocalDays，CalcLocalDaysByUTC，CalcLocalDaysByDate等函数
- \+ datetimeUtils 修改getNow()的描述错误
- \+ datetimeUtils 增加getLocalNow()和getLocalNowSecond()

## 0.0.8

- 2018-12-21
- \+ datetimeUtils 补全上次未能提交的函数

## 0.0.7

- 2018-12-12
- \+ datetimeUtils 增加了ToLocalTime,ToUTCTime,getTodayZeroTime,isSameDay等函数

## 0.0.6

- 2018-11-01
- \+ 增加了bitUtil对整数位处理函数，可以用于标志位处理
- \+ 增加utils中的ToInteger, ToFloat, JsonParse和mkdirsSync等几个函数

## 0.0.5

- 2018-10-31
- \* 更新依赖包 lodash 4.17.10 -->4.17.11

## 0.0.4

- 2018-10-31
- \+ 增加日志前缀缩短处理

```js
//文件:example/test.js
let comm = require("xmcommon");
let log = comm.getLogger(__filename);
log.info("hello world");
//[example\test 2018-10-31 19:29:09.802  INFO] hello world
```

---

## 0.0.3

- 初始版本
