var rest=require('restler');

var arrtweetedUsers=[];

exports.getTweets=function getTweets(query){

    rest.get('http://search.twitter.com/search.json?q=' + query)
        .on('complete', function(data) {
            //console.log(data);
            tweetedUsers(data);
        });
}




function tweetedUsers(tweets){

    tweets.results.forEach(function(tweet) {
        arrtweetedUsers.push(tweet.from_user);
    });


    console.log(arrtweetedUsers.length+" "+arrtweetedUsers);
}




exports.rankUsers=function rankUsers(){
	var rank=[];
	for(var i=1; i< tweets.results.length; i++){
		rank.push()
	}
}