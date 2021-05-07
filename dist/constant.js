"use strict";
// 这里定义一些必要的常量
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_common = exports.MemorySize = void 0;
/** 内存的容量常量定义 */
var MemorySize;
(function (MemorySize) {
    /** 1K字节数 1024 */
    MemorySize[MemorySize["K"] = 1024] = "K";
    /** 1M字节数 1048576 */
    MemorySize[MemorySize["M"] = 1048576] = "M";
    /** 1G字节数 1073741824 */
    MemorySize[MemorySize["G"] = 1073741824] = "G";
    /** 1T字节数 1099511627776 */
    MemorySize[MemorySize["T"] = 1099511627776] = "T";
    /** 1P字节数 */
    MemorySize[MemorySize["P"] = 1125899906842624] = "P";
})(MemorySize = exports.MemorySize || (exports.MemorySize = {}));
/** 默认的错误码 */
var error_common;
(function (error_common) {
    /** 正确 */
    error_common[error_common["ERR_OK"] = 0] = "ERR_OK";
    /** 失败 */
    error_common[error_common["ERR_FAIL"] = -1] = "ERR_FAIL";
    /** 表示返回true */
    error_common[error_common["ERR_TRUE"] = -2] = "ERR_TRUE";
    /** 表示返回false */
    error_common[error_common["ERR_FALSE"] = -3] = "ERR_FALSE";
})(error_common = exports.error_common || (exports.error_common = {}));
