"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchRequire = watchRequire;
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// 回调关系映射表
const callbackmap = {};
/**
 * watch指定的js文件，并加载回调
 * 这个主要是用于动态加载
 * @notice 最终于文件名是由path+file组成，对于path不能使用相对路径
 * @param paramCallback 文件有变化，加载后的回调函数
 * @param paramPath 环境所在的路径 这里一定要填写绝对路径，否则会侦听不了文件的变化
 * @param paramFile 要watch的文件名
 * @param paramChangeCallback 有变化才回调
 */
function watchRequire(paramCallback, paramPath, paramFile, paramChangeCallback = true) {
    const realPath = path_1.default.join(paramPath, paramFile);
    if (!callbackmap[realPath]) {
        const cbList = [];
        callbackmap[realPath] = cbList;
        fs_1.default.watchFile(realPath, ( /* curr*/) => {
            delete require.cache[realPath];
            const len = cbList.length - 1;
            for (let i = len; 0 <= i; i--) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                cbList[i](require(realPath));
            }
        });
    }
    callbackmap[realPath].push(paramCallback);
    if (!paramChangeCallback) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        paramCallback(require(realPath)); // 只有变化
    }
}
