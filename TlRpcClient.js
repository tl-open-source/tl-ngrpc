const { credentials } = require('@grpc/grpc-js');
const TlRpc = require("./TlRpc");

/**
 * rpc通用client
 * @version 1.0.0
 * @author iamtsm
 */
class TlRpcClient extends TlRpc{
    /**
     * -- 私有属性
     * client实例
     */
    static #clientInstance = new Map();

    /**
     * 初始化
     * @param {*} rpcConfig 
     */
    constructor( rpcConfig ) {
        super( rpcConfig )
    }

    /**
     * 返回client缓存对象的key
     */
    #clientInstanceKey() {
        const config = this.getConfig();
        return config.name + "-" + config.protoPackage + "-" + config.protoImpl + "-" + config.ip + "-" + config.port;
    }

    /**
     * 获取client对象实例
     * @returns 
     */
    clientInstance(){
        const instance = this.implInstance();
        if (!instance) {
            return null;
        }

        const clientKey = this.#clientInstanceKey();
        const client = TlRpcClient.#clientInstance.get(clientKey)
        if (client) {
            return client;
        }

        const config = this.getConfig();
        const newClient = new instance(
            config.ip + ":" + config.port,
            credentials.createInsecure(),
            { 'grpc.service_config': '{"loadBalancingConfig": [{"round_robin": {}}]}' },
        )

        console.log("create client instance for " + clientKey + " ok!")

        TlRpcClient.#clientInstance.set(clientKey, newClient);

        return newClient;
    }
}

module.exports = TlRpcClient;