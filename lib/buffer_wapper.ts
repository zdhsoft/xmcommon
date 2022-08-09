import { common_ret as XCommonRet } from './common_ret';
import { utils } from './utils';
import { error_common } from './constant';

/**
 * BufferWapper的错误码
 * @deprecated
 */
export enum EnumBufferWapperError {
    OK = error_common.ERR_OK,
    FAIL = error_common.ERR_FAIL,
    /** 数据为NULL */
    DATA_IS_NULL = 1,
    /** 数据不是Buffer对象 */
    DATA_IS_NOT_BUFFER = 2,
    /** 超出范围 */
    OUT_OF_RANGE = 3,
}

/**
 * 读取对应的数据类型，对应的字节数
 * @deprecated
 */
export enum EnumBufferSize {
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
    double = 8,
}

/**
 * 一个针对buffer专门封装的类
 * - 这里使用的方法，都是基于BE的方式，如果使用LE的方式，需要重新改一下
 * - 这个类，还不成享，暂时就不建议使用了
 * @deprecated
 */
export class BufferWapper {
    /** 当前操作的buffer的对象 */
    private m_buffer: Buffer | null = null;
    /** 当前读写的偏移量 */
    private m_offset = 0;
    /**
     * 构造函数
     * @param paramData 被操作的buffer对象
     * @param paramOffset 初始的偏移量
     */
    public constructor();
    public constructor(paramData: Buffer);
    public constructor(paramData: Buffer, paramOffset: number);
    public constructor(paramData?: Buffer, paramOffset?: number) {
        this.bindBuffer(paramData, paramOffset);
    }
    /** 取当前的buffer对象 */
    public get buffer(): Buffer | null {
        return this.m_buffer;
    }
    /** 取当前的offset */
    public get offset(): number {
        return this.m_offset;
    }
    /** 设置offset */
    public setOffset(paramOffset = 0): XCommonRet {
        const ret = new XCommonRet();
        if (this.checkOffset(paramOffset, this.size, ret)) {
            this.m_offset = paramOffset;
        }
        return ret;
    }

    /**
     * 检查当前位置，是否可以读或可写
     * @param paramBytes 要读写的字节数, 要求是安全的整数
     * @return 返回结果
     *  - true 表示可以
     *  - false 表示不可以
     */
    public isCan(paramBytes: number): boolean {
        if (!Number.isSafeInteger(paramBytes)) {
            return false;
        }
        if (paramBytes < 1) {
            return false;
        }
        return this.m_offset + paramBytes <= this.size;
    }
    /** 是否可读写8位整数 */
    public isCanInt8(): boolean {
        return this.isCan(EnumBufferSize.int8);
    }
    /** 是否可读写16位整数 */
    public isCanInt16(): boolean {
        return this.isCan(EnumBufferSize.int16);
    }
    /** 是否可读写32位整数 */
    public isCanInt32(): boolean {
        return this.isCan(EnumBufferSize.int32);
    }
    /** 是否可读写64位整数 */
    public isCanInt64(): boolean {
        return this.isCan(EnumBufferSize.int64);
    }
    /** 是否可读写单精度浮点数 */
    public isCanFloat(): boolean {
        return this.isCan(EnumBufferSize.float);
    }
    /** 是否可读写双精度浮点数 */
    public isCanDoublie(): boolean {
        return this.isCan(EnumBufferSize.double);
    }
    /** 当前buffer的字节数 */
    public get size(): number {
        if (utils.isNull(this.m_buffer)) {
            return 0;
        } else {
            return (this.buffer as Buffer).byteLength;
        }
    }

    private checkOffset(paramOffset: number, paramSize: number, paramRet: XCommonRet): boolean {
        const size = paramSize;
        if (paramOffset < 0 || paramOffset > size) {
            paramRet.setError(EnumBufferWapperError.OUT_OF_RANGE, `paramOffset超出有效范围：[0,${size}]`);
            return false;
        } else {
            return true;
        }
    }

    public readFloat(): number {
        const ret = (this.m_buffer as Buffer).readFloatBE(this.m_offset);
        this.m_offset += EnumBufferSize.float;
        return ret;
    }

    public readDouble(): number {
        const ret = (this.m_buffer as Buffer).readDoubleBE(this.m_offset);
        this.m_offset += EnumBufferSize.double;
        return ret;
    }

    public readBuffer(paramBytes: number): Buffer {
        const ret = (this.m_buffer as Buffer).slice(this.m_offset, this.m_offset + paramBytes);
        this.m_offset += paramBytes;
        return ret;
    }

    public readPackBuffer(): Buffer {
        const bytes = this.readInt32();
        return this.readBuffer(bytes);
    }

    public readInt8(): number {
        const ret = (this.m_buffer as Buffer).readInt8(this.m_offset);
        this.m_offset += EnumBufferSize.int8;
        return ret;
    }

    public readUInt8(): number {
        const ret = (this.m_buffer as Buffer).readUInt8(this.m_offset);
        this.m_offset += EnumBufferSize.int8;
        return ret;
    }

