/// <reference types="node" />
/** 编码类型 */
declare type HexBase64Encoding = 'hex' | 'base64';
/** 函数MD5FromArgs中 md5 生成选项 */
export interface IMD5Options {
    /** 生成后的编码，默认是hex */
    encode?: HexBase64Encoding;
    /** 是否是大写， 默认是小写 */
    capital?: boolean;
    /** 多个参数之间的分隔符，默认是""  */
    split?: string;
}
/**
 * 一组编码函数
 */
export declare class codeUtils {
    /**
     * 对字符串进行Base64编码
     * @param paramStringValue 要编码的字符串
     * @return base64编码后的字符串
     */
    static StringBase64Encode(paramStringValue: string): string;
    /**
     * 将字符串编码后base64还原成字符串
     * @param paramBase64Value 编码后的base64字符串
     * @param encoding 字符串编码，主要有utf-8等
     * @return 返回解码后的字符串
     */
    static StringBase64Decode(paramBase64Value: string, encoding?: string): string;
    /**
     * 生成字符串的sha256编码
     * @param paramText 要生成sha256的字符串
     * @param paramKey sha256需要的key
     * @return 小写十六进制的sha256字符串
     */
    static HMacSHA256FromString(paramText: string, paramKey: string): string;
    /**
     * 生成字符串的sha256编码，注意这个不是hmac的，纯sha256编码
     * @param paramText 要生成sha256的字符串
     * @param paramEncode 指定输出的编码类型 hex or base64
     * @return 小写十六进制或BASE64的sha256字符串，如果指定的编码无效，则返回null
     */
    static SHA256FromString(paramText: string, paramEncode?: HexBase64Encoding): string;
    /**
     * 生成字符串的MD5
     * @param paramString 要生成md5的字符串
     * @param paramEncode 生成md5后的编码 hex表示是小写16进制字符串 base64表示的base64编码的字符串
     * @return 生成的md5
     */
    static MD5FromString(paramString: string, paramEncode?: HexBase64Encoding): string;
    /**
     * 生成字符串数组的MD5
     * @param paramStringList 要生成md5的字符串数组
     * @param paramEncode 生成md5后的编码 hex表示是小写16进制字符串 base64表示的base64编码的字符串
     * @return 生成的md5
     */
    static MD5FromStringList(paramStringList: [string], paramEncode?: HexBase64Encoding): string;
    /**
     * 生成数据数组的MD5
     * @param paramDataList 要生成md5的字符串数组
     * @param paramEncode 生成md5后的编码 hex表示是小写16进制字符串 base64表示的base64编码的字符串
     * @return 生成的md5
     */
    static MD5FromBufferList(paramDataList: [Buffer], paramEncode?: HexBase64Encoding): string;
    /**
     * 生成数据的MD5
     * @param paramData 要生成md5的数据
     * @param paramEncode 生成md5后的编码 hex表示是小写16进制字符串 base64表示的base64编码的字符串
     * @return 生成的md5
     */
    static MD5FromBuffer(paramData: Buffer, paramEncode?: HexBase64Encoding): string;
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
    static MD5FromArgs(paramOptions: IMD5Options, ...args: unknown[]): string;
}
export {};
