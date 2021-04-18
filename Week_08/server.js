/*
 * @Description 
 * @Autor 朱俊
 * @Date 2021-04-18 21:32:23
 * @LastEditors 朱俊
 * @LastEditTime 2021-04-18 21:40:47
 */

const http = require('http')

http.createServer((request,response)=>{
  let body = []
  request.on('error',err=>{
    console.log(err)
  }).on('data',chunk=>{
    body.push(chunk.toString())
  }).on('end',()=>{
    body = Buffer.concat(body).toString()
    console.log("body:",body)
    response.writeHead(200,{'Content-Type':'text/html'})
    response.end('Hello World\n')
  })
}).listen(8088)

console.log("server started")