function testLog() {
	let comm = require("../index");
	let log = comm.getLogger(__filename);
	log.info("hello world");
}

testLog();
