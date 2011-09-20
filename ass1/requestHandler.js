var http = require("http");
var arrtweetedUsers =[];
function start(req, res){
	query = req.url.split("?")[1];
	res.send('Hello World start');
	console.log(query);

	//var arrtweetedUsers =[];
	getTweets(query);
	//get_tweets(query);
	setInterval(getTweets, 10000);  
}

function view(req, res){
	res.send('Hello World veiw');
}

exports.start	= start;
exports.view	=view;




function getTweets(query){
	console.log("getTweets called");
	 // Send a search request to Twitter
	var request = http.request({
		
		host: "search.twitter.com",
	    port: 80,
	    method: "GET",
    	path: "/search.json?q=" + query
	})
	console.log("http req "+ request);
	
	request.addListener("response", function(response) {  
		console.log("inside request.addListener");
        var body = "";  
        response.addListener("data", function(data) {
        	console.log("inside response.addListener");
            body += data;
           // console.log(body);
        });  
  
        response.addListener("end", function() {  
        	console.log("inside response.addListener end");
            var tweets = JSON.parse(body);
           // console.log(tweets.results.length);
            //console.log(tweets.results[1].from_user);
            //console.log(tweets.from_user);
           // console.log(tweets.length()); 
            if(tweets.results.length > 0) {  
                //tweet_emitter.emit("tweets", tweets); 
                console.log(tweets.results.length);
           		console.log(tweets.results[1].from_user);
           		tweetedUsers(tweets);
            }  
        });  
    });  
  
    request.end(); 
}




function tweetedUsers(tweets){
	//var tweetedUsers =[];
	console.log("in function tweetedUsers");
	for(var i=1; i< tweets.results.length; i++){
		//console.log(tweets.results[i].from_user);
		arrtweetedUsers.push(tweets.results[i].from_user);
	}
		
		
	console.log(arrtweetedUsers.length+" "+arrtweetedUsers);
	
}

/*
function rankUsers(){
	var rank=[];
	for(var i=1; i< tweets.results.length; i++){
		rank.push()
	}
}*/
