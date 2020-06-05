function testLog() {
	let comm = require("../index");
	let log = comm.getLogger(__filename);
	log.info("hello world");
}

function testwritedir(paramPath) {
	let comm = require("../index");
	let log = comm.getLogger(__filename);
	let utils = comm.utils;
	let path = "c:/a/b/c/d/e/f/g";
	let r = utils.mkdirsSync(path);
	log.info("make path:" + path + " result=" + r);
	let v = utils.ToInteger("100",99);
	let v1 = utils.ToInteger("abcd1111100",99);
	log.info("v=" + v + ",v1=" + v1);
}

function testCode() {
    let {codeUtils} = require('../index');
    let a = [1,2,3,4];
    let s = a.join(',');
    let m1 = codeUtils.MD5FromString(s, 'base64');
    let m2 = codeUtils.MD5FromArgs({encode:'base64', capital:true, split:','}, ...a);
    console.log(m1,'\n', m2);
}

async function testHttpCall() {
    let {CHttpCall} = require("../index");
    let h = new CHttpCall();
    h.init('127.0.0.1', 7369);
    let r = await h.asyncJsonPost('/applist/appid', {});
    console.log(JSON.stringify(r, null, 2));
}

function testRandom() {
    let {utils} = require('../index');
    for(let i = 0; i < 100; i++) {
        console.log('randomInteger:' + utils.randomInteger());
    }

    console.log('----------------------------------------');
    for(let i = 0; i < 100; i++) {
        console.log('randomScope(200):' + utils.randomScope(200));
    }

    console.log('----------------------------------------');
    for(let i = 0; i < 100; i++) {
        console.log('randomBetween(1,30):' + utils.randomBetween(1,30));
    }

}

testRandom();

//testHttpCall();
// testCode();

//testLog();
//testwritedir();
