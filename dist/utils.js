"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.EnumCheckObjectCode = void 0;
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const constant_1 = require("./constant");
/** 日期偏移值，主要用于测试 */
let DateTimeOffset = 0;
/**
 * 检查对象属性结果，枚举
 */
var EnumCheckObjectCode;
(function (EnumCheckObjectCode) {
    /** code = 0 表示完全符合，否则存在问题 */
    EnumCheckObjectCode[EnumCheckObjectCode["TotallySuitable"] = 0] = "TotallySuitable";
    /** code = -1 表示paramDestObject不是object对象 */
    EnumCheckObjectCode[EnumCheckObjectCode["DestIsNotObject"] = -1] = "DestIsNotObject";
    /** code = -2 表示paramSimpleObject不是object对象 */
    EnumCheckObjectCode[EnumCheckObjectCode["SampleIsNotObject"] = -2] = "SampleIsNotObject";
    /** code = 1 表示缺少必要的属性 */
    EnumCheckObjectCode[EnumCheckObjectCode["MissAttrib"] = 1] = "MissAttrib";
})(EnumCheckObjectCode = exports.EnumCheckObjectCode || (exports.EnumCheckObjectCode = {}));
/**
 * 常用工具类
 * - 这里会提供一组类静态成员的方法
 */
// tslint:disable-next-line: class-name
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
        Error.prepareStackTrace = (__, paramStack) => {
            return paramStack;
        };
        const err = new Error();
        Error.captureStackTrace(err);
        const stack = err.stack;
        Error.prepareStackTrace = orig; // 恢复
        return stack;
    }
    /**
     * 取当前调用所在的文件名
     * @static
     * @memberOf utils
     * @param paramStack 调用堆栈列表
     * @return 返回的文件名
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
     */
    static dataAssign(paramDest, paramSrc) {
        for (const k in paramSrc) {
            paramDest[k] = paramSrc[k];
        }
    }
    /**
     * 检查对象的属性，是否符号要求
     * extra表示是多余的属性，lack表示是缺少的数据
     * @static
     * @memberOf utils
     * @param paramDestObject 被检查的属性
     * @param paramSimpleObject 参考属性
     * @return 返回结果
     * - code = EnumCheckObjectCode.TotallySuitable: 0 表示完全符合，否则存在问题
     * - code = EnumCheckObjectCode.DestIsNotObject:-1 表示paramDestObject不是object对象
     * - code = EnumCheckObjectCode.SampleIsNotObject:-2 表示paramSimpleObject不是object对象
     * - code = EnumCheckObjectCode.MissAttrib:1 表示缺少必要的属性
     */
    static checkObjectProperty(paramDestObject, paramSimpleObject) {
        let ret = {
            code: EnumCheckObjectCode.TotallySuitable,
            extra: [],
            lack: []
        };
        if (!this.isObject(paramDestObject)) {
            ret.code = EnumCheckObjectCode.DestIsNotObject;
            return ret;
        }
        if (!this.isObject(paramSimpleObject)) {
            ret.code = EnumCheckObjectCode.SampleIsNotObject;
            return ret;
        }
        for (let k in paramDestObject) {
            let kk = paramSimpleObject[k];
            if (kk === undefined) {
                ret.extra.push(k);
            }
        }
        for (let k in paramSimpleObject) {
            let v = paramSimpleObject[k];
            let kk = paramDestObject[k];
            if (v) {
                if (kk === undefined) {
                    ret.lack.push(k);
                }
            }
        }
        if (ret.lack.length > 0) {
            ret.code = EnumCheckObjectCode.MissAttrib;
        }
        return ret;
    }
    /**
     * 判断指定的参数，是否是字符串类型
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 是字符串对象，则返回true,否则返回false
     */
    static isString(paramV) {
        return lodash_1.default.isString(paramV);
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
        return lodash_1.default.isFunction(paramV);
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
        return lodash_1.default.isNumber(paramV);
    }
    /**
     * 判断指定的参数，是否是Object
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isObject(paramV) {
        return lodash_1.default.isObject(paramV);
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
     * @param paramV 被检查的对象
     * @return 检查结果 true表示是,false表示不是
     */
    static isNotNullOrEmptyString(paramV) {
        let r = lodash_1.default.isString(paramV);
        if (r) {
            return paramV.length > 0;
        }
        return false;
    }
    /**
     * 异步调用函数,注意：要求第一个参数回调函数
     * - 传入的函数要求是这样的  function (callback, arg1, arg2, ...), 第一个入参是回调函数;
     * @static
     * @param paramFunc 要调用的函数
     * @param args 要调用的参数
     * @return 返回回调函数的处理结果列表
     */
    // tslint:disable-next-line: ban-types
    static async WaitFunction(paramFunc, ...args) {
        return new Promise((resolve) => {
            paramFunc((...result) => {
                resolve(result);
            }, ...args);
        });
    }
    /**
     * 异步调用函数,注意：
     * - 传入的函数要求是这样的  function (arg1, arg2, ..., callback), 最后一个入参是回调函数;
     * - 这个函数和WaitFunction主要的区别是：传入函数的回调，是放到最后面的，而WaitFunction则要求是第一个参数
     *
     * @static
     * @memberOf utils
     * @param paramFunc 要调用的函数
     * @param args 要传给函数的参数数组
     * @return 返回回调函数的处理结果列表
     */
    // tslint:disable-next-line: ban-types
    static async WaitFunctionEx(paramFunc, ...args) {
        return new Promise((resolve) => {
            paramFunc(...args, (...result) => {
                resolve(result);
            });
        });
    }
    /**
     *  异步调用类成员函数,注意：要求第一个参数回调函数,
     *  - @see WaitFunction
     *  -  传入的函数要求是这样的  paramObject.function(callback, arg1, arg2, ...), 第一个入参是回调函数;
     * @static
     * @memberOf utils
     * @param paramObject 要调用函数的对象实例
     * @param paramFunctionName 要调用的函数名称
     * @param args 要调用的参数
     * @return 返回回调函数的传入参数列表
     */
    static async WaitClassFunction(paramObject, paramFunctionName, ...args) {
        return new Promise((resolve) => {
            paramObject[paramFunctionName]((...result) => {
                resolve(result);
            }, ...args);
        });
    }
    /**
     *  异步调用类成员函数,注意：要求最后一个参数回调函数
     * - @see WaitFunctionEx
     * - 传入的函数要求是这样的  paramObject.function(arg1, arg2, ..., callback), 最后一个入参是回调函数;
     * @static
     * @memberOf utils
     * @param paramObject 要调用函数的对象实例
     * @param paramFunctionName 要调用的函数名称
     * @param args 要调用的参数
     * @return 返回回调函数的传入参数列表
     */
    static async WaitClassFunctionEx(paramObject, paramFunctionName, ...args) {
        return new Promise((resolve) => {
            paramObject[paramFunctionName](...args, (...result) => {
                resolve(result);
            });
        });
    }
    /**
     * 设置DateTimeOffset值
     * @static
     * @memberOf utils
     * @param datetime_offset 要偏移的时间，单位毫秒数
     * @return 返回
     * - true 表示设置成功，
     * - false 表示设置失败，指传入的参数不是有效的整数
     */
    static SetDateTimeOffset(datetime_offset) {
        if (Number.isInteger(datetime_offset)) {
            DateTimeOffset = datetime_offset;
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * 取当前时间，会加上datetime_offset的值
     * - 会加手动设置的DateTimeOffset值
     * - 使用这个方法，主要是为了方便调试一些调整日期时间的计算
     * @return 当前时间戳
     */
    static GetDateTimeNow() {
        return Date.now() + DateTimeOffset;
    }
    /**
     * 取当前时间戳
     * @return 当前时间戳
     */
    static GetCurrNow() {
        return Date.now();
    }
    /**
     * 取当前时间的偏移时间
     */
    static GetDateTimeOffset() {
        return DateTimeOffset;
    }
    /**
     * 格式化显示容量
     *
     * @static
     * @param paramBytes 要格式化的字节数
     * @return  格式化的字符串
     */
    static formatMemory(paramBytes) {
        let bytes = paramBytes;
        // 检查当前传入的值，是不是整数
        if (!this.isInteger(bytes)) {
            // 如果不是整数，则做相应的处理
            if (this.isString(bytes)) {
                // 如果是字符串，则尝试将字符串转换成整数
                bytes = this.ToInteger(bytes, 0);
            }
            else if (this.isNumber(bytes)) {
                // 如果是number，则四舍五入，转换为整数
                bytes = Math.round(bytes);
            }
            else {
                // 其它值，则视为0
                bytes = 0;
            }
        }
        if (bytes < constant_1.MemorySize.K) {
            return bytes.toString(10);
        }
        else if (bytes < constant_1.MemorySize.M) { // 1KB
            return (bytes / constant_1.MemorySize.K).toFixed(2) + "KB";
        }
        else if (bytes < constant_1.MemorySize.G) // 1M
         {
            return (bytes / constant_1.MemorySize.M).toFixed(2) + "MB";
        }
        else if (bytes < constant_1.MemorySize.T) // 1T
         {
            return (bytes / constant_1.MemorySize.G).toFixed(2) + "GB";
        }
        else if (bytes < constant_1.MemorySize.P) // 1T
         {
            return (bytes / constant_1.MemorySize.T).toFixed(2) + "TB";
        }
        else {
            return (bytes / constant_1.MemorySize.P).toFixed(2) + "PB"; // 1P
        }
    }
    /**
     * 休眠指定的毫秒数
     * - 这个函数仅用于async函数，并使用await才会有效
     * @param paramT 要休眠的时长
     * @return 无返回值
     */
    static async sleep(paramT) {
        await this.WaitFunction(setTimeout, paramT);
    }
    /**
     * 将paramObject的key和values分别变成两个数组
     * - 注意：这里使用系统默认的方法，替代实现了
     * - 现在可以用javascript自带的Object.keys和Object.values替代，不需要该函数了
     * @param paramObject 参数表
     * @return 返回的结果
     */
    static keyValues(paramObject) {
        const r = {
            keys: Object.keys(paramObject),
            values: Object.values(paramObject)
        };
        // for (let k in paramObject) {
        //     r.keys.push(k);
        //     r.values.push(paramObject[k]);
        // }
        return r;
    }
    /**
     * 格式化数字显示方式
     * 用法
     * - 这个是从网上找的代码，不记得是从哪里复制过来的了
     * formatNumber(12345.999,'#,##0.00');
     * formatNumber(12345.999,'#,##0.##');
     * formatNumber(123,'000000');
     * @static
     * @memberOf utils
     * @param paramNumber 要格化的数字
     * @param paramPattern 模式
     * @return 格式化后的字符串
     */
    static formatNumber(paramNumber, paramPattern) {
        const strArr = paramNumber ? paramNumber.toString().split('.') : ['0'];
        const fmtArr = paramPattern ? paramPattern.split('.') : [''];
        let str = strArr[0];
        let fmt = fmtArr[0];
        // 用于返回的字符串
        let retString = '';
        let i = str.length - 1;
        let comma = false;
        for (let f = fmt.length - 1; f >= 0; f--) {
            switch (fmt.substr(f, 1)) {
                case '#':
                    if (i >= 0)
                        retString = str.substr(i--, 1) + retString;
                    break;
                case '0':
                    if (i >= 0)
                        retString = str.substr(i--, 1) + retString;
                    else
                        retString = '0' + retString;
                    break;
                case ',':
                    comma = true;
                    retString = ',' + retString;
                    break;
                default:
                    break;
            }
        }
        if (i >= 0) {
            if (comma) {
                let l = str.length;
                for (; i >= 0; i--) {
                    retString = str.substr(i, 1) + retString;
                    if (i > 0 && (l - i) % 3 === 0)
                        retString = ',' + retString;
                }
            }
            else
                retString = str.substr(0, i + 1) + retString;
        }
        retString = retString + '.';
        str = strArr.length > 1 ? strArr[1] : '';
        fmt = fmtArr.length > 1 ? fmtArr[1] : '';
        i = 0;
        for (let f = 0; f < fmt.length; f++) {
            switch (fmt.substr(f, 1)) {
                case '#':
                    if (i < str.length)
                        retString += str.substr(i++, 1);
                    break;
                case '0':
                    if (i < str.length)
                        retString += str.substr(i++, 1);
                    else
                        retString += '0';
                    break;
                default:
                    break;
            }
        }
        return retString.replace(/^,+/, '').replace(/\.$/, '');
    }
    /**
     * 将指定的内容，转换为整数，如果转换失败，则用缺省值
     * @param paramSrcInteger 要被转换为整数的字符串
     * @param paramDefault 缺省值 = 0
     * @return 转换后的整数
     */
    static ToInteger(paramSrcInteger, paramDefault = 0) {
        let n = Number.parseInt(paramSrcInteger);
        if (Number.isNaN(n)) {
            n = paramDefault;
        }
        return n;
    }
    /**
     * 将指定的内容，转换为数字，如果转换失败，则用缺省值
     * @param paramSrcNumber 要被转换为数字的字符串
     * @param paramDefault 缺省值 = 0
     * @return 转换后的浮点数
     */
    static ToFloat(paramSrcNumber, paramDefault = 0) {
        let n = Number.parseFloat(paramSrcNumber);
        if (Number.isNaN(n)) {
            n = paramDefault;
        }
        return n;
    }
    ;
    /**
     * 将字符串转换为json，如果出错返回undefined
     * 这个主要的做是，对异常做了处理，减少其它地方对异常处理的问题。
     * @param paramJsonString Json格式的字符串
     * @return 转换后的对象
     */
    static JsonParse(paramJsonString) {
        try {
            return JSON.parse(paramJsonString);
        }
        catch (e) {
            //
        }
        return undefined;
    }
    ;
    /**
     * 原路径移动到新路径
     * - 注：在windows下面，C盘或非同盘符的文件是改不了名的
     * - 这个函数是调用fs的rename异步回调的版本，还有一个版本是同步版本 fs.renameSync
     * @param paramOldFilename
     * @param paramNewFilename
     * @return  移动结果
     *  - ret = true 表示移动成功
     *  - ret = false 表示移动失败
     *  - errInfo 出错信息
     */
    static async renameFile(paramOldFilename, paramNewFilename) {
        let [error] = await this.WaitClassFunctionEx(fs_1.default, 'rename', paramOldFilename, paramNewFilename);
        if (utils.isNull(error)) {
            return {
                ret: true,
                errInfo: '',
            };
        }
        else {
            return {
                ret: false,
                errInfo: `rename file fail: ${paramOldFilename}=>${paramNewFilename}: err=${JSON.stringify(error)}`,
            };
        }
    }
    /**
     * 创建目录
     * - 注意，请用绝对路径
     * @param paramPath 要创建的目录,支持多层级创建
     * @param paramMode 创建后，目录的权限，默认为0o777，参加linux的权限定义
     * @return 返回创建结果，只会返回成功失败
     */
    static mkdirsSync(paramPath, paramMode = 0o777) {
        return this.mkdirsSyncEx(paramPath, paramMode).ret;
    }
    /**
     * 检查指定的文件或目录，是否存在
     * @param paramFullPath 被检查的文件名或路径名
     * @return 检查结果
     *  - true 表示存在
     *  - false 表示不存在
     */
    static fileExists(paramFullPath) {
        return fs_1.default.existsSync(paramFullPath);
    }
    /**
     * 创建目录
     * - 注意，请用绝对路径， 这里会返回具体的错误信息
     * @param paramPath 要创建的目录,支持多层级创建
     * @param paramMode 创建后，目录的权限，默认为0o777
     * @return 返回创建结果，只会返回成功失败
     *  - ret = true 表示创建成功
     *  - ret = false 表示创建失败 ，msg为错误信息
     */
    static mkdirsSyncEx(paramPath, paramMode = 0o777) {
        const r = {
            ret: false,
            msg: ''
        };
        try {
            if (!fs_1.default.existsSync(paramPath)) {
                let pathTemp;
                paramPath.split(/[\/\\]/).forEach((dirName) => {
                    if (pathTemp) {
                        pathTemp = path_1.default.join(pathTemp, dirName);
                    }
                    else {
                        if (dirName === '') {
                            pathTemp = path_1.default.sep;
                        }
                        else {
                            pathTemp = dirName;
                        }
                    }
                    if (!fs_1.default.existsSync(pathTemp)) {
                        fs_1.default.mkdirSync(pathTemp, paramMode);
                    }
                });
            }
            r.ret = true;
            return r;
        }
        catch (e) {
            r.ret = false;
            r.msg = "create director fail! path=" + paramPath + " errorMsg:" + e;
            return r;
        }
    }
    /**
     * 百分之一，最低精度支持到0.0001% 超过的部分四舍五入
     *
     * @param paramValue 百分比的值
     * @return round后的值
     */
    static roundPercentage(paramValue) {
        /** 最小保留的位数 */
        const minNumber = 1000000;
        /** 精度 */
        const PercentNumber = 100;
        if (paramValue === null || paramValue === undefined) {
            return 0;
        }
        let v = 0;
        if (typeof paramValue === 'string') {
            v = Math.round(Number.parseFloat(paramValue) * 10000);
        }
        else if (this.isNumber(paramValue)) {
            v = paramValue;
        }
        // 不是指定类型，视为0
        if (Number.isNaN(v)) {
            return 0;
        }
        v *= minNumber;
        return Math.round(v) / (minNumber / PercentNumber);
    }
    /**
     * 将数字转换为百分比的字符串
     * - 精确到0.01%
     * @param paramValue 要格式化的值
     * @return 格式化的百分比字符串
     *  - 对于paramValue为null或undefined
     */
    static formatPercentage(paramValue) {
        return this.roundPercentage(paramValue).toString() + '%';
    }
    /**
     * 解析参数列表
     * - 一般指通过程序启动，传入的参数
     * - 对于参数中 -或--开始的，视为参数名，后面紧跟的是参数值
     *
     * @param paramArgs 参数列表
     *
     * @return
     * - _ 是未能识别的参数数组，
     * - args 是识别后的参数对象
     */
    static options(paramArgs) {
        /**
         * 取参数名称
         * -
         * @param paramArg 要解析的参数
         * @return 处理结果
         */
        function GetArgsName(paramArg) {
            let localRet = { isArg: false, argName: '', argOri: paramArg };
            let strName = null;
            if (paramArg.substring(0, 2) === '--') { // 如果是前缀--
                strName = paramArg.substring(2).trim();
            }
            else if (paramArg.substring(0, 1) === '-') { // 如果是前缀-
                strName = paramArg.substring(1).trim();
            }
            else {
                return localRet;
            }
            if (strName.length === 0) {
                return localRet;
            }
            localRet.isArg = true;
            localRet.argName = strName;
            return localRet;
        }
        let ret = { _: [], args: {} };
        let args = paramArgs || [];
        if (!Array.isArray(args)) {
            args = [args];
        }
        let argPre = {
            is: false,
            argName: '',
            argOri: '', // 原始参数
        };
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            let isString = utils.isString(arg); // 判断是否是字符串
            if (isString) {
                arg = arg.trim();
            }
            if (argPre.is) { // 如果存在前缀
                ret.args[argPre.argName] = arg;
                argPre.is = false;
                argPre.argName = '';
                argPre.argOri = '';
                continue;
            }
            if (!isString) {
                ret._.push(arg);
                continue;
            }
            let p = GetArgsName(arg);
            if (p.isArg) {
                argPre.is = true;
                argPre.argName = p.argName;
                argPre.argOri = p.argOri;
            }
            else {
                ret._.push(arg);
            }
        }
        if (argPre.is) { // 如果存在前缀，但是，没有值，则加到_中
            ret._.push(argPre.argOri);
        }
        return ret;
    }
    /**
     * 随机一个整数
     * @return
     */
    static randomInteger() {
        return Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
    }
    /**
     * 随机一个范围的整数
     *
     * @param  paramMaxInteger 大于1的整数  注： 这里不会检查这个参数的有效性
     * @return
     */
    static randomScope(paramMaxInteger) {
        return this.randomInteger() % paramMaxInteger;
    }
    /**
     * 随机一个指定最大值和最小值范围的整数
     * @param paramMin 大于等于0的整数 注： 这里不会检查这个参数的有效性
     * @param paramMax 大于1的整数 注： 这里不会检查这个参数的有效性
     * @return number
     */
    static randomBetween(paramMin, paramMax) {
        return this.randomInteger() % (paramMax - paramMin + 1) + paramMin;
    }
}
exports.utils = utils;
exports.default = utils;
