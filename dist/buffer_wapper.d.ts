/// <reference types="node" />
import { common_ret as XCommonRet } from './common_ret';
/**
 * BufferWapper的错误码
 * @deprecated
 */
export declare enum EnumBufferWapperError {
    OK = 0,
    FAIL = -1,
    /** 数据为NULL */
    DATA_IS_NULL = 1,
    /** 数据不是Buffer对象 */
    DATA_IS_NOT_BUFFER = 2,
    /** 超出范围 */
    OUT_OF_RANGE = 3
}
/**
 * 读取对应的数据类型，对应的字节数
 * @deprecated
 */
export declare enum EnumBufferSize {
    /** 8位整数的字节数 */
    int8 = 1,
    /** 16位整数的字节数 */
    int16 = 2,
    /** 32位整数的字节数 */
    int32 = 4,
    /** 64位整数的字节数 */
    int64 = 8,
    /** 单精度浮点数字节数 */
    float = 4,
    /** 双精度浮点数字节数 */
    double = 8
}
/**
 * 一个针对buffer专门封装的类
 * - 这里使用的方法，都是基于BE的方式，如果使用LE的方式，需要重新改一下
 * - 这个类，还不成享，暂时就不建议使用了
 * @deprecated
 */
export declare class BufferWapper {
    /** 当前操作的buffer的对象 */
    private m_buffer;
    /** 当前读写的偏移量 */
    private m_offset;
    /**
     * 构造函数
     * @param paramData 被操作的buffer对象
     * @param paramOffset 初始的偏移量
     */
    constructor();
    constructor(paramData: Buffer);
    constructor(paramData: Buffer, paramOffset: number);
    /** 取当前的buffer对象 */
    get buffer(): Buffer | null;
    /** 取当前的offset */
    get offset(): number;
    /** 设置offset */
    setOffset(paramOffset?: number): XCommonRet;
    /**
     * 检查当前位置，是否可以读或可写
     * @param paramBytes 要读写的字节数, 要求是安全的整数
     * @return 返回结果
     *  - true 表示可以
     *  - false 表示不可以
     */
    isCan(paramBytes: number): boolean;
    /** 是否可读写8位整数 */
    isCanInt8(): boolean;
    /** 是否可读写16位整数 */
    isCanInt16(): boolean;
    /** 是否可读写32位整数 */
    isCanInt32(): boolean;
    /** 是否可读写64位整数 */
    isCanInt64(): boolean;
    /** 是否可读写单精度浮点数 */
    isCanFloat(): boolean;
    /** 是否可读写双精度浮点数 */
    isCanDoublie(): boolean;
    /** 当前buffer的字节数 */
    get size(): number;
    private checkOffset;
    readFloat(): number;
    readDouble(): number;
    readBuffer(paramBytes: number): Buffer;
    readPackBuffer(): Buffer;
    readInt8(): number;
    readUInt8(): number;
    readInt16(): number;
    readUInt16(): number;
    readInt32(): number;
    readUInt32(): number;
    readInt64(): number;
    readString(paramEncoding?: BufferEncoding): string;
    writeInt8(paramValue: number): void;
    writeUInt8(paramValue: number): void;
    writeInt16(paramValue: number): void;
    writeUInt16(paramValue: number): void;
    writeInt32(paramValue: number): void;
    writeUInt32(paramValue: number): void;
    writeInt64(paramValue: number): void;
    writeFloat(paramValue: number): void;
    writeDouble(paramValue: number): void;
    writeBuffer(paramBuffer: Buffer): void;
    writeBuffer(paramBuffer: Buffer, paramBytes: number): void;
    writePackBuffer(paramBuffer: Buffer): void;
    writeString(paramString: string, paramEncoding?: BufferEncoding): void;
    /**
     * 绑定buffer对象
     * @param paramBuffer
     * @param paramOffset 初始偏移位置
     * @returns
     */
    bindBuffer(): XCommonRet;
    bindBuffer(paramBuffer: Buffer): XCommonRet;
    bindBuffer(paramBuffer: Buffer, paramOffset: number): XCommonRet;
    bindBuffer(paramBuffer: Buffer | undefined, paramOffset: number | undefined): XCommonRet;
}
