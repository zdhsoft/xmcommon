import { codeUtils } from '../lib/codeutils';

describe('codeUtils', () => {
    describe('StringBase64Encode', () => {
        it('should encode strings to base64', () => {
            expect(codeUtils.StringBase64Encode('test')).toBe('dGVzdA==');
            expect(codeUtils.StringBase64Encode('')).toBe('');
            expect(codeUtils.StringBase64Encode('Hello, World!')).toBe('SGVsbG8sIFdvcmxkIQ==');
        });
    });

    describe('HMacSHA256FromString', () => {
        it('should generate HMAC SHA256 hash', () => {
            const text = 'test message';
            const key = 'secret key';
            const hash = codeUtils.HMacSHA256FromString(text, key);

            // HMAC SHA256 hash is deterministic
            expect(hash).toBe('a7d8c2c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0');
            expect(hash.length).toBe(64); // SHA256 produces 32 bytes (64 hex characters)
        });

        it('should generate different hashes for different keys', () => {
            const text = 'test message';
            const hash1 = codeUtils.HMacSHA256FromString(text, 'key1');
            const hash2 = codeUtils.HMacSHA256FromString(text, 'key2');
            expect(hash1).not.toBe(hash2);
        });
    });

    describe('SHA256FromString', () => {
        it('should generate SHA256 hash in hex format', () => {
            const text = 'test message';
            const hash = codeUtils.SHA256FromString(text);
            expect(hash.length).toBe(64); // SHA256 produces 32 bytes (64 hex characters)
        });

        it('should generate SHA256 hash in base64 format', () => {
            const text = 'test message';
            const hash = codeUtils.SHA256FromString(text, 'base64');
            expect(hash).toMatch(/^[A-Za-z0-9+/=]+$/); // Base64 format
        });

        it('should generate same hash for same input', () => {
            const text = 'test message';
            const hash1 = codeUtils.SHA256FromString(text);
            const hash2 = codeUtils.SHA256FromString(text);
            expect(hash1).toBe(hash2);
        });
    });

    describe('MD5FromString', () => {
        it('should generate MD5 hash in hex format', () => {
            const text = 'test message';
            const hash = codeUtils.MD5FromString(text);
            expect(hash.length).toBe(32); // MD5 produces 16 bytes (32 hex characters)
        });

        it('should generate MD5 hash in base64 format', () => {
            const text = 'test message';
            const hash = codeUtils.MD5FromString(text, 'base64');
            expect(hash).toMatch(/^[A-Za-z0-9+/=]+$/); // Base64 format
        });

        it('should generate same hash for same input', () => {
            const text = 'test message';
            const hash1 = codeUtils.MD5FromString(text);
            const hash2 = codeUtils.MD5FromString(text);
            expect(hash1).toBe(hash2);
        });
    });

    describe('MD5FromArgs', () => {
        it('should generate MD5 from multiple arguments', () => {
            const options = {
                encode: 'hex' as const,
                capital: false,
                split: ''
            };
            const hash = codeUtils.MD5FromArgs(options, 'arg1', 'arg2', 'arg3');
            expect(hash.length).toBe(32);
        });

        it('should handle different options', () => {
            const args = ['arg1', 'arg2', 'arg3'];

            // Test with hex encoding
            const hexHash = codeUtils.MD5FromArgs({ encode: 'hex', capital: false }, ...args);
            expect(hexHash).toMatch(/^[a-f0-9]{32}$/);

            // Test with base64 encoding
            const base64Hash = codeUtils.MD5FromArgs({ encode: 'base64' }, ...args);
            expect(base64Hash).toMatch(/^[A-Za-z0-9+/=]+$/);

            // Test with capital letters
            const capitalHash = codeUtils.MD5FromArgs({ encode: 'hex', capital: true }, ...args);
            expect(capitalHash).toMatch(/^[A-F0-9]{32}$/);

            // Test with custom split
            const splitHash = codeUtils.MD5FromArgs({ split: ',' }, ...args);
            expect(splitHash.length).toBe(32);
        });
    });
});
