var hookAction = require('./hookAction');
	/*
		scope
		-------
		1. can rigister only one link per id
		2. support only for one type of action
		
	*/

// Store observers globally

var observers ={} ;


exports register = function register (id , link) {
	observers[id] =link;
} 

exports remove = function remove(id){

	 delete observers[id];
}


exports  notify = function notify(){
		
	for(key in  observers){
			
			//define the function to execute
		url = observers[hey];
		sendNotification(url);
	}
}

function sendNotification(){
	hookAction.send();
}


