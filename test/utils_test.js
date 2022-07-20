/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { utils } = require('../dist/index');
const assert = require('assert').strict;
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
            assert.equal(utils.isNull(''), false);
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
            assert.equal(utils.isFunction('test string'), false);
        });
        let f1 = ()=> {
            //
        };

        function f2() {
            //
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
            assert.equal(utils.isString('string'), true);
        });
    });

    describe('utils.isNull', ()=> {
        it('value: null', ()=> {
            assert.equal(utils.isNull(null), true);
        });
        it('value: undefined', ()=> {
            assert.equal(utils.isNull(undefined), true);
        });
        it('number: 0', ()=> {
            assert.equal(utils.isNull(0), false);
        });
        it('number: 1', ()=> {
            assert.equal(utils.isNull(1), false);
        });
        it('string: ""', ()=> {
            assert.equal(utils.isNull(''), false);
        });
        it('string: "I am string!"', ()=> {
            assert.equal(utils.isNull('I am string'), false);
        });
        it('boolean: true', ()=> {
            assert.equal(utils.isNull(true), false);
        });
        it('boolean: false', ()=> {
            assert.equal(utils.isNull(false), false);
        });
        it('object: {}', ()=> {
            assert.equal(utils.isNull({}), false);
        });
        it('array: {a:"test"}', ()=> {
            assert.equal(utils.isNull({a:'test'}), false);
        });
        it('array: []', ()=> {
            assert.equal(utils.isNull([]), false);
        });
    });

    describe('utils.isNotNull', ()=> {
        it('value: null', ()=> {
            assert.equal(utils.isNotNull(null), false);
        });
        it('value: undefined', ()=> {
            assert.equal(utils.isNotNull(undefined), false);
        });
        it('number: 0', ()=> {
            assert.equal(utils.isNotNull(0), true);
        });
        it('number: 1', ()=> {
            assert.equal(utils.isNotNull(1), true);
        });
        it('string: ""', ()=> {
            assert.equal(utils.isNotNull(''), true);
        });
        it('string: "I am string!"', ()=> {
            assert.equal(utils.isNotNull('I am string'), true);
        });
        it('boolean: true', ()=> {
            assert.equal(utils.isNotNull(true), true);
        });
        it('boolean: false', ()=> {
            assert.equal(utils.isNotNull(false), true);
        });
        it('object: {}', ()=> {
            assert.equal(utils.isNotNull({}), true);
        });
        it('array: {a:"test"}', ()=> {
            assert.equal(utils.isNotNull({a:'test'}), true);
        });
        it('array: []', ()=> {
            assert.equal(utils.isNotNull([]), true);
        });
    });

    describe('utils.isNotNullOrEmptyString', ()=> {
        it('value: null', ()=> {
            assert.equal(utils.isNotNullOrEmptyString(null), false);
        });
        it('value: undefined', ()=> {
            assert.equal(utils.isNotNullOrEmptyString(undefined), false);
        });
        it('string: ""', ()=> {
            assert.equal(utils.isNotNullOrEmptyString(''), false);
        });
        it('string: "I am string!"', ()=> {
            assert.equal(utils.isNotNullOrEmptyString('I am string!'), true);
        });

    });

    describe('utils.isInteger', ()=> {
        it('number: 1.1', ()=> {
            assert.equal(utils.isInteger(1.1), false);
        });

        it(`number: ${Number.MAX_SAFE_INTEGER + 1}`, ()=> {
            assert.equal(utils.isInteger(Number.MAX_SAFE_INTEGER + 1), true);
        });

        it(`number: ${-Number.MAX_SAFE_INTEGER - 1}`, ()=> {
            assert.equal(utils.isInteger(Number.MAX_SAFE_INTEGER - 1), true);
        });


        it('number:0', ()=> {
            assert.equal(utils.isInteger(0), true);
        });


        it('number: -1', ()=> {
            assert.equal(utils.isInteger(-1), true);
        });
        it('number: 1', ()=> {
            assert.equal(utils.isInteger(1), true);
        });
        it('string: "00001"', ()=> {
            assert.equal(utils.isInteger('00001'), false);
        });

        it('string: "this is string!"', ()=> {
            assert.equal(utils.isInteger('00001'), false);
        });

        it('boolean: true', ()=> {
            assert.equal(utils.isInteger(true), false);
        });
        it('boolean: false', ()=> {
            assert.equal(utils.isInteger(false), false);
        });
    });

    describe('utils.formatMemory', () => {
        let s = [
            {value: 9, result: '9'},
            {value: 99, result: '99'},
            {value: 999, result: '999'},
            {value: 9999, result: '9.76KB'},
            {value: 99999, result: '97.66KB'},
            {value: 1024, result: '1.00KB'},
            {value: 10240, result: '10.00KB'},
            {value: 99999999, result: '95.37MB'},
            {value: 999999999, result: '953.67MB'},
            {value: 9999999999, result: '9.31GB'},
            {value: 99999999999, result: '93.13GB'},
            {value: 999999999999, result: '931.32GB'},
            {value: 9999999999999, result: '9.09TB'},
            {value: 99999999999999, result: '90.95TB'},
            {value: 999999999999999, result: '909.49TB'},
            // {value: 9999999999999999n, result: '8.88PB'},
        ];
        for(let item of s) {
            it (`utils.formatMemory(${item.value}) === ${item.result}`, ()=>{
                assert.equal(utils.formatMemory(item.value), item.result);
            });
        }
    });

    describe('utils.keyValues', ()=> {
        let obj = {
            a:100,
            b:200,
            c:300,
            d:'aaa'
        };
        keys = Object.keys(obj);
        values = Object.values(obj);
        it (`utils.keyValues(${JSON.stringify(obj)})`, () => {
            let r = utils.keyValues(obj);
            assert.equal(r.keys.join(), keys.join());
            assert.equal(r.values.join(), values.join());
        });
    });
    // public static randomBetween(paramMin: number, paramMax: number) {
    //     return this.randomInteger() % (paramMax - paramMin + 1) + paramMin;
    // }

    describe('utils.randomBetween', ()=> {
        let begin = 1;
        let end = 10;
        for(let i = 0; i < 20; i++) {
            let v = utils.randomBetween(begin, end);
            let result = v >= begin && v <= end;
            it (`utils.randomBetween(${begin},${end}) = ${v}`, ()=>{
                assert.equal(result, true);
            });
        }
    });
    describe('utils.DateTimeOffset', ()=>{
        let  dt = 20000;
        it ('GetDateTimeOffset by init:  === 0', ()=>{
            assert.equal(utils.GetDateTimeOffset(), 0);
        });

        it ('SetDateTimeOffset by string: "input string"', ()=>{
            assert.equal(utils.SetDateTimeOffset('input string'), false);
        });
        it ('SetDateTimeOffset by boolean: true', ()=>{
            assert.equal(utils.SetDateTimeOffset(true), false);
        });
        it ('SetDateTimeOffset by float: 1.1', ()=>{
            assert.equal(utils.SetDateTimeOffset(1.1), false);
        });
        it (`SetDateTimeOffset by int: ${dt}`, ()=>{
            assert.equal(utils.SetDateTimeOffset(dt), true);
        });
        it (`GetDateTimeOffset by ${dt}`, ()=>{
            assert.equal(utils.GetDateTimeOffset(), dt);
        });

        it ('GetCurrNow by Curr DateTime', ()=> {
            let currNow = utils.GetCurrNow();
            let stNow = Date.now();
            assert.equal(currNow, stNow);
        });

        it ('GetDateTimeNow by offset DateTime', ()=> {
            let currNow = utils.GetDateTimeNow();
            let stNow = Date.now() + dt;
            assert.equal(currNow, stNow);
        });

    });
});
