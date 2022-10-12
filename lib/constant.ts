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
