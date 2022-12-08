import { describe, expect, test } from '@jest/globals';
import { bitUtils } from "./bitUtils";

describe('bitUtils 测试', ()=> {
    test('test isValidBitSite', ()=>{
        expect(bitUtils.isValidBitSite(0)).toBe(true);
        expect(bitUtils.isValidBitSite(-1)).toBe(false);
        expect(bitUtils.isValidBitSite(31)).toBe(false);
        expect(bitUtils.isValidBitSite(30)).toBe(true);
        expect(bitUtils.isValidBitSite(0.1)).toBe(false);
        expect(bitUtils.isValidBitSite(9.1)).toBe(false);
    });
});
