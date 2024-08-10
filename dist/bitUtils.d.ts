/** 关于位的常量 */
export declare enum EnumBitConst {
    /**  最大标志位  如果超过30位，就会出现负数，所以在这里只到30位 */
    MAX_BIT_SITE = 30,
    /** 最小标志位 */
    MIN_BIT_SITE = 0,
    /** 最大bit的位数 */
    MAX_BIT_COUNT = 31
}
/**
 * 位操作工具
 */
export declare class bitUtils {
    /**
     * 检查是否是有效的标志位
     * @param paramBitSite 指定的标志位
     * @return 检查结果
     * - true 表示有效
     * - false 表示无效
     */
    static isValidBitSite(paramBitSite: number): boolean;
    /**
     * 取指定标志位的标
     * @param paramFlag 存放标志的31位整数
     * @param paramBitSite 对应的标志位，在[0,30]之间
     * @return 返回0或1
     */
    static GetFlag(paramFlag: number, paramBitSite: number): 0 | 1;
    /**
     * 设置标志位的值
     * @param paramFlag 存放标志的31位整数
     * @param paramBitSite 对应的标志位，在[0,30]之间
     * @param paramValue 要设置的值，只能是0或1
     * @return 修改标志的新值
     */
    static SetFlag(paramFlag: number, paramBitSite: number, paramValue: number): number;
}
