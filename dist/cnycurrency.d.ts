/** 货币错误类型 */
export declare enum CNYCurrencyError {
    INVALID_INPUT = "INVALID_INPUT",
    OVERFLOW = "OVERFLOW",
    DIVISION_BY_ZERO = "DIVISION_BY_ZERO",
    INVALID_OPERATION = "INVALID_OPERATION"
}
/** 货币错误信息 */
export interface CNYCurrencyErrorInfo {
    type: CNYCurrencyError;
    message: string;
    value?: number | string;
}
/** 货币格式化选项 */
export interface IChineseFormatOptions {
    /** 指定输出大写的前缀，默认为：人民币 */
    prefix?: string;
    /** 是否负数字符：如负 */
    negative?: string;
    /** 关于"整"的定义 */
    zheng?: string;
}
/**
 * 人民币货币类
 * - 支持精确到分的货币计算
 * - 支持中文大写转换
 * - 支持格式化输出
 */
export declare class CNYCurrency {
    private static readonly PRECISION;
    private static readonly MAX_VALUE;
    private static readonly MIN_VALUE;
    private _intValue;
    private error?;
    /**
     * 构造函数
     * @param value 初始值
     */
    constructor(value?: number | string | CNYCurrency);
    /**
     * 判断是否为 CNYCurrency 实例
     */
    static isCurrency(value: unknown): value is CNYCurrency;
    /**
     * 将值转换为数字
     * @param value 输入值
     */
    private static toNumber;
    /**
     * 解析货币值
     * @param value 输入值
     */
    private static parse;
    /**
     * 获取货币值
     */
    get value(): number;
    /**
     * 赋值
     * @param value 新值
     */
    assign(value: number | string | CNYCurrency): CNYCurrency;
    /**
     * 获取整数值（分）
     */
    get intValue(): number;
    /**
     * 是否有错误
     */
    get hasError(): boolean;
    /**
     * 获取错误信息
     */
    get errorInfo(): CNYCurrencyErrorInfo | undefined;
    /**
     * 重置为0
     */
    reset(): void;
    /**
     * 加法
     * @param value 加数
     */
    add(value: number | string | CNYCurrency): CNYCurrency;
    /**
     * 自增
     * @param value 加数
     */
    selfAdd(value: number | string | CNYCurrency): CNYCurrency;
    /**
     * 减法
     * @param value 减数
     */
    sub(value: number | string | CNYCurrency): CNYCurrency;
    /**
     * 自减
     * @param value 减数
     */
    selfSub(value: number | string | CNYCurrency): CNYCurrency;
    /**
     * 乘法
     * @param value 乘数
     */
    mul(value: number | string): CNYCurrency;
    /**
     * 自乘
     * @param value 乘数
     */
    selfMul(value: number | string): CNYCurrency;
    /**
     * 除法
     * @param value 除数
     */
    div(value: number | string): CNYCurrency;
    /**
     * 自除
     * @param value 除数
     */
    selfDiv(value: number | string): CNYCurrency;
    /**
     * 获取元部分
     */
    get yuan(): number;
    /**
     * 获取分部分
     */
    get cent(): number;
    /**
     * 转换为字符串
     */
    toString(): string;
    /**
     * 转换为中文大写
     * @param options 格式化选项
     */
    toChinese(options?: IChineseFormatOptions): string;
    /**
     * 格式化输出
     * @param useSymbol 是否使用货币符号
     * @param cnySplit 是否使用中文分隔
     * @param hasSplit 是否使用千位分隔符
     */
    format(useSymbol?: boolean, cnySplit?: boolean, hasSplit?: boolean): string;
    /**
     * 转换为JSON
     */
    toJSON(): number;
}
export default CNYCurrency;
