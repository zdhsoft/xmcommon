import {utils, MemorySize, getLogger, SimpleCode}  from "xmcommon"
// import * as base64js from "base64-js";
// base64js.byteLength(""); // $ExpectType number
// base64js.toByteArray(""); // $ExpectType Uint8Array
// base64js.fromByteArray(new Uint8Array(0)); // $ExpectType string

let r = utils.keyValues({});
let s:SimpleCode = new SimpleCode();

let v = getLogger(__filename);
