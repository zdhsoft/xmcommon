const _ = require("lodash");

/**内存的容量常量定义*/
const MemorySize = {
	/**1K字节数 */
	K:1024,
	/**1M字节数 */
	M:1048576,
	/**1G字节数 */
	G:1073741824,
	/**1T字节数 */
	T:1099511627776,
	/**1P字节数 */
	P:1125899906842624
};

let DateTimeOffset = 0;  //日期偏移值，主要用于测试

/**
 * 一些工具函数集合，依赖lodash
 */
class utils {
    static version() {
        return 'utils 1.0';
	}

	/**
	 * 取调用堆栈
	 * @static
	 * @memberOf utils
	 * @return {[NodeJS.CallSite]} 调用堆栈列表
	 */
	static GetStack() {
		let orig = Error.prepareStackTrace;
		Error.prepareStackTrace = function (__, stack) {
			return stack;
		};
		let err = new Error();
		Error.captureStackTrace(err, arguments.callee);
		let stack = err.stack;
		Error.prepareStackTrace = orig;  //恢复
		return stack;
	}
	/**
	 * 取当前调用所在的文件名
	 * @static
	 * @memberOf utils
	 * @param {[NodeJS.CallSite]} stack 调用堆栈列表
	 * @return {string} 返回的文件名
	 */
	static GetFileNameByStack(stack) {
		return stack[1].getFileName();
	}

	/**
	 * 将src的属性复制到dest,只要用for in能够访问到的，都需要复制
	 * @param {Object} dest     接收属的目标
	 * @param {Object} src      定义属性的目标
	 * @return {void} 无返回
	 */
	static dataAssign(dest, src) {
		for (let k in src) {
			let v = src[k];
			dest[k] = v;
		}
	}

	/**
	 * 取当前调用所在的行号
	 * @static
	 * @memberOf utils
	 * @param {[NodeJS.CallSite]} stack 调用堆栈列表
	 * @return {number} 返回的行号
	 */
	static GetLineNumberByStack(stack) {
		return stack[1].getLineNumber();
	}

	/**
	 * 取当前调用堆栈信息
	 * @static
	 * @memberOf utils
	 * @return {NodeJS.CallSite} 当前的栈信息
	 */
	static GetStackInfo() {
		let stackList = this.GetStack();
		if(Array.isArray(stackList) && stackList.length >= 2) {
			return stackList[1];
		}
		else {
			return null;
		}
	}

	/**
	 * 检查对象的属性，是否符号要求
	 * extra表示是多余的属性，lack表示是缺少的数据
	 * code = 0 表示完全符合，否则存在问题
	 * code = -1 表示paramDestObject不是object对象
	 * code = -2 表示paramSimpleObject不是object对象
	 * code = 1 表示缺少必要的属性
	 * @static
	 * @memberOf utils
	 * @param {Object} paramDestObject 被检查的属性
	 * @param {Object} paramSimpleObject 参考属性
	 * @return {{code:number, extra:[string], lack:[string]}} 返回结果
	 */
	static checkObjectProperty(paramDestObject, paramSimpleObject) {
		let extra = [];
		let lack = [];
		let code = 0;

		if(!this.isObject(paramDestObject)) {
			return {code:-1};
		}
		if(!this.isObject(paramSimpleObject)) {
			return {code:-2};
		}

		for(let k in paramDestObject) {
			let kk = paramSimpleObject[k];
			if(kk === undefined) {
				extra.push(k);
			}
		}

		for(let k in paramSimpleObject) {
			let v = paramSimpleObject[k];
			let kk = paramDestObject[k];
			if(v) {
				if(kk === undefined) {
					lack.push(k);
				}
			}
		}

		if(lack.length > 0) {
			code = 1;
		}
		return {code, extra, lack};
	}

    /**
     * 判断指定的参数，是否是字符串类型
	 * @static
	 * @memberOf utils
     * @param {string} paramV 被检查的对象
     * @return {boolean} 是字符串对象，则返回true,否则返回false
     */
    static isString(paramV) {
        return _.isString(paramV);
    }

