"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CNYCurrency = exports.CNYCurrencyError = void 0;
// const _ = require("lodash");
const utils_1 = require("./utils");
/** 货币精度 */
const PRECISION = 100;
/** 三数一组 正则 */
const groupReg = /(\d)(?=(\d{3})+\b)/g;
/** 四数一组 正则 */
const groupCNYReg = /(\d)(?=(\d{4})+\b)/g;
/** 最大值 */
const MAX_VALUE = Number.MAX_SAFE_INTEGER / PRECISION;
/** 最小值 */
const MIN_VALUE = Number.MIN_SAFE_INTEGER / PRECISION;
// 汉字的数字
const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
// 基本单位
const cnIntRadice = ['', '拾', '佰', '仟'];
// 对应整数部分扩展单位
const cnIntUnits = ['', '万', '亿', '兆'];
// 对应小数部分单位
const cnDecUnits = ['角', '分', '毫', '厘'];
// 整型完以后的单位
const cnIntLast = '元';
/** 预编译的正则表达式 */
const REGEX = {
    GROUP: /(\d)(?=(\d{3})+\b)/g,
    GROUP_CNY: /(\d)(?=(\d{4})+\b)/g,
};
/** 中文数字常量 */
const CN_NUMS = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
const CN_INT_RADICE = ['', '拾', '佰', '仟'];
const CN_INT_UNITS = ['', '万', '亿', '兆'];
const CN_DEC_UNITS = ['角', '分', '毫', '厘'];
const CN_INT_LAST = '元';
/** 货币错误类型 */
var CNYCurrencyError;
(function (CNYCurrencyError) {
    CNYCurrencyError["INVALID_INPUT"] = "INVALID_INPUT";
    CNYCurrencyError["OVERFLOW"] = "OVERFLOW";
    CNYCurrencyError["DIVISION_BY_ZERO"] = "DIVISION_BY_ZERO";
    CNYCurrencyError["INVALID_OPERATION"] = "INVALID_OPERATION";
})(CNYCurrencyError || (exports.CNYCurrencyError = CNYCurrencyError = {}));
/**
 * 将值转换为数字，
 * - 仅限 cnycurrency.ts 这个文件专用，外部请不要使用
 * @param {number | string} paramValue 值
 * @return {{result: boolean, value: number}} 转换后的值
 *  - result === true 表示转换有效
 *  - result === false 表示转换失败
 */
function __toNumber(paramValue) {
    const r = {
        result: false,
        value: 0,
    };
    if (utils_1.utils.isNumber(paramValue)) {
        r.value = paramValue;
    }
    else {
        r.value = Number.parseFloat(paramValue);
    }
    r.result = !Number.isNaN(r.value);
    return r;
}
/**
 * 解析货币，只保留两位小数
 * 要求值的范围在[90071992547409.91,-90071992547409.91]，超过该值，则视为出错
 * @param {number|string} paramValue 传入的值，只支持字符串和数字
 * @return {{value: number, errFlag: boolean, errMsg: string}} 解析后的结果
 */
function Parse(paramValue) {
    const r = { value: 0, errFlag: false, errMsg: '' };
    if (utils_1.utils.isNumber(paramValue)) {
        if (paramValue > MAX_VALUE || paramValue < MIN_VALUE) {
            r.errFlag = true;
            r.errMsg = `${paramValue}超出有效范围[${MIN_VALUE},${MAX_VALUE}]`;
            return r;
        }
        r.value = Math.round(paramValue * PRECISION);
    }
    else if (utils_1.utils.isString(paramValue)) {
        const p = paramValue.replace(/,/g, '');
        r.value = Number.parseFloat(p);
        if (Number.isNaN(r.value)) {
            r.errFlag = true;
            r.errMsg = `${paramValue}不是有效的数字！`;
            return r;
        }
        else if (r.value > MAX_VALUE || r.value < MIN_VALUE) {
            r.errFlag = true;
            r.errMsg = `${paramValue}超出有效范围[${MIN_VALUE},${MAX_VALUE}]`;
            return r;
        }
        r.value = Math.round(r.value * PRECISION);
    }
    else if (utils_1.utils.isNull(paramValue)) {
        r.value = 0;
    }
    else {
        r.value = 0;
        r.errFlag = true;
        r.errMsg = `${paramValue}不是数字(number)或字符串类型(string)`;
    }
    return r;
}
/**
 * 人民币货币类
 * - 支持精确到分的货币计算
 * - 支持中文大写转换
 * - 支持格式化输出
 */
