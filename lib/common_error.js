//默认的错误码
const error_common = {
    ERR_OK   : 0,       //正确
    ERR_FAIL : -1,      //失败
    ERR_TRUE : -2,      //表示返回true
    ERR_FALSE: -3,      //表示返回false
};

/**
 * 错误码判断的工具类
 *
 * @class errorUtils
 */
class error_utils {
    /**
     * 是否为OK
     *
     * @static
     * @param {Integer} err 要判断的错误码
     * @return {boolean} 判断结果 true表示是OK,否则表示是false
     *
     * @memberof errorUtils
     */
    static isOK(err) {
        return error_common.ERR_OK === err;
    }
    /**
     * 是否为true
     *
     * @static
     * @param {integer} err 要判断的错误码
     * @return {boolean} 判断结果 err===ERR_TRUE表示是true, 否则表示是false
     *
     * @memberof errorUtils
     */
    static isTrue(err) {
        return error_common.ERR_TRUE === err;
    }
    /**
     * 是否为false
     *
     * @static
     * @param {integer} err 要判断的错误码
     * @return {boolean} 判断结果 err===ERR_FALSE表示是true, 否则表示false
     *
     * @memberof errorUtils
     */
    static isFalse(err) {
        return error_common.ERR_FALSE === err;
    }
    /**
     * 是否不是OK
     *
     * @static
     * @param {Integer} err 要判断的错误码
     * @return {boolean } 判断结果 true表示不是OK, false表示是OK
     *
     * @memberof errorUtils
     */
    static isNotOK(err) {
        return error_common.ERR_OK !== err;
    }
    /**
     * 是否不是ERR_FAIL
     *
     * @static
     * @param {Integer} err 要判断的错误码
     * @return {boolean} 判断结果 true表示是error_code.ERR_FAIL, false表示不是error_code.ERR_FAIL
     *
     * @memberof errorUtils
     */
    static isFail(err) {
        return error_common.ERR_FAIL === err;
    }
}


exports.error_common = error_common;
exports.error_utils  = error_utils;
