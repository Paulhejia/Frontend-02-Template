//引用node的http模块
var http=require('http');

//创建一个服务器并指定请求处理函数
http.createServer((req,res) => {
    let body = [];  
  //res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    req.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString());
        console.log('ddddddd')
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log("22222body:", body);
        //设置返回的请求状态 200位成功 和返回头部及文件编码
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(' hello World\n');
    })
})
//监听 8888 端口
.listen(8088, '127.0.0.1');
console.log('服务器开启在：http://localhost:8088/');