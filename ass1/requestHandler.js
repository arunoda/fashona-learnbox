var http = require("http");
var logic = require("./logic");

var arrtweetedUsers =[];

exports.start=function start(req, res){

    query = req.url.split("?")[1];
    res.send('Hello World start');
    console.log(query);


    logic.getTweets(query);

    setInterval(logic.getTweets, 10000);
}


function view(req, res){
    res.send('Hello World veiw');
}

//exports.start = start;
exports.view =view;
