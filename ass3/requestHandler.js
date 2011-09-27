var http = require("http");
var AssemblaRss = require("./AssemblaRss");


exports.start=function start(req, res){

    var query = req.url.split("?")[1];
   
    res.send('Hello World start');
     
        // setInterval(logic.getTweets, 10000);
        console.log('curling rss feed ');
        AssemblaRss.getFeed();
        
        setInterval(function() {
            AssemblaRss.getFeed();
        }, 10000);
  
        
}