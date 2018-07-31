//这里将提供日期相关的工具函数
/**
 * 将整数生成字符串，不足2位补0
 * 仅在这个模块中使用，不对外使用
 * @param {Integer} n 要转换的整数
 * @return {String} 转换后的字符串
 */
function pad2(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
}
/**
 * 将整数生成字符串，不足3位补0
 * 仅在这个模块中使用，不对外使用
 * @param {Integer} n 要转换的整数
 * @return {String} 转换后的字符串
 */
function pad3(n) {
    let r = n.toString(10);
    if (n < 10) return '00' + r;
    else if (n < 100) return '0' + r;
    else return r;
}

let TimeZoneMinute = new Date().getTimezoneOffset();  //时区，单位，分
let TimeZoneSecond = TimeZoneMinute * 60;  //时区，单位，秒
let TimeZoneMillis = TimeZoneSecond * 1000;  //时区，单位，毫秒数

/**
 * 更新时区信息
 */
function UpdateTimeZone() {
    TimeZoneMinute = new Date().getTimezoneOffset();  //时区，单位，分
    TimeZoneSecond = TimeZoneMinute * 60;  //时区，单位，秒
    TimeZoneMillis = TimeZoneSecond * 1000;  //时区，单位，毫秒数
}

/**
 * 日期相关的工具类
 *
 * @class dateUtils
 */
class datetimeUtils {
    /**
     * 取版本号
     * @return {string} 版本字符串
     */
    static version() {
        return 'datetimeUtils 1.1';
    }
    /**
     * 取当前本地时间戳,毫秒数
     * @return {number} 当前本地时间戳
     */
    static getNow() {
        return Date.now();
    }
    /**
     * 取当前UTC时间戳,毫秒数
     * @return {number} 当前UTC时间戳
     */    
    static getUTCNow() {
        return Date.now() + TimeZoneMillis;
    }
    /**
     * 取当前本地时间戳,秒数
     * @return {number} 当前本地时间戳
     */
    static getNowSecond() {
        return Math.floor(Date.now()/1000);
    }
    /**
     * 取当前UTC时间戳,秒数
     * @return {number} 当前UTC时间戳
     */    
    static getUTCNowSecond() {
        return Math.floor((Date.now() + TimeZoneMillis)/1000);
    }
    /**
     * 取时区，单位分
     * @return {number} 时区
     */
    static getTimeZoneMinute() {
        return TimeZoneMinute;
    }
    /**
     * 取时区，单位秒
     * @return {number} 时区
     */
    static getTimeZoneSecond() {
        return TimeZoneSecond;
    }
    /**
     * 取时区，单位毫秒
     * @return {number} 时区
     */
    static getTimeZoneMillis() {
        return TimeZoneMillis;
    }
    /**
     * 更新时区
     * @return {void}
     */
    static UpdateTimeZoneValue() {
        UpdateTimeZone();
    }

    /**
     * 将指定日期的对象,转换为年月日-时分秒的字符串
     * 格式为YYYY-MM-DD HH:mm:ss.ddd
     *
     * @static
     * @param {Date} date 要转的日期对象
     * @param {boolean} [millsFlag=true] 是否带毫秒数
     * @param {String} [daysplit='-'] 日期分隔符
     * @param {String} [timesplit=':'] 时间分隔符
     * @param {String} [millissplit='.'] 毫秒分隔符
     * @param {String} [datetimesplit=' '] 日期和时间的分隔符
     * @return {String} 转换后的字符串
     *
     * @memberOf dateUtils
     */
    static dateString(date, millsFlag = true, daysplit = '-', timesplit = ':', millissplit = '.', datetimesplit = ' ') {
        let d = date;
        let dateString = [d.getFullYear(), pad2(d.getMonth() + 1), pad2(d.getDate())].join(daysplit);
        let timeString = [pad2(d.getHours()), pad2(d.getMinutes()), pad2(d.getSeconds())].join(timesplit);
        if (millsFlag) {
            return [dateString, datetimesplit, timeString, millissplit, pad3(d.getMilliseconds())].join('');
        }
        else {
            return [dateString, datetimesplit, timeString].join('');
        }
    }
    /**
     * 生成YYYYMMDD_HHmmssddd格式的时间字符串
     *
     * @static
     * @param {Date} date 要生成日期
     * @param {boolean} [millisFlag=true] 是要否要毫秒
     * @return {String} 生成的字符串
     *
     * @memberof dateUtils
     */
    static dateStringByFile(date, millisFlag = true) {
        let d = date;
        let dateString = [d.getFullYear(), pad2(d.getMonth()+1), pad2(d.getDate()),'_',
            pad2(d.getHours()), pad2(d.getMinutes()), pad2(d.getSeconds()), millisFlag ? pad3(d.getMilliseconds()):''
        ].join('');
        return dateString;
    }
    /**
     * 将当前时间，转换为时间字符串
     *
     * @static
     * @param {boolean} millsFlag true 是否带毫秒数
     * @returns
     *
     * @memberOf dateUtils
     */
    static nowDateString(millsFlag = true) {
        return this.dateString(new Date(), millsFlag);
    }
}

exports = module.exports = {
    datetimeUtils
};

//exports.datetimeUtils = datetimeUtils;