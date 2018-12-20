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

/**
 * 日期时间的常量
 */
const DatetimeConstant = {
	/** 最小的UTC时间 */
	MIN_UTC    : 1,
	/** 最大的UTC时间 */
	MAX_UTC    : 253370736000000,
	/** 无效的UTC时间 */
	INVALID_UTC: 0,
	/** 每天最大的毫少数 */
	MILLIS_PRE_DAY:86400000,

};

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
 * @class datetimeUtils
 */
class datetimeUtils {
    /**
     * 取版本号
     * @return {string} 版本字符串
     */
    static version() {
        return 'datetimeUtils 1.2.0';
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
     * @memberOf datetimeUtils
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
     * @memberof datetimeUtils
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
     * @memberOf datetimeUtils
     */
    static nowDateString(millsFlag = true) {
        return this.dateString(new Date(), millsFlag);
	}

	 /**
     * 判断是否是有效的时间戳
     * @param {Number} paramUTC
     * @return {boolean} 判断结果
     * - true 表示有效
     * - false 表示无效
     */
    static isValidUTC(paramUTC) {
        if(Number.isSafeInteger(paramUTC) && paramUTC >= DatetimeConstant.MIN_UTC && paramUTC <= DatetimeConstant.MAX_UTC) {
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
     * @param {Number} paramUTC 要转的日期对象
     * @param {boolean} [millsFlag=true] 是否带毫秒数
     * @param {String} [daysplit='-'] 日期分隔符
     * @param {String} [timesplit=':'] 时间分隔符
     * @param {String} [millissplit='.'] 毫秒分隔符
     * @param {String} [datetimesplit=' '] 日期和时间的分隔符
     * @return {String} 转换后的字符串, 如果是无效时间戳，则返回null
     *
     * @memberOf datetimeUtils
     */
    static dateStringByUTC(paramUTC, millisFlag = true, daysplit = '-', timesplit = ':', millissplit = '.', datetimesplit = ' ') {
        if(!this.isValidUTC(paramUTC)) {
            return null;
        }
        return this.dateString(new Date(paramUTC), millisFlag, daysplit, timesplit, millissplit, datetimesplit);
	}
    /**
     * 将指定日期的时间,转换为年月日-时分秒的字符串
     * 格式为YYYY-MM-DD HH:mm:ss.ddd
     *
     * @static
     * @param {Number} paramLocalTime 要转的日期对象
     * @param {boolean} [millsFlag=true] 是否带毫秒数
     * @param {String} [daysplit='-'] 日期分隔符
     * @param {String} [timesplit=':'] 时间分隔符
     * @param {String} [millissplit='.'] 毫秒分隔符
     * @param {String} [datetimesplit=' '] 日期和时间的分隔符
     * @return {String} 转换后的字符串, 如果是无效时间戳，则返回null
     *
     * @memberOf datetimeUtils
     */
	static dateStringByMillis(paramLocalTime, millisFlag = true, daysplit = '-', timesplit = ':', millissplit = '.', datetimesplit = ' ') {
		return this.dateStringByUTC(this.ToUTCTime(paramLocalTime), millisFlag, daysplit, timesplit, millissplit, datetimesplit);
	}
    /**
     * 将yyyy-mm-dd hh:mm:ss的时间日期字符串，转换为utc时间戳，单位毫秒数
     * @param {string} paramDateTimeString 要解析的时间字符串
     * @return {number} 返回结果， 0 表示失败，无效时间
     */
    static DateTimeStringToUTC(paramDateTimeString) {
        let d = new Date(paramDateTimeString);
        let r = d.getTime();
        if(!this.isValidUTC(r)) {
            return DatetimeConstant.INVALID_UTC;
        }
        else {
            return r;
        }
	}
	/**
	 * 将UTC时间转换为本地时间
	 * @param {Number} paramUTC
	 * @return {Number}
	 */
	static ToLocalTime(paramUTC) {
		return paramUTC - TimeZoneMillis;
	}
	/**
	 * 将本地时间转换为UTC时间
	 * @param {Number} paramLocalTime
	 * @return {Number}
	 */
	static ToUTCTime(paramLocalTime) {
		return paramLocalTime + TimeZoneMillis;
	}
	/**
	 * 取当天0点时间的UTC时间
	 * @param {Number} paramUTC 当前的UTC时间，单位毫秒
	 * @return {Number}
	 */
	static getTodayZeroTime(paramUTC) {
		let localTime = this.ToLocalTime(paramUTC);
		return this.ToUTCTime(localTime - localTime % DatetimeConstant.MILLIS_PRE_DAY);
	}
	/**
	 * 判断是不是同一天
	 * @param {Number} paramUTC1
	 * @param {Number} paramUTC2
	 * @return {boolean}
	 */
	static isSameDay(paramUTC1, paramUTC2) {
		let t1 = this.getTodayZeroTime(paramUTC1);
		let t2 = this.getTodayZeroTime(paramUTC2);
		return t1 === t2;
	}

	// /**
	//  * 取本地时间相关的天数
	//  * @param {*} paramDate1
	//  * @param {*} paramDate2
	//  */
	// static diffLocalDays(paramDate1, paramDate2) {

	// }
}

exports = module.exports = {
	datetimeUtils,
	DatetimeConstant,
};

//exports.datetimeUtils = datetimeUtils;
