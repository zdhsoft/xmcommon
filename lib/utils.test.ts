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
        expect(utils.isEmpty([])).toBe(true);
        expect(utils.isEmpty(new Date())).toBe(false);
    });

});