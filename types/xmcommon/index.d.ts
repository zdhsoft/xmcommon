// Type definitions for xmcommon 0.0
// Project: https://github.com/zdhsoft/xmcommon#readme
// Definitions by: My Self <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
declare module "xmcommon" {
	/**内存的容量常量定义*/
	interface MemorySize{
		/**1K字节数 1024*/
		readonly K:number,
		/**1M字节数 1048576*/
		readonly M:number,
		/**1G字节数 1073741824*/
		readonly G:number,
		/**1T字节数 1099511627776*/
		readonly T:number,
		/**1P字节数 1125899906842624*/
		readonly P:number
	}
	/** 默认的错误码 */
	interface error_common {
		/** 正确 */
		readonly ERR_OK   :number,
		/** 失败 */
		readonly ERR_FAIL :number,
		/** 表示返回true */
		readonly ERR_TRUE :number,
		/** 表示返回false */
		readonly ERR_FALSE:number,
	}

	/**
	 * HttpCall的错误码定义
     * @deprecated
	 */
	interface HttpCallError{
		/** 成功:0 */
		OK:number,
		/** 应答状态不是200:-1*/
		HTTP_ERROR:number,
		/** 应答的数据，不是json数据:-2 */
		INVALID_JSON:number,
		/** 发生错误:-3 */
		HAS_ERROR:number,
		/** 请求错误:-4 */
		REQUEST_ERROR:number,
		/** 应答的json数据,语法格式错误:-5 */
		JSON_SYNTAX:number,
		/** 回调函数不是函数:-6 */
		CALLBACK_NOT_FUNCTION:number,
		/** 参数path不是字符串:-7 */
		PATH_NOT_STRING:number,
		/** 要发送的消息，不是object:-8 */
		MSG_NOT_OBJECT:number,
		/** 要发送的消息，不是字符串:-9 */
		MSG_NOT_STRING:number,
		/**
		 * 判断是否是OK
		 * @param paramValue
		 * @return {boolean} 判断结果
		 */
		isOK(paramValue:number):boolean,
	}

	/**
	 * 日期时间的常量
	 */
	interface DatetimeConstant {
		/** 最小的UTC时间 */
		readonly MIN_UTC    : number,
		/** 最大的UTC时间 */
		readonly MAX_UTC    : number,
		/** 无效的UTC时间 */
		readonly INVALID_UTC: number,
		/** 每天最大的毫少数 */
		readonly MILLIS_PRE_DAY:number,
	}

	/**
	 * 常用的工具函数类
	 */
	class utils {
		/**
		 * 取当前工具类的版本号
		 * @static
		 * @memberOf utils
		 * @return {string} 返回版本号字符串
		 */
		static version():string;

			/**
		 * 取调用堆栈
		 * @static
		 * @memberOf utils
		 * @return 调用堆栈列表
		 */
		static GetStack(): NodeJS.CallSite [];

		/**
		 * 取当前调用所在的文件名
		 * @static
		 * @memberOf utils
		 * @param  stack 调用堆栈列表
		 * @return {string} 返回的文件名
		 */
		static GetFileNameByStack(stack: NodeJS.CallSite[]):any;

		/**
		 * 将src的属性复制到dest,只要用for in能够访问到的，都需要复制
		 * @param dest     接收属的目标
		 * @param  src      定义属性的目标
		 */
		static dataAssign(dest: any, src: any):void;

		/**
		 * 取当前调用所在的行号
		 * @static
		 * @memberOf utils
		 * @param stack 调用堆栈列表
		 * @return 返回的行号
		 */
		static GetLineNumberByStack(stack: NodeJS.CallSite[]):number;
		/**
		 * 取当前调用堆栈信息
		 * @static
		 * @memberOf utils
		 * @return 当前的栈信息
		 */
		static GetStackInfo() : NodeJS.CallSite;
		/**
		 * 检查对象的属性，是否符号要求
		 * + extra表示是多余的属性
		 * + lack表示是缺少的数据
		 * + code
		 * - code = 0 表示完全符合，否则存在问题
		 * - code = -1 表示paramDestObject不是object对象
		 * - code = -2 表示paramSimpleObject不是object对象
		 * - code = 1 表示缺少必要的属性
		 * @static
		 * @memberOf utils
		 * @param paramDestObject 被检查的属性
		 * @param paramSimpleObject 参考属性
		 * @return 返回结果
		 */
        static checkObjectProperty(paramDestObject:any, paramSimpleObject:any):
            { code: number, extra:string[], lack:string[] };


		/**
		 * 判断指定的参数，是否是字符串类型
		 * @static
		 * @memberOf utils
		 * @param paramV 被检查的对象
		 * @return 是字符串对象，则返回true,否则返回false
		 */
		static isString(paramV:any):boolean;
		/**
		 * 判断指定的参数，是否是null或undefined
		 * @static
		 * @memberOf utils
		 * @param paramV 被检查的对象
		 * @return 如果是，则返回true,否则返回false
		 */
		static isNull(paramV:any):boolean;
		/**
		 * 判断指定的参数，是否是function
		 * @static
		 * @memberOf utils
		 * @param paramV 被检查的对象
		 * @return 如果是，则返回true,否则返回false
		 */
		static isFunction(paramV:any):boolean;
		/**
		 * 检查指定的参数，是否是整数
		 * @static
		 * @param paramV 被检查的对象
		 * @return 如果是，则返回true,否则返回false
		 */
		static isInteger(paramV:any):boolean;
		/**
		 * 检查指定的参数，是否是数组
		 * @static
		 * @param paramV 被检查的对象
		 * @return 如果是，则返回true,否则返回false
		 */
		static isArray(paramV:any):boolean;
		/**
		 * 检查指定的参数，是否是number
		 * @static
		 * @param paramV 被检查的对象
		 * @return 如果是，则返回true,否则返回false
		 */
		static isNumber(paramV:any) :boolean;

