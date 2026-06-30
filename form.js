const http = require('http');
const fs = require('fs');
const queryString = require('querystring');
const { log } = require('console');
http.createServer((req,resp)=>{
    console.log(req.url);
    if(req.url == '/'){

        fs.readFile('html/Form.html','utf-8',(err,data)=>{
            if(err){
                resp.writeHead(500,{'content-type':'text/plain'});
                resp.write('this is internal error');
                resp.end();
                return
            }
            resp.writeHead(200,{'content-type':'text/html'});
            resp.write(data);
            resp.end();
        })
    }else if(req.url == '/submit'){
        let dataBody = [];
        req.on('data',(chunk)=>{
            dataBody.push(chunk);
        })
        req.on('end',()=>{
            let rawdata = Buffer.concat(dataBody).toString();
            let readabledata = queryString.parse(rawdata);
            let dataString = "this is my name "+readabledata.name+" and my email id is "+readabledata.email;
            console.log(dataString);
            fs.writeFileSync('text/'+readabledata.name+'.txt',dataString);
            console.log('file created');
        })
        resp.write('<h1>Form Submitted</h1>');
        resp.end();
    }

}).listen(3600);