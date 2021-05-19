/// <reference types="node" />
/** 编码类的错误码 */
export declare enum EnumSimpleCodeError {
    /** 表示检查通过 */
    OK = 0,
    /** Seed不是整数 */
    SEED_NOT_INTEGER = 1,
    /** Data不是Buffer对象 */
    DATA_NOT_BUFFER = 2,
    /** Data的长度，小于指定的长度 */
    DATA_SIZE_TO_LOW = 3
}
/**
 * 简单编码的种子
 */
export interface ISimpleCodeSeed {
    /** 返回处理结果 code==0表示成功，其它值表示失败 */
    code: EnumSimpleCodeError;
    /**  seed表示编码的种子 */
    seed?: number;
    /** data表示编码后的数据 */
    data?: Buffer;
}
/**
 * 一个简单编码的类
 * 通过位移算法对数据进行编码
 * 这里使用的随机数算是非平衡算法，只用于这个编解码运算
 */
export declare class SimpleCode {
    /** 当前的种子 */
    private m_seed;
    /** 修改值 */
    private m_fix;
    /**
     * 构造函数
     */
    constructor();
    /**
     * 数据编码
     * @param paramSeed 编码种子
     * @param paramData 要编码的数据
     * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示编码的种子， data表示编码后的数据
     */
    Encode(paramSeed: number, paramData: Buffer): ISimpleCodeSeed;
    /**
     * 检查参数
     * 返回结果：
     *      - 0 表示检查通过
     *      - 1 paramSeed不是整数
     *      - 2 paramData不是Buffer对象
     *      - 3 paramData的长度，小于指定的长度
     * @param paramSeed 种子
     * @param paramData 数据
     * @param paramMinLength 数据最小长度
     * @return 检查结果
     */
    private __checkParam;
    /**
     * 生成随机数
     * @return 生成的随机整数
     */
    private __Rand;
    /**
     * 数据解码
     * @param paramSeed 初始种子
     * @param paramData 编码后的数据
     * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示解码的种子， data表示解码后的数据
     */
    Decode(paramSeed: number, paramData: Buffer): ISimpleCodeSeed;
    /**
     * 生数据编码包
     * @param paramSeed 初始种子
     * @param paramData 要编码的数据
     * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示编码的种子， data表示编码后的数据
     */
    EncodePackage(paramSeed: number, paramData: Buffer): ISimpleCodeSeed;
    /**
     * 数据解码包
     * @param 经EncodePackage编码的数据
     * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示解码的种子， data表示解码后的数据
     */
    DecodePackage(paramData: Buffer): ISimpleCodeSeed;
}
