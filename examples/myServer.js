const TlApiRpcServer = require("../server/api/TlApiRpcServer");
const path = require("path")

const teacherApiRpcServer = new TlApiRpcServer({
    protoPath: path.resolve(__dirname, '../proto/api/teacher.proto'),
    protoName : "teacher",
    protoPackage : "api",
    protoImpl : "Teacher",
    ip : "127.0.0.1",
    port : 50051
});

//启动服务端
teacherApiRpcServer
.on("hello", (call, callback) => {
    console.log("服务端收到请求hello, 开始处理 : ", call.request.message);
    callback(null, {message: 'Hello ' + call.request.message});
})
.on("hello1", (call, callback) => {
    console.log("服务端收到请求hello1, 开始处理 : ", call.request.message);
    callback(null, {message: 'Hello1 ' + call.request.message});
})
.start();
