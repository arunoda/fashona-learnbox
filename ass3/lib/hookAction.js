var rest=require('restler');

exports.send = function send(data){
	console('Restler starting to ping %s',data);
	rest.get(data)
        .on('complete', function(data) {
        	console.log('notifiation sent');
        });
}


