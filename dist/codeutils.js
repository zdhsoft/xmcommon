"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeUtils = void 0;
const crypto_1 = __importDefault(require("crypto"));
const lodash_1 = __importDefault(require("lodash"));
/** crypto的算法枚举 */
var EnumCryptoAlgorithm;
(function (EnumCryptoAlgorithm) {
    EnumCryptoAlgorithm["sha256"] = "sha256";
    EnumCryptoAlgorithm["md5"] = "md5";
})(EnumCryptoAlgorithm || (EnumCryptoAlgorithm = {}));
/** base64 编码 */
const EncodingBase64 = 'base64';
/** hex 16进制编码 */
const EncodingHex = 'hex';
/** utf-8 字符集编码 */
const EncodingUTF8 = 'utf8';
/**
 * 一组编码函数
 */
// tslint:disable-next-line: class-name
class codeUtils {
    /**
     * 对字符串进行Base64编码
     * @param paramStringValue 要编码的字符串
     * @return base64编码后的字符串
     */
    static StringBase64Encode(paramStringValue) {
        return Buffer.from(paramStringValue).toString(EncodingBase64);
    }
    /**
     * 将字符串编码后base64还原成字符串
     * @param paramBase64Value 编码后的base64字符串
     * @param encoding 字符串编码，主要有utf-8等
     * @return 返回解码后的字符串
     */
    static StringBase64Decode(paramBase64Value, encoding) {
        return Buffer.from(paramBase64Value, EncodingBase64).toString(encoding);
    }
    /**
     * 生成字符串的sha256编码
     * @param paramText 要生成sha256的字符串
     * @param paramKey sha256需要的key
     * @return 小写十六进制的sha256字符串
     */
    static HMacSHA256FromString(paramText, paramKey) {
        const hash = crypto_1.default.createHmac(EnumCryptoAlgorithm.sha256, paramKey);
        return hash.update(paramText).digest(EncodingHex);
    }
    /**
     * 生成字符串的sha256编码，注意这个不是hmac的，纯sha256编码
     * @param paramText 要生成sha256的字符串
     * @param paramEncode 指定输出的编码类型 hex or base64
     * @return 小写十六进制或BASE64的sha256字符串，如果指定的编码无效，则返回null
     */
    static SHA256FromString(paramText, paramEncode = EncodingHex) {
        const hash = crypto_1.default.createHash(EnumCryptoAlgorithm.sha256);
        return hash.update(paramText).digest(paramEncode);
    }
    /**
     * 生成字符串的MD5
     * @param paramString 要生成md5的字符串
     * @param paramEncode 生成md5后的编码 hex表示是小写16进制字符串 base64表示的base64编码的字符串
     * @return 生成的md5
     */
    static MD5FromString(paramString, paramEncode = EncodingHex) {
        return crypto_1.default.createHash(EnumCryptoAlgorithm.md5).update(paramString, EncodingUTF8).digest(paramEncode);
    }
    /**
     * 生成字符串数组的MD5
     * @param paramStringList 要生成md5的字符串数组
     * @param paramEncode 生成md5后的编码 hex表示是小写16进制字符串 base64表示的base64编码的字符串
     * @return 生成的md5
     */
    static MD5FromStringList(paramStringList, paramEncode = EncodingHex) {
        const hash = crypto_1.default.createHash(EnumCryptoAlgorithm.md5);
        for (const s of paramStringList) {
            hash.update(s, EncodingUTF8);
        }
        return hash.digest(paramEncode);
    }
    /**
     * 生成数据数组的MD5
     * @param paramDataList 要生成md5的字符串数组
     * @param paramEncode 生成md5后的编码 hex表示是小写16进制字符串 base64表示的base64编码的字符串
     * @return 生成的md5
     */
    static MD5FromBufferList(paramDataList, paramEncode = EncodingHex) {
        const hash = crypto_1.default.createHash(EnumCryptoAlgorithm.md5);
        for (const s of paramDataList) {
            hash.update(s);
        }
        return hash.digest(paramEncode);
    }
    /**
     * 生成数据的MD5
     * @param paramData 要生成md5的数据
     * @param paramEncode 生成md5后的编码 hex表示是小写16进制字符串 base64表示的base64编码的字符串
     * @return 生成的md5
     */
    static MD5FromBuffer(paramData, paramEncode = EncodingHex) {
        return crypto_1.default.createHash(EnumCryptoAlgorithm.md5).update(paramData).digest(paramEncode);
    }
    /**
     * 根据变参，将变参数连接起来后，生成md5
     * @param  paramOptions encode表示编码方式，可以是是hex或base64，默认为hex,
     * capital:表示是否是大小，默认是小写, split表示参数连接成符串时间隔字符串
     * @param  args 可变参数
     * @example
     * let options = {
     *  encode:'hex',  //不存在，则默认为hex
     *  capital:false, //不存在，则默认为false, 当encode为'hex'时有效
     *  split:''       //不存在，则默认为''
     * };
     * console.log(codeUtils.MD5FromArgs(options, 1,2,3,4,"test"));
     */
    static MD5FromArgs(paramOptions, ...args) {
        let encode = EncodingHex;
        let capital = false;
        let split = '';
        // 分析参数
        if (lodash_1.default.isObjectLike(paramOptions)) {
            if (paramOptions.encode === EncodingHex || paramOptions.encode === EncodingBase64) {
                encode = paramOptions.encode;
            }
            if (paramOptions.capital === true || paramOptions.capital === false) {
                capital = paramOptions.capital;
            }
            if (encode === EncodingBase64) {
                capital = false;
            }
            if (lodash_1.default.isString(paramOptions.split)) {
                split = paramOptions.split;
            }
        }
        const s = args.join(split);
        // 生成md5字符串
        let md5string = crypto_1.default.createHash(EnumCryptoAlgorithm.md5).update(s, EncodingUTF8).digest(encode);
        if (capital) {
            // 如果是要求大写
            md5string = md5string.toUpperCase();
        }
        return md5string;
    }
}
exports.codeUtils = codeUtils;
