const TlRpcServer = require("../../TlRpcServer");
const { modeEnum, versionEnum } = require("../../comm/comm");

/**
 * rpc api服务端
 * @version 1.0.0
 * @author iamtsm
 */
class TlApiRpcServer extends TlRpcServer{
    /**
     * -- 公共属性
     * api服务端版本
     */
    version = versionEnum.V1;

    /**
     * 处理接口函数定义
     */
    #handlerMap = {};

    /**
     * 初始化
     * @param {*} rpcConfig 
     */
    constructor(rpcConfig){
        super(Object.assign(rpcConfig, {mode : modeEnum.API}));
    }

    /**
     * -- 对外提供
     * 监听服务端处理函数
     * @param {*} api 
     * @param {*} handler 
     */
    on(api, handler){
        this.#handlerMap[api] = handler;
        return this;
    }

    /**
     * -- 对外提供
     * 启动服务端
     * @returns
     */
    start(){
        return this.startServer(this.#handlerMap);
    }
}

module.exports = TlApiRpcServer;