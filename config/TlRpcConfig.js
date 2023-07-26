/**
 * rpc config
 * @version 1.0.0
 * @author iamtsm
 */
class TlRpcConfig{
    /**
     * -- 公共属性
     * rpc模式
     */
    mode;

    /**
     * -- 公共属性
     * proto文件路径
     */
    protoPath;

    /**
     * -- 公共属性
     * 具体proto文件名
     */
    protoName;

    /**
     * -- 公共属性
     * 具体proto文件package
     */
    protoPackage;

    /**
     * -- 公共属性
     * 具体定义实现结构
     */
    protoImpl;

    /**
     * -- 公共属性
     * 客户端请求服务ip
     */
    ip;

    /**
     * -- 公共属性
     * 客户端请求服务端口
     */
    port;

    /**
     * 初始化
     * @param {*} param0 
     */
    constructor({mode, protoPath, protoName, protoPackage, protoImpl, ip, port}) {
        this.mode = mode;
        this.protoPath = protoPath;
        this.protoName = protoName;
        this.protoPackage = protoPackage;
        this.protoImpl = protoImpl;
        this.ip = ip;
        this.port = port;
    }
}

module.exports = TlRpcConfig;