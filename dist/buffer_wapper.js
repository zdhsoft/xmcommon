"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferWapper = exports.EnumBufferSize = exports.EnumBufferWapperError = void 0;
const common_ret_1 = require("./common_ret");
const utils_1 = require("./utils");
/** BufferWapper的错误码 */
var EnumBufferWapperError;
(function (EnumBufferWapperError) {
    EnumBufferWapperError[EnumBufferWapperError["OK"] = 0] = "OK";
    EnumBufferWapperError[EnumBufferWapperError["FAIL"] = -1] = "FAIL";
    /** 数据为NULL */
    EnumBufferWapperError[EnumBufferWapperError["DATA_IS_NULL"] = 1] = "DATA_IS_NULL";
    /** 数据不是Buffer对象 */
    EnumBufferWapperError[EnumBufferWapperError["DATA_IS_NOT_BUFFER"] = 2] = "DATA_IS_NOT_BUFFER";
    /** 超出范围 */
    EnumBufferWapperError[EnumBufferWapperError["OUT_OF_RANGE"] = 3] = "OUT_OF_RANGE";
})(EnumBufferWapperError = exports.EnumBufferWapperError || (exports.EnumBufferWapperError = {}));
/**
 * 读取对应的数据类型，对应的字节数
 */
var EnumBufferSize;
(function (EnumBufferSize) {
    /** 8位整数的字节数 */
    EnumBufferSize[EnumBufferSize["int8"] = 1] = "int8";
    /** 16位整数的字节数 */
    EnumBufferSize[EnumBufferSize["int16"] = 2] = "int16";
    /** 32位整数的字节数 */
    EnumBufferSize[EnumBufferSize["int32"] = 4] = "int32";
    /** 64位整数的字节数 */
    EnumBufferSize[EnumBufferSize["int64"] = 8] = "int64";
    /** 单精度浮点数字节数 */
    EnumBufferSize[EnumBufferSize["float"] = 4] = "float";
    /** 双精度浮点数字节数 */
    EnumBufferSize[EnumBufferSize["double"] = 8] = "double";
})(EnumBufferSize = exports.EnumBufferSize || (exports.EnumBufferSize = {}));
/**
 * 一个针对buffer专门封装的类
 * - 这里使用的方法，都是基于BE的方式，如果使用LE的方式，需要重新改一下
 * - 这个类，还不成享，暂时就不建议使用了
 * @deprecated
 */
