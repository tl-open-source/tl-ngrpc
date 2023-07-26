const TlRpcClient = require("../../TlRpcClient");
const { modeEnum, versionEnum } = require("../../comm/comm");

/**
 * rpc socket模式client
 * @version 1.0.0
 * @author iamtsm
 */
class TlSocketRpcClient extends TlRpcClient{
    /**
     * -- 公共属性
     * socket调用版本
     */
    version = versionEnum.V1;

    /**
     * 初始化
     * @param {*} rpcConfig 
     */
    constructor(rpcConfig){
        super(Object.assign(rpcConfig, {mode : modeEnum.SOCKET}));
    }

    /**
     * 获取client请求对象
     * @returns 
     */
    getClient(){
        return this.clientInstance();
    }
}

module.exports = TlSocketRpcClient;