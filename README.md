# xmcommon
一个js 通用库

github: https://github.com/zdhsoft/xmcommon
npm: https://www.npmjs.com/package/xmcommon

## 安装
npm install xmcommon

# 版本变更说明

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
