// const _ = require("lodash");
let {utils} = require('./utils');
/** 货币精度 */
const Precision = 100;
/** 三数一组 正则 */
let groupReg = /(\d)(?=(\d{3})+\b)/g;
/** 四数一组 正则 */
let groupCNYReg = /(\d)(?=(\d{4})+\b)/g;
/** 最大值 */
let MAX_VALUE = Number.MAX_SAFE_INTEGER / Precision;
/** 最小值 */
let MIN_VALUE = Number.MIN_SAFE_INTEGER / Precision;

//汉字的数字
let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
//基本单位
let cnIntRadice =['', '拾', '佰', '仟'];
//对应整数部分扩展单位
let cnIntUnits = ['', '万', '亿', '兆'];
//对应小数部分单位
let cnDecUnits = ['角', '分', '毫', '厘'];
//整型完以后的单位
let cnIntLast = '元';

/**
 * 将值转换为数字，
 * - 仅限cnycurrency这个文件专用，外部请不要使用
 * @param {number | string} paramValue 值
 * @return {{result: boolean, value: number}} 转换后的值
 *  - result === true 表示转换有效
 *  - result === false 表示转换失败
 */
function __toNumber(paramValue) {
    let r = {
        result: false,
        value: 0
    }
    if(utils.isNumber(paramValue)) {
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
    let r = { value: 0,  errFlag: false, errMsg: ''};
    if (typeof paramValue === 'number') {
        if(paramValue > MAX_VALUE || paramValue < MIN_VALUE) {
            r.errFlag = true;
            r.errMsg = `${paramValue}超出有效范围[${MIN_VALUE},${MAX_VALUE}]`;
            return r;
        }
        r.value = Math.round(paramValue * Precision);
    }
    else if(typeof paramValue === 'string') {
        r.value = Number.parseFloat(paramValue);
        if(Number.isNaN(r.value)) {
            r.errFlag = true;
            r.errMsg  = `${paramValue}不是有效的数字！`;
            return r;
        } else if (r.value > MAX_VALUE || r.value < MIN_VALUE) {
            r.errFlag = true;
            r.errMsg  = `${paramValue}超出有效范围[${MIN_VALUE},${MAX_VALUE}]`;
            return r;
        }
        r.value = Math.round(r.value * Precision);
    }
    else if(paramValue === undefined || paramValue === null) {
        r.value = 0;
    }
    else {
        r.value   = 0;
        r.errFlag = true;
        r.errMsg  = `${paramValue}不是数字(number)或字符串类型(string)`;
    }
    return r;
}

/**
 * 货币类
 * 一个专门用于中文货币运算的的类，解决货币运算过程中问题
 * @maxvalue 90071992547409.91
 * @minvalue -90071992547409.91
 * @example
 * let m = [];
 * let c = new CNYCurrency(-12345);
 * m.push(c);
 * m.push(c.add(109999));
 * m.push(c.sub(10));
 * m.push(c.div(0.01));
 * m.push(c.mul(10));
 * m.push(c.mul(0.01));
 *
 * let tt = new CNYCurrency(0);
 * tt.selfAdd(2805307.04);
 * tt.selfAdd(4323515.28);
 * tt.selfAdd(2805307.04);
 * tt.selfAdd(3281107.13);
 * m.push(tt);
 *
 * for(let mm of m) {
 *      console.log(mm.value, mm.intValue, mm.toString(), mm.format(true, true), mm.Chinese());
 * }
 *
 * //输出结果
 * //-12345 -1234500 -12345.00 ￥-1,2345.00 负壹万贰仟叁佰肆拾伍元整
 * //97654 9765400 97654.00 ￥9,7654.00 玖万柒仟陆佰伍拾肆元整
 * //-12355 -1235500 -12355.00 ￥-1,2355.00 负壹万贰仟叁佰伍拾伍元整
 * //-1234500 -123450000 -1234500.00 ￥-123,4500.00 负壹佰贰拾叁万肆仟伍佰元整
 * //-123450 -12345000 -123450.00 ￥-12,3450.00 负拾贰万叁仟肆佰伍拾元整
 * //-123.45 -12345 -123.45 ￥-123.45 负壹佰贰拾叁元肆角伍分
 * //13215236.49 1321523649 13215236.49 ￥1321,5236.49 壹仟叁佰贰拾壹万伍仟贰佰叁拾陆元肆角玖分
 */
class CNYCurrency {
    /**
     * 构造函数
     * @param {number | string | CNYCurrency} paramValue 初始值
     */
    constructor(paramValue = 0) {
        if(CNYCurrency.isCurrency(paramValue)) {
            this.m_IntValue = paramValue.m_IntValue;
            this.m_ErrFlag  = paramValue.m_ErrFlag;
            this.m_ErrMsg   = paramValue.m_ErrMsg;
        }
        else {
            let v = Parse(paramValue);
            if(v.errFlag) {
                this.m_IntValue = 0;
                this.m_ErrFlag  = true;
                this.m_ErrMsg   = v.errMsg;
            }
            else {
                this.m_IntValue = v.value;
                this.m_ErrFlag  = v.errFlag;
                this.m_ErrMsg   = '';
            }
        }
    }
    /** 判断指定的对象，是不是指定的CNYCurrency对象 */
    static isCurrency(paramV) {
        return paramV instanceof CNYCurrency;
    }

    /** 货币值 */
    get value() {
        return this.m_IntValue / Precision;
    }
    /**
     * 赋值
     * @param {number | string | CNYCurrency} paramValue 新值
     * @return {CNYCurrency} 返回当前对象
     */
    assign(paramValue = 0) {
        if(CNYCurrency.isCurrency(paramValue)) {
            this.m_IntValue = paramValue.m_IntValue;
            this.m_ErrFlag  = paramValue.m_ErrFlag;
            this.m_ErrMsg   = paramValue.m_ErrMsg;
        }
        else {
            let v = Parse(paramValue);
            if(v.errFlag) {
                this.m_IntValue = 0;
                this.m_ErrFlag  = true;
                this.m_ErrMsg   = v.errMsg;
            }
            else {
                this.m_IntValue = v.value;
                this.m_ErrFlag  = v.errFlag;
                this.m_ErrMsg   = '';
            }
        }
        return this;
    }
    /** 货币整数值，精确到分 */
    get intValue() {
        return this.m_IntValue;
    }

    // set intValue(paramValue) {
    //     this.m_IntValue = paramValue;
    // }
    /** 是否有错 */
    get isErr() {
        return this.m_ErrFlag;
    }
    /** 错误信息 */
    get errMsg() {
        return this.m_ErrMsg;
    }
    /** 重置为0 */
    Reset() {
        this.m_ErrFlag  = false;
        this.m_ErrMsg   = '';
        this.m_IntValue = 0;
    }
    /**
     * 加一个值
     * @param {number | string | CNYCurrency} paramNumber 值
     * @return {CNYCurrency} 返回计算后的Currency对象
     */
    add(paramNumber) {
        let r = new CNYCurrency(paramNumber);
        if (!r.isErr && !this.isErr) {
            r.m_IntValue = this.m_IntValue + r.m_IntValue;
        }
        return r;
    }
    /**
     * 自加一个值
     * @param {number | string | CNYCurrency} paramNumber 值
     * @return {CNYCurrency} 返回自己
     */
    selfAdd(paramNumber) {
        let r = new CNYCurrency(paramNumber);
        if (!r.isErr && !this.isErr) {
            this.m_IntValue = this.m_IntValue + r.m_IntValue;
        }
        return this;
    }
    /**
     * 减一个值
     * @param {number | string | CNYCurrency} paramNumber 值
     * @return {CNYCurrency} 返回计算后的Currency对象
     */
    sub(paramNumber) {
        let r = new CNYCurrency(paramNumber);
        if (!r.isErr && !this.isErr) {
            r.m_IntValue = this.m_IntValue - r.m_IntValue;
        }
        return r;
    }
    /**
     * 自减一个值
     * @param {number | string | CNYCurrency} paramNumber 值
     * @return {CNYCurrency} 返回计算后的Currency对象
     */
    selfSub(paramNumber) {
        let r = new CNYCurrency(paramNumber);
        if (!r.isErr && !this.isErr) {
            this.m_IntValue = this.m_IntValue - r.m_IntValue;
        }
        return this;
    }
    /**
     * 乘一个值
     * @param {number | string} paramNumber 值
     * @return {CNYCurrency} 返回计算后的Currency对象
     */
    mul(paramNumber) {
        let r = new CNYCurrency();
        let v = __toNumber(paramNumber);
        if(v.result) {
            r.assign(this.value * v.value);
        }
        else {
            r.m_errMsg = `${paramNumber} is invalid number`;
            r.m_ErrFlag = true;
        }
        return r;
    }
    /**
     * 自乘一个值
     * @param {number | string} paramNumber 值
     * @return {boolean} 计算结果
     *  - true 表示计算成功
     *  - false 表示计算失败
     */
    selfMul(paramNumber) {
        let v = __toNumber(paramNumber);
        if(!v.result) {
            return false;
        }
        let r = new CNYCurrency(v.value * this.value);
        if(r.isErr) {
            return false;
        }
        else {
            this.assign(r);
            return true;
        }
    }
    /**
     * 除以一个值
     * @param {number | string} paramNumber 值
     * @return {CNYCurrency} 返回计算后的Currency对象
     */
    div(paramNumber) {
        let r = new CNYCurrency();
        let v = __toNumber(paramNumber);

        if(v.result) {
            if(v.value === 0) {
                r.m_errMsg = `${paramNumber} is zero!;`;
                r.m_ErrFlag = true;

            } else {
                r.assign(this.value / v.value);
            }
        }
        else {
            r.m_errMsg = `${paramNumber} is invalid number.`;
            r.m_ErrFlag = true;
        }
        return r;
    }
    /**
     * 自除以一个值
     * @param {number | string} paramNumber 值
     * @return {boolean} 计算结果
     *  - true 表示计算成功
     *  - false 表示计算失败
     */
    selfDiv(paramNumber) {
        let v = __toNumber(paramNumber);
        if(!v.result) {
            return false;
        }
        if(v.value === 0) {
            return false;
        }
        let r = new CNYCurrency(this.value / v.value);
        if(r.isErr) {
            return false;
        }
        else {
            this.assign(r);
            return true;
        }
    }
    /**
     * 货币的整数部分
     * @return {number} 返回整数
     */
    get yuan() {
        // return ~~this.value;
        let n = this.m_IntValue;
        return (n - n % Precision)/Precision;
    }
    /**
     * 货币的小数部分，单位为分
     */
    get cent() {
        let c = this.m_IntValue % Precision ;
        if (c < 0) c = -c;
        return c;
    }
    /**
     * 生成字符串
     */
    toString() {
        return this.value.toFixed(2);
    }

    /**
     * 生成中文大写数字
     * - 引用来源：https://www.jb51.net/article/89661.htm
     * - 增加在元后，角为0的情况增加0，如0.01为零元零角
     * - 选项prefix:表示自定义人民币前缀，没有默认为“人民币”
     * - 选项negative:表示自定义负数前缀，没有默认为“负”
     * - 选项zheng：表示自定义整后缀，没有默认为“整”，有些情况可能需要“正”, 使用的时候请注意选项
     * @param {{prefix?: string, negative?:string, zheng?: string}} paramOpts 如果是负数时，前面的前缀
     * @return {string} 中文大写结果
     */
    Chinese(paramOpts = null) {
        let stPrefix = '人民币';
        let stNegative = '负';
        let stZheng = '整';

        if (utils.isObject(paramOpts)) {
            // 人民币前缀
            if (utils.isString(paramOpts.prefix)) {
                stPrefix = paramOpts.prefix;
            }
            // 负数前缀
            if (utils.isString(paramOpts.negative)) {
                stNegative = paramOpts.negative;
            }
            // 整或正字
            if (utils.isString(paramOpts.zheng)) {
                stZheng = paramOpts.zheng;
            }
        }
        //paramPrefix = '人民币', paramNegative = '负') {

        //输出的中文金额字符串
        let chineseStr = '';
        // 负数时前缀
        let negative = '';
        let intValue = this.intValue;
        if(intValue < 0) {
            negative = stNegative;// '负';
        }

        let yuan = this.yuan;  // 元
        if (yuan < 0) yuan = -yuan;
        let cent = this.cent;  // 分

        //金额整数部分
        let integerNum = yuan.toString();
        //金额小数部分
        let decimalNum = cent.toString().padStart(2, '0');
        // if(cent === 0) {
        //     decimalNum = '';
        // }

        if (this.intValue === 0) {
            // 如果金额为0
            chineseStr = [stPrefix, cnNums[0], cnIntLast, stZheng].join('');
            return chineseStr;
        }

        if (yuan === 0 && cent < 10) {
            // 如果只存在分的情况 就是零元零角几分
            // chineseStr = [paramPrefix, negative, cnNums[0], cnIntLast, cnNums[0], cnDecUnits[0],cnNums[cent],cnDecUnits[1]].join('');
            chineseStr = [stPrefix, negative, cnNums[cent],cnDecUnits[1]].join('');
            return chineseStr;
        }
        //获取整型部分转换
        if (yuan > 0) {
            let zeroCount = 0;
            let IntLen = integerNum.length;
            for (let i = 0; i < IntLen; i++) {
                let n = integerNum.substr(i, 1);
                let p = IntLen - i - 1;
                let q = p / 4;
                let m = p % 4;
                if (n == '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        chineseStr += cnNums[0];
                    }
                    //归零
                    zeroCount = 0;
                    chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q];
                }
            }
            chineseStr += cnIntLast;
        }else if(yuan === 0 && cent > 0) {
            // chineseStr = cnNums[0] + cnIntLast;
        }

        //小数部分
        if (cent > 0) {
            let decLen = decimalNum.length;
            for (let i = 0; i < decLen; i++) {
                let n = decimalNum.substr(i, 1);
                if (n !== '0') {
                    chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                } else {
                    if (i === 0) {
                        chineseStr += cnNums[0];
                    }
                }
            }
        }
        if ((cent % 10) === 0) {
            // 当分为0的时候，有整
            chineseStr += stZheng;
        }
        return stPrefix + negative + chineseStr;
    }
    /**
     * 格式化输出
     * @param {boolean} paramUseSymbol 是否带有"￥"符号
     * @param {*} paramCNYsplit 是否以中文四数字一组
     * @return {string} 生成后的字符串
     */
    format(paramUseSymbol = false, paramCNYsplit = false) {
        let value = Math.abs(this.value);
        let values = value.toFixed(2).split('.');
        let yuan = values[0];
        let cent = values[1];

        if (paramCNYsplit) {
            yuan = yuan.replace(groupCNYReg,  '$1,')
        } else {
            yuan = yuan.replace(groupReg,  '$1,')
        }
        let negative = '';
        if(this.m_IntValue < 0) {
            negative = '-';
        }
        let strSymbol = '';
        if (paramUseSymbol) {
            strSymbol = '￥';
        }
        return [strSymbol, negative, yuan, '.', cent].join('');// `${strSymbol}${negative}${yuan}.${cent}`;
    }

    toJSON() {
        return this.value;
    }
}

exports.CNYCurrency = CNYCurrency;
