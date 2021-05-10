"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
class utils {
    /**
     * 取当交utils的版本号
     * @deprecated 无实际使用意义
     * @return 当前utils版本号字符串
     */
    static version() {
        return 'utils 2.0';
    }
    /**
     * 取调用堆栈
     * @static
     * @memberOf utils
     * @return 调用堆栈列表
     */
    static GetStack() {
        const orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (__, stack) {
            return stack;
        };
        const err = new Error();
        Error.captureStackTrace(err);
        const stack = err.stack;
        Error.prepareStackTrace = orig; //恢复
        return stack;
    }
}
exports.utils = utils;
exports.default = utils;
