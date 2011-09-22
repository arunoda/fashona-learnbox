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

	/*
	1.put data to a map object
		check if map has ke value
			if has increment it value by a 1
			if not create a new key and make value 1
	2.do insertion sort(key) when inserting
	3.return the array
	*/


	var rank={};
	
	for(var i=1; i< arrtweetedUsers.length; i++){

		rank[i]=1;
	}

	isUserExist();
}


function isUserExist(map,name){

	//
}
