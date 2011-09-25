var rest=require('restler');
var mongo = require('mongoskin');
require('toolkit');

var dbParam ='soori';
//using database soori
<<<<<<< HEAD
var db = mongo.db('localhost:27017/dbParam?auto_reconnect');


=======
var db = mongo.db('localhost:27017/grrrrrrrr');
var collection = db.collection('node');
>>>>>>> f235354af6fef991c638432ccb7a727ef92e020b

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

    var inc = 0;
    tweets.results.forEach(function(tweet) {

    	//Ussue's upsert . If no matching document found this should create a new documents
    	//TODO  upsert command had a issue 
<<<<<<< HEAD
    	db.collection('node').update({"req" : query, "user" : tweet},{"$inc":{"count" : 1}},true);
       
=======
    	// collection.save({"req" : "wtf", "user" : "charithsoori"},{"$inc":{"count" : 1}},true);
        /*db.collection('node').findAndModify({"query":{"req" : query, "user" : tweets}},
        {"sort" : {"count" : 1}},{"update":{"$inc":{"count" : 1}}},true);*/

        inc+= 100;
        setTimeout(function() {
            saveUser(query, tweet.from_user)
        }, inc);
>>>>>>> f235354af6fef991c638432ccb7a727ef92e020b
    });

}


function saveUser(query, tweetUser) {
    
    collection.findOne({query: query, user: tweetUser}, function(err, entry) {
        
        if(!err) {
            if(!entry) {
                //increment
                console.log('inserting %s to %s', tweetUser, query);
                collection.insert({query: query, user: tweetUser, count: 1});

            } else {
                //add new
                console.log('updating %s to %s', tweetUser, query);
                collection.update({query: query, user: tweetUser, $atomic: 1}, {$inc: {count: 1}});
            }
        } else {
            console.log('db lookup error: %s ', JSON.stringify(err));
        }
    });  
};


//Return users in highest tweeted rank order

exports.rankUsers = function rankUsers(query, callback){

	//find the highest tweetes users . Return user count limited to 10 users
	collection.find({query: query}, {sort: {count: -1}, limit: 10}).toArray(function(err, posts){
       console.log('viewing users :%s', JSON.stringify(posts));
		if(callback) callback(null, posts);
	});
}


