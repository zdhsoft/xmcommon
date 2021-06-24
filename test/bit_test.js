let { bitUtils, utils, EnumBitConst } = require('../dist/index');
let assert = require('assert').strict;
describe('bitUtils', () => {
    describe('bitUtils.getFlag', ()=> {
        let vv = [];

        for (let i = 0; i < EnumBitConst.MAX_BIT_COUNT; i++) {
            vv.push(utils.randomInteger() % 2);
        }

        it (`check random bit: ${vv.join("")}`, ()=>{


            let s = Number.parseInt(vv.join(""), 2);
            let n = 0;
            for(let off = 0; off < vv.length; off++) {
                if (bitUtils.GetFlag(s, vv.length -1 - off) === vv[off]) {
                    n++;
                }
                // console.log(off, bitUtils.GetFlag(s, vv.length -1 - off), vv[off]);
            }
            assert.equal(n, EnumBitConst.MAX_BIT_COUNT);
        });
    });

    describe('bitUtils.getFlag', ()=> {
        let vv = [];

        for (let i = 0; i < EnumBitConst.MAX_BIT_COUNT; i++) {
            vv.push(utils.randomInteger() % 2);
        }

        let nFlag = 0;
        for(let off = 0; off < vv.length; off++) {
            nFlag = bitUtils.SetFlag(nFlag, vv.length - 1 - off, vv[off]);
        }

        it (`check setFlag: ${vv.join("")}, flag=${nFlag.toString(2).padStart(EnumBitConst.MAX_BIT_COUNT,0)}`, ()=>{
            let s = nFlag;
            let n = 0;
            for(let off = 0; off < vv.length; off++) {
                if (bitUtils.GetFlag(s, vv.length -1 - off) === vv[off]) {
                    n++;
                }
            }
            assert.equal(n, EnumBitConst.MAX_BIT_COUNT);
        });
    });

});
