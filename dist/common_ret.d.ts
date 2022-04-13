/** 通用返回数据，默认接口定义 */
export interface ICommonRetBase<T = unknown> {
    /** 错误码 */
    err: number;
    /** 错误信息 */
    msg: string;
    /** 数据 */
    data: T | null;
}
/** 通用返回接口 */
export interface ICommonRetData<T = unknown> extends ICommonRetBase<T> {
    /** 是否OK */
    isOK: boolean;
}
/** 含err,errmsg消息头的接口 */
export interface ICommonMsgHead {
    /** 错误码 */
    err: number;
    /** 错误信息 */
    errmsg: string;
}
/**
 * 这个类主要是增加了错误判断的属性,可以做为一个通用的返回类
 * - 但是这里的数据类型都unknown类型的，不建议使用，所以这里新增加带模板的XCommonRet<T>类，两个功能接口完全一样
 * - 要返回的数据可以通过data属性返回
 * 有isOK,isNotOK,isFail三个属性来简化返回结果.
 */
export declare class common_ret implements ICommonRetData<unknown> {
    private m_err;
    private m_msg;
    private m_data;
    /**
     * 构造函数
     * @param paramErr 错误码
     * @param paramMsg 错误信息
     * @param paramData 携带数据
     */
    constructor(paramErr?: number, paramMsg?: string, paramData?: unknown);
    /**
     * 设置错误信息
     * @param paramErr 错误码 @see error_common定义
     * @param paramMsg 错误信息
     * @param paramData 数据
     * @param paramMsgPre 错误信息前缀 相当于执于了一次addErrorPre
     * @return 返回当前this
     */
    setError(paramErr: number, paramMsg?: string, paramData?: unknown, paramMsgPre?: string | null): common_ret;
    /**
     * 取错信息
     * @return 返回含有错误码的错误信息
     */
    getErrorInfo(): string;
    /**
     * 设置错误信息
     * @param paramMsg 设备错误信息
     * @param paramMsgPre=null 错误信息前缀
     */
    setErrorMsg(paramMsg?: string, paramMsgPre?: string | null): void;
    /**
     * 取错误信息
     * @return 返回错误信息
     */
    getErrorMsg(): string;
    get msg(): string;
    set msg(paramMsg: string);
    /**
     * 取错误码
     * @return  返回错误码
     */
    getErrorCode(): number;
    get err(): number;
    set err(paramErr: number);
    /**
     * 设置错误代码
     * @param paramError 置错误码
     */
    setErrorCode(paramError?: number): void;
    /**
     * 取携带数据
     * @return 携带的数据
     */
    getData(): unknown;
    /**
     * 设置携带的数据
     * @param paramData 数据
     */
    setData(paramData?: unknown): void;
    get data(): unknown;
    set data(paramData: unknown);
    /**
     * 设置错误信息为ERR_OK;
     */
    setErrorCodeOK(): common_ret;
    /**
     * 设为失败
     * @deprecated
     * @return 返回this
     */
    setErrorCodeFail(): common_ret;
    /**
     * 设为OK
     * @param data 携带的数据
     * @return 返回this
     */
    setOK(data?: unknown): common_ret;
    /**
     * 设为ERR_TRUE
     * @deprecated
     * @return 返回this
     */
    setTrue(): common_ret;
    /**
     * 设为ERR_FALSE
     * @deprecated
     * @return 返回this
     */
    setFalse(): common_ret;
    /**
     * 增加错误信息前缀
     * @param paramMsgPre 前缀
     * @return 返回this
     */
    addErrorPre(paramMsgPre: string): common_ret;
    /**
     * 将错误信息复制到msgHead
     * 这个是专门针对协议中的msgHead
     * @param paramHead 用于保存的消息头
     * @return 返回this
     */
    copyTo(paramHead: ICommonMsgHead): common_ret;
    /** 从某返回对象赋值 */
    assignFrom(paramRet: ICommonRetBase<unknown>): void;
    /**
     * 将错误信息从head复制过来
     * 这个是专门针对协议中的msgHead
     * @param paramHead 消息头
     * @return 返回this
     */
    setErrorFromMsghead(paramHead: ICommonMsgHead): common_ret;
    get isOK(): boolean;
    get isNotOK(): boolean;
    /**
     * @deprecated
     */
    get isFail(): boolean;
    /**
     * @deprecated
     */
    get isTrue(): boolean;
    /**
     * @deprecated
     */
    get isFalse(): boolean;
    /**
     * 重载toJSON方法
     * @return 返回非类的对象
     */
    toJSON(): ICommonRetData;
}
/**
 * 这是一个新增的通用返回类, 因为common_ret已经在很多项目使用了，变更它的设计可能会引用很多问题，所以
 * 在这里重新定一个带模板的通用返回类
 * 要返回的数据可以通过data属性返回
 * 有isOK,isNotOK,isFail三个属性来简化返回结果.
 */
