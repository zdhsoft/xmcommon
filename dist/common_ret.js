"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XCommonRet = exports.common_ret = void 0;
const common_error_1 = require("./common_error");
const constant_1 = require("./constant");
const utils_1 = require("./utils");
// 通用的数据返回
/**
 * 这个类主要是增加了错误判断的属性,可以做为一个通用的返回类
 * - 但是这里的数据类型都any类型的，不建议使用，所以这里新增加带模板的XCommonRet<T>类，两个功能接口完全一样
 * - 要返回的数据可以通过data属性返回
 * 有isOK,isNotOK,isFail三个属性来简化返回结果.
 */
// tslint:disable-next-line: class-name
class common_ret {
    /**
     * 构造函数
     * @param paramErr 错误码
     * @param paramMsg 错误信息
     * @param paramData 携带数据
     */
    constructor(paramErr = constant_1.error_common.ERR_OK, paramMsg = '', paramData = null) {
        this.m_err = constant_1.error_common.ERR_OK;
        this.m_msg = '';
        this.m_data = null;
        this.m_err = paramErr; // 错误码
        this.m_msg = paramMsg; // 错误信息
        this.m_data = paramData; // 返回的数据,默认空数据
    }
    /**
     * 设置错误信息
     * @param paramErr 错误码 @see error_common定义
     * @param paramMsg 错误信息
     * @param paramData 数据
     * @param paramMsgPre 错误信息前缀 相当于执于了一次addErrorPre
     * @return 返回当前this
     */
    setError(paramErr, paramMsg = '', paramData = null, paramMsgPre = null) {
        this.m_err = paramErr;
        if (paramMsgPre) {
            this.m_msg = `${paramMsgPre}${paramMsg}`;
        }
        else {
            this.m_msg = paramMsg;
        }
        this.m_data = paramData;
        return this;
    }
    /**
     * 取错信息
     * @return 返回含有错误码的错误信息
     */
    getErrorInfo() {
        if (this.isNotOK) {
            return `[${this.m_err}] ${this.m_msg}`;
        }
        else {
            return '';
        }
    }
    /**
     * 设置错误信息
     * @param paramMsg 设备错误信息
     * @param paramMsgPre=null 错误信息前缀
     */
    setErrorMsg(paramMsg = '', paramMsgPre = null) {
        if (paramMsgPre) {
            this.m_msg = `${paramMsgPre}${paramMsg}`;
        }
        else {
            this.m_msg = paramMsg;
        }
    }
    /**
     * 取错误信息
     * @return 返回错误信息
     */
    getErrorMsg() {
        return this.m_msg;
    }
    get msg() {
        return this.m_msg;
    }
    set msg(paramMsg) {
        this.m_msg = paramMsg;
    }
    /**
     * 取错误码
     * @return  返回错误码
     */
    getErrorCode() {
        return this.m_err;
    }
    get err() {
        return this.m_err;
    }
    set err(paramErr) {
        this.m_err = paramErr;
    }
    /**
     * 设置错误代码
     * @param paramError 置错误码
     */
    setErrorCode(paramError = constant_1.error_common.ERR_OK) {
        this.m_err = paramError;
    }
    /**
     * 取携带数据
     * @return 携带的数据
     */
    getData() {
        return this.m_data;
    }
    /**
     * 设置携带的数据
     * @param paramData 数据
     */
    setData(paramData = null) {
        this.m_data = paramData;
    }
    get data() {
        return this.m_data;
    }
    set data(paramData) {
        this.m_data = paramData;
    }
    /**
     * 设置错误信息为ERR_OK;
     */
    setErrorCodeOK() {
        this.m_err = constant_1.error_common.ERR_OK;
        return this;
    }
    /**
     * 设为失败
     * @return 返回this
     */
    setErrorCodeFail() {
        this.m_err = constant_1.error_common.ERR_FAIL;
        return this;
    }
    /**
     * 设为OK
     * @param data 携带的数据
     * @return 返回this
     */
    setOK(data = null) {
        this.m_err = constant_1.error_common.ERR_OK;
        this.m_data = data;
        return this;
    }
    /**
     * 设为ERR_TRUE
     * @return 返回this
     */
    setTrue() {
        this.m_err = constant_1.error_common.ERR_TRUE;
        return this;
    }
    /**
     * 设为ERR_FALSE
     * @return 返回this
     */
    setFalse() {
        this.m_err = constant_1.error_common.ERR_FALSE;
        return this;
    }
    /**
     * 增加错误信息前缀
     * @param paramMsgPre 前缀
     * @return 返回this
     */
    addErrorPre(paramMsgPre) {
        this.m_msg = `${paramMsgPre}${this.m_msg}`;
        return this;
    }
    /**
     * 将错误信息复制到msgHead
     * 这个是专门针对协议中的msgHead
     * @param paramHead 用于保存的消息头
     * @return 返回this
     */
    copyTo(paramHead) {
        paramHead.err = this.m_err;
        paramHead.errmsg = this.m_msg;
        return this;
    }
    /**
     * 将错误信息从head复制过来
     * 这个是专门针对协议中的msgHead
     * @param paramHead 消息头
     * @return 返回this
     */
    setErrorFromMsghead(paramHead) {
        this.m_err = paramHead.err;
        this.m_msg = paramHead.errmsg;
        return this;
    }
    //
    get isOK() {
        return common_error_1.error_utils.isOK(this.m_err);
    }
    get isNotOK() {
        return common_error_1.error_utils.isNotOK(this.m_err);
    }
    get isFail() {
        return common_error_1.error_utils.isFail(this.m_err);
    }
    get isTrue() {
        return common_error_1.error_utils.isTrue(this.m_err);
    }
    get isFalse() {
        return common_error_1.error_utils.isFalse(this.m_err);
    }
    /**
     * 重载toJSON方法
     * @return 返回非类的对象
     */
    toJSON() {
        return {
            isOK: this.isOK,
            err: this.m_err,
            msg: this.m_msg,
            data: this.m_data,
        };
    }
}
exports.common_ret = common_ret;
/**
 * 这是一个新增的通用返回类, 因为common_ret已经在很多项目使用了，变更它的设计可能会引用很多问题，所以
 * 在这里重新定一个带模板的通用返回类
 * 要返回的数据可以通过data属性返回
 * 有isOK,isNotOK,isFail三个属性来简化返回结果.
 */
