
export class utils {
    /**
     * 取当交utils的版本号
     * @deprecated 无实际使用意义
     * @return 当前utils版本号字符串
     */
    public static version(): String {
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
		const stack = err.stack as any as  Array<NodeJS.CallSite>;
		Error.prepareStackTrace = orig;  //恢复
		return stack;
	}

}

export default utils;
