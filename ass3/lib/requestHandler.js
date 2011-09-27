var http = require("http");
var AssemblaRss = require("./AssemblaRss");

    
exports.root=function root(req, res){

        console.log('curl feed ');
        AssemblaRss.getFeed();
        
        setInterval(function() {
            AssemblaRss.getFeed();
        }, 10000);
  
        
}