
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
    /** 构造函数 */
    constructor(paramValue) {
        if(typeof paramValue === 'CNYCurrency') {
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
    /** 货币值 */
    get value() {
        return this.m_IntValue / Precision;
    }
    /** 货币整数值，精确到分 */
    get intValue() {
        return this.m_IntValue;
    }
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
     * @param {number | string | CNYCurrency} paramNumber 值
     * @return {CNYCurrency} 返回计算后的Currency对象
     */
    mul(paramNumber) {
        let r = new CNYCurrency(paramNumber);
        if(!r.isErr && !this.isErr) {
            r.m_IntValue = Math.round(this.value * r.value * Precision);
        }
        return r;
    }
    /**
     * 自乘一个值
     * @param {number | string | CNYCurrency} paramNumber 值
     * @return {CNYCurrency} 返回计算后的Currency对象
     */
    selfMul(paramNumber) {
        let r = new CNYCurrency(paramNumber);
        if(!r.isErr && !this.isErr) {
            this.m_IntValue = Math.round(this.value * r.value * Precision);
        }
        return this;
    }
    /**
     * 除以一个值
     * @param {number | string | CNYCurrency} paramNumber 值
     * @return {CNYCurrency} 返回计算后的Currency对象
     */
    div(paramNumber) {
        let r = new CNYCurrency(paramNumber);
        if(!r.isErr && !this.isErr) {
            if(r.m_IntValue === 0) {
                r.m_ErrFlag = true;
                r.m_ErrMsg = `${paramNumber} => ${r.value} is zero!`;
            }
            else {
                r.m_IntValue = Math.round(this.value / r.value * Precision);
            }
        }
        return r;
    }
    /**
     * 自除以一个值
     * @param {number | string | CNYCurrency} paramNumber 值
     * @return {CNYCurrency} 返回计算后的Currency对象
     */
    selfDiv(paramNumber) {
        let r = new CNYCurrency(paramNumber);
        if(!r.isErr && !this.isErr) {
            if(r.m_IntValue === 0) {
                r.m_ErrFlag = true;
                r.m_ErrMsg = `${paramNumber} => ${r.value} is zero!`;
            }
            else {
                this.m_IntValue = Math.round(this.value / r.value * Precision);
            }
        }
        return this;
    }
    /**
     * 货币的整数部分
     * @return {number} 返回整数
     */
    get yuan() {
        return ~~this.value;
    }
    /**
     * 货币的小数部分，单位为分
     */
    get cent() {
        return this.m_IntValue % Precision;
    }
    /**
     * 生成字符串
     */
    toString() {
        return this.value.toFixed(2);
    }
    /**
     * 生成中文大写数字
     * @return {string} 中文大写结果
     */
    Chinese() {
        let negative = '';
        if(this.intValue < 0) {
            negative = '负';
        }
        let n = Math.abs(this.value).toFixed(2);;
        let unit = "仟佰拾京仟佰拾兆仟佰拾亿仟佰拾万仟佰拾元角分";
        let str = "";

        n += "00";

        let p = n.indexOf('.');
        if (p >= 0) {
            n = n.substring(0, p) + n.substr(p+1, 2);
        }

        unit = unit.substr(unit.length - n.length);

        for (var i=0; i < n.length; i++) {
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        }
        return negative + str.replace(/零(仟|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
    }
    /**
     * 格式化输出
     * @param {boolean} paramUseSymbol 是否带有"￥"符号
     * @param {*} paramCNYsplit 是否以中文四数字一组
     * @return {string} 生成后的字符串
     */
    format(paramUseSymbol = false, paramCNYsplit = false) {
        let values = Math.abs(this.value);
        values = values.toFixed(2).split('.');
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
        return `${strSymbol}${negative}${yuan}.${cent}`;
    }

    toJSON() {
        return this.value;
    }
}

exports.CNYCurrency = CNYCurrency;