class BufferWapper {
    /**
     * 构造函数
     * @param paramData 被操作的buffer对象
     * @param paramOffset 初始的偏移量
     */
    constructor(paramData, paramOffset) {
        /** 当前操作的buffer的对象 */
        this.m_buffer = null;
        /** 当前读写的偏移量 */
        this.m_offset = 0;
        this.bindBuffer(paramData, paramOffset);
    }
    /** 取当前的buffer对象 */
    get buffer() {
        return this.m_buffer;
    }
    /** 取当前的offset */
    get offset() {
        return this.m_offset;
    }
    /** 设置offset */
    setOffset(paramOffset = 0) {
        const ret = new common_ret_1.common_ret();
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
    isCan(paramBytes) {
        if (!Number.isSafeInteger(paramBytes)) {
            return false;
        }
        if (paramBytes < 1) {
            return false;
        }
        return this.m_offset + paramBytes <= this.size;
    }
    /** 是否可读写8位整数 */
    isCanInt8() {
        return this.isCan(EnumBufferSize.int8);
    }
    /** 是否可读写16位整数 */
    isCanInt16() {
        return this.isCan(EnumBufferSize.int16);
    }
    /** 是否可读写32位整数 */
    isCanInt32() {
        return this.isCan(EnumBufferSize.int32);
    }
    /** 是否可读写64位整数 */
    isCanInt64() {
        return this.isCan(EnumBufferSize.int64);
    }
    /** 是否可读写单精度浮点数 */
    isCanFloat() {
        return this.isCan(EnumBufferSize.float);
    }
    /** 是否可读写双精度浮点数 */
    isCanDoublie() {
        return this.isCan(EnumBufferSize.double);
    }
    /** 当前buffer的字节数 */
    get size() {
        if (utils_1.utils.isNull(this.m_buffer)) {
            return 0;
        }
        else {
            return this.buffer.byteLength;
        }
    }
    checkOffset(paramOffset, paramSize, paramRet) {
        const size = paramSize;
        if (paramOffset < 0 || paramOffset > size) {
            paramRet.setError(EnumBufferWapperError.OUT_OF_RANGE, `paramOffset超出有效范围：[0,${size}]`);
            return false;
        }
        else {
            return true;
        }
    }
    readFloat() {
        const ret = this.m_buffer.readFloatBE(this.m_offset);
        this.m_offset += EnumBufferSize.float;
        return ret;
    }
    readDouble() {
        const ret = this.m_buffer.readDoubleBE(this.m_offset);
        this.m_offset += EnumBufferSize.double;
        return ret;
    }
    readBuffer(paramBytes) {
        const ret = this.m_buffer.slice(this.m_offset, this.m_offset + paramBytes);
        this.m_offset += paramBytes;
        return ret;
    }
    readPackBuffer() {
        const bytes = this.readInt32();
        return this.readBuffer(bytes);
    }
    readInt8() {
        const ret = this.m_buffer.readInt8(this.m_offset);
        this.m_offset += EnumBufferSize.int8;
        return ret;
    }
    readUInt8() {
        const ret = this.m_buffer.readUInt8(this.m_offset);
        this.m_offset += EnumBufferSize.int8;
        return ret;
    }
    readInt16() {
        const ret = this.m_buffer.readInt16BE(this.m_offset);
        this.m_offset += EnumBufferSize.int16;
        return ret;
    }
    readUInt16() {
        const ret = this.m_buffer.readUInt16BE(this.m_offset);
        this.m_offset += EnumBufferSize.int16;
        return ret;
    }
    readInt32() {
        const ret = this.m_buffer.readInt32BE(this.m_offset);
        this.m_offset += EnumBufferSize.int32;
        return ret;
    }
    readUInt32() {
        const ret = this.m_buffer.readUInt32BE(this.m_offset);
        this.m_offset += EnumBufferSize.int32;
        return ret;
    }
    readInt64() {
        const high = this.readInt32();
        const low = this.readUInt32();
        const sign = high < 0;
        if (sign) {
            return -(Math.abs(high) * 0x100000000 + low);
        }
        else {
            return high * 0x100000000 + low;
        }
    }
    readString(paramEncoding = 'utf8') {
        return this.readPackBuffer().toString(paramEncoding);
    }
    writeInt8(paramValue) {
        this.m_buffer.writeInt8(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int8;
    }
    writeUInt8(paramValue) {
        this.m_buffer.writeUInt8(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int8;
    }
    writeInt16(paramValue) {
        this.m_buffer.writeInt16BE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int16;
    }
    writeUInt16(paramValue) {
        this.m_buffer.writeUInt16BE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int16;
    }
    writeInt32(paramValue) {
        this.m_buffer.writeInt32BE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int32;
    }
    writeUInt32(paramValue) {
        this.m_buffer.writeUInt32BE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.int32;
    }
    writeInt64(paramValue) {
        const sign = paramValue < 0;
        if (sign) {
            const v = Math.abs(paramValue);
            const low = v % 0x100000000;
            const high = -((v - low) / 0x100000000);
            this.writeInt32(high);
            this.writeUInt32(low);
        }
        else {
            const v = paramValue;
            const low = v % 0x100000000;
            const high = (v - low) / 0x100000000;
            this.writeInt32(high);
            this.writeUInt32(low);
        }
    }
    writeFloat(paramValue) {
        this.m_buffer.writeFloatBE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.float;
    }
    writeDouble(paramValue) {
        this.m_buffer.writeDoubleBE(paramValue, this.m_offset);
        this.m_offset += EnumBufferSize.double;
    }
    writeBuffer(paramBuffer, paramBytes) {
        const bytes = Number.isSafeInteger(paramBytes) ? paramBytes : paramBuffer.byteLength;
        paramBuffer.copy(this.m_buffer, this.m_offset, 0, bytes);
        this.m_offset += bytes;
    }
    writePackBuffer(paramBuffer) {
        this.writeInt32(paramBuffer.byteLength);
        this.writeBuffer(paramBuffer);
    }
    writeString(paramString, paramEncoding = 'utf8') {
        this.writePackBuffer(Buffer.from(paramString, paramEncoding));
    }
    /**
     * 绑定buffer对象
     * @param paramBuffer
     * @param paramOffset 初始偏移位置
     * @returns
     */
    bindBuffer(paramBuffer, paramOffset) {
        const ret = new common_ret_1.common_ret();
        do {
            if (utils_1.utils.isNull(paramBuffer)) {
                ret.setError(EnumBufferWapperError.DATA_IS_NULL, `paramBuffer=${paramBuffer}:这个参数为null`);
                break;
            }
            if (!Buffer.isBuffer(paramBuffer)) {
                ret.setError(EnumBufferWapperError.DATA_IS_NOT_BUFFER, 'paramBuffer不是Buffer对象！');
                break;
            }
            const offset = Number.isSafeInteger(paramOffset) ? paramOffset : 0;
            // ESLint检查这块，不能正确识别参数，只好as一下，语法糖，无性能影响
            if (!this.checkOffset(offset, paramBuffer.byteLength, ret)) {
                break;
            }
            this.m_buffer = paramBuffer;
            this.m_offset = offset;
        } while (false);
        return ret;
    }
}
exports.BufferWapper = BufferWapper;
