var rest=require('restler');
var mongo = require('mongoskin');

//using database soori
var db = mongo.db('localhost:27017/soori?auto_reconnect');



/*
	@param query a query to search 	
*/

exports.getTweets=function getTweets(query){

	//send a request to twitter api and retrive data
    rest.get('http://search.twitter.com/search.json?q=' + query)
        .on('complete', function(data) {
            //console.log(data);
            tweetedUsers(query,data);
        });
}



/*
	@param searched query
	@param retrived tweted user list
*/

function tweetedUsers(query,tweets){

    tweets.results.forEach(function(tweet) {

    	//Ussue's upsert . If no matching document found this should create a new documents
    	//TODO  upsert command had a issue 
    	db.collection('node').update({"req" : "wtf", "user" : "charithsoori"},{"$inc":{"count" : 1}},true);
       
       	
        /*db.collection('node').findAndModify({"query":{"req" : query, "user" : tweets}},
        {"sort" : {"count" : 1}},{"update":{"$inc":{"count" : 1}}},true);*/
    });

}


//Return users in highest tweeted rank order

exports.rankUsers=function rankUsers(){

	//find the highest tweetes users . Return user count limited to 10 users
	db.collection('node').find().sort({"count" :-1}).limit(10)
	.toArray(function(err, posts){
		console.log(posts); 
	})
}


