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

testLog();
testwritedir();
