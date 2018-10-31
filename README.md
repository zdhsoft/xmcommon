# xmcommon
一个js 通用库

## 安装
npm install xmcommon

# 版本变更说明
## 0.0.4
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
