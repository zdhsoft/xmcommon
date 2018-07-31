let http                   = require("http");
let https                  = require("https");
let {utils}                = require('./utils');
let {getLogger}            = require('./log');
let {URL, URLSearchParams} = require('url');
let log = getLogger(__filename);

/**
 * HttpCall的错误码定义
 */
const HttpCallError = {
    OK                   : 0,    //成功
    HTTP_ERROR           : -1,   //应答状态不是200
    INVALID_JSON         : -2,   //应答的数据，不是json数据
    HAS_ERROR            : -3,   //发生错误
    REQUEST_ERROR        : -4,   //请求错误
    JSON_SYNTAX          : -5,   //应答的json数据,语法格式错误
    CALLBACK_NOT_FUNCTION: -6,   //回调函数不是函数
    PATH_NOT_STRING      : -7,   //参数path不是字符串
    MSG_NOT_OBJECT       : -8,   //要发送的消息，不是object   
    MSG_NOT_STRING       : -9,   //要发送的消息，不是字符串

    isOK: function(paramValue) {
        return HttpCallError.OK === paramValue;
    }
};

/**
 * 检查请求传入的参数，如果不是有效的参数，则返回指定的错误码
 * @param {function} cb 被检查回调的函数
 * @param {string} path 被检查的path
 * @param {object} msg 被检查的msg
 * @return {number} 检查结果HttpCallError 中错误的定义
 * @see HttpCallError
 */
function checkRequestParam(cb, path, msg) {
    if (!utils.isFunction(cb)) {
        return HttpCallError.CALLBACK_NOT_FUNCTION;
    }

    if (!utils.isString(path)) {
        return HttpCallError.PATH_NOT_STRING;
    }

    if (utils.isNotNull(msg) && !utils.isObject(msg)) {
        return HttpCallError.MSG_NOT_OBJECT;
    }

    return HttpCallError.OK;
}
/**
 * 请求的回调处理
 * @param {(code:number, data:object)=>void} cb 回调函数
 * @param {object} res 响应对象
 * @return {void}
 */
function requestResponse(cb, res) {
    if (res.statusCode !== 200) {
        console.log("response error: %o", res);
        cb(HttpCallError.HTTP_ERROR, { errmsg: `应答状态为：${res.statusCode}` });
        return;
    }
    //只处理JSON的数据
    const contentType = res.headers['content-type'];
    const isJsonData = true;// /^application\/json/.test(contentType);

    if (!isJsonData) {
        cb(HttpCallError.INVALID_JSON, { errmsg: '数据不是有效的json数据类型！' });
        return;
    }

    let datas = [];
    res.on('data', (data) => {
        if (utils.isNotNull(data)) {
            datas.push(data);
        }
    });

    res.on("error", (err) => {
        log.error("%o", err);

        if (cb) cb(HttpCallError.HAS_ERROR, { errmsg: '发生错误', err });
    });

    res.on('end', (data) => {
        if (utils.isNotNull(data)) {
            datas.push(data);
        }
        if (datas.length > 0) {
            let d = datas.join();// Buffer.concat(datas, lens).toString('utf-8');
            try {
                let r = JSON.parse(d);
                cb(0, r);
            } catch (e) {
                log.error("exception: %o", e);
                cb(HttpCallError.JSON_SYNTAX, { errmsg: '无效的json数据！', err: e });
            }
        } else {
            if (cb) cb(HttpCallError.OK, {});
        }
    });
}
/**
 * 一个封装了http请求的类
 * 对于GET和POST的方法，返回的数据要求都是JSON，否则出错
 * 对于POST则请求的数据，也是JSON数据(这里会把Object转换成JSON字符串)
 */
