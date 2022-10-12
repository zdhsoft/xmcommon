"use strict";
// 这里定义一些必要的常量
Object.defineProperty(exports, "__esModule", { value: true });
exports.YesOrNo = exports.DatetimeConstant = exports.error_common = exports.MemorySize = void 0;
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
/**
 * 日期时间的常量
 */
var DatetimeConstant;
(function (DatetimeConstant) {
    /** 最小的UTC时间 */
    DatetimeConstant[DatetimeConstant["MIN_UTC"] = 1] = "MIN_UTC";
    /** 最大的UTC时间 */
    DatetimeConstant[DatetimeConstant["MAX_UTC"] = 253370736000000] = "MAX_UTC";
    /** 无效的UTC时间 */
    DatetimeConstant[DatetimeConstant["INVALID_UTC"] = 0] = "INVALID_UTC";
    /** 每天最大的毫少数 */
    DatetimeConstant[DatetimeConstant["MILLIS_PRE_DAY"] = 86400000] = "MILLIS_PRE_DAY";
    /** 每分钟的秒数 */
    DatetimeConstant[DatetimeConstant["SECOND_PRE_MINUTE"] = 60] = "SECOND_PRE_MINUTE";
    /** 每秒的毫秒数 */
    DatetimeConstant[DatetimeConstant["MILLIS_PRE_SECOND"] = 1000] = "MILLIS_PRE_SECOND";
    /** 公元元年到1970-01-01的天数 */
    DatetimeConstant[DatetimeConstant["DAYS_1970"] = 719528] = "DAYS_1970";
})(DatetimeConstant = exports.DatetimeConstant || (exports.DatetimeConstant = {}));
/** 是或否 */
var YesOrNo;
(function (YesOrNo) {
    YesOrNo[YesOrNo["yes"] = 1] = "yes";
    YesOrNo[YesOrNo["no"] = 0] = "no";
})(YesOrNo = exports.YesOrNo || (exports.YesOrNo = {}));
