let { SimpleCode } = require('../dist/index');
let assert = require('assert').strict;
describe('SimpleCode', () => {

    describe('SimpleCode.Encode && Decode', ()=>{
        let s = new SimpleCode();
        let helloContent = 'hello中文';
        let data = Buffer.from(helloContent, 'utf-8');
        const seed = 1;
        let v = s.Encode(seed, data);
        let k = s.Decode(seed, v.data);
        let m = k.data.toString('utf-8');
        it (`Encode("${helloContent}") === Decode`, ()=>{
            assert.equal(m, helloContent);
        });
    });

    describe('SimpleCode.EncodePackage && DecodePackage', ()=>{
        let s = new SimpleCode();
        let helloContent = 'hello中文Package';
        let data = Buffer.from(helloContent, 'utf-8');
        const seed = 1;
        let v = s.EncodePackage(seed, data);
        let k = s.DecodePackage(v.data);
        let m = k.data.toString('utf-8');
        it (`EncodePackage("${helloContent}") === DecodePackage`, ()=>{
            assert.equal(m, helloContent);
        });
    });

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
