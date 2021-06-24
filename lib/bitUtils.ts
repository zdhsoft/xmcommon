/** 关于位的常量 */
export enum EnumBitConst {
    /**  最大标志位  如果超过30位，就会出现负数，所以在这里只到30位 */
    MAX_BIT_SITE  = 30,
    /** 最小标志位 */
    MIN_BIT_SITE  = 0,
    /** 最大bit的位数 */
    MAX_BIT_COUNT = 31,
}

/**
 * 0-30位的整数
 */
const BIT_VALUE = [
	0x00000001, 0x00000002, 0x00000004, 0x00000008,
	0x00000010, 0x00000020, 0x00000040, 0x00000080,
	0x00000100, 0x00000200, 0x00000400, 0x00000800,
	0x00001000, 0x00002000, 0x00004000, 0x00008000,
	0x00010000, 0x00020000, 0x00040000, 0x00080000,
	0x00100000, 0x00200000, 0x00400000, 0x00800000,
	0x01000000, 0x02000000, 0x04000000, 0x08000000,
	0x10000000, 0x20000000, 0x40000000,
];
/**
 * 0-30位的整数取反
 */
const BIT_VALUE_EX = [
	0xfffffffe,0xfffffffd,0xfffffffb,0xfffffff7,
	0xffffffef,0xffffffdf,0xffffffbf,0xffffff7f,
	0xfffffeff,0xfffffdff,0xfffffbff,0xfffff7ff,
	0xffffefff,0xffffdfff,0xffffbfff,0xffff7fff,
	0xfffeffff,0xfffdffff,0xfffbffff,0xfff7ffff,
	0xffefffff,0xffdfffff,0xffbfffff,0xff7fffff,
	0xfeffffff,0xfdffffff,0xfbffffff,0xf7ffffff,
	0xefffffff,0xdfffffff,0xbfffffff
];
/**
 * 位操作工具
 */
// tslint:disable-next-line: class-name
export class bitUtils {

    /**
     * 检查是否是有效的标志位
     * @param paramBitSite 指定的标志位
     * @return 检查结果
     * - true 表示有效
     * - false 表示无效
     */
	public static isValidBitSite(paramBitSite: number): boolean {
		if (!Number.isSafeInteger(paramBitSite)) {
			return false;
		}
		return paramBitSite >= EnumBitConst.MIN_BIT_SITE && paramBitSite <= EnumBitConst.MAX_BIT_SITE;
	}
	/**
	 * 取指定标志位的标
	 * @param paramFlag 存放标志的31位整数
	 * @param paramBitSite 对应的标志位，在[0,30]之间
	 * @return 返回0或1
	 */
    public static GetFlag(paramFlag: number, paramBitSite: number): 0 | 1 {
		if(!Number.isSafeInteger(paramFlag)) {
			return 0;
		}
		if(!this.isValidBitSite(paramBitSite)) {
			return 0;
		}
		// tslint:disable-next-line: no-bitwise
		if((paramFlag & BIT_VALUE[paramBitSite]) === 0) {
			return 0;
		}
		else {
			return 1;
		}
	}
	/**
	 * 设置标志位的值
	 * @param paramFlag 存放标志的31位整数
	 * @param paramBitSite 对应的标志位，在[0,30]之间
	 * @param paramValue 要设置的值，只能是0或1
	 * @return 修改标志的新值
	 */
    public static SetFlag(paramFlag: number, paramBitSite: number, paramValue: number) {
		if(!Number.isSafeInteger(paramFlag)) {
			return paramFlag;
		}
		if(!this.isValidBitSite(paramBitSite)) {
			return paramFlag;
		}

        let retFlag = paramFlag;

		if(paramValue === 1) {
			// tslint:disable-next-line: no-bitwise
			retFlag = retFlag | BIT_VALUE[paramBitSite];
		}
		else {
			// tslint:disable-next-line: no-bitwise
			retFlag = BIT_VALUE_EX[paramBitSite] & paramFlag;
		}
		return retFlag;
	}
}
