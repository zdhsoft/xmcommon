/** 内存的容量常量定义 */
export declare enum MemorySize {
    /** 1K字节数 1024 */
    K = 1024,
    /** 1M字节数 1048576 */
    M = 1048576,
    /** 1G字节数 1073741824 */
    G = 1073741824,
    /** 1T字节数 1099511627776 */
    T = 1099511627776,
    /** 1P字节数 */
    P = 1125899906842624
}
/** 默认的错误码 */
export declare enum error_common {
    /** 正确 */
    ERR_OK = 0,
    /** 失败 */
    ERR_FAIL = -1,
    /** 表示返回true */
    ERR_TRUE = -2,
    /** 表示返回false */
    ERR_FALSE = -3
}
