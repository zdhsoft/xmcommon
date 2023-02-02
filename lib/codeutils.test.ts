import { describe, expect, test, beforeAll } from '@jest/globals';
import {codeUtils} from './codeutils';
describe('CodeUtils 测试', ()=> {
    beforeAll(() => {
        //instance = XRuleUtils.createRuleByValidId(EnumValidId.date);
    });

    test('StringBase64Encode 对字符串进行base64编码', ()=> {
        const t1 = 'hello test is test base64 encode!!';
        const t1ResultBase64 = 'aGVsbG8gdGVzdCBpcyB0ZXN0IGJhc2U2NCBlbmNvZGUhIQ==';
        const t2 = '天下无难事，只怕有心人';
        const t2ResultBase64 = '5aSp5LiL5peg6Zq+5LqL77yM5Y+q5oCV5pyJ5b+D5Lq6';
        expect(codeUtils.StringBase64Encode(t1)).toBe(t1ResultBase64);
        expect(codeUtils.StringBase64Encode(t2)).toBe(t2ResultBase64);
    });
    test('StringBase64Decode 对字符串进行base64解码', ()=> {
        const t1 = 'hello test is test base64 encode!!';
        const t1Result = 'aGVsbG8gdGVzdCBpcyB0ZXN0IGJhc2U2NCBlbmNvZGUhIQ==';
        const t2 = '天下无难事，只怕有心人';
        const t2Result = '5aSp5LiL5peg6Zq+5LqL77yM5Y+q5oCV5pyJ5b+D5Lq6';
        expect(codeUtils.StringBase64Decode(t1Result)).toBe(t1);
        expect(codeUtils.StringBase64Decode(t2Result)).toBe(t2);
    });

    test('HMacSHA256FromString 生成HMacSha256散列', ()=>{
        const key = 'hello this is key';
        const t1 = 'hello test is test base64 encode!!';
        const t1ResultSha = 'd83127a58bb14bca456f3e9455a2002181709f893f5f5ad66d2d7d27144c2d90';
        const t2 = '天下无难事，只怕有心人';
        const t2ResultSha = '7c22290fa5c7e88049bdd2dd39bf711986d4e9830993d606f375e28afbe31aa5';
        expect(codeUtils.HMacSHA256FromString(t1, key)).toBe(t1ResultSha);
        expect(codeUtils.HMacSHA256FromString(t2, key)).toBe(t2ResultSha);
    });

    test('SHA256FromString 生成Sha256散列', ()=>{
        const t1 = 'hello test is test base64 encode!!';
        const t1ResultSha = 'df5136ac13f857c1404de128cc635fa15303a100640c999df00dcf951b5d18bb';
        const t2 = '天下无难事，只怕有心人';
        const t2ResultSha = '031cdc23ea96cae8b0927a79d7c65a110a837681c8229446c11b616150cc3039';
        expect(codeUtils.SHA256FromString(t1)).toBe(t1ResultSha);
        expect(codeUtils.SHA256FromString(t2)).toBe(t2ResultSha);
    });
    test('MD5FromString 生成MD5散列', ()=>{
        const t1 = 'hello test is test base64 encode!!';
        const t1ResultMD5 = '85080f40d4554a93f2d25427e1a0eaad';
        const t2 = '天下无难事，只怕有心人';
        const t2ResultMD5 = '6ddca5dfc90d9cc3ff597891979032d3';
        expect(codeUtils.MD5FromString(t1)).toBe(t1ResultMD5);
        expect(codeUtils.MD5FromString(t2)).toBe(t2ResultMD5);
    });
    test('MD5FromStringList 生成MD5散列', ()=>{
        const t1 = ['hello ','test',' is',' test base64 encode!!'];
        const t1ResultMD5 = '85080f40d4554a93f2d25427e1a0eaad';
        const t2 = ['天下无难事，','只怕有心人'];
        const t2ResultMD5 = '6ddca5dfc90d9cc3ff597891979032d3';
        expect(codeUtils.MD5FromStringList(t1)).toBe(t1ResultMD5);
        expect(codeUtils.MD5FromStringList(t2)).toBe(t2ResultMD5);
    });
    test('MD5FromBuffer 生成MD5散列', ()=>{
        const t1 = Buffer.from('hello test is test base64 encode!!', 'utf-8');
        const t1ResultMD5 = '85080f40d4554a93f2d25427e1a0eaad';
        const t2 = Buffer.from('天下无难事，只怕有心人', 'utf-8');
        const t2ResultMD5 = '6ddca5dfc90d9cc3ff597891979032d3';
        expect(codeUtils.MD5FromBuffer(t1)).toBe(t1ResultMD5);
        expect(codeUtils.MD5FromBuffer(t2)).toBe(t2ResultMD5);
    });
    test('MD5FromBufferList 生成MD5散列', ()=>{
        const t1s = ['hello ','test',' is',' test base64 encode!!'];
        const t1: Buffer[] = [];
        const t1ResultMD5 = '85080f40d4554a93f2d25427e1a0eaad';
        const t2s = ['天下无难事，','只怕有心人'];
        const t2: Buffer[] = [];

        t1s.forEach((paramValue) => t1.push(Buffer.from(paramValue, 'utf-8')));
        t2s.forEach((paramValue) => t2.push(Buffer.from(paramValue, 'utf-8')));
        const t2ResultMD5 = '6ddca5dfc90d9cc3ff597891979032d3';
        expect(codeUtils.MD5FromBufferList(t1)).toBe(t1ResultMD5);
        expect(codeUtils.MD5FromBufferList(t2)).toBe(t2ResultMD5);
    });
    test('MD5FromArgs 生成MD5散列', ()=>{
        const t1 = ['hello ','test',' is',' test base64 encode!!'];
        const t1ResultMD5 = '85080f40d4554a93f2d25427e1a0eaad';
        const t2 = ['天下无难事，','只怕有心人'];
        const t2ResultMD5 = '6ddca5dfc90d9cc3ff597891979032d3';
        expect(codeUtils.MD5FromArgs({}, ...t1)).toBe(t1ResultMD5);
        expect(codeUtils.MD5FromArgs({}, ...t2)).toBe(t2ResultMD5);
    });
});
