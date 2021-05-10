"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const _ = __importStar(require("lodash"));
class utils {
    /**
     * 取当交utils的版本号
     * @deprecated 无实际使用意义
     * @return 当前utils版本号字符串
     */
    static version() {
        return 'utils 2.0';
    }
    /**
     * 取调用堆栈
     * @static
     * @memberOf utils
     * @return 调用堆栈列表
     */
    static GetStack() {
        const orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (__, stack) {
            return stack;
        };
        const err = new Error();
        Error.captureStackTrace(err);
        const stack = err.stack;
        Error.prepareStackTrace = orig; //恢复
        return stack;
    }
    /**
     * 取当前调用所在的文件名
     * @static
     * @memberOf utils
     * @param paramStack 调用堆栈列表
     * @return {string} 返回的文件名
     */
    static GetFileNameByStack(paramStack) {
        if (Array.isArray(paramStack) && paramStack.length > 1) {
            return paramStack[1].getFileName();
        }
        else {
            return null;
        }
    }
    /**
     * 取当前调用所在的行号
     * @static
     * @memberOf utils
     * @param paramStack 调用堆栈列表
     * @return 返回的行号
     */
    static GetLineNumberByStack(paramStack) {
        if (Array.isArray(paramStack) && paramStack.length > 1) {
            return paramStack[1].getLineNumber();
        }
        else {
            return null;
        }
    }
    /**
     * 取当前调用所在的列
     * @static
     * @memberOf utils
     * @param paramStack 调用堆栈列表
     * @return 返回的列
     */
    static GetColumnNumberByStack(paramStack) {
        if (Array.isArray(paramStack) && paramStack.length > 1) {
            return paramStack[1].getColumnNumber();
        }
        else {
            return null;
        }
    }
    /**
     * 取当前调用堆栈信息
     * @static
     * @memberOf utils
     * @return 当前的栈信息
     */
    static GetStackInfo() {
        let stackList = this.GetStack();
        if (Array.isArray(stackList) && stackList.length >= 2) {
            return stackList[1];
        }
        else {
            return null;
        }
    }
    /**
     * 将src的属性复制到dest,只要用for in能够访问到的，都需要复制
     * @param paramDest     接收属的目标
     * @param paramSrc      定义属性的目标
     * @return  无返回
     */
    static dataAssign(paramDest, paramSrc) {
        for (const k in paramSrc) {
            paramDest[k] = paramSrc[k];
        }
    }
    /**
     * 判断指定的参数，是否是字符串类型
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 是字符串对象，则返回true,否则返回false
     */
    static isString(paramV) {
        return _.isString(paramV);
    }
    /**
     * 判断指定的参数，是否是null或undefined
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isNull(paramV) {
        return paramV === undefined || paramV === null;
    }
    /**
     * 判断指定的参数，是否是function
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isFunction(paramV) {
        return _.isFunction(paramV);
    }
    /**
     * 检查指定的参数，是否是整数
     * @static
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isInteger(paramV) {
        return Number.isInteger(paramV);
    }
    /**
     * 检查指定的参数，是否是整数
     * @static
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isSafeInteger(paramV) {
        return Number.isSafeInteger(paramV);
    }
    /**
     * 检查指定的参数，是否是数组
     * @static
     * @param  paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isArray(paramV) {
        return Array.isArray(paramV);
    }
    /**
     * 检查指定的参数，是否是number
     * @static
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isNumber(paramV) {
        return _.isNumber(paramV);
    }
    /**
     * 判断指定的参数，是否是Object
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isObject(paramV) {
        return _.isObject(paramV);
    }
    /**
     * 判断指定的参数，是否不是 null或undefined
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isNotNull(paramV) {
        return !(paramV === null || paramV === undefined);
    }
    /**
     * 检查指定的对象,是不是字符串并且不为空串
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 检查结果 true表示是,false表示不是
     */
    static isNotNullOrEmptyString(paramV) {
        let r = this.isString(paramV);
        if (r) {
            return paramV.length > 0;
        }
        return false;
    }
}
exports.utils = utils;
exports.default = utils;
