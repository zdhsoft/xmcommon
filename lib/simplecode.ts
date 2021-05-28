
const RANDOM_MULTIPLIER = 0x015a4e35;
const RANDOM_INCREMENT = 1;
/** 编码类的错误码 */
export enum EnumSimpleCodeError {
    /** 表示检查通过 */
    OK = 0,
    /** Seed不是整数 */
    SEED_NOT_INTEGER = 1,
    /** Data不是Buffer对象 */
    DATA_NOT_BUFFER = 2,
    /** Data的长度，小于指定的长度 */
    DATA_SIZE_TO_LOW = 3
}

/**
 * 简单编码的种子
 */
export interface ISimpleCodeSeed {
    /** 返回处理结果 code==0表示成功，其它值表示失败 */
    code: EnumSimpleCodeError;
    /**  seed表示编码的种子 */
    seed ?: number;
    /** data表示编码后的数据 */
    data ?: Buffer;
}

/**
 * 一个简单编码的类
 * 通过位移算法对数据进行编码
 * 这里使用的随机数算是非平衡算法，只用于这个编解码运算
 */
export class SimpleCode {
    /** 当前的种子 */
    private m_seed = 1;
    /** 修改值 */
    private m_fix  = 1;
    /**
     * 构造函数
     */
    public constructor() {
    }

    /**
     * 数据编码
     * @param paramSeed 编码种子
     * @param paramData 要编码的数据
     * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示编码的种子， data表示编码后的数据
     */
    public Encode(paramSeed: number, paramData: Buffer): ISimpleCodeSeed {
        let r = SimpleCode.__checkParam(paramSeed, paramData, 0);
        if(r !== 0) {
            return { code: r };
        }
        // tslint:disable-next-line: no-bitwise
        this.m_seed = (paramSeed & 0x7fffffff) % 256;
        this.m_fix = this.m_seed;

        let nCnt = paramData.length;
        let bRet = Buffer.alloc(nCnt);
        for (let i = 0; i < nCnt; i++) {
            let rr = this.__Rand() % 256;
            bRet.writeUInt8((paramData.readUInt8(i) + rr) % 256, i);
        }
        return { code: EnumSimpleCodeError.OK, seed: paramSeed, data: bRet };
    }
    /**
     * 检查参数
     * 返回结果：
     *      - 0 表示检查通过
     *      - 1 paramSeed不是整数
     *      - 2 paramData不是Buffer对象
     *      - 3 paramData的长度，小于指定的长度
     * @param paramSeed 种子
     * @param paramData 数据
     * @param paramMinLength 数据最小长度
     * @return 检查结果
     */
    private static __checkParam(paramSeed: number, paramData: Buffer, paramMinLength = 0): EnumSimpleCodeError {
        if(!Number.isInteger(paramSeed)) { // 如果不是整数
            return EnumSimpleCodeError.SEED_NOT_INTEGER;
        }
        if(!Buffer.isBuffer(paramData)) { // 如果不是buffer
            return EnumSimpleCodeError.DATA_NOT_BUFFER;
        }
        if(paramData.length < paramMinLength) { // 如果长度为0
            return EnumSimpleCodeError.DATA_SIZE_TO_LOW;
        }
        return EnumSimpleCodeError.OK;
    }
    /**
     * 生成随机数
     * @return 生成的随机整数
     */
    private __Rand(): number {
        let m = RANDOM_MULTIPLIER * this.m_seed + RANDOM_INCREMENT + this.m_fix;
        // tslint:disable-next-line: no-bitwise
        this.m_seed = m & 0x7fffffff;
        this.m_fix = (this.m_fix + 1) % 0x7fffffff;
        return this.m_seed;
    }
    /**
     * 数据解码
     * @param paramSeed 初始种子
     * @param paramData 编码后的数据
     * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示解码的种子， data表示解码后的数据
     */
    public Decode(paramSeed: number, paramData: Buffer): ISimpleCodeSeed {
        let r = SimpleCode.__checkParam(paramSeed, paramData, 0);
        if(r !== 0) {
            return { code: r };
        }

        // tslint:disable-next-line: no-bitwise
        this.m_seed = (paramSeed & 0x7fffffff) % 256;
        this.m_fix = this.m_seed;

        const nCnt = paramData.length;
        const bRet = Buffer.alloc(nCnt);

        for (let i = 0; i < nCnt; i++) {
            const rr = this.__Rand() % 256;

            let mm = paramData.readUInt8(i) - rr;
            if (mm < 0) mm = (mm + 256) % 256;
            bRet.writeUInt8(mm, i);
        }
        return { code: EnumSimpleCodeError.OK, seed: paramSeed, data: bRet };
    }
    /**
     * 生数据编码包
     * @param paramSeed 初始种子
     * @param paramData 要编码的数据
     * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示编码的种子， data表示编码后的数据
     */
    public EncodePackage(paramSeed: number, paramData: Buffer): ISimpleCodeSeed {

        let r = SimpleCode.__checkParam(paramSeed, paramData, 0);
        if(r !== 0) {
            return { code: r };
        }

        // tslint:disable-next-line: no-bitwise
        this.m_seed = (paramSeed & 0x7fffffff) % 256;
        this.m_fix = this.m_seed;

        let nCnt = paramData.length;
        let bRet = Buffer.alloc(nCnt+1);
        bRet.writeUInt8(this.m_seed, 0);
        for (let i = 0; i < nCnt; i++) {
            let rr = this.__Rand() % 256;
            bRet.writeUInt8((paramData.readUInt8(i) + rr) % 256, i + 1);
        }
        return { code:EnumSimpleCodeError.OK, seed: paramSeed, data: bRet };
    }
    /**
     * 数据解码包
     * @param paramData 经EncodePackage编码的数据
     * @return 返回处理结果，code==0表示成功，其它值表示失败， seed表示解码的种子， data表示解码后的数据
     */
    public DecodePackage(paramData: Buffer): ISimpleCodeSeed {
        let r = SimpleCode.__checkParam(0, paramData, 1);
        if(r !== 0) {
            return { code: r };
        }
        let seed = paramData.readUInt8(0);
        this.m_seed = seed;
        this.m_fix = this.m_seed;

        let nCnt = paramData.length-1;
        let bRet = Buffer.alloc(nCnt);
        for (let i = 0; i < nCnt; i++) {
            let rr = this.__Rand() % 256;

            let mm = paramData.readUInt8(i+1) - rr;
            if (mm < 0) mm = (mm + 256) % 256;
            bRet.writeUInt8(mm, i);
        }
        return { code: 0, seed, data: bRet };
    }
}

exports.SimpleCode = SimpleCode;