		/**
		 * 判断指定的参数，是否是Object
		 * @static
		 * @memberOf utils
		 * @param paramV 被检查的对象
		 * @return 如果是，则返回true,否则返回false
		 */
		static isObject(paramV:any):boolean;
		/**
		 * 判断指定的参数，是否不是 null或undefined
		 * @static
		 * @memberOf utils
		 * @param paramV 被检查的对象
		 * @return 如果是，则返回true,否则返回false
		 */
		static isNotNull(paramV:any):boolean;
		/**
		 * 检查指定的对象,是不是字符串并且不为空串
		 * @static
		 * @memberOf utils
		 * @param paramV 被检查的对象
		 * @return 检查结果 true表示是,false表示不是
		 */
		static isNotNullOrEmptyString(paramV:any):boolean;

		/**
		 * 异步调用函数,注意：要求第一个参数回调函数
		 * @static
		 * @async
		 * @memberOf utils
		 * @param paramFunc 要调用的函数
		 * @param args 要调用的参数
		 * @return 返回回调函数的参数列表
		 * @example
		 * function test(paramCallback:function, arg1:any, arg2:any); //第一个参数是回调函数
		 * await utils.WaitFunction(test, arg1, arg2);
		 */
		static WaitFunction(paramFunc:Function, ...args:any[]):any[];

		/**
		 * 异步调用函数,注意：
		 * - 要求第一个参数回调函数,要给函数的参数
		 * - 要求以依次存放到数组paramList传入。
		 *
		 * 这个函数和WaitFunction主要的区别是：传入函数的回调，是放到最后面的，而WaitFunction则要求是第一个参数
		 *
		 * @static
		 * @async
		 * @memberOf utils
		 * @param  paramFunc 要调用的函数
		 * @param  args 要传给函数的参数数组
		 * @return 返回回调函数的参数列表
		 * @example
		 * function test(arg1:any, arg2:any, paramCallback:function); //回调函数在最后面
		 * await utils.WaitFunctionEx(test, arg1, arg2);
		 * 		 */
		static WaitFunctionEx(paramFunc:Function, ...args:any[]):any[];

		/**
		 *  异步调用类成员函数,注意：要求第一个参数回调函数
		 * @static
		 * @async
		 * @memberOf utils
		 * @param paramObject 要调用函数的对象实例
		 * @param paramFunc 要调用的函数名称
		 * @param args 要调用的参数
		 * @return 返回回调函数的参数列表
		 * @example
		 * class CTest {
		 * 	public function test(paramCallback:function, arg1:any, arg2:any);//第一个参数是回调函数
		 * };
		 * let t = new CTest();
		 * await utils.WaitClassFunction(t, "test", arg1, arg2);
		 */
		static WaitClassFunction(paramObject:any, paramFunction:string, ...args:any[]):any[];
		/**
		 *  异步调用类成员函数,注意：要求最后一个参数回调函数
		 * @static
		 * @async
		 * @memberOf utils
		 * @param paramObject 要调用函数的对象实例
		 * @param paramFunc 要调用的函数名称
		 * @param args 要调用的参数
		 * @return 返回回调函数的传入参数列表
		 * @example
		 * class CTest {
		 * 	public function test(arg1:any, arg2:any， paramCallback:function); //回调函数在最后面
		 * };
		 * let t = new CTest();
		 * await utils.WaitClassFunctionEx(t, "test", arg1, arg2);
		*/
		static WaitClassFunctionEx(paramObject:any, paramFunction:string, ...args:any[]):any[];

		/**
		 * 设置DateTimeOffset值
		 * @static
		 * @memberOf utils
		 * @param datetime_offset 要偏移的时间，单位毫秒数
		 * @return 返回true表示设置成功，false表示设置失败，指传入的参数不是有效的整数
		 */
		static SetDateTimeOffset(datetime_offset:number):boolean;
		/**
		 * 取当前时间，会加上datetime_offset的值
		 * 使用这个方法，主要是为了方便调试一些调整日期时间的计算
		 * @return 当前有偏移的时间
		 */
		static GetDateTimeNow():number;
		/**
		 * 取当前时间
		 * @return 当前时间
		 */
		static GetCurrNow():number;
		/**
		 * 格式化显示容量
		 *
		 * @static
		 * @param v 要格式化的字节数
		 * @return 格式化的字符串
		 * @memberof utils
		 */
		static formatMemory(v:number):string;

		/**
		 * 休眠指定的毫秒数
		 * @param paramT 要休眠的时长
		 * @return 无返回值
		 */
		static sleep(paramT:number):void;
		/**
		 * 将params的key和values分别变成两个数组
		 * @param params 参数表
		 * @return 返回的结果
		 * */
		static keyValues(params:any):{keys:string [], values:any []};