    public readInt16(): number {
        const ret = (this.m_buffer as Buffer).readInt16BE(this.m_offset);
        this.m_offset += EnumBufferSize.int16;
        return ret;
    }
    public readUInt16(): number {
        const ret = (this.m_buffer as Buffer).readUInt16BE(this.m_offset);
        this.m_offset += EnumBufferSize.int16;
        return ret;
    }

    public readInt32(): number {
        const ret = (this.m_buffer as Buffer).readInt32BE(this.m_offset);
        this.m_offset += EnumBufferSize.int32;
        return ret;
    }
    public readUInt32(): number {
        const ret = (this.m_buffer as Buffer).readUInt32BE(this.m_offset);
        this.m_offset += EnumBufferSize.int32;
        return ret;
    }
    public readInt64(): number {
        const high = this.readInt32();
        const low = this.readUInt32();

        const sign = high < 0;
        if (sign) {
            return -(Math.abs(high) * 0x100000000 + low);
        } else {
            return high * 0x100000000 + low;
        }
    }

    public readString(paramEncoding: BufferEncoding = 'utf8'): string {
        return this.readPackBuffer().toString(paramEncoding);
    }

    public writeInt8(paramValue: number): void {
        (this.m_buffer as Buffer).writeInt8(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int8;
    }
    public writeUInt8(paramValue: number): void {
        (this.m_buffer as Buffer).writeUInt8(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int8;
    }

    public writeInt16(paramValue: number): void {
        (this.m_buffer as Buffer).writeInt16BE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int16;
    }
    public writeUInt16(paramValue: number): void {
        (this.m_buffer as Buffer).writeUInt16BE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int16;
    }

    public writeInt32(paramValue: number): void {
        (this.m_buffer as Buffer).writeInt32BE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int32;
    }
    public writeUInt32(paramValue: number): void {
        (this.m_buffer as Buffer).writeUInt32BE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int32;
    }

    public writeInt64(paramValue: number): void {
        const sign = paramValue < 0;
        if (sign) {
            const v = Math.abs(paramValue);
            const low = v % 0x100000000;
            const high = -((v - low) / 0x100000000);
            this.writeInt32(high);
            this.writeUInt32(low);
        } else {
            const v = paramValue;
            const low = v % 0x100000000;
            const high = (v - low) / 0x100000000;
            this.writeInt32(high);
            this.writeUInt32(low);
        }
    }

    public writeFloat(paramValue: number): void {
        (this.m_buffer as Buffer).writeFloatBE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.float;
    }

    public writeDouble(paramValue: number): void {
        (this.m_buffer as Buffer).writeDoubleBE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.double;
    }
    public writeBuffer(paramBuffer: Buffer): void;
    public writeBuffer(paramBuffer: Buffer, paramBytes: number): void;
    public writeBuffer(paramBuffer: Buffer, paramBytes?: number): void {
        const bytes = Number.isSafeInteger(paramBytes) ? (paramBytes as number) : paramBuffer.byteLength;
        paramBuffer.copy(this.m_buffer as Buffer, this.m_offset, 0, bytes);
        this.m_offset += bytes;
    }

    public writePackBuffer(paramBuffer: Buffer): void {
        this.writeInt32(paramBuffer.byteLength);
        this.writeBuffer(paramBuffer);
    }

    public writeString(paramString: string, paramEncoding: BufferEncoding = 'utf8'): void {
        this.writePackBuffer(Buffer.from(paramString, paramEncoding));
    }

    /**
     * 绑定buffer对象
     * @param paramBuffer
     * @param paramOffset 初始偏移位置
     * @returns
     */
    public bindBuffer(): XCommonRet;
    public bindBuffer(paramBuffer: Buffer): XCommonRet;
    public bindBuffer(paramBuffer: Buffer, paramOffset: number): XCommonRet;
    public bindBuffer(paramBuffer: Buffer | undefined, paramOffset: number | undefined): XCommonRet;
    public bindBuffer(paramBuffer?: Buffer | undefined, paramOffset?: number | undefined): XCommonRet {
        const ret = new XCommonRet();
        do {
            if (utils.isNull(paramBuffer)) {
                ret.setError(EnumBufferWapperError.DATA_IS_NULL, `paramBuffer=${paramBuffer}:这个参数为null`);
                break;
            }
            if (!Buffer.isBuffer(paramBuffer)) {
                ret.setError(EnumBufferWapperError.DATA_IS_NOT_BUFFER, 'paramBuffer不是Buffer对象！');
                break;
            }
            const offset = Number.isSafeInteger(paramOffset as unknown) ? (paramOffset as number) : 0;
            // ESLint检查这块，不能正确识别参数，只好as一下，语法糖，无性能影响
            if (!this.checkOffset(offset, (paramBuffer as unknown as Buffer).byteLength, ret)) {
                break;
            }
            this.m_buffer = paramBuffer as unknown as Buffer;
            this.m_offset = offset;
        } while (false);
        return ret;
    }
}
