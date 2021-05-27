let { utils } = require('../dist/index');
let assert = require('assert').strict;
describe('utils', () => {
    describe('utils.GetFileNameByStack', ()=> {
        it(`filename=${__filename}`, () => {
            let statckList = utils.GetStack();
            assert.equal(utils.GetFileNameByStack(statckList), `${__filename}`);
        });
    });

    describe('utils.isNull 仅当参数为null或undefined时有为true，其它值为false', ()=>{
        it ('null', ()=>{
            assert.equal(utils.isNull(null), true);
        });
        it ('undefined', ()=>{
            assert.equal(utils.isNull(undefined), true);
        });

        it ('无传入参数', ()=>{
            assert.equal(utils.isNull(), true);
        });
        it ('number:0', ()=>{
            assert.equal(utils.isNull(0), false);
        });
        it ('number:-1', ()=>{
            assert.equal(utils.isNull(-1), false);
        });
        it ('string:""', ()=>{
            assert.equal(utils.isNull(""), false);
        });
        it ('array:[]', ()=>{
            assert.equal(utils.isNull([]), false);
        });
    });
    describe('utils.isFunction 检查专入参数是否是函数', ()=> {
        it('number: 0', ()=>{
            assert.equal(utils.isFunction(0), false);
        });
        it('string:"test string"', ()=>{
            assert.equal(utils.isFunction("test string"), false);
        });
        let f1 = ()=> {};

        function f2() {

        }
        it('function:f1', ()=>{
            assert.equal(utils.isFunction(f1), true);
        });
        it('function:f2', ()=>{
            assert.equal(utils.isFunction(f2), true);
        });
    });
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
        it('constant: undefined', () => {
            assert.equal(utils.isString(undefined), false);
        });
        it('constant: null', () => {
            assert.equal(utils.isString(null), false);
        });
        it('array: []', () => {
            assert.equal(utils.isString([]), false);
        });
        it('string: "string" ', () => {
            assert.equal(utils.isString("string"), true);
        });
    });
});
