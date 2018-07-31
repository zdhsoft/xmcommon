let {datetimeUtils} = require('./datetimeUtils');
let {utils} = require("./utils");
const util = require('util');

/**
 * 控制台日志类
 */
class LogConsole {
    /**
     * 控制台日志构造函数
     * @param {string} [paramName=''] tag名称
     */
    constructor(paramName = '') {
        this.m_name = paramName;
    }

    get name() {
        return this.m_name;
    }

    set name(paramName) {
        this.m_name = paramName;
    }

    buildLog(categoryName, level, ...data) {
        return `[${categoryName} ${datetimeUtils.nowDateString()} ${level}] ${util.format(...data)}`;
    }

	trace(...paramLog) {
        console.log( this.buildLog(this.name, "TRACE", ...paramLog));
	}
	debug(...paramLog) {
        console.log(this.buildLog(this.name, "DEBUG", ...paramLog));
	}
	info(...paramLog) {
        console.log(this.buildLog(this.name, " INFO", ...paramLog));
	}
	warn(...paramLog) {
        console.log(this.buildLog(this.name, " WARN", ...paramLog));
	}
	error(...paramLog) {
        console.log(this.buildLog(this.name, "ERROR", ...paramLog));
	}
	fatal(...paramLog) {
        console.log(this.buildLog(this.name, "FATEL", ...paramLog));
	}

}

let log = new LogConsole("default");

/**
 * 日志管理器
 *
 * @class LogManager
 */
class LogManager {
	constructor() {
		this.m_MapLogger = new Map();
    }
    /**
     * 取指定tag的日志
     * @param {string} tag 指定的tag
     */
	getLogger(tag) {
		if (utils.isString(tag) && tag.length > 0) {
            let l = this.m_MapLogger.get(tag);

			if (utils.isNull(l)) {
                l = new LogConsole(tag);

				this.m_MapLogger.set(tag, l);
			}
			return l;
		}
		else {
			return log;
		}
	}
}

/**
 * 日志管理器
 */
let logManager = new LogManager();

/**
 * 取指定tag的log
 * 如果没有这个tag的日志，则创建一个
 * @param {String} tag 取指定tag的log
 * @return {LogConsole} 返回log
 */
let getLogger = function getLogger(tag) {
    return logManager.getLogger(tag);
};
/**
 * 取指定tag的local log
 * 如果没有这个tag的日志，则创建一个
 * @param {String} tag 取指定tag的log
 * @return {LogConsole} 返回log
 */
function getLocalLogger(tag) {
    return logManager.getLogger(tag);
}

/**
 * 重新设置getLogger
 * - 返回true表示设置成功
 * - 返回false表示paramGetLogger不是一个函数
 * @param {function} paramGetLogger 新的getLogger函数实现，替换getLogger
 * @return {boolean} 设置结果
 */
function setGetLogger(paramGetLogger) {
    if(utils.isFunction(paramGetLogger)) {
        getLogger = paramGetLogger;
        return true;
    }
    return false;
}

exports.getLogger      = (tag) => { return getLogger(tag); };
exports.setGetLogger   = setGetLogger;
exports.getLocalLogger = getLocalLogger;

