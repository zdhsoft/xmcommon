let { utils } = require('../dist/index');
let assert = require('assert').strict;
describe('utils', () => {
    describe('utils.isString', () => {
        it('number:1.1', () => {
            assert.equal(utils.isString(1.1), false);
        });
        it('number:-11', () => {
            assert.equal(utils.isString(1), false);
        });
        it('boolean: true', () => {
            assert.equal(utils.isString(true), false);
        });
        it('boolean: false', () => {
            assert.equal(utils.isString(false), false);
        });
        it('boolean: undefined', () => {
            assert.equal(utils.isString(undefined), false);
        });
        it('boolean: null', () => {
            assert.equal(utils.isString(null), false);
        });
        it('boolean: []', () => {
            assert.equal(utils.isString([]), false);
        });
        it('boolean: "string" ', () => {
            assert.equal(utils.isString("string"), true);
        });
    });
});
