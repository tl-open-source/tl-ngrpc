# tl-ngrpc

极简node-grpc依赖包，无关业务，只做规约， 支持两种服务端，http服务, socket服务

### server

实体模型 Teacher 为例, 编写proto文件

```proto
// teacher.proto
syntax = "proto3";

package api;

service Teacher {
    rpc hello (Request) returns (Response) {}
}
message Request {
    string message = 1;
}   
message Response {
    string message = 1;
}
```

**启动服务**

```js
const TlApiRpcServer = require("xx/xx/TlApiRpcServer");
const path = require("path")

const teacherApiRpcServer = new TlApiRpcServer({
    protoPath: path.resolve(__dirname, '../proto/api/teacher.proto'), //proto文件路径
    protoName : "teacher", //proto文件名称
    protoPackage : "api", //proto文件定义的package 
    protoImpl : "Teacher", //proto定义的实体结构
    ip : "127.0.0.1", //服务监听ip
    port : 50051 //服务监听端口
});

//启动服务端
teacherApiRpcServer
//监听接口事件，并定义处理逻辑
.on("hello", (call, callback) => {
    console.log("服务端收到请求hello, 开始处理 : ", call.request.message);
    callback(null, {message: 'Hello ' + call.request.message});
})
//监听接口事件，并定义处理逻辑
.on("hello1", (call, callback) => {
    console.log("服务端收到请求hello1, 开始处理 : ", call.request.message);
    callback(null, {message: 'Hello1 ' + call.request.message});
})
//启动服务
.start();
```


### client

```js
const TlApiRpcClient = require("../client/api/TlApiRpcClient");
const path = require("path")

const teacherApiRpcClient = new TlApiRpcClient({
    protoPath: path.resolve(__dirname, '../proto/api/teacher.proto'), //proto文件路径
    protoName : "teacher", //proto文件名称
    protoPackage : "api", //proto文件定义的package 
    protoImpl : "Teacher",  //proto定义的实体结构
    ip : "127.0.0.1", //服务监听ip
    port : 50051 //服务监听端口
});

//启动客户端
(async ()=>{
    //调用服务接口
    let res = await teacherApiRpcClient.emit("hello", {message : "i am hello"})
    console.log("客户端收到hello结果 : ", res);

    //调用服务接口
    res = await teacherApiRpcClient.emit("hello1", {message : "i am hello1"})
    console.log("客户端收到hello1结果 : ", res);
})()
```

#### socket服务同理，用法完全一致