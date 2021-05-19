import { error_common } from './constant';
/** 通用返回接口 */
export interface ICommonRetData<T = any> {
    /** 错误码 */
    err: number;
    msg: string;
    data: T;
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
 * 要返回的数据可以通过data属性返回
 * 有isOK,isNotOK,isFail三个属性来简化返回结果.
 */
export declare class common_ret implements ICommonRetData {
    private m_err;
    private m_msg;
    private m_data;
    /**
     * 构造函数
     * @param paramErr 错误码
     * @param paramMsg 错误信息
     * @param paramData 携带数据
     */
    constructor(paramErr?: number, paramMsg?: string, paramData?: any);
    /**
     * 设置错误信息
     * @param paramErr 错误码 @see error_common定义
     * @param paramMsg 错误信息
     * @param paramData 数据
     * @param paramMsgPre 错误信息前缀 相当于执于了一次addErrorPre
     * @return 返回当前this
     */
    setError(paramErr: number, paramMsg?: string, paramData?: any, paramMsgPre?: string | null): common_ret;
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
     *
     * @param err 置错误码
     */
    setErrorCode(err?: error_common): void;
    /**
     * 取携带数据
     * @return 携带的数据
     */
    getData(): any;
    /**
     * 设置携带的数据
     * @param paramData=null 数据
     */
    setData(paramData?: null): void;
    get data(): any;
    set data(paramData: any);
    /**
     * 设置错误信息为ERR_OK;
     */
    setErrorCodeOK(): common_ret;
    /**
     * 设为失败
     * @return 返回this
     */
    setErrorCodeFail(): common_ret;
    /**
     * 设为OK
     * @param data 携带的数据
     * @return 返回this
     */
    setOK(data?: null): common_ret;
    /**
     * 设为ERR_TRUE
     * @return {common_ret} 返回this
     */
    setTrue(): common_ret;
    /**
     * 设为ERR_FALSE
     * @return {common_ret} 返回this
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
    /**
     * 将错误信息从head复制过来
     * 这个是专门针对协议中的msgHead
     * @param paramHead 消息头
     * @return 返回this
     */
    setErrorFromMsghead(paramHead: ICommonMsgHead): common_ret;
    get isOK(): boolean;
    get isNotOK(): boolean;
    get isFail(): boolean;
    get isTrue(): boolean;
    get isFalse(): boolean;
    /**
     * 重载toJSON方法
     * @return {{isOK: boolean, err: number, msg: string, data: object}} 返回非类的对象
     */
    toJSON(): ICommonRetData;
}
