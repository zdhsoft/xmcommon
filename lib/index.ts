import {utils} from './utils';

let s = utils.GetStack();
for(let ss of s) {
    console.log('-->', ss.getFileName(), ss.getFunction(), ss.getLineNumber());
}
