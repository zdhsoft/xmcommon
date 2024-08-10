import { error_common } from './constant';
/**
 * 错误码判断的工具类
 *
 * @class error_utils
 * - 这个是历史遗留的工具类，尽量不要使用
 *
 */
export declare class error_utils {
    /**
     * 是否为OK
     *
     * @static
     * @param paramErr 要判断的错误码
     * @return 判断结果 true表示是OK,否则表示是false
     */
    static isOK(paramErr: number): boolean;
    /**
     * 是否为true
     *
     * @static
     * @param paramErr: number 要判断的错误码
     * @return 判断结果 err===ERR_TRUE表示是true, 否则表示是false
     */
    static isTrue(paramErr: number): paramErr is error_common.ERR_TRUE;
    /**
     * 是否为false
     *
     * @static
     * @param paramErr 要判断的错误码
     */
    static isFalse(paramErr: number): paramErr is error_common.ERR_FALSE;
    /**
     * 是否不是OK
     *
     * @static
     * @param paramErr 要判断的错误码
     * @return判断结果 true表示不是OK, false表示是OK
     */
    static isNotOK(paramErr: number): boolean;
    /**
     * 是否不是ERR_FAIL
     *
     * @static
     * @param paramErr 要判断的错误码
     * @return 判断结果 true表示是error_code.ERR_FAIL, false表示不是error_code.ERR_FAIL
     */
    static isFail(paramErr: number): paramErr is error_common.ERR_FAIL;
}
