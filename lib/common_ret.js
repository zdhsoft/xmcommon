let {error_common, error_utils} = require("./common_error");
//通用的数据返回
/**
 * 这个类主要是增加了错误判断的属性,可以做为一个通用的返回类
 * 要返回的数据可以通过data属性返回
 * 有isOK,isNotOK,isFail三个属性来简化返回结果.
 */
class common_ret {
    /**
     * 构造函数
     * @param {number} err=error_common.ERR_OK 错误码
     * @param {string} msg="" 错误信息
     * @param {Object} data=null 携带数据
     */
    constructor(err = error_common.ERR_OK, msg = "", data = null) {
        this.err  = err;   //错误码
        this.msg  = msg;   //错误信息
        this.data = data;  //返回的数据,默认空数据
    }
    /**
     * 设置错误信息
     * @param {number} err 错误码,参考constant.js中error_common定义
     * @param {string} msg="" 错误信息
     * @param {Object} data=null 数据
     * @param {string} msgpre=null 错误信息前缀 相当于执于了一次addErrorPre
     * @return {common_ret} 返回当前this
     */
    setError(err, msg = "", data = null, msgpre = null) {
        this.err = err;
        if (msgpre) {
            this.msg = `${msgpre}${msg}`;
        }
        else {
            this.msg = msg;
        }
        this.data = data;
        return this;
    }
    /**
     * 取错信息
     * @return {string} 返回含有错误码的错误信息
     */
    getErrorInfo() {
        if (this.isNotOK) {
            return `[${this.err}] ${this.msg}`;
        }
        else {
            return "";
        }
    }

    /**
     * 设置错误信息
     * @param {String} msg 设备错误信息
     * @param {String} msgPre=null 错误信息前缀
     * @return {void}
     */
    setErrorMsg(msg = "", msgPre = null) {
        if (msgPre) {
            this.msg = `${msgPre}${msg}`;
        }
        else {
            this.msg = msg;
        }
    }
    /**
     * 取错误信息
     * @return {string} 返回错误信息
     */
    getErrorMsg() { return this.msg; }

    /**
     * 取错误码
     * @return {integer} 返回错误码
     */
    getErrorCode() { return this.err; }
    /**
     *
     * @param {integer} err=error_code.ERR_OK 设置错误码
     * @return {void}
     */
    setErrorCode(err = error_common.ERR_OK) { this.err = err; }

    /**
     * 取携带数据
     * @return {Object} 携带的数据
     */
    getData() { return this.data; }
    /**
     * 设置携带的数据
     * @param {Object} data=null 数据
     * @return {void}
     */
    setData(data = null) { this.data = data; }

    /**
     * 设置错误信息为ERR_OK;
     * @return {common_ret} 返回this
     */
    setErrorCodeOK() {
        this.err = error_common.ERR_OK;
        return this;
    }
    /**
     * 设为失败
     * @return {common_ret} 返回this
     */
    setErrorCodeFail() {
        this.err = error_common.ERR_FAIL;
        return this;
    }
    /**
     * 设为OK
     * @param {Object} data=null 携带的数据
     * @return {common_ret} 返回this
     */
    setOK(data = null) {
        this.err = error_common.ERR_OK;
        this.data = data;
        return this;
    }
    /**
     * 设为ERR_TRUE
     * @return {common_ret} 返回this
     */
    setTrue() {
        this.err = error_common.ERR_TRUE;
        return this;
    }
    /**
     * 设为ERR_FALSE
     * @return {common_ret} 返回this
     */
    setFalse() {
        this.err = error_common.ERR_FALSE;
        return this;
    }
    /**
     * 增加错误信息前缀
     * @param {String} msgPre 前缀
     * @return {common_ret} 返回this
     */
    addErrorPre(msgPre) {
        this.msg =`${msgPre}${this.msg}`;
        return this;
    }
    /**
     * 将错误信息复制到msgHead
     * 这个是专门针对协议中的msgHead
     * @param {Object} head 用于保存的消息头
     * @return {common_ret} 返回this
     */
    copyTo(head) {
        head.err    = this.err;
        head.errmsg = this.msg;
        return this;
    }
    /**
     * 将错误信息从head复制过来
     * 这个是专门针对协议中的msgHead
     * @param {Object} head 消息头
     * @return {common_ret} 返回this
     */
    setErrorFromMsghead(head) {
        this.err = head.err;
        this.msg = head.errmsg;
        return this;
    }
    //
    get isOK()    { return error_utils.isOK(this.err); }
    get isNotOK() { return error_utils.isNotOK(this.err); }
    get isFail()  { return error_utils.isFail(this.err); }
    get isTrue()  { return error_utils.isTrue(this.err); }
    get isFalse() { return error_utils.isFalse(this.err); }

}

exports.common_ret = common_ret;