    /**
     * 判断指定的参数，是否是null或undefined
	 * @static
	 * @memberOf utils
     * @param {any} paramV 被检查的对象
     * @return {boolean} 如果是，则返回true,否则返回false
     */
    static isNull(paramV) {
        return paramV === undefined || paramV === null;
	}
	/**
	 * 判断指定的参数，是否是function
	 * @static
	 * @memberOf utils
	 * @param {function} paramV 被检查的对象
	 * @return {boolean} 如果是，则返回true,否则返回false
	 */
	static isFunction(paramV) {
		return _.isFunction(paramV);
	}
	/**
	 * 检查指定的参数，是否是整数
	 * @static
	 * @param {*} paramV 被检查的对象
	 * @return {boolean} 如果是，则返回true,否则返回false
	 */
	static isInteger(paramV) {
		return Number.isInteger(paramV);
	}

	/**
	 * 检查指定的参数，是否是数组
	 * @static
	 * @param {*} paramV 被检查的对象
	 * @return {boolean} 如果是，则返回true,否则返回false
	 */
	static isArray(paramV) {
		return Array.isArray(paramV);
	}
	/**
	 * 检查指定的参数，是否是number
	 * @static
	 * @param {*} paramV 被检查的对象
	 * @return {boolean} 如果是，则返回true,否则返回false
	 */
	static isNumber(paramV) {
		return _.isNumber(paramV);
	}

	/**
	 * 判断指定的参数，是否是Object
	 * @static
	 * @memberOf utils
	 * @param {function} paramV 被检查的对象
	 * @return {boolean} 如果是，则返回true,否则返回false
	 */
	static isObject(paramV) {
		return _.isObject(paramV);
	}
    /**
     * 判断指定的参数，是否不是 null或undefined
	 * @static
	 * @memberOf utils
     * @param {any} paramV 被检查的对象
     * @return {boolean} 如果是，则返回true,否则返回false
     */
    static isNotNull(paramV) {
		return !(paramV === null || paramV === undefined);
    }

    /**
	 * 检查指定的对象,是不是字符串并且不为空串
	 * @static
	 * @memberOf utils
	 * @param  {String} paramV 被检查的对象
	 * @return {boolean} 检查结果 true表示是,false表示不是
	 */
	static isNotNullOrEmptyString(paramV) {
		let r = this.isString(paramV);
		if (r) {
			return paramV.length > 0;
		}
		return false;
    }

    /**
     * 异步调用函数,注意：要求第一个参数回调函数
	 * @static
	 * @memberOf utils
     * @param {function} paramFunc 要调用的函数
     * @param {...args} args 要调用的参数
     * @return {...args} 返回回调函数的传入参数列表
     */
    static async WaitFunction(paramFunc, ...args) {
		return new Promise((resolve) => {
			paramFunc((...result) => {
				resolve(result);
			}, ...args);
		});
	}

	/**
     * 异步调用函数,注意：
	 * - 要求第一个参数回调函数,要给函数的参数
	 * - 要求以依次存放到数组paramList传入。
	 *
	 * 这个函数和WaitFunction主要的区别是：传入函数的回调，是放到最后面的，而WaitFunction则要求是第一个参数
	 *
	 * @static
	 * @memberOf utils
	 * @param {function} paramFunc 要调用的函数
	 * @param {...args} args 要传给函数的参数数组
	 */
	static async WaitFunctionEx(paramFunc, ...args) {
		return new Promise((resolve) => {
			paramFunc(...args, (...result) => {
				resolve(result);
			});
		});
	}

    /**
     *  异步调用类成员函数,注意：要求第一个参数回调函数
	 * @static
	 * @memberOf utils
	 * @param {object} paramObject 要调用函数的对象实例
     * @param {String} paramFunc 要调用的函数名称
     * @param {...args} args 要调用的参数
     * @return {...args} 返回回调函数的传入参数列表
     */
    static async WaitClassFunction(paramObject, paramFunction, ...args) {
		return new Promise((resolve) => {
			paramObject[paramFunction]((...result) => {
				resolve(result);
			}, ...args);
		});
	}

    /**
     *  异步调用类成员函数,注意：要求第一个参数回调函数
	 * @static
	 * @memberOf utils
	 * @param {object} paramObject 要调用函数的对象实例
     * @param {String} paramFunc 要调用的函数名称
     * @param {...args} args 要调用的参数
     * @return {...args} 返回回调函数的传入参数列表
     */
    static async WaitClassFunctionEx(paramObject, paramFunction, ...args) {
		return new Promise((resolve) => {
			paramObject[paramFunction](...args, (...result) => {
				resolve(result);
			});
		});
	}

