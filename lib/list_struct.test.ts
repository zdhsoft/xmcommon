import { describe, expect, test, beforeAll } from '@jest/globals';
import { Stack, Queue } from './list_struct';

describe('list struct 测试', ()=> {
    beforeAll(() => {
        //instance = XRuleUtils.createRuleByValidId(EnumValidId.date);
    });
    test('test Stack', ()=>{
        const s = new Stack<number>();
        let m: number[] = [];
        for(let i = 0; i < 10; i++) {
            s.push(i);
            expect(s.length).toBe(i+1);
            m.push(i);
        };

        while(s.length > 0) {
            const offset = s.length - 1;
            const popdata = s.pop();
            expect(popdata).toBe(m[offset]);
        }
    });

    test('test Queue', ()=> {
        const s = new Queue<number>();
        let m: number[] = [];
        for(let i = 0; i < 10; i++) {
            s.enqueue(i);
            expect(s.length).toBe(i+1);
            m.push(i);
        };

        while(s.length > 0) {
            const offset = 10 - s.length;
            const popdata = s.dequeue();
            expect(popdata).toBe(m[offset]);
        }
    });
});
