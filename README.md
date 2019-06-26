# xmcommon

一个js 通用库, 将一些常用的函数之类的，移到这里方便使用

- github: https://github.com/zdhsoft/xmcommon
- npm: https://www.npmjs.com/package/xmcommon

## 目录

[TOC]

## 安装

npm install xmcommon

# 主要模块说明

- datetimeUtils 日期时间相关的处理工具函数
- utils 一些常用的工具类函数
- HttpCall 全局的CHttpCall对象
- CHttpCall 提供api调用接口的http或https的函数调用类
- watchRequire 监控文化变化的函数
- SimpleCode 一种换位加编码的类
- getLogger 取日志对象的函数
- setGetLogger 设置getLogger函数的函数，用于替换现有的getLogger函数
- codeUtils 一些编码相关的函数，有md5，sha254，base64等函数
- error_common,error_utils 通用错误信息和错误相关函数
- common_ret 通用返回的类
- bitUtils 二进制标志的工具类
- CNYCurrency 中文货币类

# 版本变更说明

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
