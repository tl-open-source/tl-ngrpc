const { loadPackageDefinition } = require('@grpc/grpc-js');
const { loadSync } = require('@grpc/proto-loader');

/**
 * 加载proto文件，返回definition
 * @param {*} proto_url proto文件路径
 * @returns 
 */
const loadProtoInstance = function (proto_url) {
    return loadPackageDefinition(loadSync(proto_url, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }));
}


const versionEnum = {
    /**
     * v1版本
     */
    V1: "v1",
    /**
     * v2版本
     */
    V2: "v2"
}


const modeEnum = {
    /**
     * api模式
     * @description 通过api模式调用rpc服务
     */
    API: "api",
    /**
     * socket模式
     * @description 通过socket模式调用rpc服务
     */
    SOCKET: "socket"
}

module.exports = {
    loadProtoInstance,
    versionEnum,
    modeEnum
}