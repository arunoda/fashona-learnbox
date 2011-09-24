var http = require("http");
var logic = require("./logic");

var arrtweetedUsers =[];
var queries = {};



exports.start=function start(req, res){

    query = req.url.split("?")[1];
   
    res.send('Hello World start');
    console.log(query);

     logic.getTweets(query);

     
    if(!queries[query]) {
        setInterval(logic.getTweets, 10000);
        queries[query] = true;  
    }
       setInterval(logic.getTweets, 10000);
}


exports.view =function view(req, res){
    
    logic.rankUsers(req, res);
}