		/**
		 * 格式化数字显示方式
		 * 用法
		 * formatNumber(12345.999,'#,##0.00');
		 * formatNumber(12345.999,'#,##0.##');
		 * formatNumber(123,'000000');
		 * @static
		 * @memberOf utils
		 * @param num 要格化的数字
		 * @param pattern 模式
		 * @return 格式化后的字符串
		 */
		static formatNumber(num:number, pattern:string):string;

		/**
		 * 将指定的内容，转换为整数，如果转换失败，则用缺省值
		 * @param paramSrcInteger 要被转换为整数的字符串
		 * @param paramDefault 缺省值
		 * @return 转换后的整数
		 */
		static ToInteger (paramSrcInteger:string, paramDefault:number):number;
		/**
		 * 将指定的内容，转换为数字，如果转换失败，则用缺省值
		 * @param paramSrcNumber 要被转换为数字的字符串
		 * @param paramDefault 缺省值
		 * @return 转换后的浮点数
		 */
		static ToFloat(paramSrcNumber:string, paramDefault:number):number;
		/**
		 * 将字符串转换为json，如果出错返回undefined
		 * 这个主要的做是，对异常做了处理，减少其它地方对异常处理的问题。
		 * @param paramJsonString Json格式的字符串
		 * @return 转换后的对象
		 */
        static JsonParse (paramJsonString:string): any;

        /**
         * 检查指定的文件或目录是否存在
         * @param paramPath 指定的文件的目录全路径
         * @return 检查结果
         *  - true 表示存在
         *  - false 表示不存在
         */
        static fileExists(paramPath: string): boolean;
        /**
         * 原路径移动到新路径
         * - 注：在windows下面，C盘或非同盘符的文件是改不了名的
         * @param {String} paramOldFilename
         * @param {String} paramNewFilename
         * @return {{ret: boolean, errInfo: string}} 移动结果
         *  - ret = true 表示移动成功
         *  - ret = false 表示移动失败
         *  - errInfo 出错信息
         */
        static renameFile(paramOldFilename: string, paramNewFilename: string): Promise<{ret: boolean, errInfo: string}>;
		/**
		 * 创建目录
		 * @param paramPath 要创建的目录,支持多层级创建
		 * @param paramMode 创建后，目录的权限，默认为0o777
		 * @return 返回创建结果
		 */
        static mkdirsSync(paramPath:string, paramMode?: number): boolean;

		/**
		 * 创建目录
         * - 这个函数与mkdirsSync区别是，这个函数会返回失败的错误信息
		 * @param paramPath 要创建的目录,支持多层级创建
		 * @param paramMode 创建后，目录的权限，默认为0o777
		 * @return 返回创建结果
         *  - ret = true 表示创建成功
         *  - ret = false 表示创建失败 ，msg为错误信息
		 */
        static mkdirsSyncEx(paramPath: string, paramMode?: number): { ret: boolean, msg: string};

        /**
         * 将数字转换为百分比的字符串
         * - 精确到0.01%
         * @param paramValue 要格式化的值
         * @param paramDefault 无效值后，返回的字符串
         * @return 格式化的百分比字符串
         *  - 对于paramValue为null或undefined
         */
        static formatPercentage(paramValue: number, paramDefault?: string): string;

		/**
		 * 解析参数列表
		 * @param paramArgs 参数列表
		 * @return _是未能识别的参数数组，args是识别后的参数对象
		 */
        static options(paramArgs:string[]):{_:any [], args:any };
        /**
         * 随机一个整数
         * @return number
         */
        static randomInteger(): number;
        /**
         * 随机一个范围的整数
         * @param {number} paramMaxInteger 大于1的整数
         * @return number
         */
        public static randomScope(paramMaxInteger: number): number;
        /**
         * 随机一个指定最大值和最小值范围的整数
         * @param {number} paramMin 大于等于0的整数
         * @param {number} paramMax 大于1的整数
         * @return number
         */
        public static randomBetween(paramMin: number, paramMax: number): number;
	}


	/**
	 * 控制台日志类
	 */
	interface LogConsole {
		/** 名称或tag */
		readonly name: string;
		trace(...paramLog:any[]):void;
		debug(...paramLog:any[]):void;
		info (...paramLog:any[]):void;
		warn (...paramLog:any[]):void;
		error(...paramLog:any[]):void;
		fatal(...paramLog:any[]):void;
	}

	/**
	 * 生成日志前缀
	 * @param  paramFilename 当前的文件名
	 * @param  args 其它前缀
	 * @return {[shortpath, ...args]} 返回结果
	 */
	function logPrefix(paramFilename:string, ...args:string[]):string[];
	/**
	 * 取指定tag的log
	 * 如果没有这个tag的日志，则创建一个
	 * @param tag 取指定tag的log
	 * @return 返回log
	 */
	function getLogger(tag:string):LogConsole;

	/**
	 * 取指定tag的local log
	 * 如果没有这个tag的日志，则创建一个
	 * @param tag 取指定tag的log
	 * @return 返回log
	 */
	function getLocalLogger(tag:string):LogConsole;

