let {utils} = require("../lib/utils");
let v = ["../tt", "--env", "aaaaa", "--version", "1.0.0", "aaaaa", "--flag", "true", "-aaaaa"];
let k = utils.options(v);
console.log(JSON.stringify(k, null, 2));
console.log(JSON.stringify(utils.options(process.argv), null, 2));

