/// <reference types="node" />
export declare class utils {
    /**
     * 取当交utils的版本号
     * @deprecated 无实际使用意义
     * @return 当前utils版本号字符串
     */
    static version(): String;
    /**
     * 取调用堆栈
     * @static
     * @memberOf utils
     * @return 调用堆栈列表
     */
    static GetStack(): NodeJS.CallSite[];
}
export default utils;