class CHttpCall {
    /**
     * CHttpCall 的构造函数
     */
    constructor() {
        this.m_host = "localhost";
        this.m_port = 3999;
    }
    /**
     * 初始化函数
     * @param {string} paramHost host的地址
     * @param {number} paramPort host的端口
     * @return {void}
     */
    init(paramHost, paramPort) {
        this.m_host = paramHost;
        this.m_port = paramPort;
    }
    /**
     * json get方式请求数据
     * @param {(code:number, data:object)} cb 完成后的回调函数 
     * @param {String} path api路径 包括/ 如/guestlogin 
     * @param {Object} msg 要发送的消息 
     * @param {boolean} httpsFlag 是否是用https
     * @return {number} 错误码
     */    
    jsonGet(cb, path, msg, httpsFlag = false){
        //检查传入参数是否合法
        let checkResult = checkRequestParam(cb, path, msg);
        if(!HttpCallError.isOK(checkResult)) {
            return checkResult;
        }
        
        //使用URLSearchParams是解决名称或值中特殊字符的问题
        let p = new URLSearchParams();
        for(let key in msg) {
            p.append(key, msg[key]);
        }

        let h = httpsFlag ? https : http;
        let u          = new URL('http://localhost');
            u.host     = this.m_host;
            u.pathname = path;
            u.search   = p.toString();
            u.port     = this.m_port;
            u.protocol = httpsFlag?'https':'http';
            u.method   = 'GET';

        let req        = h.request(u, (res)=>{ requestResponse(cb, res);  });

        req.on("error", (err)=>{
            if(cb) {
                cb(HttpCallError.REQUEST_ERROR, {errmsg:'发生错误', err});
            }
        });
        req.end();

        return checkResult;
    }


   /**
     * json post方式请求数据,传入的消息是字符串
     * @param {(code:number, data:object)} cb 完成后的回调函数 
     * @param {String} path api路径 包括/ 如/guestlogin 
     * @param {String} msg 要发送的消息 
     * @param {Object} paramHeaders 自定义的http头
     * @param {boolean} paramHttpsFlag 是否使用 https
     * @return {number} 错误码
     */
    jsonPostStringBody(cb, path, msg, paramHeaders, paramHttpsFlag = false) {
        //检查传入参数是否合法
        if(!utils.isString(msg)) {
            return HttpCallError.MSG_NOT_STRING;
        }

        let checkResult = checkRequestParam(cb, path, );
        if(!HttpCallError.isOK(checkResult)) {
            return checkResult;
        }
        
        let content = msg;
        
        let headers = {};
        if(utils.isNotNull(paramHeaders)) {
            utils.dataAssign(headers, paramHeaders);
        }
        headers['Content-Type']   = 'application/json';
        headers['Content-Length'] = Buffer.byteLength(content);

        let options = { 
            hostname: this.m_host,
            port    : this.m_port,
            path    : path,
            method  : 'POST',
            headers 
        }; 
        let h = paramHttpsFlag ? https : http;
        log.info("%o",options);
        let req = h.request(options, (res)=>{ requestResponse(cb, res); });
        req.on("error", (err)=>{
            if(cb) {
                cb(HttpCallError.REQUEST_ERROR, {errmsg:'发生错误', err});
            }
        });

        req.write(content);
        req.end();
        return checkResult;
    }

    /**
     * json post方式请求数据
     * @param {(code:number, data:object)} cb 完成后的回调函数 
     * @param {String} path api路径 包括/ 如/guestlogin 
     * @param {Object} msg 要发送的消息 
     * @param {Object} paramHeaders 自定义的http头
     * @param {boolean} paramHttpsFlag 是否使用 https
     * @return {number} 错误码
     */
    jsonPost(cb, path, msg, paramHeaders, paramHttpsFlag = false) {
        //检查传入参数是否合法
        let checkResult = checkRequestParam(cb, path, msg);
        if(!HttpCallError.isOK(checkResult)) {
            return checkResult;
        }
        
        let content = JSON.stringify(msg);
        
        let headers = {};
        if(utils.isNotNull(paramHeaders)) {
            utils.dataAssign(headers, paramHeaders);
        }
        headers['Content-Type']   = 'application/json';
        headers['Content-Length'] = Buffer.byteLength(content);

        let options = { 
            hostname: this.m_host,
            port    : this.m_port,
            path    : path,
            method  : 'POST',
            headers 
        }; 
        let h = paramHttpsFlag ? https : http;
        log.info("%o",options);
        let req = h.request(options, (res)=>{ requestResponse(cb, res); });
        req.on("error", (err)=>{
            if(cb) {
                cb(HttpCallError.REQUEST_ERROR, {errmsg:'发生错误', err});
            }
        });

        req.write(content);
        req.end();
        return checkResult;
    }
}

let HttpCall              = new CHttpCall();
    exports.HttpCall      = HttpCall;
    exports.CHttpCall     = CHttpCall;
    exports.HttpCallError = HttpCallError;