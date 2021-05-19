"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_utils = void 0;
const constant_1 = require("./constant");
/**
 * 错误码判断的工具类
 *
 * @class error_utils
 * - 这个是历史遗留的工具类，尽量不要使用
 *
 */
// tslint:disable-next-line: class-name
class error_utils {
    /**
     * 是否为OK
     *
     * @static
     * @param paramErr 要判断的错误码
     * @return 判断结果 true表示是OK,否则表示是false
     *
     * @memberof errorUtils
     */
    static isOK(paramErr) {
        return constant_1.error_common.ERR_OK === paramErr;
    }
    /**
     * 是否为true
     *
     * @static
     * @param paramErr: number 要判断的错误码
     * @return 判断结果 err===ERR_TRUE表示是true, 否则表示是false
     *
     * @memberof errorUtils
     */
    static isTrue(paramErr) {
        return constant_1.error_common.ERR_TRUE === paramErr;
    }
    /**
     * 是否为false
     *
     * @static
     * @param paramErr 要判断的错误码
     * @return 判断结果 err===ERR_FALSE表示是true, 否则表示false
     *
     * @memberof errorUtils
     */
    static isFalse(paramErr) {
        return constant_1.error_common.ERR_FALSE === paramErr;
    }
    /**
     * 是否不是OK
     *
     * @static
     * @param paramErr 要判断的错误码
     * @return判断结果 true表示不是OK, false表示是OK
     *
     * @memberof errorUtils
     */
    static isNotOK(paramErr) {
        return constant_1.error_common.ERR_OK !== paramErr;
    }
    /**
     * 是否不是ERR_FAIL
     *
     * @static
     * @param paramErr 要判断的错误码
     * @return 判断结果 true表示是error_code.ERR_FAIL, false表示不是error_code.ERR_FAIL
     *
     * @memberof errorUtils
     */
    static isFail(paramErr) {
        return constant_1.error_common.ERR_FAIL === paramErr;
    }
}
exports.error_utils = error_utils;
