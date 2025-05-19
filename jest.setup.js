// 设置测试超时时间
jest.setTimeout(30000);

// 添加全局测试辅助函数
global.measurePerformance = function(fn, iterations = 1000) {
    const start = process.hrtime();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const [seconds, nanoseconds] = process.hrtime(start);
    return (seconds * 1000 + nanoseconds / 1000000) / iterations;
};

// 添加性能测试阈值
global.PERFORMANCE_THRESHOLD = {
    MD5_HASH: 0.1,
    SHA256_HASH: 0.2,
    JSON_PARSE: 0.05,
    COMMON_RET: 0.01,
};

// 添加内存使用监控
global.measureMemoryUsage = function() {
    const used = process.memoryUsage();
    return {
        heapUsed: Math.round(used.heapUsed / 1024 / 1024 * 100) / 100,
        heapTotal: Math.round(used.heapTotal / 1024 / 1024 * 100) / 100,
        external: Math.round(used.external / 1024 / 1024 * 100) / 100,
        rss: Math.round(used.rss / 1024 / 1024 * 100) / 100
    };
};

// 添加测试数据生成器
global.generateTestData = {
    string: (length = 1000) => 'x'.repeat(length),
    object: (depth = 5) => {
        if (depth === 0) return { value: 'test' };
        return { nested: global.generateTestData.object(depth - 1) };
    },
    array: (length = 1000) => Array(length).fill(null).map((_, i) => i),
    json: (complexity = 5) => {
        const obj = {
            string: 'test',
            number: 123,
            boolean: true,
            null: null,
            array: [1, 2, 3],
            object: { key: 'value' }
        };
        return JSON.stringify(obj);
    }
};

// 添加错误测试辅助函数
global.expectError = async function(fn, errorType = Error) {
    try {
        await fn();
        throw new Error('Expected function to throw');
    } catch (error) {
        expect(error).toBeInstanceOf(errorType);
        return error;
    }
};

// 添加并发测试辅助函数
global.runConcurrent = async function(fn, count = 1000) {
    const promises = Array(count).fill(null).map(() => fn());
    return Promise.all(promises);
};

// 清理函数
afterEach(() => {
    // 清理所有模拟
    jest.clearAllMocks();
    // 清理所有定时器
    jest.clearAllTimers();
});

// 全局测试完成后的清理
afterAll(() => {
    // 强制运行垃圾回收
    if (global.gc) {
        global.gc();
    }
});
