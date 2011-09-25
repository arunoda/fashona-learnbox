var http = require("http");
var logic = require("./logic");

var arrtweetedUsers =[];
var queries = {};


exports.start=function start(req, res){

    query = req.url.split("?")[1];
   
    res.send('Hello World start');
     
    if(!queries[query]) {
        // setInterval(logic.getTweets, 10000);
        console.log('staring lookup for %s', query);
        logic.getTweets(query);
        lookUp(query);
       // setInterval(logic.getTweets, 10000);
        queries[query] = true; 
    }
        
}

function lookUp(query) {
    
    setInterval(function() {
        logic.getTweets(query);
    }, 10000);
}


exports.view =function view(req, res){
    
    //var query = req.params.query;
    var query = req.url.split("?")[1];
   

    logic.rankUsers(query, function(err, users) {
        
        res.contentType('text/html');
        var str = "";
        users.forEach(function(user) {
           str += user.user + ' - ' + user.count + '<br>';
        });

        res.send(str);
    });
}
