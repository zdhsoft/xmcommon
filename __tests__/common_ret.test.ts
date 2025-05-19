import { XCommonRet } from '../lib/common_ret';
import { error_common } from '../lib/constant';

describe('XCommonRet', () => {
    describe('constructor', () => {
        it('should create with default values', () => {
            const ret = new XCommonRet();
            expect(ret.err).toBe(error_common.ERR_OK);
            expect(ret.msg).toBe('');
            expect(ret.data).toBeNull();
        });

        it('should create with custom values', () => {
            const ret = new XCommonRet(error_common.ERR_FAIL, 'error message', { test: 'data' });
            expect(ret.err).toBe(error_common.ERR_FAIL);
            expect(ret.msg).toBe('error message');
            expect(ret.data).toEqual({ test: 'data' });
        });
    });

    describe('typed data', () => {
        interface TestData {
            name: string;
            value: number;
        }

        it('should handle typed data correctly', () => {
            const data: TestData = { name: 'test', value: 123 };
            const ret = new XCommonRet<TestData>(error_common.ERR_OK, '', data);
            expect(ret.data).toEqual(data);
            expect(ret.data?.name).toBe('test');
            expect(ret.data?.value).toBe(123);
        });
    });

    describe('status checks', () => {
        it('should check OK status correctly', () => {
            const okRet = new XCommonRet(error_common.ERR_OK);
            const failRet = new XCommonRet(error_common.ERR_FAIL);

            expect(okRet.isOK).toBe(true);
            expect(okRet.isNotOK).toBe(false);
            expect(failRet.isOK).toBe(false);
            expect(failRet.isNotOK).toBe(true);
        });

        it('should check True/False status correctly', () => {
            const trueRet = new XCommonRet(error_common.ERR_TRUE);
            const falseRet = new XCommonRet(error_common.ERR_FALSE);

            expect(trueRet.isTrue).toBe(true);
            expect(trueRet.isFalse).toBe(false);
            expect(falseRet.isTrue).toBe(false);
            expect(falseRet.isFalse).toBe(true);
        });
    });

    describe('setters', () => {
        it('should set error code and message', () => {
            const ret = new XCommonRet();
            ret.setErrorCode(error_common.ERR_FAIL, 'error message');
            expect(ret.err).toBe(error_common.ERR_FAIL);
            expect(ret.msg).toBe('error message');
        });

        it('should set data', () => {
            const ret = new XCommonRet();
            const data = { test: 'data' };
            ret.setData(data);
            expect(ret.data).toEqual(data);
        });

        it('should clear data', () => {
            const ret = new XCommonRet(error_common.ERR_OK, '', { test: 'data' });
            ret.clearData();
            expect(ret.data).toBeNull();
        });
    });

    describe('chaining', () => {
        it('should support method chaining', () => {
            const ret = new XCommonRet()
                .setErrorCode(error_common.ERR_FAIL, 'error')
                .setData({ test: 'data' });

            expect(ret.err).toBe(error_common.ERR_FAIL);
            expect(ret.msg).toBe('error');
            expect(ret.data).toEqual({ test: 'data' });
        });
    });
});
