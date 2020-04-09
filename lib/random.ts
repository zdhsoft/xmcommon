class Random {

    /** 随机一个整数 */
    public static RandomInteger(): number {
        return Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
    }
    /** 随机一个范围的整数 */
    public static RandomZeroScope(paramMaxInteger: number): number {
        return this.RandomInteger() % paramMaxInteger;
    }

    public static RandomScope(paramMinInteger: number)
}
