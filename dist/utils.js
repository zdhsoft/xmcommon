"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.EnumCheckObjectCode = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const constant_1 = require("./constant");
const common_ret_1 = require("./common_ret");
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
})(EnumCheckObjectCode || (exports.EnumCheckObjectCode = EnumCheckObjectCode = {}));
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
     * @return 当前的栈信息
     */
    static GetStackInfo() {
        const stackList = this.GetStack();
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
     * @param paramDestObject 被检查的属性
     * @param paramSimpleObject 参考属性
     * @return 返回结果
     * - code = EnumCheckObjectCode.TotallySuitable: 0 表示完全符合，否则存在问题
     * - code = EnumCheckObjectCode.DestIsNotObject:-1 表示paramDestObject不是object对象
     * - code = EnumCheckObjectCode.SampleIsNotObject:-2 表示paramSimpleObject不是object对象
     * - code = EnumCheckObjectCode.MissAttrib:1 表示缺少必要的属性
     */
    static checkObjectProperty(paramDestObject, paramSimpleObject) {
        const ret = {
            code: EnumCheckObjectCode.TotallySuitable,
            extra: [],
            lack: [],
        };
        if (!this.isObject(paramDestObject)) {
            ret.code = EnumCheckObjectCode.DestIsNotObject;
            return ret;
        }
        if (!this.isObject(paramSimpleObject)) {
            ret.code = EnumCheckObjectCode.SampleIsNotObject;
            return ret;
        }
        for (const k in paramDestObject) {
            const kk = paramSimpleObject[k];
            if (kk === undefined) {
                ret.extra.push(k);
            }
        }
        for (const k in paramSimpleObject) {
            const v = paramSimpleObject[k];
            const kk = paramDestObject[k];
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
     * 判断指定的参数，是否是null或undefined
     * @static
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isNull(paramV) {
        return paramV === undefined || paramV === null;
    }
    /**
     * 判断指定的参数，是否不是 null或undefined
     * @static
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
        const r = lodash_1.default.isString(paramV);
        if (r) {
            return paramV.length > 0;
        }
        return false;
    }
    /**
     * 检查对象是不是真的空
     * undefined null '' NaN 以及无效的数字 时返回true
     * @from thinkjs 从thinkjs借鉴过来的函数
     * @param paramV
     */
    static isTrueEmpty(paramV) {
        if (paramV === undefined || paramV === null || paramV === '')
            return true;
        if (this.isNumber(paramV) && Number.isNaN(paramV))
            return true;
        return false;
    }
    /**
     * 检查对象是不是真的空
     * - null, undefined, '', {}, false, 无效日期, 0, [], NaN 这些都是空对象
     * - 这个与thinkjs的isEmpty判断结果一样
     * @from thinkjs 从thinkjs借鉴过来的函数
     * @param paramV
     */
    static isEmpty(paramV) {
        if (this.isTrueEmpty(paramV)) {
            return true;
        }
        else if (this.isRegExp(paramV)) {
            return false;
        }
        else if (this.isDate(paramV)) {
            return this.isNaN(paramV.getTime());
        }
        else if (Array.isArray(paramV)) {
            return paramV.length === 0;
        }
        else if (this.isString(paramV)) {
            return paramV.length === 0;
        }
        else if (this.isNumber(paramV)) {
            return paramV === 0;
        }
        else if (this.isBoolean(paramV)) {
            return paramV === false;
        }
        else if (this.isError(paramV)) {
            return false;
        }
        else if (this.isObject(paramV)) {
            for (const key in paramV) {
                return false;
            }
        }
        else if (this.isNaN(paramV)) {
            return true;
        }
        return false;
    }
    /**
     * 将回调风格的异步函数转换为 Promise
     * @param paramFunc 要转换的函数，其第一个参数必须是回调函数
     * @param args 要传给函数的其他参数
     * @returns Promise 包装的结果
     */
    static async WaitFunction(paramFunc, ...args) {
        return new Promise((resolve, reject) => {
            try {
                paramFunc((error, ...results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results);
                    }
                }, ...args);
            }
            catch (err) {
                reject(err instanceof Error ? err : new Error(String(err)));
            }
        });
    }
    /**
     * 将回调风格的异步函数转换为 Promise
     * @param paramFunc 要转换的函数，其最后一个参数必须是回调函数
     * @param args 要传给函数的其他参数
     * @returns Promise 包装的结果
     */
    static async WaitFunctionEx(paramFunc, ...args) {
        return new Promise((resolve, reject) => {
            try {
                paramFunc(...args, (error, ...results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results);
                    }
                });
            }
            catch (err) {
                reject(err instanceof Error ? err : new Error(String(err)));
            }
        });
    }
    /**
     * 将对象方法的回调风格异步调用转换为 Promise
     * @param paramObject 包含要调用方法的对象
     * @param paramFunctionName 要调用的方法名
     * @param args 要传给方法的其他参数
     * @returns Promise 包装的结果
     */
    static async WaitClassFunction(paramObject, paramFunctionName, ...args) {
        const func = paramObject[paramFunctionName];
        if (typeof func !== 'function') {
            throw new Error(`Method ${paramFunctionName} does not exist on the object`);
        }
        return new Promise((resolve, reject) => {
            try {
                func.call(paramObject, (error, ...results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results);
                    }
                }, ...args);
            }
            catch (err) {
                reject(err instanceof Error ? err : new Error(String(err)));
            }
        });
    }
    /**
     * 将对象方法的回调风格异步调用转换为 Promise
     * @param paramObject 包含要调用方法的对象
     * @param paramFunctionName 要调用的方法名
     * @param args 要传给方法的其他参数
     * @returns Promise 包装的结果
     */
    static async WaitClassFunctionEx(paramObject, paramFunctionName, ...args) {
        const func = paramObject[paramFunctionName];
        if (typeof func !== 'function') {
            throw new Error(`Method ${paramFunctionName} does not exist on the object`);
        }
        return new Promise((resolve, reject) => {
            try {
                func.call(paramObject, ...args, (error, ...results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(results);
                    }
                });
            }
            catch (err) {
                reject(err instanceof Error ? err : new Error(String(err)));
            }
        });
    }
    /**
     * 设置DateTimeOffset值
     * @static
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
        else if (bytes < constant_1.MemorySize.M) {
            // 1KB
            return (bytes / constant_1.MemorySize.K).toFixed(2) + 'KB';
        }
        else if (bytes < constant_1.MemorySize.G) {
            // 1M
            return (bytes / constant_1.MemorySize.M).toFixed(2) + 'MB';
        }
        else if (bytes < constant_1.MemorySize.T) {
            // 1T
            return (bytes / constant_1.MemorySize.G).toFixed(2) + 'GB';
        }
        else if (bytes < constant_1.MemorySize.P) {
            // 1T
            return (bytes / constant_1.MemorySize.T).toFixed(2) + 'TB';
        }
        else {
            return (bytes / constant_1.MemorySize.P).toFixed(2) + 'PB'; // 1P
        }
    }
    /**
     * 休眠指定的毫秒数
     * - 这个函数仅用于async函数，并使用await才会有效
     * @param paramT 要休眠的时长
     * @return 无返回值
     */
    static async sleep(paramT) {
        await new Promise(resolve => {
            setTimeout(resolve, paramT);
        });
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
            values: Object.values(paramObject),
        };
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
            switch (fmt.substring(f, f + 1)) {
                case '#':
                    if (i >= 0) {
                        retString = str.substring(i, i + 1) + retString;
                        i--;
                    }
                    break;
                case '0':
                    if (i >= 0) {
                        retString = str.substring(i, 1 + 1) + retString;
                        i--;
                    }
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
                const l = str.length;
                for (; i >= 0; i--) {
                    retString = str.substring(i, i + 1) + retString;
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
            switch (fmt.substring(f, f + 1)) {
                case '#':
                    if (i < str.length) {
                        retString += str.substring(i, i + 1);
                        i++;
                    }
                    break;
                case '0':
                    if (i < str.length) {
                        retString += str.substring(i, i + 1);
                        i++;
                    }
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
    /**
     * 将字符串转换为json，如果出错返回undefined
     * 这个主要的做是，对异常做了处理，减少其它地方对异常处理的问题。
     * @param paramJsonString Json格式的字符串
     * @return 转换后的对象
     */
    static JsonParse(paramJsonString) {
        try {
            return JSON.parse(paramJsonString);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (e) {
            //
        }
        return undefined;
    }
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
        const [error] = await this.WaitClassFunctionEx(fs_1.default, 'rename', paramOldFilename, paramNewFilename);
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
     * @deprecated 请用fileExistsSync
     * @return 检查结果
     *  - true 表示存在
     *  - false 表示不存在
     */
    static fileExists(paramFullPath) {
        return fs_1.default.existsSync(paramFullPath);
    }
    /**
     * 检查指定的文件或目录，是否存在
     * @param paramFullPath 被检查的文件名或路径名
     * @return 检查结果
     *  - true 表示存在
     *  - false 表示不存在
     */
    static fileExistsSync(paramFullPath) {
        return fs_1.default.existsSync(paramFullPath);
    }
    /**
     * 判断指定路径是不是目录
     * @param paramFullPath 被检查的文件名或路径名
     * @return 检查结果
     *  - true 表示是
     *  - false 表示不是
     */
    static isDirSync(paramFullPath) {
        return fs_1.default.statSync(paramFullPath)?.isDirectory() || false;
    }
    /**
     * 判断指定路径是不是文件
     * @param paramFullPath 被检查的文件名或路径名
     * @return 检查结果
     *  - true 表示是
     *  - false 表示不是
     */
    static isFileSync(paramFullPath) {
        return fs_1.default.statSync(paramFullPath)?.isFile() || false;
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
            msg: '',
        };
        try {
            if (!fs_1.default.existsSync(paramPath)) {
                let pathTemp;
                paramPath.split(/[/\\]/).forEach(dirName => {
                    // 这里指用/ 或\ 都可以分隔目录  如  linux的/usr/local/services   和windows的 d:\temp\aaaa
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
            r.msg = 'create director fail! path=' + paramPath + ' errorMsg:' + e;
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
            const localRet = { isArg: false, argName: '', argOri: paramArg };
            let strName = null;
            if (paramArg.substring(0, 2) === '--') {
                // 如果是前缀--
                strName = paramArg.substring(2).trim();
            }
            else if (paramArg.substring(0, 1) === '-') {
                // 如果是前缀-
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
        const ret = { _: [], args: {} };
        let args = paramArgs || [];
        if (!Array.isArray(args)) {
            args = [args];
        }
        const argPre = {
            is: false, // 是否存在前缀
            argName: '', // 前缀的名称
            argOri: '', // 原始参数
        };
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            const isString = utils.isString(arg); // 判断是否是字符串
            if (isString) {
                arg = arg.trim();
            }
            if (argPre.is) {
                // 如果存在前缀
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
            const p = GetArgsName(arg);
            if (p.isArg) {
                argPre.is = true;
                argPre.argName = p.argName;
                argPre.argOri = p.argOri;
            }
            else {
                ret._.push(arg);
            }
        }
        if (argPre.is) {
            // 如果存在前缀，但是，没有值，则加到_中
            ret._.push(argPre.argOri);
        }
        return ret;
    }
    /**
     * 检查value是否是字符串，不是则返回缺省值
     * @param paramValue 被检查的值
     * @param paramDefault 缺省值
     * @returns
     */
    static stringOpts(paramValue, paramDefault) {
        return lodash_1.default.isString(paramValue) ? paramValue : paramDefault;
    }
    /**
     * 检查value是否是整数，不是则返回缺省值
     * @param paramValue 被检查的值
     * @param paramDefault 缺省值
     * @returns
     */
    static intOpts(paramValue, paramDefault) {
        return Number.isInteger(paramValue) ? paramValue : paramDefault;
    }
    /**
     * 检查value是否是数字，不是则返回缺省值
     * @param paramValue 被检查的值
     * @param paramDefault 缺省值
     * @returns
     */
    static numberOpts(paramValue, paramDefault) {
        return lodash_1.default.isNumber(paramValue) ? paramValue : paramDefault;
    }
    /**
     * 检查value是否是boolean，不是则返回缺省值
     * @param paramValue 被检查的值
     * @param paramDefault 缺省值
     * @returns
     */
    static boolOpts(paramValue, paramDefault) {
        return lodash_1.default.isBoolean(paramValue) ? paramValue : paramDefault;
    }
    /**
     * 检查value是否是对象，不是则返回缺省值
     * @param paramValue 被检查的值
     * @param paramDefault 缺省值
     * @returns
     */
    static objectOpts(paramValue, paramDefault) {
        return lodash_1.default.isObject(paramValue) ? paramValue : paramDefault;
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
        return (this.randomInteger() % (paramMax - paramMin + 1)) + paramMin;
    }
    /**
     * 限制字符串的长度，超过则自动截取，如果传入字符串为null或undefined,则返回缺省字符串
     * @param paramString 要检查的字符串
     * @param paramMaxLength 最大字符数
     * @param paramDefault 缺省字符串
     */
    static limitString(paramString, paramMaxLength, paramDefault = '') {
        const defaultString = utils.isNull(paramDefault) ? '' : paramDefault;
        let v = utils.isNull(paramString) ? defaultString : paramString;
        if (utils.isInteger(paramMaxLength) && paramMaxLength >= 0) {
            if (paramMaxLength === 0) {
                v = '';
            }
            else if (v.length > paramMaxLength) {
                v = v.substring(0, paramMaxLength);
            }
        }
        return v;
    }
    /**
     * 检查处理字符串
     * - 如果要检查的字符串的值是一个null或undefined，则返回null
     * - 如果字符串经trim()处理后，为空串，则返回null
     * - 如果传入的不是字符串对象，会先转换成字符串后再做处理
     * - 其它情况，返回trim()的字符串
     * @param parmaValue 要检查的字符串
     * @return {string | null} 返回null或trim()后的字符串
     */
    static notNullEmptyString(parmaValue) {
        if (this.isNull(parmaValue)) {
            return null;
        }
        const v = (lodash_1.default.isString(parmaValue) ? parmaValue : String(parmaValue)).trim();
        if (v.length < 1) {
            return null;
        }
        else {
            return v;
        }
    }
    /** 计算页的偏移量 */
    static calcPageOffsetByPageInfo(paramPage) {
        return this.calcPageOffset(paramPage.page, paramPage.pageSize);
    }
    /** 计算页的偏移量 */
    static calcPageOffset(paramPageNo, paramPageSize) {
        return (paramPageNo - 1) * paramPageSize;
    }
    /**
     * 计算页信息
     * - 与mysql limit相对应
     * @param paramStart 开始的下标，从0开始 默认值0
     * @param paramLength 对应的数量，要求大于1，小于1000，最大值1000, 默认值为10
     */
    static roundPageInfo(paramStart = 0, paramLength = 10) {
        const start = Number.isInteger(paramStart) ? paramStart : 0;
        let length = Number.isInteger(paramLength) ? paramLength : 10;
        if (length < 1) {
            length = 10;
        }
        else if (length > 1000) {
            length = 1000;
        }
        const page = Math.floor(start / length) + 1;
        return { start, length, page, pageSize: length };
    }
    /**
     * 计算最大页数 就是计算出来的页数
     * @param paramCount 总的记录数
     * @param paramPageSize 每页的记录数
     */
    static calcMaxPage(paramCount, paramPageSize) {
        const r = new common_ret_1.XCommonRet();
        r.setOK(0);
        do {
            if (!Number.isSafeInteger(paramCount)) {
                r.setError(constant_1.error_common.ERR_FAIL, `paramCount = ${paramCount} is not safe integer!`);
                break;
            }
            if (!Number.isSafeInteger(paramPageSize)) {
                r.setError(constant_1.error_common.ERR_FAIL, `paramPageSize = ${paramPageSize} is not safe integer!`);
                break;
            }
            if (paramPageSize <= 0) {
                r.setError(constant_1.error_common.ERR_FAIL, `paramPageSize = ${paramPageSize} <= 0,  页数要是大于0的整数`);
                break;
            }
            if (paramCount <= 0) {
                // 如果记录数，小于等于0，则 总页数0
                break;
            }
            const p = paramCount % paramPageSize;
            let pageCnt = (paramCount - p) / paramPageSize;
            if (p > 0) {
                pageCnt++;
            }
            r.setOK(pageCnt);
            // eslint-disable-next-line no-constant-condition
        } while (false);
        return r;
    }
    /**
     * 取Set对象的key数组
     * @param paramSet 集合
     * @returns
     */
    static getSetKeys(paramSet) {
        const r = [];
        for (const k of paramSet) {
            r.push(k);
        }
        return r;
    }
    /**
     * 取Map对象的key数组
     * @param paramMap Map
     * @returns
     */
    static getMapKeys(paramMap) {
        const r = [];
        for (const [k] of paramMap) {
            r.push(k);
        }
        return r;
    }
    /**
     * 取Map对象的value数组
     * @param paramMap Map
     * @returns
     */
    static getMapValues(paramMap) {
        const r = [];
        for (const [, v] of paramMap) {
            r.push(v);
        }
        return r;
    }
    /**
     * 取Map对象的key和value数组
     * @param paramMap Map
     * @returns
     */
    static getMapKeyValues(paramMap) {
        const r = { key: [], value: [] };
        for (const [k, v] of paramMap) {
            r.key.push(k);
            r.value.push(v);
        }
        return r;
    }
}
exports.utils = utils;
/**
 * 判断指定的参数，是否是字符串类型
 * @static
 * @param value 被检查的对象
 * @return 是字符串对象，则返回true,否则返回false
 */
utils.isString = lodash_1.default.isString;
/**
 * 判断指定的参数，是否是function
 * @static
 * @param value 被检查的对象
 * @return 如果是，则返回true,否则返回false
 */
utils.isFunction = lodash_1.default.isFunction;
/**
 * 检查指定的参数，是否是整数
 * @static
 * @param number 被检查的对象
 * @return 如果是，则返回true,否则返回false
 */
utils.isInteger = Number.isInteger;
/**
 * 检查指定的参数，是否是整数
 * @static
 * @param number 被检查的对象
 * @return 如果是，则返回true,否则返回false
 */
utils.isSafeInteger = Number.isSafeInteger;
/**
 * 检查指定的参数，是否是数组
 * @static
 * @param  arg 被检查的对象
 * @return 如果是，则返回true,否则返回false
 */
utils.isArray = Array.isArray;
/**
 * 检查指定的参数，是否是number
 * @static
 * @param value 被检查的对象
 * @return 如果是，则返回true,否则返回false
 */
utils.isNumber = lodash_1.default.isNumber;
/**
 * 判断指定的参数，是否是Object
 * @static
 * @param value 被检查的对象
 * @return 如果是，则返回true,否则返回false
 */
utils.isObject = lodash_1.default.isObject;
utils.isDate = lodash_1.default.isDate;
utils.isRegExp = lodash_1.default.isRegExp;
utils.isError = lodash_1.default.isError;
utils.isNaN = Number.isNaN;
utils.isFinite = Number.isFinite;
utils.isBoolean = lodash_1.default.isBoolean;
utils.isSymbol = lodash_1.default.isSymbol;
utils.isMap = lodash_1.default.isMap;
utils.isSet = lodash_1.default.isSet;
utils.isBuffer = Buffer.isBuffer;
exports.default = utils;
