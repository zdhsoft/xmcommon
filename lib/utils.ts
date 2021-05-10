import * as _ from 'lodash';

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
    public static GetStack(): NodeJS.CallSite[] {
		const orig = Error.prepareStackTrace;
		Error.prepareStackTrace = function (__, stack) {
			return stack;
		};
		const err = new Error();
		Error.captureStackTrace(err);
		const stack = err.stack as any as NodeJS.CallSite[];
		Error.prepareStackTrace = orig;  //恢复
		return stack;
	}

	/**
	 * 取当前调用所在的文件名
	 * @static
	 * @memberOf utils
	 * @param paramStack 调用堆栈列表
	 * @return {string} 返回的文件名
	 */
    public static GetFileNameByStack(paramStack: NodeJS.CallSite[]): String | null {
        if (Array.isArray(paramStack) && paramStack.length > 1) {
            return paramStack[1].getFileName();
        }
        else {
            return null;
        }

	}
	/**
	 * 取当前调用所在的行号
	 * @static
	 * @memberOf utils
	 * @param paramStack 调用堆栈列表
	 * @return 返回的行号
	 */
    public static GetLineNumberByStack(paramStack: NodeJS.CallSite[]): number | null {
        if (Array.isArray(paramStack) && paramStack.length > 1) {
            return paramStack[1].getLineNumber();
        }
        else {
            return null;
        }
	}

    /**
	 * 取当前调用所在的列
	 * @static
	 * @memberOf utils
	 * @param paramStack 调用堆栈列表
	 * @return 返回的列
	 */
    public static GetColumnNumberByStack(paramStack: NodeJS.CallSite[]): number | null {
        if (Array.isArray(paramStack) && paramStack.length > 1) {
            return paramStack[1].getColumnNumber();
        }
        else {
            return null;
        }
    }

	/**
	 * 取当前调用堆栈信息
	 * @static
	 * @memberOf utils
	 * @return 当前的栈信息
	 */
	public static GetStackInfo(): NodeJS.CallSite | null {
		let stackList = this.GetStack();
		if(Array.isArray(stackList) && stackList.length >= 2) {
			return stackList[1];
		}
		else {
			return null;
		}
	}

	/**
	 * 将src的属性复制到dest,只要用for in能够访问到的，都需要复制
	 * @param paramDest     接收属的目标
	 * @param paramSrc      定义属性的目标
	 * @return  无返回
	 */
	public static dataAssign(paramDest: unknown, paramSrc: object): void {
		for (const k in paramSrc) {
			(paramDest as any)[k] = (paramSrc as any)[k];
		}
	}

    /**
     * 判断指定的参数，是否是字符串类型
	 * @static
	 * @memberOf utils
     * @param paramV 被检查的对象
     * @return 是字符串对象，则返回true,否则返回false
     */
    public static isString(paramV: unknown) : boolean {
        return _.isString(paramV);
    }
    /**
     * 判断指定的参数，是否是null或undefined
	 * @static
	 * @memberOf utils
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    public static isNull(paramV: unknown): boolean {
        return paramV === undefined || paramV === null;
	}
	/**
	 * 判断指定的参数，是否是function
	 * @static
	 * @memberOf utils
	 * @param paramV 被检查的对象
	 * @return 如果是，则返回true,否则返回false
	 */
    public static isFunction(paramV: unknown): boolean {
		return _.isFunction(paramV);
	}

	/**
	 * 检查指定的参数，是否是整数
	 * @static
	 * @param paramV 被检查的对象
	 * @return 如果是，则返回true,否则返回false
	 */
    public static isInteger(paramV: unknown): boolean {
		return Number.isInteger(paramV);
	}

    /**
	 * 检查指定的参数，是否是整数
	 * @static
	 * @param paramV 被检查的对象
	 * @return 如果是，则返回true,否则返回false
	 */
    public static isSafeInteger(paramV: unknown): boolean {
        return Number.isSafeInteger(paramV);
    }

	/**
	 * 检查指定的参数，是否是数组
	 * @static
	 * @param  paramV 被检查的对象
	 * @return 如果是，则返回true,否则返回false
	 */
    public static isArray(paramV: unknown) {
		return Array.isArray(paramV);
	}
	/**
	 * 检查指定的参数，是否是number
	 * @static
	 * @param paramV 被检查的对象
	 * @return 如果是，则返回true,否则返回false
	 */
    public static isNumber(paramV: unknown) {
		return _.isNumber(paramV);
	}

	/**
	 * 判断指定的参数，是否是Object
	 * @static
	 * @memberOf utils
	 * @param paramV 被检查的对象
	 * @return 如果是，则返回true,否则返回false
	 */
    public static isObject(paramV: unknown): boolean {
		return _.isObject(paramV);
	}
    /**
     * 判断指定的参数，是否不是 null或undefined
	 * @static
	 * @memberOf utils
     * @param paramV 被检查的对象
     * @return 如果是，则返回true,否则返回false
     */
    public static isNotNull(paramV: unknown): boolean {
		return !(paramV === null || paramV === undefined);
    }

    /**
	 * 检查指定的对象,是不是字符串并且不为空串
	 * @static
	 * @memberOf utils
	 * @param paramV 被检查的对象
	 * @return 检查结果 true表示是,false表示不是
	 */
    public static isNotNullOrEmptyString(paramV: unknown) {
		let r = this.isString(paramV);
		if (r) {
			return (paramV as string).length > 0;
		}
		return false;
    }

}

export default utils;
