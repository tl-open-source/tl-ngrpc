const TlRpcClient = require("../../TlRpcClient");
const { modeEnum, versionEnum } = require("../../comm/comm");

/**
 * rpc api模式client
 * @version 1.0.0
 * @author iamtsm
 */
class TlApiRpcClient extends TlRpcClient{
    /**
     * -- 公共属性
     * api调用版本
     */
    version = versionEnum.V1;

    /**
     * -- 私有属性
     * client实例
     */
    #instanceClient = this.getClient();

    /**
     * 初始化
     * @param {*} rpcConfig 
     */
    constructor(rpcConfig){
        super(Object.assign(rpcConfig, {mode : modeEnum.API}));
    }

    /**
     * 获取client请求对象
     * @returns 
     */
    getClient(){
        return this.clientInstance();
    }

    /**
     * -- 对外提供
     * 发送请求 
     * @param {*} api 
     * @param {*} requestArgs 
     * @returns 
     */
    async emit(api, requestArgs){
        return await new Promise((resolve, reject) => {
            this.#instanceClient[api](requestArgs, function(err, response){
                if(err){ reject(err); } else { resolve(response) }
            });
        });
    }
}

module.exports = TlApiRpcClient;