	/**
	 * 重新设置getLogger
	 * - 返回true表示设置成功
	 * - 返回false表示paramGetLogger不是一个函数
	 * @param paramGetLogger 新的getLogger函数实现，替换getLogger
	 * @return 设置结果
	 */
	function setGetLogger(paramGetLogger:Function):boolean;

	/**
	 * 一组编码函数
	 */
	class codeUtils{
		/**
		 * 对字符串进行Base64编码
		 * @param paramStringValue 要编码的字符串
		 * @return base64编码后的字符串
		 */
		static StringBase64Encode(paramStringValue:string):string;
		/**
		 * 将字符串编码后base64还原成字符串
		 * @param paramBase64Value 编码后的base64字符串
		 * @param encoding 字符串编码，主要有utf-8等
		 * @return 返回解码后的字符串
		 */
		static StringBase64Decode(paramBase64Value:string, encoding?:string):string;
		/**
		 * 生成字符串的sha256编码
		 * @param paramText 要生成sha256的字符串
		 * @param paramKey sha256需要的key
		 * @return 小写十六进制的sha256字符串
		 */
		static HMacSHA256FromString(paramText:string, paramKey:string):string;

		/**
		 * 生成字符串的Hsha256编码，注意这个不是hmac的，纯sha256编码
		 * @param paramText 要生成sha256的字符串
		 * @param paramEncode 指定输出的编码类型 hex or base64
		 * @return 小写十六进制或BASE64的sha256字符串，如果指定的编码无效，则返回null
		 */
		static SHA256FromString(paramText:string, paramEncode:string):string;

		/**
		 * 生成字符串的MD5
		 * @param {string} paramString 要生成md5的字符串
		 * @param {string} paramEncode 生成md5后的编码 hex表示是小写16进制字符串 base64表示的base64编码的字符串
		 * @return {string} 生成的md5
		 */
        static MD5FromString(paramString:string, paramEncode?:string):string;

        /**
         * 根据变参，将变参数连接起来后，生成md5
         * @param paramOptions encode表示编码方式，可以是是hex或base64，默认为hex,
         * capital:表示是否是大小，默认是小写, split表示参数连接成符串时间隔字符串
         * @param  args 可变参数
         * @example
         * let options = {
         *  encode:'hex',  //不存在，则默认为hex
         *  capital:false, //不存在，则默认为false,当encode为'hex'时有效
         *  split:''       //不存在，则默认为''
         * };
         * console.log(codeUtils.MD5FromArgs(options, 1,2,3,4,"test"));
         */
       static MD5FromArgs(paramOptions:any, ...args:any[]) : string;
	}

