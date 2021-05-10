/// <reference types="node" />
export declare class utils {
    /**
     * 取当交utils的版本号
     * @deprecated 无实际使用意义
     * @return 当前utils版本号字符串
     */
    static version(): String;
    /**
     * 取调用堆栈
     * @static
     * @memberOf utils
     * @return 调用堆栈列表
     */
    static GetStack(): NodeJS.CallSite[];
    /**
     * 取当前调用所在的文件名
     * @static
     * @memberOf utils
     * @param paramStack 调用堆栈列表
     * @return {string} 返回的文件名
     */
    static GetFileNameByStack(paramStack: NodeJS.CallSite[]): String | null;
    /**
     * 取当前调用所在的行号
     * @static
     * @memberOf utils
     * @param paramStack 调用堆栈列表
     * @return 返回的行号
     */
    static GetLineNumberByStack(paramStack: NodeJS.CallSite[]): number | null;
    /**
     * 取当前调用所在的列
     * @static
     * @memberOf utils
     * @param paramStack 调用堆栈列表
     * @return 返回的列
     */
    static GetColumnNumberByStack(paramStack: NodeJS.CallSite[]): number | null;
    /**
     * 取当前调用堆栈信息
     * @static
     * @memberOf utils
     * @return 当前的栈信息
     */
    static GetStackInfo(): NodeJS.CallSite | null;
    /**
     * 将src的属性复制到dest,只要用for in能够访问到的，都需要复制
     * @param paramDest     接收属的目标
     * @param paramSrc      定义属性的目标
     * @return  无返回
     */
    static dataAssign(paramDest: unknown, paramSrc: object): void;
    /**
     * 判断指定的参数，是否是字符串类型
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 是字符串对象，则返回true,否则返回false
     */
    static isString(paramV: unknown): boolean;
    /**
     * 判断指定的参数，是否是null或undefined
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isNull(paramV: unknown): boolean;
    /**
     * 判断指定的参数，是否是function
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isFunction(paramV: unknown): boolean;
    /**
     * 检查指定的参数，是否是整数
     * @static
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isInteger(paramV: unknown): boolean;
    /**
     * 检查指定的参数，是否是整数
     * @static
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isSafeInteger(paramV: unknown): boolean;
    /**
     * 检查指定的参数，是否是数组
     * @static
     * @param  paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isArray(paramV: unknown): boolean;
    /**
     * 检查指定的参数，是否是number
     * @static
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isNumber(paramV: unknown): boolean;
    /**
     * 判断指定的参数，是否是Object
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isObject(paramV: unknown): boolean;
    /**
     * 判断指定的参数，是否不是 null或undefined
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    static isNotNull(paramV: unknown): boolean;
    /**
     * 检查指定的对象,是不是字符串并且不为空串
     * @static
     * @memberOf utils
     * @param paramV 被检查的对象
     * @return 检查结果 true表示是,false表示不是
     */
    static isNotNullOrEmptyString(paramV: unknown): boolean;
}
export default utils;
