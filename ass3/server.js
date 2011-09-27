var express = require('express');
var requestHandler = require("./lib/requestHandler");


var server = express.createServer();

server.get('/',function(req, res){

  requestHandler.root(req, res);
});


server.listen(8080);
console.log('Express server started on port %s', server.address().port);

exports.server=server;