/**
 * 日期相关的工具类
 *
 * @class datetimeUtils
 */
export declare class datetimeUtils {
    /**
     * 取版本号
     * @deprecated
     * @return 版本字符串
     */
    static version(): string;
    /**
     * 取当前UTC时间戳,毫秒数
     * @return 当前UTC时间戳
     */
    static getNow(): number;
    /**
     * 取当前本地时间戳
     * @return 当前本地时间戳
     */
    static getLocalNow(): number;
    /**
     * 取当前UTC时间戳,毫秒数
     * @see getNow()
     * @return 当前UTC时间戳
     */
    static getUTCNow(): number;
    /**
     * 取当前UTC时间戳,秒数
     * @return 当前UTC时间戳
     */
    static getNowSecond(): number;
    /**
     * 取当前UTC时间戳,秒数
     * @see getNowSecond() 两者结果一样
     * @return 当前UTC时间戳
     */
    static getUTCNowSecond(): number;
    /**
     * 取当前本地时间戳，秒数
     * @return 当前本地时间戳
     */
    static getLocalNowSecond(): number;
    /**
     * 取时区，单位分
     * @return 时区
     */
    static getTimeZoneMinute(): number;
    /**
     * 取时区，单位秒
     * @return 时区
     */
    static getTimeZoneSecond(): number;
    /**
     * 取时区，单位毫秒
     * @return 时区
     */
    static getTimeZoneMillis(): number;
    /**
     * 更新时区
     */
    static UpdateTimeZoneValue(): void;
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
    static dateString(paramDate: Date, paramMillisFlag?: boolean, paramDaySplit?: string, paramTimeSplit?: string, paramMillisSplit?: string, paramDatetimeSplit?: string): string;
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
    static dateStringByFile(paramDate: Date, paramMillisFlag?: boolean): string;
    /**
     * 将当前时间，转换为时间字符串
     *
     * @static
     * @param paramMillisFlag true 是否带毫秒数
     * @return
     *
     * @memberOf datetimeUtils
     */
    static nowDateString(paramMillisFlag?: boolean): string;
    /**
     * 判断是否是有效的时间戳
     * @param paramUTC
     * @return 判断结果
     * - true 表示有效
     * - false 表示无效
     */
    static isValidUTC(paramUTC: number): boolean;
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
    static dateStringByUTC(paramUTC: number, paramMillisFlag?: boolean, paramDaySplit?: string, paramTimeSplit?: string, paramMillisSplt?: string, paramDatetimeSplit?: string): string | null;
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
    static dateStringByMillis(paramLocalTime: number, paramMillisFlag?: boolean, paramDaysSplit?: string, paramTimeSplit?: string, paramMillisSplit?: string, paramDatetimeSplit?: string): string | null;
    /**
     * 将yyyy-mm-dd hh:mm:ss的时间日期字符串，转换为utc时间戳，单位毫秒数
     * @param paramDateTimeString 要解析的时间字符串
     * @return 返回结果， 0 表示失败，无效时间
     */
    static DateTimeStringToUTC(paramDateTimeString: string): number;
    /**
     * 将UTC时间转换为本地时间
     * @param paramUTC
     * @return {Number}
     */
    static ToLocalTime(paramUTC: number): number;
    /**
     * 将本地时间转换为UTC时间
     * @param paramLocalTime
     * @return {Number}
     */
    static ToUTCTime(paramLocalTime: number): number;
    /**
     * 取当天0点时间的UTC时间
     * @param paramUTC 当前的UTC时间，单位毫秒
     * @return
     */
    static getTodayZeroTime(paramUTC: number): number;
    /**
     * 判断是不是同一天
     * @param paramUTC1
     * @param paramUTC2
     * @return {boolean}
     */
    static isSameDay(paramUTC1: number, paramUTC2: number): boolean;
    /**
     * 比较本地时间相关的天数差
     * @param paramUTC1 毫秒数
     * @param paramUTC2 毫秒数
     * @return 相差的天数，同一天，返回0
     */
    static diffLocalDays(paramUTC1: number, paramUTC2: number): number;
    /**
     * 比较两个日期本地时间的天数差
     * @see diffLocalDays 两者的区别是传入参数的类型不一样
     * @param paramDate1 日期1
     * @param paramDate2 日期2
     * @return 相差的天数，同一天，返回0
     */
    static diffLocalDaysByDate(paramDate1: Date, paramDate2: Date): number;
    /**
     * 计算，元年到指定时间戳的本地天数
     * @param paramUTC 指定日期的时间戳
     * @return 计算出来的本地天数
     */
    static CalcLocalDaysByUTC(paramUTC: number): number;
    /**
     * 计算，元年到指定时间的本地天数
     * @param paramDate 指定的日期
     * @return 计算出来的本地天数
     */
    static CalcLocalDaysByDate(paramDate: Date): number;
}