	/**
	 * 设置DateTimeOffset值
	 * @static
	 * @memberOf utils
	 * @param {Integer} datetime_offset 要偏移的时间，单位毫秒数
	 * @return {boolean} 返回true表示设置成功，false表示设置失败，指传入的参数不是有效的整数
	 */
	static SetDateTimeOffset(datetime_offset) {
		if(Number.isInteger(datetime_offset)) {
			DateTimeOffset = datetime_offset;
			return true;
		}
		else {
			return false;
		}
	}
	/**
	 * 取当前时间，会加上datetime_offset的值
	 * 使用这个方法，主要是为了方便调试一些调整日期时间的计算
	 * @return {Number} 当前有偏移的时间
	 */
	static GetDateTimeNow() {
		return Date.now() + DateTimeOffset;
	}
	/**
	 * 取当前时间
	 * @return {Number} 当前时间
	 */
	static GetCurrNow() {
		return Date.now();
	}

	/**
	 * 格式化显示容量
	 *
	 * @static
	 * @param {Integer} v 要格式化的字节数
	 * @return {String} 格式化的字符串
	 * @memberof utils
	 */
	static formatMemory(v) {
		if (this.isNull(v)) {
            v = 0;
        }
		if (v < MemorySize.K) {
			return v.toString(10);
		}
		else if (v < MemorySize.M) {   //1M
			return (v / MemorySize.K).toFixed(2) + "KB";
		}
		else if (v < MemorySize.G) //1M
		{
			return (v / MemorySize.M).toFixed(2) + "MB";
		}
		else if (v < MemorySize.T) //1T
		{
			return (v / MemorySize.G).toFixed(2) + "GB";
		}
		else if (v < MemorySize.P) //1T
		{
			return (v / MemorySize.T).toFixed(2) + "TB";
		}
		else {
			return (v / MemorySize.P).toFixed(2) + "PB";  //1G
		}
    }
    /**
     * 休眠指定的毫秒数
     * @param {Integer} paramT 要休眠的时长
     * @return {void} 无返回值
     */
    static async sleep(paramT) {
        await this.WaitFunction(setTimeout, paramT);
    }

    /**
     * 将params的key和values分别变成两个数组
     * @param {object} params 参数表
     * @return {{keys:[], values:[]}} 返回的结果
     * */
    static keyValues(params) {
        let r = { keys: [], values: [] };
        for (let k in params) {
            r.keys.push(k);
            r.values.push(params[k]);
        }
        return r;
    }

	/**
	 * 格式化数字显示方式
	 * 用法
	 * formatNumber(12345.999,'#,##0.00');
	 * formatNumber(12345.999,'#,##0.##');
	 * formatNumber(123,'000000');
	 * @static
	 * @memberOf utils
	 * @param {Number} num 要格化的数字
	 * @param {String} pattern 模式
	 * @return {String} 格式化后的字符串
	 */
	static formatNumber(num, pattern) {
		let strarr = num ? num.toString().split('.') : ['0'];
		let fmtarr = pattern ? pattern.split('.') : [''];
		let retstr = '';

		let str = strarr[0];
		let fmt = fmtarr[0];
		let i = str.length - 1;
		let comma = false;
		for (let f = fmt.length - 1; f >= 0; f--) {
			switch (fmt.substr(f, 1)) {
				case '#':
					if (i >= 0) retstr = str.substr(i--, 1) + retstr;
					break;
				case '0':
					if (i >= 0) retstr = str.substr(i--, 1) + retstr;else retstr = '0' + retstr;
					break;
				case ',':
					comma = true;
					retstr = ',' + retstr;
					break;
				default:
					break;
			}
		}
		if (i >= 0) {
			if (comma) {
				let l = str.length;
				for (; i >= 0; i--) {
					retstr = str.substr(i, 1) + retstr;
					if (i > 0 && (l - i) % 3 === 0) retstr = ',' + retstr;
				}
			} else retstr = str.substr(0, i + 1) + retstr;
		}

		retstr = retstr + '.';

		str = strarr.length > 1 ? strarr[1] : '';
		fmt = fmtarr.length > 1 ? fmtarr[1] : '';
		i = 0;
		for (let f = 0; f < fmt.length; f++) {
			switch (fmt.substr(f, 1)) {
				case '#':
					if (i < str.length) retstr += str.substr(i++, 1);
					break;
				case '0':
					if (i < str.length) retstr += str.substr(i++, 1);else retstr += '0';
					break;
				default:
					break;
			}
		}
		return retstr.replace(/^,+/, '').replace(/\.$/, '');
	}

}
exports = module.exports = {
    utils,
    MemorySize
};
