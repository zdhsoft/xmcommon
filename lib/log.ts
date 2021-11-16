import path from 'path';
import util from 'util';
import {utils} from './utils';
import {datetimeUtils} from './datetimeUtils';

const workdir = process.cwd();
/**
 * 取文件名的短名称
 * 用于缩短日志文件名前缀的函数
 * @param  paramFileName 文件名
 * @return 去除当前路径的文件短名
 */
function shortpath(paramFileName: string): string {
    let ff = paramFileName.replace(workdir, '');
    const ext = path.extname(ff);
    let pp = path.dirname(ff);
    const basename = path.basename(ff, ext);

    let spltchar = '/';
    if (pp.indexOf('\\') >= 0) {
        spltchar = '\\';
    }

    if (pp === '\\' || pp === '/' || pp === '.') {
        pp = '';
    }

    if (pp.length > 0) {
        ff = path.dirname(ff) + spltchar + basename;
    } else {
        ff = basename;
    }

    const sss = ff.charAt(0);
    if (sss === '\\' || sss === '/') {
        ff = ff.slice(1);
    }

    return `${ff}`;
}
/**
 * 生成日志前缀
 * @param paramFilename 当前的文件名
 * @param args 其它前缀
 * @return 返回结果
 */
export function logPrefix(paramFilename: string, ...args: any[]): [shortpath: string, ...args: any[]] {
    if (paramFilename === null || paramFilename === undefined) {
        return [...args] as any;
    } else {
        return [shortpath(paramFilename), ...args];
    }
}

export interface ILog {
    name: string;
    trace(...paramLog: any[]): void;
    debug(...paramLog: any[]): void;
    /** log级别日志，等同于info */
    log(...paramLog: any[]):void;
    info(...paramLog: any[]): void;
    error(...paramLog: any[]): void;
    warn(...paramLog: any[]): void;
}

/**
 * 控制台日志类
 */
export class LogConsole implements ILog {
    private m_name: string = '';
    /**
     * 控制台日志构造函数
     * @param {string} [paramName=''] tag名称
     */
    public constructor(paramName = '') {
        this.m_name = paramName;
    }

    public get name() {
        return this.m_name;
    }

    public set name(paramName) {
        this.m_name = paramName;
    }

    private buildLog(categoryName: string, level: string, ...data: any[]) {
        return `[${categoryName} ${datetimeUtils.nowDateString()} ${level}] ${util.format('', ...data)}`;
    }

    public trace(...paramLog: any[]): void {
        // tslint:disable-next-line: no-console
        console.log( this.buildLog(this.name, 'TRACE', ...paramLog));
    }
    public debug(...paramLog: any[]) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, 'DEBUG', ...paramLog));
    }
    public log(...paramLog: any[]) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, '  LOG', ...paramLog));
    }
    public info(...paramLog: any[]) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, ' INFO', ...paramLog));
    }
    public warn(...paramLog: any[]) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, ' WARN', ...paramLog));
    }
    public error(...paramLog: any[]) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, 'ERROR', ...paramLog));
    }
    public fatal(...paramLog: any[]) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, 'FATEL', ...paramLog));
    }
}

let defaultLog: ILog = new LogConsole('default');

/**
 * 日志管理器
 *
 * @class LogManager
 */
class LogManager {
    private m_MapLogger = new Map<string, ILog>();
    private m_createLog: (paramTag:string) => ILog = (paramTag: string) => new LogConsole(paramTag);
    public constructor() {
    }
    /**
     * 取指定tag的日志
     * @param paramTag 指定的tag
     */
    public getLogger(paramTag: string): ILog {
        if (utils.isString(paramTag) && paramTag.length > 0) {
            let l = this.m_MapLogger.get(paramTag);

            if (utils.isNull(l)) {
                l = this.m_createLog(paramTag);
                this.m_MapLogger.set(paramTag, l);
            }
            return l as ILog;
        } else {
            return defaultLog;
        }
    }
    /** 设置缺省的log */
    public setDefaultLog(paramDefaultLog: ILog) {
        defaultLog = paramDefaultLog;
    }
    /** 设置创建log */
    public setCreateLog(paramCreateLog: (paramTag:string)=>ILog) {
        this.m_createLog = paramCreateLog;
    }
}

/**
 * 日志管理器
 */
const logManager = new LogManager();
/**
 * @deprecated 不建议使用，可以直接使用logManager的setCreateLog方法，设置创建函数
 */
export type TGetLoggerFun = (paramTag: string) => ILog;
/**
 * 取日志管理实例
 * @returns
 */
export function GetLogManager() {
    return logManager;
}
/**
 * 取指定tag的log
 * 如果没有这个tag的日志，则创建一个
 * @param paramTag 取指定tag的log
 * @return 返回log
 */
let __getLogger: TGetLoggerFun = (paramTag: string): ILog => {
    const [prefix] = logPrefix(paramTag);
    return logManager.getLogger(prefix);
};
/**
 * 取指定tag的local log
 * 如果没有这个tag的日志，则创建一个
 * @param paramTag 取指定tag的log
 * @return 返回log
 */
export function getLocalLogger(paramTag: string): ILog {
    return logManager.getLogger(paramTag);
}

/**
 * 重新设置getLogger
 * - 返回true表示设置成功
 * - 返回false表示paramGetLogger不是一个函数
 * @deprecated 不建议使用，可以直接使用logManager的setCreateLog方法，设置创建函数
 * @param {function} paramGetLogger 新的getLogger函数实现，替换getLogger
 * @return {boolean} 设置结果
 */
export function setGetLogger(paramGetLogger: (paramTag: string) => ILog) {
    if (utils.isFunction(paramGetLogger)) {
        __getLogger = paramGetLogger;
        return true;
    }
    return false;
}

export function getLogger(paramTag: string): ILog {
    return __getLogger(paramTag);
}
