/**
 * 生成日志前缀
 * @param paramFilename 当前的文件名
 * @param args 其它前缀
 * @return 返回结果
 */
export declare function logPrefix(paramFilename: string, ...args: unknown[]): unknown[];
export interface ILog {
    name: string;
    trace(...paramLog: unknown[]): void;
    debug(...paramLog: unknown[]): void;
    /** log级别日志，等同于info */
    log(...paramLog: unknown[]): void;
    info(...paramLog: unknown[]): void;
    error(...paramLog: unknown[]): void;
    warn(...paramLog: unknown[]): void;
    msg(...paramLog: unknown[]): void;
}
/**
 * 控制台日志类
 */
export declare class LogConsole implements ILog {
    private m_name;
    /**
     * 控制台日志构造函数
     * @param {string} [paramName=''] tag名称
     */
    constructor(paramName?: string);
    get name(): string;
    set name(paramName: string);
    private buildLog;
    trace(...paramLog: unknown[]): void;
    debug(...paramLog: unknown[]): void;
    log(...paramLog: unknown[]): void;
    info(...paramLog: unknown[]): void;
    warn(...paramLog: unknown[]): void;
    error(...paramLog: unknown[]): void;
    fatal(...paramLog: unknown[]): void;
    msg(...paramLog: unknown[]): void;
}
/**
 * 日志管理器
 *
 * @class LogManager
 */
declare class LogManager {
    private m_MapLogger;
    private m_createLog;
    /**
     * 取指定tag的日志
     * @param paramTag 指定的tag
     */
    getLogger(paramTag: string): ILog;
    /** 设置缺省的log */
    setDefaultLog(paramDefaultLog: ILog): void;
    /** 设置创建log */
    setCreateLog(paramCreateLog: (paramTag: string) => ILog): void;
}
/**
 * @deprecated 不建议使用，可以直接使用logManager的setCreateLog方法，设置创建函数
 */
export type TGetLoggerFun = (paramTag: string) => ILog;
/**
 * 取日志管理实例
 * @returns
 */
export declare function GetLogManager(): LogManager;
/**
 * 取指定tag的local log
 * 如果没有这个tag的日志，则创建一个
 * @param paramTag 取指定tag的log
 * @return 返回log
 */
export declare function getLocalLogger(paramTag: string): ILog;
/**
 * 重新设置getLogger
 * - 返回true表示设置成功
 * - 返回false表示paramGetLogger不是一个函数
 * @deprecated 不建议使用，可以直接使用logManager的setCreateLog方法，设置创建函数
 * @param {function} paramGetLogger 新的getLogger函数实现，替换getLogger
 * @return {boolean} 设置结果
 */
export declare function setGetLogger(paramGetLogger: (paramTag: string) => ILog): boolean;
export declare function getLogger(paramTag: string): ILog;
export {};
