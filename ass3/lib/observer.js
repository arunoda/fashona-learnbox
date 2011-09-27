var hookAction = require('./hookAction');
	

// Store observers globally

var observers ={} ;

//save hooks array in a map object id as key
exports.addToObsrver = function add (id , ArrayObj) {
	observers[id] =ArrayObj;
} 

//remove stored array object
exports.remove = function remove(id){

	 delete observers[id];
}


/*
	send notifications to hooks by id
	@para id eg :rngncut
*/

exports.notify = function notify(id){
	
	tempObserver = observers[id];
	
	tempObserver.forEach(function(data){
		sendNotification(data);
	});
}

/*
	invoke notification send notification function
*/
function sendNotification(data){
	hookAction.send(data);
}


