import { XCommonRet } from './common_ret';
/**
 * 检查对象属性结果，枚举
 */
export declare enum EnumCheckObjectCode {
    /** code = 0 表示完全符合，否则存在问题 */
    TotallySuitable = 0,
    /** code = -1 表示paramDestObject不是object对象 */
    DestIsNotObject = -1,
    /** code = -2 表示paramSimpleObject不是object对象 */
    SampleIsNotObject = -2,
    /** code = 1 表示缺少必要的属性 */
    MissAttrib = 1
}
/**
 * 检查对象属性结果
 */
export interface ICheckObjectResult {
    /**  检查对象属性结果，枚举 */
    code: EnumCheckObjectCode;
    /** 多余属性名称列表 */
    extra: string[];
    /** 缺少的属性名称列表 */
    lack: string[];
}
/**
 * 分页信息
 * - 主要用于mysql的分页请求处理
 */
export interface IPageInfo {
    /** 第几条记录 从0开始 */
    start: number;
    /** 取几条记录 最小1，最大100 */
    length: number;
    /** 第几页，从1开始 */
    page: number;
    /** // 每页的记录数，等同于length */
    pageSize: number;
}
/**
 * 常用工具类
 * - 这里会提供一组类静态成员的方法
 */
export declare class utils {
    /**
     * 取当交utils的版本号
     * @deprecated 无实际使用意义
     * @return 当前utils版本号字符串
     */
    static version(): string;
    /**
     * 取调用堆栈
     * @static
     * @return 调用堆栈列表
     */
    static GetStack(): NodeJS.CallSite[];
    /**
     * 取当前调用所在的文件名
     * @static
     * @param paramStack 调用堆栈列表
     * @return 返回的文件名
     */
    static GetFileNameByStack(paramStack: NodeJS.CallSite[]): string | null | undefined;
    /**
     * 取当前调用所在的行号
     * @static
     * @param paramStack 调用堆栈列表
     * @return 返回的行号
     */
    static GetLineNumberByStack(paramStack: NodeJS.CallSite[]): number | null;
    /**
     * 取当前调用所在的列
     * @static
     * @param paramStack 调用堆栈列表
     * @return 返回的列
     */
    static GetColumnNumberByStack(paramStack: NodeJS.CallSite[]): number | null;
    /**
     * 取当前调用堆栈信息
     * @static
     * @return 当前的栈信息
     */
    static GetStackInfo(): NodeJS.CallSite | null;
    /**
     * 将src的属性复制到dest,只要用for in能够访问到的，都需要复制
     * @param paramDest     接收属的目标
     * @param paramSrc      定义属性的目标
     */
    static dataAssign(paramDest: unknown, paramSrc: object): void;
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
    static checkObjectProperty(paramDestObject: unknown, paramSimpleObject: unknown): ICheckObjectResult;
    /**
     * 判断指定的参数，是否是字符串类型
     * @static
     * @param value 被检查的对象
     * @return 是字符串对象，则返回true,否则返回false
     */
    static isString: (value?: any) => value is string;
    /**
     * 判断指定的参数，是否是null或undefined
     * @static
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isNull(paramV: unknown): boolean;
    /**
     * 判断指定的参数，是否是function
     * @static
     * @param value 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isFunction: (value: any) => value is (...args: any[]) => any;
    /**
     * 检查指定的参数，是否是整数
     * @static
     * @param number 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isInteger: (number: unknown) => boolean;
    /**
     * 检查指定的参数，是否是整数
     * @static
     * @param number 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isSafeInteger: (number: unknown) => boolean;
    /**
     * 检查指定的参数，是否是数组
     * @static
     * @param  arg 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isArray: (arg: any) => arg is any[];
    /**
     * 检查指定的参数，是否是number
     * @static
     * @param value 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isNumber: (value?: any) => value is number;
    /**
     * 判断指定的参数，是否是Object
     * @static
     * @param value 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isObject: (value?: any) => value is object;
    /**
     * 判断指定的参数，是否不是 null或undefined
     * @static
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isNotNull(paramV: unknown): boolean;
    /**
     * 检查指定的对象,是不是字符串并且不为空串
     * @static
     * @param paramV 被检查的对象
     * @return 检查结果 true表示是,false表示不是
     */
    static isNotNullOrEmptyString(paramV: unknown): boolean;
    static isDate: (value?: any) => value is Date;
    static isRegExp: (value?: any) => value is RegExp;
    static isError: (value: any) => value is Error;
    static isNaN: (number: unknown) => boolean;
    static isFinite: (number: unknown) => boolean;
    static isBoolean: (value?: any) => value is boolean;
    static isSymbol: (value: any) => value is symbol;
    static isMap: (value?: any) => value is Map<any, any>;
    static isSet: (value?: any) => value is Set<any>;
    static isBuffer: (obj: any) => obj is Buffer;
    /**
     * 检查对象是不是真的空
     * undefined null '' NaN 以及无效的数字 时返回true
     * @from thinkjs 从thinkjs借鉴过来的函数
     * @param paramV
     */
    static isTrueEmpty(paramV: unknown): boolean;
    /**
     * 检查对象是不是真的空
     * - null, undefined, '', {}, false, 无效日期, 0, [], NaN 这些都是空对象
     * - 这个与thinkjs的isEmpty判断结果一样
     * @from thinkjs 从thinkjs借鉴过来的函数
     * @param paramV
     */
    static isEmpty(paramV: any): boolean;
    /**
     * 将回调风格的异步函数转换为 Promise
     * @param paramFunc 要转换的函数，其第一个参数必须是回调函数
     * @param args 要传给函数的其他参数
     * @returns Promise 包装的结果
     */
    static WaitFunction<T = unknown[]>(paramFunc: (callback: (error: Error | null, ...results: unknown[]) => void, ...args: unknown[]) => void, ...args: unknown[]): Promise<T>;
    /**
     * 将回调风格的异步函数转换为 Promise
     * @param paramFunc 要转换的函数，其最后一个参数必须是回调函数
     * @param args 要传给函数的其他参数
     * @returns Promise 包装的结果
     */
    static WaitFunctionEx<T = unknown[]>(paramFunc: (...args: [...unknown[], (error: Error | null, ...results: unknown[]) => void]) => void, ...args: unknown[]): Promise<T>;
    /**
     * 将对象方法的回调风格异步调用转换为 Promise
     * @param paramObject 包含要调用方法的对象
     * @param paramFunctionName 要调用的方法名
     * @param args 要传给方法的其他参数
     * @returns Promise 包装的结果
     */
    static WaitClassFunction<T = unknown[]>(paramObject: object, paramFunctionName: string, ...args: unknown[]): Promise<T>;
    /**
     * 将对象方法的回调风格异步调用转换为 Promise
     * @param paramObject 包含要调用方法的对象
     * @param paramFunctionName 要调用的方法名
     * @param args 要传给方法的其他参数
     * @returns Promise 包装的结果
     */
    static WaitClassFunctionEx<T = unknown[]>(paramObject: object, paramFunctionName: string, ...args: unknown[]): Promise<T>;
    /**
     * 设置DateTimeOffset值
     * @static
     * @param datetime_offset 要偏移的时间，单位毫秒数
     * @return 返回
     * - true 表示设置成功，
     * - false 表示设置失败，指传入的参数不是有效的整数
     */
    static SetDateTimeOffset(datetime_offset: number): boolean;
    /**
     * 取当前时间，会加上datetime_offset的值
     * - 会加手动设置的DateTimeOffset值
     * - 使用这个方法，主要是为了方便调试一些调整日期时间的计算
     * @return 当前时间戳
     */
    static GetDateTimeNow(): number;
    /**
     * 取当前时间戳
     * @return 当前时间戳
     */
    static GetCurrNow(): number;
    /**
     * 取当前时间的偏移时间
     */
    static GetDateTimeOffset(): number;
    /**
     * 格式化显示容量
     *
     * @static
     * @param paramBytes 要格式化的字节数
     * @return  格式化的字符串
     */
    static formatMemory(paramBytes: number): string;
    /**
     * 休眠指定的毫秒数
     * - 这个函数仅用于async函数，并使用await才会有效
     * @param paramT 要休眠的时长
     * @return 无返回值
     */
    static sleep(paramT: number): Promise<void>;
    /**
     * 将paramObject的key和values分别变成两个数组
     * - 注意：这里使用系统默认的方法，替代实现了
     * - 现在可以用javascript自带的Object.keys和Object.values替代，不需要该函数了
     * @param paramObject 参数表
     * @return 返回的结果
     */
    static keyValues(paramObject: unknown): {
        keys: string[];
        values: unknown[];
    };
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
    static formatNumber(paramNumber: number, paramPattern: string): string;
    /**
     * 将指定的内容，转换为整数，如果转换失败，则用缺省值
     * @param paramSrcInteger 要被转换为整数的字符串
     * @param paramDefault 缺省值 = 0
     * @return 转换后的整数
     */
    static ToInteger(paramSrcInteger: string, paramDefault?: number): number;
    /**
     * 将指定的内容，转换为数字，如果转换失败，则用缺省值
     * @param paramSrcNumber 要被转换为数字的字符串
     * @param paramDefault 缺省值 = 0
     * @return 转换后的浮点数
     */
    static ToFloat(paramSrcNumber: string, paramDefault?: number): number;
    /**
     * 将字符串转换为json，如果出错返回undefined
     * 这个主要的做是，对异常做了处理，减少其它地方对异常处理的问题。
     * @param paramJsonString Json格式的字符串
     * @return 转换后的对象
     */
    static JsonParse<T = object>(paramJsonString: string): T | undefined;
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
    static renameFile(paramOldFilename: string, paramNewFilename: string): Promise<{
        ret: boolean;
        errInfo: string;
    }>;
    /**
     * 创建目录
     * - 注意，请用绝对路径
     * @param paramPath 要创建的目录,支持多层级创建
     * @param paramMode 创建后，目录的权限，默认为0o777，参加linux的权限定义
     * @return 返回创建结果，只会返回成功失败
     */
    static mkdirsSync(paramPath: string, paramMode?: number): boolean;
    /**
     * 检查指定的文件或目录，是否存在
     * @param paramFullPath 被检查的文件名或路径名
     * @deprecated 请用fileExistsSync
     * @return 检查结果
     *  - true 表示存在
     *  - false 表示不存在
     */
    static fileExists(paramFullPath: string): boolean;
    /**
     * 检查指定的文件或目录，是否存在
     * @param paramFullPath 被检查的文件名或路径名
     * @return 检查结果
     *  - true 表示存在
     *  - false 表示不存在
     */
    static fileExistsSync(paramFullPath: string): boolean;
    /**
     * 判断指定路径是不是目录
     * @param paramFullPath 被检查的文件名或路径名
     * @return 检查结果
     *  - true 表示是
     *  - false 表示不是
     */
    static isDirSync(paramFullPath: string): boolean;
    /**
     * 判断指定路径是不是文件
     * @param paramFullPath 被检查的文件名或路径名
     * @return 检查结果
     *  - true 表示是
     *  - false 表示不是
     */
    static isFileSync(paramFullPath: string): boolean;
    /**
     * 创建目录
     * - 注意，请用绝对路径， 这里会返回具体的错误信息
     * @param paramPath 要创建的目录,支持多层级创建
     * @param paramMode 创建后，目录的权限，默认为0o777
     * @return 返回创建结果，只会返回成功失败
     *  - ret = true 表示创建成功
     *  - ret = false 表示创建失败 ，msg为错误信息
     */
    static mkdirsSyncEx(paramPath: string, paramMode?: number): {
        ret: boolean;
        msg: string;
    };
    /**
     * 百分之一，最低精度支持到0.0001% 超过的部分四舍五入
     *
     * @param paramValue 百分比的值
     * @return round后的值
     */
    static roundPercentage(paramValue: number | string): number;
    /**
     * 将数字转换为百分比的字符串
     * - 精确到0.01%
     * @param paramValue 要格式化的值
     * @return 格式化的百分比字符串
     *  - 对于paramValue为null或undefined
     */
    static formatPercentage(paramValue: number | string): string;
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
    static options(paramArgs: string[]): {
        _: string[];
        args: object;
    };
    /**
     * 检查value是否是字符串，不是则返回缺省值
     * @param paramValue 被检查的值
     * @param paramDefault 缺省值
     * @returns
     */
    static stringOpts(paramValue: unknown, paramDefault: string): string;
    /**
     * 检查value是否是整数，不是则返回缺省值
     * @param paramValue 被检查的值
     * @param paramDefault 缺省值
     * @returns
     */
    static intOpts(paramValue: unknown, paramDefault: number): number;
    /**
     * 检查value是否是数字，不是则返回缺省值
     * @param paramValue 被检查的值
     * @param paramDefault 缺省值
     * @returns
     */
    static numberOpts(paramValue: unknown, paramDefault: number): number;
    /**
     * 检查value是否是boolean，不是则返回缺省值
     * @param paramValue 被检查的值
     * @param paramDefault 缺省值
     * @returns
     */
    static boolOpts(paramValue: unknown, paramDefault: boolean): boolean;
    /**
     * 检查value是否是对象，不是则返回缺省值
     * @param paramValue 被检查的值
     * @param paramDefault 缺省值
     * @returns
     */
    static objectOpts(paramValue: unknown, paramDefault: unknown): unknown;
    /**
     * 随机一个整数
     * @return
     */
    static randomInteger(): number;
    /**
     * 随机一个范围的整数
     *
     * @param  paramMaxInteger 大于1的整数  注： 这里不会检查这个参数的有效性
     * @return
     */
    static randomScope(paramMaxInteger: number): number;
    /**
     * 随机一个指定最大值和最小值范围的整数
     * @param paramMin 大于等于0的整数 注： 这里不会检查这个参数的有效性
     * @param paramMax 大于1的整数 注： 这里不会检查这个参数的有效性
     * @return number
     */
    static randomBetween(paramMin: number, paramMax: number): number;
    /**
     * 限制字符串的长度，超过则自动截取，如果传入字符串为null或undefined,则返回缺省字符串
     * @param paramString 要检查的字符串
     * @param paramMaxLength 最大字符数
     * @param paramDefault 缺省字符串
     */
    static limitString(paramString: string, paramMaxLength?: number, paramDefault?: string): string;
    /**
     * 检查处理字符串
     * - 如果要检查的字符串的值是一个null或undefined，则返回null
     * - 如果字符串经trim()处理后，为空串，则返回null
     * - 如果传入的不是字符串对象，会先转换成字符串后再做处理
     * - 其它情况，返回trim()的字符串
     * @param parmaValue 要检查的字符串
     * @return {string | null} 返回null或trim()后的字符串
     */
    static notNullEmptyString(parmaValue: string): string | null;
    /** 计算页的偏移量 */
    static calcPageOffsetByPageInfo(paramPage: IPageInfo): number;
    /** 计算页的偏移量 */
    static calcPageOffset(paramPageNo: number, paramPageSize: number): number;
    /**
     * 计算页信息
     * - 与mysql limit相对应
     * @param paramStart 开始的下标，从0开始 默认值0
     * @param paramLength 对应的数量，要求大于1，小于1000，最大值1000, 默认值为10
     */
    static roundPageInfo(paramStart?: number, paramLength?: number): IPageInfo;
    /**
     * 计算最大页数 就是计算出来的页数
     * @param paramCount 总的记录数
     * @param paramPageSize 每页的记录数
     */
    static calcMaxPage(paramCount: number, paramPageSize: number): XCommonRet<number>;
    /**
     * 取Set对象的key数组
     * @param paramSet 集合
     * @returns
     */
    static getSetKeys<T>(paramSet: Set<T>): T[];
    /**
     * 取Map对象的key数组
     * @param paramMap Map
     * @returns
     */
    static getMapKeys<K, V>(paramMap: Map<K, V>): K[];
    /**
     * 取Map对象的value数组
     * @param paramMap Map
     * @returns
     */
    static getMapValues<K, V>(paramMap: Map<K, V>): V[];
    /**
     * 取Map对象的key和value数组
     * @param paramMap Map
     * @returns
     */
    static getMapKeyValues<K, V>(paramMap: Map<K, V>): {
        key: K[];
        value: V[];
    };
}
export default utils;
