let { SimpleCode } = require('../dist/index');
let assert = require('assert').strict;
describe('SimpleCode', () => {
    let s = new SimpleCode();
    let helloContent = 'hello中文';
    let data = Buffer.from(helloContent, 'utf-8');

    s.Encode()
    // describe('bitUtils.getFlag', ()=> {
    //     let vv = [];

    //     for (let i = 0; i < EnumBitConst.MAX_BIT_COUNT; i++) {
    //         vv.push(utils.randomInteger() % 2);
    //     }

    //     it (`check random bit: ${vv.join("")}`, ()=>{


    //         let s = Number.parseInt(vv.join(""), 2);
    //         let n = 0;
    //         for(let off = 0; off < vv.length; off++) {
    //             if (bitUtils.GetFlag(s, vv.length -1 - off) === vv[off]) {
    //                 n++;
    //             }
    //             // console.log(off, bitUtils.GetFlag(s, vv.length -1 - off), vv[off]);
    //         }
    //         assert.equal(n, EnumBitConst.MAX_BIT_COUNT);
    //     });
    // });
});
