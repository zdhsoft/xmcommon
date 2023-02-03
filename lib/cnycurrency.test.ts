import { describe, expect, test, beforeAll } from '@jest/globals';
import {CNYCurrency} from './cnycurrency';
describe('CNYCurrency 测试', ()=> {
    beforeAll(() => {
        //instance = XRuleUtils.createRuleByValidId(EnumValidId.date);
    });

    test('测试货币', () => {

        let m: CNYCurrency[] = [];
        let c = new CNYCurrency(-12345);
        m.push(c);
        m.push(c.add(109999));
        m.push(new CNYCurrency(976540));
        m.push(c.sub(10));
        m.push(c.div(0.01));
        m.push(c.mul(10));
        m.push(c.mul(0.01));

        let tt = new CNYCurrency(0);
        tt.selfAdd(2805307.04);
        tt.selfAdd(4323515.28);
        tt.selfAdd(2805307.04);
        tt.selfAdd(3281107.13);
        m.push(tt);

        const valueList: any [] = [];
        valueList.push([-12345, -1234500, '-12345.00', '￥-1,2345.00', '负壹万贰仟叁佰肆拾伍元整']),
        valueList.push([97654, 9765400, '97654.00', '￥9,7654.00', '玖万柒仟陆佰伍拾肆元整']),
        valueList.push([976540, 97654000, '976540.00', '￥97,6540.00', '玖拾柒万陆仟伍佰肆拾元整']),
        valueList.push([-12355, -1235500, '-12355.00' , '￥-1,2355.00', '负壹万贰仟叁佰伍拾伍元整']),
        valueList.push([-1234500, -123450000, '-1234500.00' , '￥-123,4500.00', '负壹佰贰拾叁万肆仟伍佰元整']),
        valueList.push([-123450, -12345000, '-123450.00' , '￥-12,3450.00', '负壹拾贰万叁仟肆佰伍拾元整']),
        valueList.push([-123.45, -12345, '-123.45' , '￥-123.45', '负壹佰贰拾叁元肆角伍分']),
        valueList.push([13215236.49, 1321523649, '13215236.49' , '￥1321,5236.49', '壹仟叁佰贰拾壹万伍仟贰佰叁拾陆元肆角玖分']);

        expect(tt.yuan).toBe(13215236);
        expect(tt.cent).toBe(49);

        //const m0 = m[0];
        for (let i = 0; i < m.length; i++) {
            const c = m[i];
            const v = valueList[i];
            expect(CNYCurrency.isCurrency(c)).toBe(true);
            expect(c.value).toBe(v[0]);
            expect(c.intValue).toBe(v[1]);
            expect(c.toString()).toBe(v[2]);
            expect(c.format(true, true)).toBe(v[3]);
            expect(c.Chinese({prefix: '', })).toBe(v[4]);
        }
    })
});
