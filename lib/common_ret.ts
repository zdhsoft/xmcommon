import { error_utils } from './common_error';
import { error_common } from './constant';

/** 通用返回接口 */
export interface ICommonRetData<T = any> {
    /** 错误码 */
    err : number;
    msg : string;
    data: T;
    isOK: boolean;
}
/** 含err,errmsg消息头的接口 */
export interface ICommonMsgHead {
    /** 错误码 */
    err    : number;
    /** 错误信息 */
    errmsg : string;
}

// 通用的数据返回
/**
 * 这个类主要是增加了错误判断的属性,可以做为一个通用的返回类
 * 要返回的数据可以通过data属性返回
 * 有isOK,isNotOK,isFail三个属性来简化返回结果.
 */
// tslint:disable-next-line: class-name
export class common_ret implements ICommonRetData {
    private m_err: number = error_common.ERR_OK;
    private m_msg: string = '';
    private m_data: any;
    /**
     * 构造函数
     * @param paramErr 错误码
     * @param paramMsg 错误信息
     * @param paramData 携带数据
     */
    public constructor(paramErr: number = error_common.ERR_OK, paramMsg: string = "", paramData: any = null) {
        this.m_err  = paramErr;   // 错误码
        this.m_msg  = paramMsg;   // 错误信息
        this.m_data = paramData;  // 返回的数据,默认空数据
    }
    /**
     * 设置错误信息
     * @param paramErr 错误码 @see error_common定义
     * @param paramMsg 错误信息
     * @param paramData 数据
     * @param paramMsgPre 错误信息前缀 相当于执于了一次addErrorPre
     * @return 返回当前this
     */
    public setError(paramErr: number, paramMsg: string = "", paramData: any = null, paramMsgPre: string | null = null): common_ret {
        this.m_err = paramErr;
        if (paramMsgPre) {
            this.m_msg = `${paramMsgPre}${paramMsg}`;
        }
        else {
            this.m_msg = paramMsg;
        }
        this.m_data = paramData;
        return this;
    }
    /**
     * 取错信息
     * @return 返回含有错误码的错误信息
     */
    public getErrorInfo(): string {
        if (this.isNotOK) {
            return `[${this.m_err}] ${this.m_msg}`;
        }
        else {
            return "";
        }
    }

    /**
     * 设置错误信息
     * @param paramMsg 设备错误信息
     * @param paramMsgPre=null 错误信息前缀
     */
    public setErrorMsg(paramMsg: string = "", paramMsgPre: string | null = null): void {
        if (paramMsgPre) {
            this.m_msg = `${paramMsgPre}${paramMsg}`;
        }
        else {
            this.m_msg = paramMsg;
        }
    }
    /**
     * 取错误信息
     * @return 返回错误信息
     */
    public getErrorMsg(): string
    {
        return this.m_msg;
    }
    public get msg()
    {
        return this.m_msg;
    }
    public set msg(paramMsg: string)
    {
        this.m_msg = paramMsg;
    }

    /**
     * 取错误码
     * @return  返回错误码
     */
    public getErrorCode()
    {
        return this.m_err;
    }

    public get err() {
        return this.m_err;
    }

    public set err(paramErr: number) {
        this.m_err = paramErr;
    }
    /**
     *
     * @param err 置错误码
     */
    public setErrorCode(err = error_common.ERR_OK): void
    {
        this.m_err = err;
    }

    /**
     * 取携带数据
     * @return 携带的数据
     */
    public getData() {
        return this.m_data;
    }
    /**
     * 设置携带的数据
     * @param paramData=null 数据
     */
    public setData(paramData = null) {
        this.m_data = paramData;
    }
    public get data() {
        return this.m_data;
    }
    public set data(paramData: any) {
        this.m_data = paramData;
    }

    /**
     * 设置错误信息为ERR_OK;
     */
    public setErrorCodeOK(): common_ret {
        this.m_err = error_common.ERR_OK;
        return this;
    }
    /**
     * 设为失败
     * @return 返回this
     */
    public setErrorCodeFail(): common_ret {
        this.m_err = error_common.ERR_FAIL;
        return this;
    }
    /**
     * 设为OK
     * @param data 携带的数据
     * @return 返回this
     */
    public setOK(data = null): common_ret {
        this.m_err = error_common.ERR_OK;
        this.m_data = data;
        return this;
    }
    /**
     * 设为ERR_TRUE
     * @return {common_ret} 返回this
     */
    public setTrue(): common_ret {
        this.m_err = error_common.ERR_TRUE;
        return this;
    }
    /**
     * 设为ERR_FALSE
     * @return {common_ret} 返回this
     */
    public setFalse(): common_ret {
        this.m_err = error_common.ERR_FALSE;
        return this;
    }
    /**
     * 增加错误信息前缀
     * @param paramMsgPre 前缀
     * @return 返回this
     */
    public addErrorPre(paramMsgPre: string): common_ret {
        this.m_msg =`${paramMsgPre}${this.m_msg}`;
        return this;
    }
    /**
     * 将错误信息复制到msgHead
     * 这个是专门针对协议中的msgHead
     * @param paramHead 用于保存的消息头
     * @return 返回this
     */
    public copyTo(paramHead: ICommonMsgHead): common_ret {
        paramHead.err    = this.m_err;
        paramHead.errmsg = this.m_msg;
        return this;
    }
    /**
     * 将错误信息从head复制过来
     * 这个是专门针对协议中的msgHead
     * @param paramHead 消息头
     * @return 返回this
     */
    public setErrorFromMsghead(paramHead: ICommonMsgHead): common_ret {
        this.m_err = paramHead.err;
        this.m_msg = paramHead.errmsg;
        return this;
    }
    //
    public get isOK(): boolean    { return error_utils.isOK(this.m_err); }
    public get isNotOK(): boolean { return error_utils.isNotOK(this.m_err); }
    public get isFail(): boolean  { return error_utils.isFail(this.m_err); }
    public get isTrue(): boolean  { return error_utils.isTrue(this.m_err); }
    public get isFalse(): boolean { return error_utils.isFalse(this.m_err); }
    /**
     * 重载toJSON方法
     * @return {{isOK: boolean, err: number, msg: string, data: object}} 返回非类的对象
     */
    public toJSON(): ICommonRetData {
        return {
            isOK: this.isOK,
            err : this.m_err,
            msg : this.m_msg,
            data: this.m_data
        }
    }
}
