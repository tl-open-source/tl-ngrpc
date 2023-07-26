const TlApiRpcClient = require("../client/api/TlApiRpcClient");
const path = require("path")

const teacherApiRpcClient = new TlApiRpcClient({
    protoPath: path.resolve(__dirname, '../proto/api/teacher.proto'),
    protoName : "teacher",
    protoPackage : "api",
    protoImpl : "Teacher",
    ip : "127.0.0.1",
    port : 50051
});

//启动客户端
(async ()=>{
    let res = await teacherApiRpcClient.emit("hello", {message : "i am hello"})
    console.log("客户端收到hello结果 : ", res);

    res = await teacherApiRpcClient.emit("hello1", {message : "i am hello1"})
    console.log("客户端收到hello1结果 : ", res);
})()