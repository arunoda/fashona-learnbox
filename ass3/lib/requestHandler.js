var http = require("http");
var AssemblaRss = require("./AssemblaRss");

    
exports.root=function root(req, res){

    console.log('curl feed ');
    AssemblaRss.on('change', function() {
    	//trigger the url
    });
      
}