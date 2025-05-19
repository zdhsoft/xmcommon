import { utils } from '../lib/utils';

describe('utils', () => {
    describe('isString', () => {
        it('should return true for string values', () => {
            expect(utils.isString('test')).toBe(true);
            expect(utils.isString('')).toBe(true);
            expect(utils.isString(String('test'))).toBe(true);
        });

        it('should return false for non-string values', () => {
            expect(utils.isString(123)).toBe(false);
            expect(utils.isString(null)).toBe(false);
            expect(utils.isString(undefined)).toBe(false);
            expect(utils.isString({})).toBe(false);
            expect(utils.isString([])).toBe(false);
        });
    });

    describe('isNull', () => {
        it('should return true for null and undefined', () => {
            expect(utils.isNull(null)).toBe(true);
            expect(utils.isNull(undefined)).toBe(true);
        });

        it('should return false for non-null values', () => {
            expect(utils.isNull('')).toBe(false);
            expect(utils.isNull(0)).toBe(false);
            expect(utils.isNull(false)).toBe(false);
            expect(utils.isNull({})).toBe(false);
            expect(utils.isNull([])).toBe(false);
        });
    });

    describe('isNotNullOrEmptyString', () => {
        it('should return true for non-empty strings', () => {
            expect(utils.isNotNullOrEmptyString('test')).toBe(true);
            expect(utils.isNotNullOrEmptyString(' ')).toBe(true);
        });

        it('should return false for empty strings and non-strings', () => {
            expect(utils.isNotNullOrEmptyString('')).toBe(false);
            expect(utils.isNotNullOrEmptyString(null)).toBe(false);
            expect(utils.isNotNullOrEmptyString(undefined)).toBe(false);
            expect(utils.isNotNullOrEmptyString(123)).toBe(false);
        });
    });

    describe('JsonParse', () => {
        it('should parse valid JSON strings', () => {
            const jsonStr = '{"name":"test","value":123}';
            const result = utils.JsonParse(jsonStr);
            expect(result).toEqual({ name: 'test', value: 123 });
        });

        it('should return undefined for invalid JSON strings', () => {
            expect(utils.JsonParse('invalid json')).toBeUndefined();
            expect(utils.JsonParse('{name:test}')).toBeUndefined();
            expect(utils.JsonParse('')).toBeUndefined();
        });

        it('should handle typed JSON parsing', () => {
            interface TestType {
                name: string;
                value: number;
            }
            const jsonStr = '{"name":"test","value":123}';
            const result = utils.JsonParse<TestType>(jsonStr);
            expect(result).toEqual({ name: 'test', value: 123 });
        });
    });

    describe('formatPercentage', () => {
        it('should format numbers as percentages', () => {
            expect(utils.formatPercentage(0.1234)).toBe('12.34%');
            expect(utils.formatPercentage(1)).toBe('100%');
            expect(utils.formatPercentage(0)).toBe('0%');
        });

        it('should handle string inputs', () => {
            expect(utils.formatPercentage('0.1234')).toBe('12.34%');
            expect(utils.formatPercentage('1')).toBe('100%');
            expect(utils.formatPercentage('0')).toBe('0%');
        });

        it('should round to 2 decimal places', () => {
            expect(utils.formatPercentage(0.12345)).toBe('12.35%');
            expect(utils.formatPercentage(0.12344)).toBe('12.34%');
        });
    });
});
