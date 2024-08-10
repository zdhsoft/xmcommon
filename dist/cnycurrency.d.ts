/** 大写的Chinese函数参数选项 */
export interface IChineseFormatOptions {
    /** 指定输出大写的前缀，默认为：人民币 */
    prefix?: string;
    /** 是否负数字符：如负 */
    negative?: string;
    /** 关于“整”的定义 */
    zheng?: string;
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
export declare class CNYCurrency {
    private m_intValue;
    private m_errFlag;
    private m_errMsg;
    /**
     * 构造函数
     * @param paramValue 初始值
     */
    constructor(paramValue?: number | string | CNYCurrency);
    /** 判断指定的对象，是不是指定的CNYCurrency对象 */
    static isCurrency(paramV: unknown): boolean;
    /** 货币值 */
    get value(): number;
    /**
     * 赋值
     * @param paramValue 新值
     * @return 返回当前对象
     */
    assign(paramValue?: number | string | CNYCurrency): CNYCurrency;
    /** 货币整数值，精确到分 */
    get intValue(): number;
    /** 是否有错 */
    get isErr(): boolean;
    /** 错误信息 */
    get errMsg(): string;
    /** 重置为0 */
    Reset(): void;
    /**
     * 加一个值
     * @param paramNumber 值
     * @return 返回计算后的Currency对象
     */
    add(paramNumber: number | string | CNYCurrency): CNYCurrency;
    /**
     * 自加一个值
     * @param paramNumber 值
     * @return 返回自己
     */
    selfAdd(paramNumber: number | string | CNYCurrency): this;
    /**
     * 减一个值
     * @param paramNumber 值
     * @return 返回计算后的Currency对象
     */
    sub(paramNumber: number | string | CNYCurrency): CNYCurrency;
    /**
     * 自减一个值
     * @param paramNumber 值
     * @return 返回计算后的Currency对象
     */
    selfSub(paramNumber: number | string | CNYCurrency): this;
    /**
     * 乘一个值
     * @param paramNumber 值
     * @return 返回计算后的Currency对象
     */
    mul(paramNumber: number | string): CNYCurrency;
    /**
     * 自乘一个值
     * @param paramNumber 值
     * @return 计算结果
     *  - true 表示计算成功
     *  - false 表示计算失败
     */
    selfMul(paramNumber: number | string): boolean;
    /**
     * 除以一个值
     * @param paramNumber 值
     * @return 返回计算后的Currency对象
     */
    div(paramNumber: number | string): CNYCurrency;
    /**
     * 自除以一个值
     * @param paramNumber 值
     * @return 计算结果
     *  - true 表示计算成功
     *  - false 表示计算失败
     */
    selfDiv(paramNumber: number | string): boolean;
    /**
     * 货币的整数部分
     * @return 返回整数
     */
    get yuan(): number;
    /**
     * 货币的小数部分，单位为分
     */
    get cent(): number;
    /**
     * 生成字符串
     */
    toString(): string;
    /**
     * 生成中文大写数字
     * - 引用来源：https://www.jb51.net/article/89661.htm
     * - 增加在元后，角为0的情况增加0，如0.01为零元零角
     * - 选项prefix:表示自定义人民币前缀，没有默认为“人民币”
     * - 选项negative:表示自定义负数前缀，没有默认为“负”
     * - 选项zheng：表示自定义整后缀，没有默认为“整”，有些情况可能需要“正”, 使用的时候请注意选项
     * @param paramOpts 如果是负数时，前面的前缀
     * @return 中文大写结果
     */
    Chinese(paramOpts?: IChineseFormatOptions): string;
    /**
     * 格式化输出
     * @param paramUseSymbol 是否带有"￥"符号
     * @param paramCNYsplit 是否以中文四数字一组
     * @param paramHasSplit 是否存在千分位分隔符
     * @return 生成后的字符串
     */
    format(paramUseSymbol?: boolean, paramCNYsplit?: boolean, paramHasSplit?: boolean): string;
    toJSON(): number;
}
