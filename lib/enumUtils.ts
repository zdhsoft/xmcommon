/* eslint-disable @typescript-eslint/no-explicit-any */
/** 枚举的相关功能函数 */
export class EnumUtils {
    /**
     * 取枚举key列表
     * @param paramEnum 指定的枚举
     * @returns 枚举的key列表
     */
    public static getEnumKeys(paramEnum: object) {
        return Object.keys(paramEnum).filter((paramK) => isNaN(Number(paramK)));
    }

    /**
     * 取枚举值列表
     * @param paramEnum 指定的枚举
     * @returns 枚举的value列表
     */
    public static getEnumValues<T = any>(paramEnum: object) {
        const keys = this.getEnumKeys(paramEnum);
        return keys.map((paramK) => (paramEnum as any)[paramK]) as T[];
    }
    /**
     * 判断指定的值，是不是枚举中的值
     * @param paramValue 被检查的值
     * @param paramEnum 指定的枚举
     * @returns
     *  - true 表示是枚举的值
     *  - false 表示不是枚举的值
     */
    public static valueInEnum<T = any>(paramValue: T, paramEnum: object) {
        if (paramValue === null || paramValue === undefined) {
            return false;
        }
        const values = this.getEnumValues(paramEnum);
        return values.includes(paramValue);
    }
    /**
     * 判断指定的key，是不是枚举中的key
     * @param paramKey 被检查的key
     * @param paramEnum 指定的枚举
     * @returns
     *  - true 表示是枚举的值
     *  - false 表示不是枚举的值
     */
    public static keyInEnum(paramKey: string, paramEnum: object) {
        if (paramKey === null || paramKey === undefined) {
            return false;
        }
        const keys = this.getEnumKeys(paramEnum);
        return keys.includes(paramKey);
    }
}
