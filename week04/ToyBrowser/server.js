const http = require('http')

http.createServer((request, response) => {
    let body = []
    request.on('error', (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        body.push(chunk.toString())
    }).on('end', () => {
        // body = Buffer.concat(body).toString()
        body = Buffer.toString()
        console.log('body', body)
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(`
<html lang="en">
  <head>
    <style>
      body div #myid {
        width: 100px;
        background-color: #ff5000;
      }
      body div img {
        width: 30px;
        background-color: #ff1111;
      }
    </style>
  </head>
  <body>
    <div>
      <img id="myid"/>
      <img />
    </div>
    <p >hello world</p>
  </body>
</html>
        `)
    })
}).listen(8088)

console.log('server started')