class CNYCurrency {
    /**
     * 构造函数
     * @param value 初始值
     */
    constructor(value = 0) {
        this._intValue = 0;
        this.assign(value);
    }
    /**
     * 判断是否为 CNYCurrency 实例
     */
    static isCurrency(value) {
        return value instanceof CNYCurrency;
    }
    /**
     * 将值转换为数字
     * @param value 输入值
     */
    static toNumber(value) {
        let num;
        if (typeof value === 'number') {
            num = value;
        }
        else {
            num = Number.parseFloat(value);
            if (Number.isNaN(num)) {
                return {
                    value: 0,
                    error: {
                        type: CNYCurrencyError.INVALID_INPUT,
                        message: 'Invalid number format',
                        value,
                    },
                };
            }
        }
        if (num > CNYCurrency.MAX_VALUE || num < CNYCurrency.MIN_VALUE) {
            return {
                value: 0,
                error: {
                    type: CNYCurrencyError.OVERFLOW,
                    message: 'Value out of range',
                    value: num,
                },
            };
        }
        return { value: num };
    }
    /**
     * 解析货币值
     * @param value 输入值
     */
    static parse(value) {
        const result = CNYCurrency.toNumber(value);
        if (result.error) {
            return result;
        }
        const intValue = Math.round(result.value * CNYCurrency.PRECISION);
        return { value: intValue };
    }
    /**
     * 获取货币值
     */
    get value() {
        return this._intValue / CNYCurrency.PRECISION;
    }
    /**
     * 赋值
     * @param value 新值
     */
    assign(value) {
        if (CNYCurrency.isCurrency(value)) {
            this._intValue = value._intValue;
            this.error = value.error;
        }
        else {
            const result = CNYCurrency.parse(value);
            this._intValue = result.value;
            this.error = result.error;
        }
        return this;
    }
    /**
     * 获取整数值（分）
     */
    get intValue() {
        return this._intValue;
    }
    /**
     * 是否有错误
     */
    get hasError() {
        return this.error !== undefined;
    }
    /**
     * 获取错误信息
     */
    get errorInfo() {
        return this.error;
    }
    /**
     * 重置为0
     */
    reset() {
        this._intValue = 0;
        this.error = undefined;
    }
    /**
     * 加法
     * @param value 加数
     */
    add(value) {
        if (this.hasError) {
            return this;
        }
        const other = CNYCurrency.isCurrency(value) ? value : new CNYCurrency(value);
        if (other.hasError) {
            this.error = other.error;
            return this;
        }
        const result = this._intValue + other._intValue;
        if (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER) {
            this.error = {
                type: CNYCurrencyError.OVERFLOW,
                message: 'Addition result out of range',
            };
            return this;
        }
        this._intValue = result;
        return this;
    }
    /**
     * 自增
     * @param value 加数
     */
    selfAdd(value) {
        return this.add(value);
    }
    /**
     * 减法
     * @param value 减数
     */
    sub(value) {
        if (this.hasError) {
            return this;
        }
        const other = CNYCurrency.isCurrency(value) ? value : new CNYCurrency(value);
        if (other.hasError) {
            this.error = other.error;
            return this;
        }
        const result = this._intValue - other._intValue;
        if (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER) {
            this.error = {
                type: CNYCurrencyError.OVERFLOW,
                message: 'Subtraction result out of range',
            };
            return this;
        }
        this._intValue = result;
        return this;
    }
    /**
     * 自减
     * @param value 减数
     */
    selfSub(value) {
        return this.sub(value);
    }
    /**
     * 乘法
     * @param value 乘数
     */
    mul(value) {
        if (this.hasError) {
            return this;
        }
        const result = CNYCurrency.toNumber(value);
        if (result.error) {
            this.error = result.error;
            return this;
        }
        const product = this._intValue * result.value;
        if (product > Number.MAX_SAFE_INTEGER || product < Number.MIN_SAFE_INTEGER) {
            this.error = {
                type: CNYCurrencyError.OVERFLOW,
                message: 'Multiplication result out of range',
            };
            return this;
        }
        this._intValue = Math.round(product / CNYCurrency.PRECISION);
        return this;
    }
    /**
     * 自乘
     * @param value 乘数
     */
    selfMul(value) {
        return this.mul(value);
    }
    /**
     * 除法
     * @param value 除数
     */
    div(value) {
        if (this.hasError) {
            return this;
        }
        const result = CNYCurrency.toNumber(value);
        if (result.error) {
            this.error = result.error;
            return this;
        }
        if (result.value === 0) {
            this.error = {
                type: CNYCurrencyError.DIVISION_BY_ZERO,
                message: 'Division by zero',
            };
            return this;
        }
        const quotient = (this._intValue * CNYCurrency.PRECISION) / result.value;
        if (quotient > Number.MAX_SAFE_INTEGER || quotient < Number.MIN_SAFE_INTEGER) {
            this.error = {
                type: CNYCurrencyError.OVERFLOW,
                message: 'Division result out of range',
            };
            return this;
        }
        this._intValue = Math.round(quotient);
        return this;
    }
    /**
     * 自除
     * @param value 除数
     */
    selfDiv(value) {
        return this.div(value);
    }
    /**
     * 获取元部分
     */
    get yuan() {
        return Math.floor(this._intValue / CNYCurrency.PRECISION);
    }
    /**
     * 获取分部分
     */
    get cent() {
        return this._intValue % CNYCurrency.PRECISION;
    }
    /**
     * 转换为字符串
     */
    toString() {
        return this.format();
    }
    /**
     * 转换为中文大写
     * @param options 格式化选项
     */
    toChinese(options = {}) {
        if (this.hasError) {
            return '';
        }
        const { prefix = '人民币', negative = '负', zheng = '整', } = options;
        let result = '';
        const value = Math.abs(this.value);
        const integer = Math.floor(value);
        const decimal = Math.round((value - integer) * CNYCurrency.PRECISION);
        // 处理整数部分
        if (integer > 0) {
            let integerStr = integer.toString();
            let unitIndex = 0;
            let zeroCount = 0;
            for (let i = integerStr.length - 1; i >= 0; i--) {
                const digit = parseInt(integerStr[i], 10);
                const position = (integerStr.length - 1 - i) % 4;
                if (digit === 0) {
                    zeroCount++;
                }
                else {
                    if (zeroCount > 0) {
                        result = CN_NUMS[0] + result;
                        zeroCount = 0;
                    }
                    result = CN_NUMS[digit] + CN_INT_RADICE[position] + result;
                }
                if (position === 0 && i > 0) {
                    result = CN_INT_UNITS[unitIndex] + result;
                    unitIndex++;
                }
            }
            result += CN_INT_LAST;
        }
        // 处理小数部分
        if (decimal > 0) {
            let decimalStr = decimal.toString().padStart(2, '0');
            for (let i = 0; i < decimalStr.length; i++) {
                const digit = parseInt(decimalStr[i], 10);
                if (digit > 0) {
                    result += CN_NUMS[digit] + CN_DEC_UNITS[i];
                }
            }
        }
        else if (integer > 0) {
            result += zheng;
        }
        // 添加前缀和负号
        if (this.value < 0) {
            result = negative + result;
        }
        if (prefix) {
            result = prefix + result;
        }
        return result;
    }
    /**
     * 格式化输出
     * @param useSymbol 是否使用货币符号
     * @param cnySplit 是否使用中文分隔
     * @param hasSplit 是否使用千位分隔符
     */
    format(useSymbol = false, cnySplit = false, hasSplit = true) {
        if (this.hasError) {
            return '';
        }
        const value = this.value;
        const isNegative = value < 0;
        const absValue = Math.abs(value);
        const integer = Math.floor(absValue);
        const decimal = Math.round((absValue - integer) * CNYCurrency.PRECISION);
        let result = '';
        if (useSymbol) {
            result += '¥';
        }
        if (isNegative) {
            result += '-';
        }
        let integerStr = integer.toString();
        if (hasSplit) {
            integerStr = integerStr.replace(cnySplit ? REGEX.GROUP_CNY : REGEX.GROUP, '$1,');
        }
        result += integerStr;
        if (decimal > 0) {
            result += `.${decimal.toString().padStart(2, '0')}`;
        }
        return result;
    }
    /**
     * 转换为JSON
     */
    toJSON() {
        return this.value;
    }
}
exports.CNYCurrency = CNYCurrency;
CNYCurrency.PRECISION = PRECISION;
CNYCurrency.MAX_VALUE = MAX_VALUE;
CNYCurrency.MIN_VALUE = MIN_VALUE;
exports.default = CNYCurrency;
