const TlRpc = require("./TlRpc")
const grpc = require('@grpc/grpc-js');

/**
 * rpc通用server
 * @version 1.0.0
 * @author iamtsm
 */
class TlRpcServer extends TlRpc{

    /**
     * 初始化
     * @param {*} rpcConfig
     */
    constructor(rpcConfig) {
        super(rpcConfig)
    }

    /**
     * -- 对外提供
     * 获取实例化service接口列表对象
     * @returns service instance
     */
    #serviceDefinition() {
        const instance = this.implInstance();
        if (!instance) {
            return null;
        }
        return instance.service;
    }

    /**
     * 启动服务
     * 启动时需要添加相应的启动函数
     * @returns 
     */
    async startServer(handlerMap = {}){
        if(Object.keys(handlerMap).length === 0){
            return null;
        }
        console.log(handlerMap)

        const server = new grpc.Server();
        const config = this.getConfig();
        return await new Promise(resolve => {
            server.addService(this.#serviceDefinition(), handlerMap);
            server.bindAsync(
                config.ip + ":" + config.port,
                grpc.ServerCredentials.createInsecure(), () => {
                    server.start();
                    console.log(`${JSON.stringify(config)} server start!`)
                    resolve(handlerMap)
                }
            );
        })
    }
}

module.exports = TlRpcServer;