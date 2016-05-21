var http = require('http');
var fs = require('fs');
var app = require('express');

function send404Error(res) {
	res.writeHead(404, {"Content-Type": "text/plain"});
	res.write("Error 404: Page not found");
	res.end();
}

functino onRequest(req, res) {

}

http.createServer(onRequest).listen(8080);
console.log("Server is running...");