export declare class XCommonRet<T = unknown> implements ICommonRetData<T> {
    private m_err;
    private m_msg;
    private m_data;
    /**
     * 构造函数
     * @param paramErr 错误码
     * @param paramMsg 错误信息
     * @param paramData 携带数据
     */
    constructor(paramErr?: number, paramMsg?: string, paramData?: T | null);
    /**
     * 设置错误信息
     * @param paramErr 错误码 @see error_common定义
     * @param paramMsg 错误信息
     * @param paramData 数据
     * @param paramMsgPre 错误信息前缀 相当于执于了一次addErrorPre
     * @return 返回当前this
     */
    setError(paramErr: number, paramMsg?: string, paramData?: T | null, paramMsgPre?: string | null): XCommonRet<T>;
    /**
     * 取错信息
     * @return 返回含有错误码的错误信息
     */
    getErrorInfo(): string;
    /**
     * 设置错误信息
     * @param paramMsg 设备错误信息
     * @param paramMsgPre 错误信息前缀
     */
    setErrorMsg(paramMsg?: string, paramMsgPre?: string | null): void;
    /**
     * 取错误信息
     * @return 返回错误信息
     */
    getErrorMsg(): string;
    get msg(): string;
    set msg(paramMsg: string);
    /**
     * 取错误码
     * @return  返回错误码
     */
    getErrorCode(): number;
    get err(): number;
    set err(paramError: number);
    /**
     *
     * @param paramError 置错误码
     */
    setErrorCode(paramError?: number): void;
    /**
     * 取携带数据
     * @return 携带的数据
     */
    getData(): T | null;
    /**
     * 设置携带的数据
     * @param paramData=null 数据
     */
    setData(paramData?: T | null): void;
    get data(): T | null;
    set data(paramData: T | null);
    /**
     * 设置错误信息为ERR_OK;
     */
    setErrorCodeOK(): XCommonRet<T>;
    /**
     * 设为失败
     * @deprecated
     * @return 返回this
     */
    setErrorCodeFail(): XCommonRet<T>;
    /**
     * 设为OK
     * @param data 携带的数据
     * @return 返回this
     */
    setOK(data?: T | null): XCommonRet<T>;
    /**
     * 设为ERR_TRUE
     * @deprecated
     * @return  返回当前对象
     */
    setTrue(): XCommonRet<T>;
    /**
     * 设为ERR_FALSE
     * @deprecated
     * @return 返回当前对象
     */
    setFalse(): XCommonRet<T>;
    /**
     * 增加错误信息前缀
     * @param paramMsgPre 前缀
     * @return 返回this
     */
    addErrorPre(paramMsgPre: string): XCommonRet<T>;
    /** 从某返回对象赋值 */
    assignFrom(paramRet: ICommonRetBase<T>): void;
    /**
     * 将错误信息复制到msgHead
     * 这个是专门针对协议中的msgHead
     * @param paramHead 用于保存的消息头
     * @return 返回this
     */
    copyTo(paramHead: ICommonMsgHead): XCommonRet<T>;
    /**
     * 将错误信息从head复制过来
     * 这个是专门针对协议中的msgHead
     * @param paramHead 消息头
     * @return 返回this
     */
    setErrorFromMsghead(paramHead: ICommonMsgHead): XCommonRet<T>;
    get isOK(): boolean;
    get isNotOK(): boolean;
    /**
     * @deprecated
     */
    get isFail(): boolean;
    /**
     * @deprecated
     */
    get isTrue(): boolean;
    /**
     * @deprecated
     */
    get isFalse(): boolean;
    /**
     * 重载toJSON方法
     * @return 返回非类的对象
     */
    toJSON(): ICommonRetData<T>;
}
