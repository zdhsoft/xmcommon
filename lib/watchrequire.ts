import fs from 'fs';
import path  from 'path';
// 回调关系映射表
let callbackmap: any = {};

type TCallBack = (paramData: any) => void;
/**
 * watch指定的js文件，并加载回调
 * 这个主要是用于动态加载
 * @notice 最终于文件名是由path+file组成，对于path不能使用相对路径
 * @param paramCallback 文件有变化，加载后的回调函数
 * @param paramPath 环境所在的路径 这里一定要填写绝对路径，否则会侦听不了文件的变化
 * @param paramFile 要watch的文件名
 * @param paramChangeCallback 有变化才回调
 */
export function watchRequire( paramCallback: (paramData: any) => void, paramPath: string, paramFile: string, paramChangeCallback: boolean = true): void {
    let realPath = path.join(paramPath, paramFile);

    if (!callbackmap[realPath]) {
        let cbList: TCallBack [] = [];
        callbackmap[realPath] = cbList;

        fs.watchFile(realPath, (/*curr*/) => {

            delete require.cache[realPath];

            const len = cbList.length - 1;

            for (let i = len; 0 <= i; i--) {
                cbList[i](require(realPath));
            }
        });
    }

	callbackmap[realPath].push(paramCallback);
    if(!paramChangeCallback) {
        paramCallback(require(realPath));  // 只有变化
    }
}
