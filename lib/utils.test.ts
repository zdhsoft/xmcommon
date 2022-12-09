import { it, describe, expect, test, beforeAll } from '@jest/globals';
import utils from "./utils";

describe('utils 测试', ()=> {
    it('测试isTrueEmpty', ()=>{
        expect(utils.isTrueEmpty(0)).toBe(false);
        expect(utils.isTrueEmpty(null)).toBe(true);
        expect(utils.isTrueEmpty(undefined)).toBe(true);
        expect(utils.isTrueEmpty('')).toBe(true);
        expect(utils.isTrueEmpty(NaN)).toBe(true);
        expect(utils.isTrueEmpty('hello')).toBe(false);
        expect(utils.isTrueEmpty(-1)).toBe(false);
        expect(utils.isTrueEmpty(1)).toBe(false);
        expect(utils.isTrueEmpty(0.1)).toBe(false);
        expect(utils.isTrueEmpty(-0.1)).toBe(false);
        expect(utils.isTrueEmpty({})).toBe(false);
        expect(utils.isTrueEmpty([])).toBe(false);
        expect(utils.isTrueEmpty(new Date())).toBe(false);
    });
    it('测试isEmpty', ()=>{
        expect(utils.isEmpty(0)).toBe(true);
        expect(utils.isEmpty(null)).toBe(true);
        expect(utils.isEmpty(undefined)).toBe(true);
        expect(utils.isEmpty('')).toBe(true);
        expect(utils.isEmpty(NaN)).toBe(true);
        expect(utils.isEmpty('hello')).toBe(false);
        expect(utils.isEmpty(-1)).toBe(false);
        expect(utils.isEmpty(1)).toBe(false);
        expect(utils.isEmpty(0.1)).toBe(false);
        expect(utils.isEmpty(-0.1)).toBe(false);
        expect(utils.isEmpty({})).toBe(true);
        expect(utils.isEmpty({ a: 100 })).toBe(false);
        expect(utils.isEmpty([])).toBe(true);
        expect(utils.isEmpty(new Date())).toBe(false);
        expect(utils.isEmpty(false)).toBe(true);
        expect(utils.isEmpty(true)).toBe(false);
        expect(utils.isEmpty(new Date('9999010101010'))).toBe(true);
        // null, undefined, '', {}, false, 无效日期, 0, [], NaN 这些都是空对象

    });
    it('测试formatNumber', ()=> {
        // expect(utils.formatNumber(12345.999,'#,##0.00')).toBe('12,345.99');
        // expect(utils.formatNumber(12345.999,'#,##0.##')).toBe('12,345.99');
        // formatNumber(12345.999,'#,##0.00');
        // formatNumber(12345.999,'#,##0.##');
        // formatNumber(123,'000000');
    });

});