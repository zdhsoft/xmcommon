import {error_common} from './constant';

/**
 * 错误码判断的工具类
 *
 * @class error_utils
 * - 这个是历史遗留的工具类，尽量不要使用
 *
 */
// tslint:disable-next-line: class-name
export class error_utils {
    /**
     * 是否为OK
     *
     * @static
     * @param paramErr 要判断的错误码
     * @return 判断结果 true表示是OK,否则表示是false
     */
    public static isOK(paramErr: number): boolean {
        return error_common.ERR_OK === paramErr;
    }
    /**
     * 是否为true
     *
     * @static
     * @param paramErr: number 要判断的错误码
     * @return 判断结果 err===ERR_TRUE表示是true, 否则表示是false
     */
    public static isTrue(paramErr: number) {
        return error_common.ERR_TRUE === paramErr;
    }
    /**
     * 是否为false
     *
     * @static
     * @param paramErr 要判断的错误码
     */
    public static isFalse(paramErr: number) {
        return error_common.ERR_FALSE === paramErr;
    }
    /**
     * 是否不是OK
     *
     * @static
     * @param paramErr 要判断的错误码
     * @return判断结果 true表示不是OK, false表示是OK
     */
    public static isNotOK(paramErr: number) {
        return error_common.ERR_OK !== paramErr;
    }
    /**
     * 是否不是ERR_FAIL
     *
     * @static
     * @param paramErr 要判断的错误码
     * @return 判断结果 true表示是error_code.ERR_FAIL, false表示不是error_code.ERR_FAIL
     */
    public static isFail(paramErr: number) {
        return error_common.ERR_FAIL === paramErr;
    }
}
