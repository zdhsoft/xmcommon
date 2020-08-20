const path = require("path");
const fs = require("fs");

let callbackmap = {};
/**
 * watch指定的js文件，并加载回调
 * 这个主要是用于动态加载
 * @notice 最终于文件名是由path+file组成，对于path不能使用相对路径
 * @param {function} paramCallback 文件有变化，加载后的回调函数
 * @param {string} paramPath 环境所在的路径 这里一定要填写绝对路径，否则会侦听不了文件的变化
 * @param {string} paramFile 要watch的文件名
 * @param {boolean} paramChangeCallback 有变化才回调
 * @return {void}
 */
function watchRequire(paramCallback, paramPath, paramFile, paramChangeCallback = true) {
    let realPath = path.join(paramPath, paramFile);

    if (!callbackmap[realPath]) {
        let cbList = [];
        callbackmap[realPath] = cbList;

        fs.watchFile(realPath, (/*curr*/) => {

            delete require.cache[realPath];
            let cnt = cbList.length - 1;
            for (let i = cnt; 0 <= i; i--) {
                cbList[i](require(realPath));
            }
        });
    }

	callbackmap[realPath].push(paramCallback);
    if(!paramChangeCallback) {
        paramCallback(require(realPath));  //只有变化
    }
}
exports.watchRequire = watchRequire;
