"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
let s = utils_1.utils.GetStack();
for (let ss of s) {
    console.log('-->', ss.getFileName(), ss.getFunction(), ss.getLineNumber());
}
