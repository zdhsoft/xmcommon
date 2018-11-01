# xmcommon
一个js 通用库

github: https://github.com/zdhsoft/xmcommon
npm: https://www.npmjs.com/package/xmcommon

## 安装
npm install xmcommon

# 版本变更说明
## 0.06
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
