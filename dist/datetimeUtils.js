"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datetimeUtils = void 0;
// 这里将提供日期相关的工具函数
const constant_1 = require("./constant");
const PadRadix = 10;
/**
 * 将整数生成字符串，不足2位补0
 * 仅在这个模块中使用，不对外使用
 * - 这个函数用js原生的函数替换了
 * @param n 要转换的整数
 * @return 转换后的字符串
 */
function pad2(n) {
    return n.toString(PadRadix).padStart(2, '0');
}
/**
 * 将整数生成字符串，不足3位补0
 * 仅在这个模块中使用，不对外使用
 * - 这个函数用js原生的函数替换了
 * @param n 要转换的整数
 * @return 转换后的字符串
 */
function pad3(n) {
    return n.toString(PadRadix).padStart(3, '0');
}
let TimeZoneMinute = new Date().getTimezoneOffset(); // 时区，单位，分
let TimeZoneSecond = TimeZoneMinute * constant_1.DatetimeConstant.SECOND_PRE_MINUTE; // 时区，单位，秒
let TimeZoneMillis = TimeZoneSecond * constant_1.DatetimeConstant.MILLIS_PRE_SECOND; // 时区，单位，毫秒数
/**
 * 更新时区信息
 */
function UpdateTimeZone() {
    TimeZoneMinute = new Date().getTimezoneOffset(); // 时区，单位，分
    TimeZoneSecond = TimeZoneMinute * constant_1.DatetimeConstant.SECOND_PRE_MINUTE; // 时区，单位，秒
    TimeZoneMillis = TimeZoneSecond * constant_1.DatetimeConstant.MILLIS_PRE_SECOND; // 时区，单位，毫秒数
}
/**
 * 日期相关的工具类
 *
 * @class datetimeUtils
 */
