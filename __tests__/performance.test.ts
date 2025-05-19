import { codeUtils } from '../lib/codeutils';
import { utils } from '../lib/utils';
import { XCommonRet } from '../lib/common_ret';
import { error_common } from '../lib/constant';

describe('Performance Tests', () => {
    // 设置性能基准
    const PERFORMANCE_THRESHOLD = {
        MD5_HASH: 0.1, // 毫秒
        SHA256_HASH: 0.2, // 毫秒
        JSON_PARSE: 0.05, // 毫秒
        COMMON_RET: 0.01, // 毫秒
    };

    // 性能测试辅助函数
    function measurePerformance(fn: () => void, iterations: number = 1000): number {
        const start = process.hrtime();
        for (let i = 0; i < iterations; i++) {
            fn();
        }
        const [seconds, nanoseconds] = process.hrtime(start);
        return (seconds * 1000 + nanoseconds / 1000000) / iterations; // 转换为毫秒/次
    }

    describe('Cryptography Performance', () => {
        const testData = 'test message for performance testing';
        const iterations = 1000;

        it('MD5 hash generation should be fast', () => {
            const avgTime = measurePerformance(() => {
                codeUtils.MD5FromString(testData);
            }, iterations);

            console.log(`MD5 average time: ${avgTime.toFixed(3)}ms per operation`);
            expect(avgTime).toBeLessThan(PERFORMANCE_THRESHOLD.MD5_HASH);
        });

        it('SHA256 hash generation should be fast', () => {
            const avgTime = measurePerformance(() => {
                codeUtils.SHA256FromString(testData);
            }, iterations);

            console.log(`SHA256 average time: ${avgTime.toFixed(3)}ms per operation`);
            expect(avgTime).toBeLessThan(PERFORMANCE_THRESHOLD.SHA256_HASH);
        });

        it('HMAC SHA256 should be fast', () => {
            const key = 'test key';
            const avgTime = measurePerformance(() => {
                codeUtils.HMacSHA256FromString(testData, key);
            }, iterations);

            console.log(`HMAC SHA256 average time: ${avgTime.toFixed(3)}ms per operation`);
            expect(avgTime).toBeLessThan(PERFORMANCE_THRESHOLD.SHA256_HASH * 1.2); // HMAC 可能稍慢
        });
    });

    describe('JSON Parsing Performance', () => {
        const testJson = JSON.stringify({
            name: 'test',
            value: 123,
            nested: {
                array: [1, 2, 3],
                object: { key: 'value' }
            }
        });
        const iterations = 1000;

        it('JSON parsing should be fast', () => {
            const avgTime = measurePerformance(() => {
                utils.JsonParse(testJson);
            }, iterations);

            console.log(`JSON parse average time: ${avgTime.toFixed(3)}ms per operation`);
            expect(avgTime).toBeLessThan(PERFORMANCE_THRESHOLD.JSON_PARSE);
        });
    });

    describe('XCommonRet Performance', () => {
        const iterations = 10000;

        it('XCommonRet creation and operations should be fast', () => {
            const avgTime = measurePerformance(() => {
                const ret = new XCommonRet()
                    .setErrorCode(error_common.ERR_OK, 'test')
                    .setData({ test: 'data' });
                ret.isOK;
                ret.data;
            }, iterations);

            console.log(`XCommonRet operations average time: ${avgTime.toFixed(3)}ms per operation`);
            expect(avgTime).toBeLessThan(PERFORMANCE_THRESHOLD.COMMON_RET);
        });
    });

    describe('Memory Usage', () => {
        it('should not leak memory during repeated operations', () => {
            const initialMemory = process.memoryUsage().heapUsed;
            const iterations = 10000;
            const results: XCommonRet[] = [];

            // 执行大量操作
            for (let i = 0; i < iterations; i++) {
                const ret = new XCommonRet()
                    .setErrorCode(error_common.ERR_OK, `test ${i}`)
                    .setData({ index: i });
                results.push(ret);
            }

            // 清理引用
            results.length = 0;
            global.gc?.(); // 如果启用了 --expose-gc

            const finalMemory = process.memoryUsage().heapUsed;
            const memoryIncrease = (finalMemory - initialMemory) / 1024 / 1024; // MB

            console.log(`Memory increase: ${memoryIncrease.toFixed(2)}MB`);
            expect(memoryIncrease).toBeLessThan(50); // 内存增长不应超过 50MB
        });
    });
});