// tslint:disable-next-line: class-name
class XCommonRet {
    /**
     * 构造函数
     * @param paramErr 错误码
     * @param paramMsg 错误信息
     * @param paramData 携带数据
     */
    constructor(paramErr = constant_1.error_common.ERR_OK, paramMsg = '', paramData = null) {
        this.m_err = constant_1.error_common.ERR_OK;
        this.m_msg = '';
        this.m_err = paramErr; // 错误码
        this.m_msg = paramMsg; // 错误信息
        this.m_data = paramData; // 返回的数据,默认空数据
    }
    /**
     * 设置错误信息
     * @param paramErr 错误码 @see error_common定义
     * @param paramMsg 错误信息
     * @param paramData 数据
     * @param paramMsgPre 错误信息前缀 相当于执于了一次addErrorPre
     * @return 返回当前this
     */
    setError(paramErr, paramMsg = '', paramData = null, paramMsgPre = null) {
        this.m_err = paramErr;
        if (utils_1.utils.isNotNull(paramMsgPre)) {
            this.m_msg = `${paramMsgPre}${paramMsg}`;
        }
        else {
            this.m_msg = paramMsg;
        }
        this.m_data = paramData;
        return this;
    }
    /**
     * 取错信息
     * @return 返回含有错误码的错误信息
     */
    getErrorInfo() {
        if (this.isNotOK) {
            return `[${this.m_err}] ${this.m_msg}`;
        }
        else {
            return '';
        }
    }
    /**
     * 设置错误信息
     * @param paramMsg 设备错误信息
     * @param paramMsgPre 错误信息前缀
     */
    setErrorMsg(paramMsg = '', paramMsgPre = null) {
        if (utils_1.utils.isNotNull(paramMsgPre)) {
            this.m_msg = `${paramMsgPre}${paramMsg}`;
        }
        else {
            this.m_msg = paramMsg;
        }
    }
    /**
     * 取错误信息
     * @return 返回错误信息
     */
    getErrorMsg() {
        return this.m_msg;
    }
    get msg() {
        return this.m_msg;
    }
    set msg(paramMsg) {
        this.m_msg = paramMsg;
    }
    /**
     * 取错误码
     * @return  返回错误码
     */
    getErrorCode() {
        return this.m_err;
    }
    get err() {
        return this.m_err;
    }
    set err(paramError) {
        this.m_err = paramError;
    }
    /**
     *
     * @param paramError 置错误码
     */
    setErrorCode(paramError = constant_1.error_common.ERR_OK) {
        this.m_err = paramError;
    }
    /**
     * 取携带数据
     * @return 携带的数据
     */
    getData() {
        return this.m_data;
    }
    /**
     * 设置携带的数据
     * @param paramData=null 数据
     */
    setData(paramData = null) {
        this.m_data = paramData;
    }
    get data() {
        return this.m_data;
    }
    set data(paramData) {
        this.m_data = paramData;
    }
    /**
     * 设置错误信息为ERR_OK;
     */
    setErrorCodeOK() {
        this.m_err = constant_1.error_common.ERR_OK;
        return this;
    }
    /**
     * 设为失败
     * @return 返回this
     */
    setErrorCodeFail() {
        this.m_err = constant_1.error_common.ERR_FAIL;
        return this;
    }
    /**
     * 设为OK
     * @param data 携带的数据
     * @return 返回this
     */
    setOK(data = null) {
        this.m_err = constant_1.error_common.ERR_OK;
        this.m_data = data;
        return this;
    }
    /**
     * 设为ERR_TRUE
     * @return  返回当前对象
     */
    setTrue() {
        this.m_err = constant_1.error_common.ERR_TRUE;
        return this;
    }
    /**
     * 设为ERR_FALSE
     * @return 返回当前对象
     */
    setFalse() {
        this.m_err = constant_1.error_common.ERR_FALSE;
        return this;
    }
    /**
     * 增加错误信息前缀
     * @param paramMsgPre 前缀
     * @return 返回this
     */
    addErrorPre(paramMsgPre) {
        this.m_msg = `${paramMsgPre}${this.m_msg}`;
        return this;
    }
    /**
     * 将错误信息复制到msgHead
     * 这个是专门针对协议中的msgHead
     * @param paramHead 用于保存的消息头
     * @return 返回this
     */
    copyTo(paramHead) {
        paramHead.err = this.m_err;
        paramHead.errmsg = this.m_msg;
        return this;
    }
    /**
     * 将错误信息从head复制过来
     * 这个是专门针对协议中的msgHead
     * @param paramHead 消息头
     * @return 返回this
     */
    setErrorFromMsghead(paramHead) {
        this.m_err = paramHead.err;
        this.m_msg = paramHead.errmsg;
        return this;
    }
    //
    get isOK() {
        return common_error_1.error_utils.isOK(this.m_err);
    }
    get isNotOK() {
        return common_error_1.error_utils.isNotOK(this.m_err);
    }
    get isFail() {
        return common_error_1.error_utils.isFail(this.m_err);
    }
    get isTrue() {
        return common_error_1.error_utils.isTrue(this.m_err);
    }
    get isFalse() {
        return common_error_1.error_utils.isFalse(this.m_err);
    }
    /**
     * 重载toJSON方法
     * @return 返回非类的对象
     */
    toJSON() {
        return {
            isOK: this.isOK,
            err: this.m_err,
            msg: this.m_msg,
            data: this.m_data,
        };
    }
}
exports.XCommonRet = XCommonRet;
