var rest=require('restler');

exports.send = function send(data){
	rest.get(data)
        .on('complete', function(data) {
        	console.log('notifiation sent');
        });
}



/*
	send notifications to hooks by id
	@para id eg :rngncut
*/

function notify(id){
	
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

