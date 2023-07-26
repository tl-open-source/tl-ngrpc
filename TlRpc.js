const { loadProtoInstance, modeEnum } = require("./comm/comm");
const TlRpcConfig = require("./config/TlRpcConfig");

/**
 * rpc-client, rpc-server通用类
 * 负责proto定义的加载和初始化
 * @version 1.0.0
 * @author iamtsm
 */
class TlRpc {
    /**
     * -- 私有属性
     * api proto实例
     */
    static #apiProtoInstance = new Map();

    /**
     * -- 私有属性
     * socket proto实例
     */
    static #socketProtoInstance = new Map();

    /**
     * -- 公共属性
     * rpc 配置
     */
    static #configInstance = new TlRpcConfig({
        protoName : "", protoPackage : "", protoImpl : "", ip : "", port : ""
    });

    /**
     * 初始化
     */
    constructor(rpcConfig) {
        TlRpc.#configInstance = new TlRpcConfig(rpcConfig);
    }

    /**
     * -- 私有方法
     * 获取proto文件对象
     * @returns proto instance
     */
    #protoInstance() {
        return loadProtoInstance(TlRpc.#configInstance.protoPath)
    }

    /**
     * 获取缓存proto instance key
     * @returns 
     */
    #getCacheProtoKey(){
        return TlRpc.#configInstance.protoName + "-" + TlRpc.#configInstance.protoPackage;
    }

    /**
     * -- 私有方法
     * 从缓存获取proto对象
     * @returns proto cache instance
     */
    #cacheProtoInstance() {
        let instance = null;
        const cacheKey = this.#getCacheProtoKey();

        if (TlRpc.#configInstance.mode === modeEnum.API) {
            instance = TlRpc.#apiProtoInstance.get(cacheKey);
            if (!instance) {
                instance = this.#protoInstance();
            }
            TlRpc.#apiProtoInstance.set(cacheKey, instance)
        } else if (TlRpc.#configInstance.mode === modeEnum.SOCKET) {
            instance = TlRpc.#socketProtoInstance.get(cacheKey);
            if (!instance) {
                instance = this.#protoInstance();
            }
            TlRpc.#socketProtoInstance.set(cacheKey, instance)
        }
        
        return instance;
    }

    /**
     * -- 私有方法
     * 获取package对象
     * @returns package instance
     */
    #packageInstance(){
        const instance = this.#cacheProtoInstance();
        if (!instance) {
            return null;
        }
        return instance[TlRpc.#configInstance.protoPackage];
    }

    /**
     * -- 私有方法
     * 获取实例化impl对象
     * @returns protoImpl instance
     */
    implInstance() {
        const instance = this.#packageInstance();
        if (!instance) {
            return null;
        }
        return instance[TlRpc.#configInstance.protoImpl];
    }

    /**
     * -- 对外提供
     * 获取rpc配置
     * @returns 
     */
    getConfig(){
        return TlRpc.#configInstance;
    }
}

module.exports = TlRpc;