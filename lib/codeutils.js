//这里提供一些编解码的功能函数
let crypto = require("crypto");
let _ = require("lodash");
/**
 * 一组编码函数
 */
class codeUtils{
    /**
     * 对字符串进行Base64编码
     * @param {String} paramStringValue 要编码的字符串
     * @return {String} base64编码后的字符串
     */
    static StringBase64Encode(paramStringValue) {
        return Buffer.from(paramStringValue).toString('base64');
    }
    /**
     * 将字符串编码后base64还原成字符串
     * @param {string} paramBase64Value 编码后的base64字符串
     * @param {string} encoding 字符串编码，主要有utf-8等
     * @return {String} 返回解码后的字符串
     */
    static StringBase64Decode(paramBase64Value, encoding = undefined) {
        return Buffer.from(paramBase64Value, 'base64').toString(encoding);
    }
    /**
     * 生成字符串的sha256编码
     * @param {String} paramText 要生成sha256的字符串
     * @param {String} paramKey sha256需要的key
     * @return {String} 小写十六进制的sha256字符串
     */
    static HMacSHA256FromString(paramText, paramKey) {
        const hash = crypto.createHmac('sha256', paramKey);
        let r = hash.update(paramText)
            .digest('hex');
        return r;
    }

    /**
     * 生成字符串的Hsha256编码，注意这个不是hmac的，纯sha256编码
     * @param {String} paramText 要生成sha256的字符串
     * @param {Number} paramEncode 指定输出的编码类型 hex or base64
     * @return {String} 小写十六进制或BASE64的sha256字符串，如果指定的编码无效，则返回null
     */
    static SHA256FromString(paramText, paramEncode) {
        const hash = crypto.createHash('sha256');
        let r = hash.update(paramText).digest(paramEncode);
        return r;
    }

    /**
     * 生成字符串的MD5
     * @param {string} paramString 要生成md5的字符串
     * @param {string} paramEncode 生成md5后的编码 hex表示是小写16进制字符串 base64表示的base64编码的字符串
     * @return {string} 生成的md5
     */
    static MD5FromString(paramString, paramEncode = 'hex') {
        return crypto.createHash('md5').update(paramString, 'utf8').digest(paramEncode);
    }

    /**
     * 根据变参，将变参数连接起来后，生成md5
     * @param {{encode:string, capital:boolean, split:string}} paramOptions encode表示编码方式，可以是是hex或base64，默认为hex, 
     * capital:表示是否是大小，默认是小写, split表示参数连接成符串时间隔字符串
     * @param  {...any} args 可变参数
     * @example
     * let options = {
     *  encode:'hex',  //不存在，则默认为hex
     *  capital:false, //不存在，则默认为false, 当encode为'hex'时有效
     *  split:''       //不存在，则默认为''
     * };
     * console.log(codeUtils.MD5FromArgs(options, 1,2,3,4,"test"));
     */
    static MD5FromArgs(paramOptions, ...args) {
        let encode = 'hex';
        let capital = false;
        let split = '';
        //分析参数
        if(_.isObjectLike(paramOptions)) {
            if(paramOptions.encode === 'hex' || paramOptions.encode === 'base64') {
                encode = paramOptions.encode;
            }
            if(paramOptions.capital === true || paramOptions.capital === false) {
                capital = paramOptions.capital;
            }
            if(encode === 'base64') {
                capital = false;                   
            }
            if(_.isString(paramOptions.split)) {
                split = paramOptions.split;
            }
        }

        let s = args.join(split);
        //生成md5字符串
        let md5string = crypto.createHash('md5').update(s, 'utf8').digest(encode);

        if(capital) {  //如果是要求大写
            md5string = md5string.toUpperCase();
        }
        return md5string;
    }
}
exports.codeUtils = codeUtils;
