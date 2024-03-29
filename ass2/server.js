var express = require('express');
var requestHandler = require("./requestHandler");


var server = express.createServer();

server.get('/',function(req, res){

  requestHandler.start(req, res);
});

server.get('/view/:query',function(req, res){

  requestHandler.view(req, res);
});

server.listen(8080);
console.log('Express server started on port %s', server.address().port);

exports.server=server;