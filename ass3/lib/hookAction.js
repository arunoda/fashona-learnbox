var rest=require('restler');

exports.send = function send(data){
	rest.get(data)
        .on('complete', function(data) {
        	console.log('notifiation sent');
        });
}