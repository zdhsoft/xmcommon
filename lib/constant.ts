// 这里定义一些必要的常量

/** 内存的容量常量定义 */
export enum MemorySize {
    /** 1K字节数 1024 */
    K = 1024,
    /** 1M字节数 1048576 */
    M = 1048576,
    /** 1G字节数 1073741824 */
    G = 1073741824,
    /** 1T字节数 1099511627776 */
    T = 1099511627776,
    /** 1P字节数 */
    P = 1125899906842624,
}

/** 默认的错误码 */
export enum error_common {
    /** 正确 */
    ERR_OK = 0,
    /** 失败 */
    ERR_FAIL = -1,
    /** 表示返回true */
    ERR_TRUE = -2,
    /** 表示返回false */
    ERR_FALSE = -3,
}

/**
 * 日期时间的常量
 */
export enum DatetimeConstant {
    /** 最小的UTC时间 */
    MIN_UTC = 1,
    /** 最大的UTC时间 */
    MAX_UTC = 253370736000000,
    /** 无效的UTC时间 */
    INVALID_UTC = 0,
    /** 每天最大的毫少数 */
    MILLIS_PRE_DAY = 86400000,
    /** 每分钟的秒数 */
    SECOND_PRE_MINUTE = 60,
    /** 每秒的毫秒数 */
    MILLIS_PRE_SECOND = 1000,
    /** 公元元年到1970-01-01的天数 */
    DAYS_1970 = 719528,
}

/** 是或否 */
export enum YesOrNo {
    yes = 1,
    no  = 0
}

/**
 * 选项类型
 */
export declare type TOptions<T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [P in keyof T]?: NonNullable<any>;
};

/** 通用正则表达式 */
export const CommonReg = {
    /** YYYY-MM-DD hh:mm:ss 格式的正则表达式 */
    dateTime: /^[1-2]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/,
    /** 货币类正则表达式 */
    curreny: /^[-+]?\d+(?:\.\d{0,4})?$/,
    /** 货币千分位 */
    curreny_thousandth: /^[-+]?\d{1,3}(,\d{3})*(\.\d{0,4})?$/,
    /** YYYY-MM-DD 支持 . - / \ 空格分隔符 格式 */
    baseDate: // /^([1-3]\d{3}|\d{2})([./\-\\ ])(0[1-9]|1[0-2]|[1-9])([./\-\\ ])(0[1-9]|[1-2][0-9]|3[0-1]|[1-9])$/,
        /^([1-2]\d{3})[./\-\\ \u5e74]{1}(0[1-9]|1[0-2]?|[23456789])[./\-\\ \u6708]{1}(0[1-9]?|1[0-9]?|2[0-9]?|3[0-1]?|[456789])[\u65e5]?$/,
    /** 范围日期
     * - 不支持空格做为日期的分隔符，因为需要用它做前后两个日期的分隔符
     */
    baseRangeDate:
        // eslint-disable-next-line max-len
        /^([1-2]\d{3}|d{2})[./\-\\](0[1-9]|1[0-2])[./\-\\](0[1-9]|[1-2][0-9]|3[0-1]) ([1-2]\d{3}|d{2})[./\-\\](0[1-9]|1[0-2])[./\-\\](0[1-9]|[1-2][0-9]|3[0-1])$/,
    /** YYYYMMDD 格式的日期正则表达式 */
    simpleDate: /^([1-2]\d{3})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
    /** hh:mm:ss的正则表达式 */
    baseTime: /^([0-1]\d{1}|2[0-3]):([0-5]\d{1}):([0-5]\d{1})$/,
    /** hhmmss的正则表达式 */
    simpleTime: /^([0-1]\d{1}|2[0-3])([0-5]\d{1})([0-5]\d{1})$/,
    /** 仅数字 */
    onlyDigit: /^\d+$/,
    /** 仅小写字母 */
    onlyLowercase: /^[a-z]+$/,
    /** 仅大写字母 */
    onlyCapitalLetter: /^[A-Z]+$/,
    /** 仅大小写字母 */
    onlyLetter: /^[A-Za-z]+$/,
    /** 数字与大小写字母 */
    digitOrLetter: /^[A-Za-z0-9]+$/,
    /** 15位身份证 */
    idNumber15: /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/,
    /** 18位身份证 */
    idNumber18: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    /** email地址 */
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    /** ascii字符 */
    // eslint-disable-next-line no-control-regex
    ascii: /^[\x00-\x7F]+$/,
    /** 字母是大写的16进制 */
    uppercaseHEX: /^[A-F0-9]+$/,
    /** 字母是小写的16进制 */
    lowercaseHEX: /^[a-f0-9]+$/,
    /** url */
    url: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([?&]\w+=\w*)*$/,
    /** 整数 */
    integer: /^((0{1})|(-{0,1}[1-9]\d*))$/,
    /** 数字 */
    decimal: /^-?([1-9]\d*|[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/,
    /** 中国手机号 xxxxxxxxxxx */
    mobile_cn_none: /^(\+?0?86-?)?(1\d{10})$/,
    /** 中国手机号 xxx-xxxx-xxxx */
    mobile_cn_344: /^(\+?0?86-?)?(1\d{2})-(\d{4})-(\d{4})$/,
    /** 中国手机号 xxx-xxx-xxxxx */
    mobile_cn_335: /^(\+?0?86-?)?(1\d{2})-(\d{3})-(\d{5})$/,
    /** 中国手机号 xxxx-xxxx-xxx */
    mobile_cn_443: /^(\+?0?86-?)?(1\d{3})-(\d{4})-(\d{3})$/,
    /** 国外手机号 */
    mobile_other: /^([+\-\d.]{2,20})$/,
};
