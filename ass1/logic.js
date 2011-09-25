var rest=require('restler');
//var require('toolkit');


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
	/*
	var rankedUsers = {};

	arrtweetedUsers.forEach(function(user){
		//console.log("user" + user);
		//console.log("rankedUsers["+user+"]" + rankedUsers[user])
		if(!rankedUsers[user]){
			//console.log("yes");
			rankedUsers[user] = 0;
		}

		rankedUsers[user]++;
	})


	console.log("ranked users");
	console.log(rankedUsers);
	console.log("----------------------------------");
	
	var sortArr = [];
	for(var key in rankedUsers){
		sortArr.push({k:key, v:rankedUsers[key]});
	}

	console.log(sortArr);
	console.log("******");

	var s = sortArr.sortBy(function(s){
		return s.v;
	}).map(function(m){
		return m.k;
	});

	console.log(s); */
}


/*
//console.log("user" + user);
		//console.log("rankedUsers["+user+"]" + rankedUsers[user])
		if(!rankedUsers[user]){
			//console.log("yes");
			rankedUsers[user] = 0;
		}

		rankedUsers[user]++;
	})


	console.log("ranked users");
	console.log(rankedUsers);
	console.log("----------------------------------");
	
	var sortArr = [];
	for(var key in rankedUsers){
		sortArr.push({k:key, v:rankedUsers[key]});
	}

	console.log(sortArr);
	console.log("******");

	var s = sortArr.sortBy(function(s){
		return s.v;
	}).map(function(m){
		return m.k;
	});

	console.log(s); 
*