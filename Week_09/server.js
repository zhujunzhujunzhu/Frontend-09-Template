/*
 * @Description 
 * @Autor 朱俊
 * @Date 2021-04-18 21:32:23
 * @LastEditors 朱俊
 * @LastEditTime 2021-04-25 21:06:52
 */

// const http = require('http')
const http = require('http')

http.createServer((request,response)=>{
  let body = []
  request.on('error',err=>{
    console.log(err)
  }).on('data',chunk=>{
    // body.push(chunk.toString())
    body.push(chunk)
  }).on('end',()=>{
    body = Buffer.concat(body).toString()
    console.log("body:",body)
    response.writeHead(200,{'Content-Type':'text/html'})
    let html = `<html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Document</title>
      <style>
          body{
            background:red;
          }

          div{
            border:1px red solid;
          }

          .content{
            background:green;
          }
      </style>
    </head>
    <body>
      <div   class="content" style="font-size:20px;color:red">hello world</div>
    </body>
    </html>
    
    `
    response.end(html)
  })
}).listen(8998)

console.log("server started")

