import { describe, expect, test, beforeAll } from '@jest/globals';
import {bitUtils, EnumBitConst} from "./bitUtils";

describe('bitUtils 测试', ()=> {
    beforeAll(() => {
        //instance = XRuleUtils.createRuleByValidId(EnumValidId.date);
    });
    test('test isValidBitSite', ()=>{
        expect(bitUtils.isValidBitSite(0)).toBe(true);
        expect(bitUtils.isValidBitSite(-1)).toBe(false);
        expect(bitUtils.isValidBitSite(31)).toBe(false);
        expect(bitUtils.isValidBitSite(30)).toBe(true);
        expect(bitUtils.isValidBitSite(0.1)).toBe(false);
        expect(bitUtils.isValidBitSite(9.1)).toBe(false);
    });

    test('test getFlag setFlag', ()=> {
        let v = 0;
        let j = 0;
        for(let i = EnumBitConst.MIN_BIT_SITE; i<= EnumBitConst.MAX_BIT_SITE; i++){
            expect(bitUtils.GetFlag(v, i)).toBe(0);
            v = bitUtils.SetFlag(v, i, 1);
            expect(bitUtils.GetFlag(v, i)).toBe(1);
            j = j + 2**i;
            expect(v).toBe(j);
        }

        expect(v).toBe(0x7fffffff);

        for(let i = EnumBitConst.MIN_BIT_SITE; i<= EnumBitConst.MAX_BIT_SITE; i++) {
            expect(bitUtils.GetFlag(v, i)).toBe(1);
            v = bitUtils.SetFlag(v, i, 0);
            expect(bitUtils.GetFlag(v, i)).toBe(0);
            j = j - 2**i;
            expect(v).toBe(j);
        }
        expect(v).toBe(0);

    });
});