	/**
	 * 位操作工具
	 */
	class bitUtils {
		/**
		 * 检查是否是有效的标志位
		 * @param paramBitSite 指定的标志位
		 * @return 检查结果
		 */
		static isValidBitSite(paramBitSite:number):boolean;
		/**
		 * 取指定标志位的标
		 * @param paramFlag 存放标志的31位整数
		 * @param paramBitSite 对应的标志位，在[0,30]之间
		 * @return 返回0或1
		 */
		static GetFlag(paramFlag:number, paramBitSite:number):number;
		/**
		 * 设置标志位的值
		 * @param paramFlag 存放标志的31位整数
		 * @param paramBitSite 对应的标志位，在[0,30]之间
		 * @param paramValue 要设置的值，只能是0或1
		 * @return 修改标志的新值
		 */
		static SetFlag(paramFlag:number, paramBitSite:number, paramValue:number):number;
	}


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
		 * @param err 要判断的错误码
		 * @return 判断结果 true表示是OK,否则表示是false
		 *
		 * @memberof errorUtils
		 */
		static isOK(err:number):boolean;
		/**
		 * 是否为true
		 *
		 * @static
		 * @param err 要判断的错误码
		 * @return 判断结果 err===ERR_TRUE表示是true, 否则表示是false
		 *
		 * @memberof errorUtils
		 */
		static isTrue(err:number):boolean;
		/**
		 * 是否为false
		 *
		 * @static
		 * @param err 要判断的错误码
		 * @return 判断结果 err===ERR_FALSE表示是true, 否则表示false
		 *
		 * @memberof errorUtils
		 */
		static isFalse(err:number):boolean;
		/**
		 * 是否不是OK
		 *
		 * @static
		 * @param err 要判断的错误码
		 * @return 判断结果 true表示不是OK, false表示是OK
		 *
		 * @memberof errorUtils
		 */
		static isNotOK(err:number):boolean;
		/**
		 * 是否不是ERR_FAIL
		 *
		 * @static
		 * @param err 要判断的错误码
		 * @return 判断结果 true表示是error_code.ERR_FAIL, false表示不是error_code.ERR_FAIL
		 *
		 * @memberof errorUtils
		 */
		static isFail(err:number):boolean;
	}
    //通用的数据返回接口
    interface ICommonRet {
        /** 判断是否成功 true表示成功，false表示失败 */
        isOK : boolean
        /** 错误码 */
        err  : number;
        /** 错误信息 */
        msg ?: string;
        /** 携带数据 */
        data?: any;
    }

	//通用的数据返回
	/**
	 * 这个类主要是增加了错误判断的属性,可以做为一个通用的返回类
	 * 要返回的数据可以通过data属性返回
	 * 有isOK,isNotOK,isFail三个属性来简化返回结果.
	 */
	class common_ret {
		/**
		 * 构造函数
		 * @param err=error_common.ERR_OK 错误码
		 * @param msg="" 错误信息
		 * @param data=null 携带数据
		 */
		constructor(err?:number,msg?:string, data?:any);
		/**
		 * 设置错误信息
		 * @param err 错误码,参考constant.js中error_common定义
		 * @param msg="" 错误信息
		 * @param data=null 数据
		 * @param msgpre=null 错误信息前缀 相当于执于了一次addErrorPre
		 * @return 返回当前this
		 */
		setError(err:number, msg?:string, data?:any, msgpre?:string):common_ret;
		/**
		 * 取错信息
		 * @return 返回含有错误码的错误信息
		 */
		getErrorInfo():string;
		/**
		 * 设置错误信息
		 * @param msg 设备错误信息
		 * @param msgPre=null 错误信息前缀
		 */
		setErrorMsg(msg?:string, msgPre?:string):void;
		/**
		 * 取错误信息
		 * @return 返回错误信息
		 */
		getErrorMsg():string;

		/**
		 * 取错误码
		 * @return 返回错误码
		 */
		getErrorCode():number;
		/**
		 *
		 * @param err=error_code.ERR_OK 设置错误码
		 */
		setErrorCode(err?:number):void;

		/**
		 * 取携带数据
		 * @return 携带的数据
		 */
		getData(): any;
		/**
		 * 设置携带的数据
		 * @param  data=null 数据
		 */
		setData(data?:any):void;

		/**
		 * 设置错误信息为ERR_OK;
		 * @return 返回this
		 */
		setErrorCodeOK():common_ret;
		/**
		 * 设为失败
		 * @return 返回this
		 */
		setErrorCodeFail():common_ret;
		/**
		 * 设为OK
		 * @param data=null 携带的数据
		 * @return 返回this
		 */
		setOK(data?: any): common_ret;
		/**
		 * 设为ERR_TRUE
		 * @return 返回this
		 */
		setTrue(): common_ret;
		/**
		 * 设为ERR_FALSE
		 * @return 返回this
		 */
		setFalse(): common_ret
		/**
		 * 增加错误信息前缀
		 * @param msgPre 前缀
		 * @return 返回this
		 */
		addErrorPre(msgPre: string): common_ret;
		/**
		 * 将错误信息复制到msgHead
		 * 这个是专门针对协议中的msgHead
		 * @param head 用于保存的消息头
		 * @return 返回this
		 */
		copyTo(head:any): common_ret;
		/**
		 * 将错误信息从head复制过来
		 * 这个是专门针对协议中的msgHead
		 * @param head 消息头
		 * @return 返回this
		 */


		setErrorFromMsghead(head: any): common_ret;
        /**
         * 重载toJSON，返回ICommonRet对象
         */
        toJSON():ICommonRet;
		//一组属性
		readonly isOK:boolean;
		readonly isNotOK:boolean;
		readonly isFail:boolean;
		readonly isTrue:boolean;
		readonly isFalse:boolean;


	}



	/**
	 * 日期相关的工具类
	 *
	 * @class datetimeUtils
	 */
	class datetimeUtils {
		/**
		 * 取版本号
		 * @return {string} 版本字符串
		 */
		static version():string;
		/**
		 * 取当前UTC时间戳,毫秒数
		 * @return {number} 当前UTC时间戳
		 */
		static getNow():number;
		/**
		 * 取当前本地时间戳
		 * @return {number} 当前本地时间戳
		 */
		static getLocalNow():number;

		/**
		 * 取当前UTC时间戳,毫秒数
		 * @see getNow()
		 * @return {number} 当前UTC时间戳
		 */
		static getUTCNow():number;
		/**
		 * 取当前UTC时间戳,秒数
		 * @return {number} 当前UTC时间戳
		 */
		static getNowSecond():number;
		/**
		 * 取当前UTC时间戳,秒数
		 * @see getNowSecond()
		 * @return {number} 当前UTC时间戳
		 */
		static getUTCNowSecond():number;
		/**
		 * 取当前本地时间戳，秒数
		 * @return {number} 当前本地时间戳
		 */
		static getLocalNowSecond():number;
		/**
		 * 取时区，单位分
		 * @return {number} 时区
		 */
		static getTimeZoneMinute():number;
		/**
		 * 取时区，单位秒
		 * @return {number} 时区
		 */
		static getTimeZoneSecond():number;
		/**
		 * 取时区，单位毫秒
		 * @return {number} 时区
		 */
		static getTimeZoneMillis():number;
		/**
		 * 更新时区
		 * @return {void}
		 */
		static UpdateTimeZoneValue():number;

		/**
		 * 将指定日期的对象,转换为年月日-时分秒的字符串
		 * 格式为YYYY-MM-DD HH:mm:ss.ddd
		 *
		 * @static
		 * @param {Date} date 要转的日期对象
		 * @param {boolean} [millsFlag=true] 是否带毫秒数
		 * @param {String} [daysplit='-'] 日期分隔符
		 * @param {String} [timesplit=':'] 时间分隔符
		 * @param {String} [millissplit='.'] 毫秒分隔符
		 * @param {String} [datetimesplit=' '] 日期和时间的分隔符
		 * @return {String} 转换后的字符串
		 *
		 * @memberOf datetimeUtils
		 */
		static dateString(date:Date, millsFlag?:boolean, daysplit?:string, timesplit?:string, millissplit?:string, datetimesplit?:string):string;
		/**
		 * 生成YYYYMMDD_HHmmssddd格式的时间字符串
		 *
		 * @static
		 * @param {Date} date 要生成日期
		 * @param {boolean} [millisFlag=true] 是要否要毫秒
		 * @return {String} 生成的字符串
		 *
		 * @memberof datetimeUtils
		 */
		static dateStringByFile(date:Date, millisFlag?:boolean):string;
		/**
		 * 将当前时间，转换为时间字符串
		 *
		 * @static
		 * @param {boolean} millsFlag true 是否带毫秒数
		 * @returns
		 *
		 * @memberOf datetimeUtils
		 */
		static nowDateString(millsFlag?:boolean):string;
		/**
		 * 判断是否是有效的时间戳
		 * @param {Number} paramUTC
		 * @return {boolean} 判断结果
		 * - true 表示有效
		 * - false 表示无效
		 */
		static isValidUTC(paramUTC:number):boolean;
		/**
		 * 将指定日期的时间戳,转换为年月日-时分秒的字符串
		 * 格式为YYYY-MM-DD HH:mm:ss.ddd
		 *
		 * @static
		 * @param paramUTC 要转的日期对象
		 * @param millsFlag 是否带毫秒数
		 * @param daysplit 日期分隔符
		 * @param timesplit 时间分隔符
		 * @param millissplit 毫秒分隔符
		 * @param datetimesplit 日期和时间的分隔符
		 * @return 转换后的字符串, 如果是无效时间戳，则返回null
		 *
		 * @memberOf datetimeUtils
		 */
		static dateStringByUTC(paramUTC:number, millisFlag?:boolean, daysplit?:string, timesplit?:string, millissplit?:string, datetimesplit?:string):string;
		/**
		 * 将指定日期的时间,转换为年月日-时分秒的字符串
		 * 格式为YYYY-MM-DD HH:mm:ss.ddd
		 *
		 * @static
		 * @param {Number} paramLocalTime 要转的日期对象
		 * @param {boolean} [millsFlag=true] 是否带毫秒数
		 * @param {String} [daysplit='-'] 日期分隔符
		 * @param {String} [timesplit=':'] 时间分隔符
		 * @param {String} [millissplit='.'] 毫秒分隔符
		 * @param {String} [datetimesplit=' '] 日期和时间的分隔符
		 * @return {String} 转换后的字符串, 如果是无效时间戳，则返回null
		 *
		 * @memberOf datetimeUtils
		 */
		static dateStringByMillis(paramLocalTime:number, millisFlag?:boolean, daysplit?:string, timesplit?:string, millissplit?:string, datetimesplit?:string):string;
		/**
		 * 将yyyy-mm-dd hh:mm:ss的时间日期字符串，转换为utc时间戳，单位毫秒数
		 * @param {string} paramDateTimeString 要解析的时间字符串
		 * @return {number} 返回结果， 0 表示失败，无效时间
		 */
		static DateTimeStringToUTC(paramDateTimeString:string):number;
		/**
		 * 将UTC时间转换为本地时间
		 * @param {Number} paramUTC
		 * @return {Number}
		 */
		static ToLocalTime(paramUTC:number):number;
		/**
		 * 将本地时间转换为UTC时间
		 * @param {Number} paramLocalTime
		 * @return {Number}
		 */
		static ToUTCTime(paramLocalTime:number):number;
		/**
		 * 取当天0点时间的UTC时间
		 * @param {Number} paramUTC 当前的UTC时间，单位毫秒
		 * @return {Number}
		 */
		static getTodayZeroTime(paramUTC:number):number;
		/**
		 * 判断是不是同一天
		 * @param {Number} paramUTC1
		 * @param {Number} paramUTC2
		 * @return {boolean}
		 */
		static isSameDay(paramUTC1:number, paramUTC2:number):boolean;

        /**
         * 用时间戳的时间比较本地时间相关的天数差
         * @param paramUTC1 时间戳1，毫秒数
         * @param paramUTC2 时间戳2，毫秒数
         * @return 相差的天数，同一天，返回0
         */
		static diffLocalDays(paramUTC1:number, paramUTC2:number): number;

        /**
         * 比较两个日期本地时间的天数差
         * @param paramDate1 日期1
         * @param paramDate2 日期2
         * @return 相差的天数，同一天，返回0
         */
	    static diffLocalDaysByDate(paramDate1: Date, paramDate2: Date): number;
		/**
		 * 计算，元年到指定时间戳的本地天数
		 * @param {number} paramUTC
		 * @return {number} 计算出来的本地天数
		 */
		static CalcLocalDaysByUTC(paramUTC:number):number;
		/**
		 * 计算，元年到指定时间的本地天数
		 * @param {Date} paramDate 指定的日期
		 * @return {number} 计算出来的本地天数
		 */
		static CalcLocalDaysByDate(paramDate:Date):number;
	}

	/**
	 * 一个封装了http请求的类
	 * - 对于GET和POST的方法，返回的数据要求都是JSON，否则出错
	 * - 对于POST则请求的数据，也是JSON数据(这里会把Object转换成JSON字符串)
	 * @deprecated 这个将放弃不使用，将直接使用request
	 */
	class CHttpCall {
		/**
		 * 初始化函数
		 * @param paramHost host的地址
		 * @param paramPort host的端口
		 */
		init(paramHost:string, paramPort:number):void
		/**
		 * json get方式请求数据
		 * @param cb 完成后的回调函数
		 * @param path api路径 包括/ 如/guestlogin
		 * @param msg 要发送的消息
		 * @param httpsFlag 是否是用https
		 * @return 错误码
		 */
		jsonGet(cb:(code:number,data:any)=>void, path:string, msg:string, httpsFlag?:boolean):number;

	    /**
		 * json post方式请求数据,传入的消息是字符串
		 * @param cb 完成后的回调函数
		 * @param path api路径 包括/ 如/guestlogin
		 * @param msg 要发送的消息
		 * @param paramHeaders 自定义的http头
		 * @param paramHttpsFlag 是否使用 https
		 * @return 错误码
		 */
		jsonPostStringBody(cb:(code:number,data:any)=>void, path:string, msg:string, paramHeaders:any, paramHttpsFlag?:boolean):number;
		/**
		 * json post方式请求数据
		 * @param cb 完成后的回调函数
		 * @param path api路径 包括/ 如/guestlogin
		 * @param msg 要发送的消息
		 * @param paramHeaders 自定义的http头
		 * @param paramHttpsFlag 是否使用 https
		 * @return 错误码
		 */
        jsonPost(cb:(code:number,data:any)=>void, path:string, msg:any, paramHeaders:any, paramHttpsFlag?:boolean):number;

        /**
         *同步的json post方式请求数据
        * @async
        * @param path api路径 包括/ 如/guestlogin
        * @param msg 要发送的消息
        * @param paramHeaders 自定义的http头
        * @param paramHttpsFlag 是否使用 https
        * @return 响应的错误和数据
        * @example
        * async function test() {
        *  let h = new CHttpCall();
        *  h.init('127.0.0.1', 80);
        *  let r = await h.asyncJsonPost('/api/test', {name:'test'});
        *  console.log(r);
        * }
        */
        asyncJsonPost(path:string, msg:any, paramHeaders?:any, paramHttpsFlag?:boolean): {code:number, data:any};
        /**
         * json get方式请求数据，要求返回的数据为JSON数据
         * @async
         * @param path api路径 包括/ 如/guestlogin
         * @param msg 要发送的消息
         * @param  httpsFlag 是否是用https
         * @return {{code:number, data:object}} 响应数据
         */
        asyncJsonGet(path:string, msg: any, httpsFlag?:boolean) :{code:number, data:any};
	}
	/**
	 * CHttpCall一个实例
	 * @deprecated
	 */
	let HttpCall:CHttpCall;
	//------------------------------------------

	/**
	 * 一个简单编码的类
	 * 通过位移算法对数据进行编码
	 * 这里使用的随机数算是非平衡算法，只用于这个编解码运算
	 */
	class SimpleCode {
		/**
		 * 数据编码
		 * @param paramSeed 编码种子
		 * @param paramData 要编码的数据
		 * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示编码的种子， data表示编码后的数据
		 */
		Encode(paramSeed:number, paramData:Buffer):{code:number,seed:number, data:Buffer};
		/**
		 * 数据解码
		 * @param paramSeed 初始种子
		 * @param paramData 编码后的数据
		 * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示解码的种子， data表示解码后的数据
		 */
		Decode(paramSeed:number, paramData:Buffer):{code:number, seed:number, data:Buffer};
		/**
		 * 生数据编码包
		 * @param paramSeed 初始种子
		 * @param paramData 要编码的数据
		 * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示编码的种子， data表示编码后的数据
		 */
		EncodePackage(paramSeed:number, paramData:Buffer):{code:number, seed:number, data:Buffer};
		/**
		 * 数据解码包
		 * @param 经EncodePackage编码的数据
		 * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示解码的种子， data表示解码后的数据
		 */
		DecodePackage(paramData:Buffer):{code:number, seed:number, data:Buffer};
	}
    /**
     * watch指定的js文件，并加载回调
     * 这个主要是用于动态加载
     * @notice 最终于文件名是由path+file组成，对于path不能使用相对路径
     * @param {function} paramCallback 文件有变化，加载后的回调函数
     * @param {string} paramPath 环境所在的路径 这里一定要填写绝对路径，否则会侦听不了文件的变化
     * @param {string} paramFile 要watch的文件名
     * @param {boolean} paramChangeCallback 有变化才回调
     * @return {void}
     */
	function watchRequire(paramCallback:(data:any)=>void, paramPath:string, paramFile:string, paramChangeCallback?:boolean):void;

    /** 生成中文大写选项 */
    interface IChineseOption {
        /** 人民币前缀 */
        prefix?  : string;
       /** 负数前缀 */
        negative?: string;
       /** 后缀：整 */
        zheng?   : string;
    }
	/**
	 * 货币类
	 * 一个专门用于中文货币运算的的类，解决货币运算过程中问题
	 * @maxvalue 90071992547409.91
	 * @minvalue -90071992547409.91
	 * @example
	 * let m = [];
	 * let c = new CNYCurrency(-12345);
	 * m.push(c);
	 * m.push(c.add(109999));
	 * m.push(c.sub(10));
	 * m.push(c.div(0.01));
	 * m.push(c.mul(10));
	 * m.push(c.mul(0.01));
	 *
	 * let tt = new CNYCurrency(0);
	 * tt.selfAdd(2805307.04);
	 * tt.selfAdd(4323515.28);
	 * tt.selfAdd(2805307.04);
	 * tt.selfAdd(3281107.13);
	 * m.push(tt);
	 *
	 * for(let mm of m) {
	 *      console.log(mm.value, mm.intValue, mm.toString(), mm.format(true, true), mm.Chinese());
	 * }
	 *
	 * //输出结果
	 * //-12345 -1234500 -12345.00 ￥-1,2345.00 负壹万贰千叁佰肆拾伍元整
	 * //97654 9765400 97654.00 ￥9,7654.00 玖万柒千陆佰伍拾肆元整
	 * //-12355 -1235500 -12355.00 ￥-1,2355.00 负壹万贰千叁佰伍拾伍元整
	 * //-1234500 -123450000 -1234500.00 ￥-123,4500.00 负壹佰贰拾叁万肆千伍佰元整
	 * //-123450 -12345000 -123450.00 ￥-12,3450.00 负拾贰万叁千肆佰伍拾元整
	 * //-123.45 -12345 -123.45 ￥-123.45 负壹佰贰拾叁元肆角伍分
	 * //13215236.49 1321523649 13215236.49 ￥1321,5236.49 壹千叁佰贰拾壹万伍千贰佰叁拾陆元肆角玖分
	 */


     class CNYCurrency {
        /**  */
        /**
         * 构造函数
         * @param paramValue 初始值
         */
        public constructor(paramValue?: number | string | CNYCurrency | null | undefined);
        /** 判断指定的对象，是不是指定的CNYCurrency对象 */
        public static isCurrency(paramV: any): boolean;
	    /** 货币值 */
	    public readonly value : number;
	    /** 货币整数值，精确到分 */
	    public readonly intValue : number;
	    /** 是否有错 */
	    public readonly isErr : boolean
	    /** 错误信息 */
	    public readonly errMsg : string;
	    /** 重置为0 */
        public Reset() : void;
        /**
         * 赋值
         * @param paramValue 新值
         * @return 返回当前对象
         */
        public assign(paramValue?: number | string | CNYCurrency | null | undefined): CNYCurrency;
	    /**
	     * 加一个值
	     * @param paramNumber 值
	     * @return 返回计算后的Currency对象
	     */
	    public add(paramNumber: number | string | CNYCurrency | null | undefined): CNYCurrency;
	    /**
	     * 自加一个值
	     * @param paramNumber 值
	     * @return 返回自己
	     */
	    public selfAdd(paramNumber: number | string | CNYCurrency | null | undefined): CNYCurrency;
	    /**
	     * 减一个值
	     * @param paramNumber 值
	     * @return 返回计算后的Currency对象
	     */
	    public sub(paramNumber: number | string | CNYCurrency | null | undefined): CNYCurrency;
	    /**
	     * 自减一个值
	     * @param paramNumber 值
	     * @return 返回计算后的Currency对象
	     */
	    public selfSub(paramNumber: number | string | CNYCurrency | null | undefined): CNYCurrency;
	    /**
	     * 乘一个值
	     * @param paramNumber 值
	     * @return 返回计算后的Currency对象
	     */
	    public mul(paramNumber: number | string): CNYCurrency;
        /**
         * 自乘一个值
         * @param paramNumber 值
         * @return {boolean} 计算结果
         *  - true 表示计算成功
         *  - false 表示计算失败
         */
	    public selfMul(paramNumber: number | string): boolean;
	    /**
	     * 除以一个值
	     * @param paramNumber 值
	     * @return 返回计算后的Currency对象
	     */
	    public div(paramNumber: number | string): CNYCurrency;
        /**
         * 自除以一个值
         * @param {number | string} paramNumber 值
         * @return {boolean} 计算结果
         *  - true 表示计算成功
         *  - false 表示计算失败
         */
	    public selfDiv(paramNumber: number | string): CNYCurrency;
	    /**
	     * 货币的整数部分
	     * @return 返回整数
	     */
	    public readonly yuan: number;
	    /**
	     * 货币的小数部分，单位为分
	     */
	    public readonly cent: number;
        /**
         * 生成中文大写数字
         * - 引用来源：https://www.jb51.net/article/89661.htm
         * - 增加在元后，角为0的情况增加0，如0.01为零元零角
         * - 选项prefix:表示自定义人民币前缀，没有默认为“人民币”
         * - 选项negative:表示自定义负数前缀，没有默认为“负”
         * - 选项zheng：表示自定义整后缀，没有默认为“整”，有些情况可能需要“正”, 使用的时候请注意选项
         * @param paramOpts 如果是负数时，前面的前缀
         * @return 中文大写结果
         */
	    public Chinese(paramOpts?:IChineseOption): string;
	    /**
	     * 格式化输出
	     * @param paramUseSymbol 是否带有"￥"符号
	     * @param paramCNYsplit 是否以中文四数字一组
	     * @return 生成后的字符串
	     */
        public format(paramUseSymbol?: boolean, paramCNYsplit?: boolean): string;
	}
}
