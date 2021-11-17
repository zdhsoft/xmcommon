"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = exports.setGetLogger = exports.getLocalLogger = exports.GetLogManager = exports.LogConsole = exports.logPrefix = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const utils_1 = require("./utils");
const datetimeUtils_1 = require("./datetimeUtils");
const workdir = process.cwd();
/**
 * 取文件名的短名称
 * 用于缩短日志文件名前缀的函数
 * @param  paramFileName 文件名
 * @return 去除当前路径的文件短名
 */
function shortpath(paramFileName) {
    let ff = paramFileName.replace(workdir, '');
    const ext = path_1.default.extname(ff);
    let pp = path_1.default.dirname(ff);
    const basename = path_1.default.basename(ff, ext);
    let spltchar = '/';
    if (pp.indexOf('\\') >= 0) {
        spltchar = '\\';
    }
    if (pp === '\\' || pp === '/' || pp === '.') {
        pp = '';
    }
    if (pp.length > 0) {
        ff = path_1.default.dirname(ff) + spltchar + basename;
    }
    else {
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
function logPrefix(paramFilename, ...args) {
    if (paramFilename === null || paramFilename === undefined) {
        return [...args];
    }
    else {
        return [shortpath(paramFilename), ...args];
    }
}
exports.logPrefix = logPrefix;
/**
 * 控制台日志类
 */
class LogConsole {
    /**
     * 控制台日志构造函数
     * @param {string} [paramName=''] tag名称
     */
    constructor(paramName = '') {
        this.m_name = '';
        this.m_name = paramName;
    }
    get name() {
        return this.m_name;
    }
    set name(paramName) {
        this.m_name = paramName;
    }
    buildLog(categoryName, level, ...data) {
        return `[${categoryName} ${datetimeUtils_1.datetimeUtils.nowDateString()} ${level}] ${util_1.default.format('', ...data)}`;
    }
    trace(...paramLog) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, 'TRACE', ...paramLog));
    }
    debug(...paramLog) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, 'DEBUG', ...paramLog));
    }
    log(...paramLog) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, '  LOG', ...paramLog));
    }
    info(...paramLog) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, ' INFO', ...paramLog));
    }
    warn(...paramLog) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, ' WARN', ...paramLog));
    }
    error(...paramLog) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, 'ERROR', ...paramLog));
    }
    fatal(...paramLog) {
        // tslint:disable-next-line: no-console
        console.log(this.buildLog(this.name, 'FATEL', ...paramLog));
    }
}
exports.LogConsole = LogConsole;
let defaultLog = new LogConsole('default');
/**
 * 日志管理器
 *
 * @class LogManager
 */
class LogManager {
    constructor() {
        this.m_MapLogger = new Map();
        this.m_createLog = (paramTag) => new LogConsole(paramTag);
    }
    /**
     * 取指定tag的日志
     * @param paramTag 指定的tag
     */
    getLogger(paramTag) {
        if (utils_1.utils.isString(paramTag) && paramTag.length > 0) {
            let l = this.m_MapLogger.get(paramTag);
            if (utils_1.utils.isNull(l)) {
                l = this.m_createLog(paramTag);
                this.m_MapLogger.set(paramTag, l);
            }
            return l;
        }
        else {
            return defaultLog;
        }
    }
    /** 设置缺省的log */
    setDefaultLog(paramDefaultLog) {
        defaultLog = paramDefaultLog;
    }
    /** 设置创建log */
    setCreateLog(paramCreateLog) {
        this.m_createLog = paramCreateLog;
    }
}
/**
 * 日志管理器
 */
const logManager = new LogManager();
/**
 * 取日志管理实例
 * @returns
 */
function GetLogManager() {
    return logManager;
}
exports.GetLogManager = GetLogManager;
/**
 * 取指定tag的log
 * 如果没有这个tag的日志，则创建一个
 * @param paramTag 取指定tag的log
 * @return 返回log
 */
let __getLogger = (paramTag) => {
    const [prefix] = logPrefix(paramTag);
    return logManager.getLogger(prefix);
};
/**
 * 取指定tag的local log
 * 如果没有这个tag的日志，则创建一个
 * @param paramTag 取指定tag的log
 * @return 返回log
 */
function getLocalLogger(paramTag) {
    return logManager.getLogger(paramTag);
}
exports.getLocalLogger = getLocalLogger;
/**
 * 重新设置getLogger
 * - 返回true表示设置成功
 * - 返回false表示paramGetLogger不是一个函数
 * @deprecated 不建议使用，可以直接使用logManager的setCreateLog方法，设置创建函数
 * @param {function} paramGetLogger 新的getLogger函数实现，替换getLogger
 * @return {boolean} 设置结果
 */
function setGetLogger(paramGetLogger) {
    if (utils_1.utils.isFunction(paramGetLogger)) {
        __getLogger = paramGetLogger;
        return true;
    }
    return false;
}
exports.setGetLogger = setGetLogger;
function getLogger(paramTag) {
    return __getLogger(paramTag);
}
exports.getLogger = getLogger;
