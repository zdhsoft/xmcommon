/**
 * 生成日志前缀
 * @param paramFilename 当前的文件名
 * @param args 其它前缀
 * @return 返回结果
 */
export declare function logPrefix(paramFilename: string, ...args: any[]): [shortpath: string, ...args: any[]];
export interface ILog {
    name: string;
    trace(...paramLog: any[]): void;
    debug(...paramLog: any[]): void;
    info(...paramLog: any[]): void;
    error(...paramLog: any[]): void;
    warn(...paramLog: any[]): void;
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
    trace(...paramLog: any[]): void;
    debug(...paramLog: any[]): void;
    info(...paramLog: any[]): void;
    warn(...paramLog: any[]): void;
    error(...paramLog: any[]): void;
    fatal(...paramLog: any[]): void;
}
/**
 * 日志管理器
 *
 * @class LogManager
 */
export declare class LogManager {
    private m_MapLogger;
    constructor();
    /**
     * 取指定tag的日志
     * @param paramTag 指定的tag
     */
    getLogger(paramTag: string): ILog;
}
export declare type TGetLoggerFun = (paramTag: string) => ILog;
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
 * @param {function} paramGetLogger 新的getLogger函数实现，替换getLogger
 * @return {boolean} 设置结果
 */
export declare function setGetLogger(paramGetLogger: (paramTag: string) => ILog): boolean;
export declare function getLogger(paramTag: string): ILog;