// tslint:disable-next-line: class-name
class datetimeUtils {
    /**
     * 取当前UTC时间戳,毫秒数
     * @return 当前UTC时间戳
     */
    static getNow() {
        return Date.now();
    }
    /**
     * 取当前本地时间戳
     * @return 当前本地时间戳
     */
    static getLocalNow() {
        return Date.now() - TimeZoneMillis;
    }
    /**
     * 取当前UTC时间戳,毫秒数
     * @see getNow()
     * @return 当前UTC时间戳
     */
    static getUTCNow() {
        return Date.now();
    }
    /**
     * 取当前UTC时间戳,秒数
     * @return 当前UTC时间戳
     */
    static getNowSecond() {
        return Math.floor(Date.now() / constant_1.DatetimeConstant.MILLIS_PRE_SECOND);
    }
    /**
     * 取当前UTC时间戳,秒数
     * @see getNowSecond() 两者结果一样
     * @return 当前UTC时间戳
     */
    static getUTCNowSecond() {
        return Math.floor(Date.now() / constant_1.DatetimeConstant.MILLIS_PRE_SECOND);
    }
    /**
     * 取当前本地时间戳，秒数
     * @return 当前本地时间戳
     */
    static getLocalNowSecond() {
        return this.getUTCNowSecond() - TimeZoneSecond;
    }
    /**
     * 取时区，单位分
     * @return 时区
     */
    static getTimeZoneMinute() {
        return TimeZoneMinute;
    }
    /**
     * 取时区，单位秒
     * @return 时区
     */
    static getTimeZoneSecond() {
        return TimeZoneSecond;
    }
    /**
     * 取时区，单位毫秒
     * @return 时区
     */
    static getTimeZoneMillis() {
        return TimeZoneMillis;
    }
    /**
     * 更新时区
     */
    static UpdateTimeZoneValue() {
        UpdateTimeZone();
    }
    /**
     * 将指定日期的对象,转换为年月日-时分秒的字符串
     * 格式为YYYY-MM-DD HH:mm:ss.ddd
     *
     * @static
     * @param paramDate 要转的日期对象
     * @param paramMillisFlag 是否带毫秒数
     * @param paramDaySplit 日期分隔符
     * @param paramTimeSplit 时间分隔符
     * @param paramMillisSplit 毫秒分隔符
     * @param paramDatetimeSplit 日期和时间的分隔符
     * @return 转换后的字符串
     *
     * @memberOf datetimeUtils
     */
    static dateString(paramDate, paramMillisFlag = true, paramDaySplit = '-', paramTimeSplit = ':', paramMillisSplit = '.', paramDatetimeSplit = ' ') {
        const d = paramDate;
        const dateString = [d.getFullYear(), pad2(d.getMonth() + 1), pad2(d.getDate())].join(paramDaySplit);
        const timeString = [pad2(d.getHours()), pad2(d.getMinutes()), pad2(d.getSeconds())].join(paramTimeSplit);
        if (paramMillisFlag) {
            return [dateString, paramDatetimeSplit, timeString, paramMillisSplit, pad3(d.getMilliseconds())].join('');
        }
        else {
            return [dateString, paramDatetimeSplit, timeString].join('');
        }
    }
    /**
     * 生成日期相关的字符串
     * @param paramDate 要转的日期对象
     * @param paramDaySplit 日期分隔符
     * @returns String 生成的日期字符串
     */
    static getDateString(paramDate, paramDaySplit = '-') {
        return [paramDate.getFullYear(), pad2(paramDate.getMonth() + 1), pad2(paramDate.getDate())].join(paramDaySplit);
    }
    /**
     * 生成时间相关的字符串
     * @param paramDate 要转的日期对象
     * @param paramTimeSplit 时间分隔符，默认为:
     * @param paramMillisFlag 是需要输出毫秒数，默认为true
     * @param paramMillisSplit 时间与毫秒的分隔符,默认为.
     * @return string 时间相关的字符串
     */
    static getTimeString(paramDate, paramTimeSplit = ':', paramMillisFlag = true, paramMillisSplit = '.') {
        const timeString = [pad2(paramDate.getHours()), pad2(paramDate.getMinutes()), pad2(paramDate.getSeconds())].join(paramTimeSplit);
        if (paramMillisFlag) {
            return [timeString, paramMillisSplit, pad3(paramDate.getMilliseconds())].join('');
        }
        else {
            return timeString;
        }
    }
    /**
     * 生成YYYYMMDD_HHmmssddd格式的时间字符串
     *
     * @static
     * @param paramDate 要生成日期
     * @param paramMillisFlag 是要否要毫秒
     * @return 生成的字符串
     *
     * @memberof datetimeUtils
     */
    static dateStringByFile(paramDate, paramMillisFlag = true) {
        const d = paramDate;
        const dateString = [
            d.getFullYear(),
            pad2(d.getMonth() + 1),
            pad2(d.getDate()),
            '_',
            pad2(d.getHours()),
            pad2(d.getMinutes()),
            pad2(d.getSeconds()),
            paramMillisFlag ? pad3(d.getMilliseconds()) : '',
        ].join('');
        return dateString;
    }
    /**
     * 将当前时间，转换为时间字符串
     *
     * @static
     * @param paramMillisFlag true 是否带毫秒数
     * @return
     *
     * @memberOf datetimeUtils
     */
    static nowDateString(paramMillisFlag = true) {
        return this.dateString(new Date(), paramMillisFlag);
    }
    /**
     * 判断是否是有效的时间戳
     * @param paramUTC
     * @return 判断结果
     * - true 表示有效
     * - false 表示无效
     */
    static isValidUTC(paramUTC) {
        if (Number.isSafeInteger(paramUTC) && paramUTC >= constant_1.DatetimeConstant.MIN_UTC && paramUTC <= constant_1.DatetimeConstant.MAX_UTC) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * 将指定日期的时间戳,转换为年月日-时分秒的字符串
     * 格式为YYYY-MM-DD HH:mm:ss.ddd
     *
     * @static
     * @param paramUTC 要转的日期对象
     * @param millsFlag 是否带毫秒数
     * @param paramDaySplit 日期分隔符
     * @param paramTimeSplit 时间分隔符
     * @param paramMillisSplt 毫秒分隔符
     * @param paramDatetimeSpli 日期和时间的分隔符
     * @return 转换后的字符串, 如果是无效时间戳，则返回null
     *
     * @memberOf datetimeUtils
     */
    static dateStringByUTC(paramUTC, paramMillisFlag = true, paramDaySplit = '-', paramTimeSplit = ':', paramMillisSplt = '.', paramDatetimeSplit = ' ') {
        if (!this.isValidUTC(paramUTC)) {
            return null;
        }
        return this.dateString(new Date(paramUTC), paramMillisFlag, paramDaySplit, paramTimeSplit, paramMillisSplt, paramDatetimeSplit);
    }
    /**
     * 将指定日期的时间,转换为年月日-时分秒的字符串
     * 格式为YYYY-MM-DD HH:mm:ss.ddd
     *
     * @static
     * @param paramLocalTime 要转的日期对象
     * @param millsFlag 是否带毫秒数
     * @param paramDaysSplit 日期分隔符
     * @param paramTimeSplit 时间分隔符
     * @param paramMillisSplit 毫秒分隔符
     * @param paramDatetimeSplit 日期和时间的分隔符
     * @return 转换后的字符串, 如果是无效时间戳，则返回null
     *
     * @memberOf datetimeUtils
     */
    static dateStringByMillis(paramLocalTime, paramMillisFlag = true, paramDaysSplit = '-', paramTimeSplit = ':', paramMillisSplit = '.', paramDatetimeSplit = ' ') {
        return this.dateStringByUTC(this.ToUTCTime(paramLocalTime), paramMillisFlag, paramDaysSplit, paramTimeSplit, paramMillisSplit, paramDatetimeSplit);
    }
    /**
     * 将yyyy-mm-dd hh:mm:ss的时间日期字符串，转换为utc时间戳，单位毫秒数
     * @param paramDateTimeString 要解析的时间字符串
     * @return 返回结果， 0 表示失败，无效时间
     */
    static DateTimeStringToUTC(paramDateTimeString) {
        const d = new Date(paramDateTimeString);
        const r = d.getTime();
        if (!this.isValidUTC(r)) {
            return constant_1.DatetimeConstant.INVALID_UTC;
        }
        else {
            return r;
        }
    }
    /**
     * 将UTC时间转换为本地时间
     * @param paramUTC
     * @return {Number}
     */
    static ToLocalTime(paramUTC) {
        return paramUTC - TimeZoneMillis;
    }
    /**
     * 将本地时间转换为UTC时间
     * @param paramLocalTime
     * @return {Number}
     */
    static ToUTCTime(paramLocalTime) {
        return paramLocalTime + TimeZoneMillis;
    }
    /**
     * 取当天0点时间的UTC时间
     * @param paramUTC 当前的UTC时间，单位毫秒
     * @return
     */
    static getTodayZeroTime(paramUTC) {
        const localTime = this.ToLocalTime(paramUTC);
        return this.ToUTCTime(localTime - (localTime % constant_1.DatetimeConstant.MILLIS_PRE_DAY));
    }
    /**
     * 判断是不是同一天
     * @param paramUTC1
     * @param paramUTC2
     * @return
     */
    static isSameDay(paramUTC1, paramUTC2) {
        const t1 = this.getTodayZeroTime(paramUTC1);
        const t2 = this.getTodayZeroTime(paramUTC2);
        return t1 === t2;
    }
    /**
     * 比较本地时间相关的天数差
     * @param paramUTC1 毫秒数
     * @param paramUTC2 毫秒数
     * @return 相差的天数，同一天，返回0
     */
    static diffLocalDays(paramUTC1, paramUTC2) {
        const t1 = this.CalcLocalDaysByUTC(paramUTC1);
        const t2 = this.CalcLocalDaysByUTC(paramUTC2);
        return t1 - t2;
    }
    /**
     * 比较两个日期本地时间的天数差
     * @see diffLocalDays 两者的区别是传入参数的类型不一样
     * @param paramDate1 日期1
     * @param paramDate2 日期2
     * @return 相差的天数，同一天，返回0
     */
    static diffLocalDaysByDate(paramDate1, paramDate2) {
        const t1 = this.CalcLocalDaysByUTC(paramDate1.getTime());
        const t2 = this.CalcLocalDaysByUTC(paramDate2.getTime());
        return t1 - t2;
    }
    /**
     * 计算，1970到指定时间戳的本地天数
     * @param paramUTC 指定日期的时间戳
     * @return 计算出来的本地天数
     */
    static CalcLocalDaysByUTC(paramUTC) {
        const localTime = this.ToLocalTime(paramUTC);
        return (localTime - (localTime % constant_1.DatetimeConstant.MILLIS_PRE_DAY)) / constant_1.DatetimeConstant.MILLIS_PRE_DAY;
    }
    /**
     * 计算，公元元年到指定时间戳的本地天数
     * - 与Mysql的to_days计算结果相同
     * @param paramUTC 指定日期的时间戳
     * @return 计算出来的本地天数
     */
    static CalcLocalDaysByUTCAtFirst(paramUTC) {
        return this.CalcLocalDaysByUTC(paramUTC) + constant_1.DatetimeConstant.DAYS_1970;
    }
    /**
     * 计算，1970到指定时间的本地天数
     * @param paramDate 指定的日期
     * @return 计算出来的本地天数
     */
    static CalcLocalDaysByDate(paramDate) {
        return this.CalcLocalDaysByUTC(paramDate.getTime());
    }
    /**
     * 计算，公元元年到指定时间的本地天数
     * - 与Mysql的to_days计算结果相同
     * @param paramDate 指定的日期
     * @return 计算出来的本地天数
     */
    static CalcLocalDaysByDateAtFirst(paramDate) {
        return this.CalcLocalDaysByUTCAtFirst(paramDate.getTime());
    }
}
exports.datetimeUtils = datetimeUtils;
