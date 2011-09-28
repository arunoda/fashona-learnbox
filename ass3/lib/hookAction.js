var rest=require('restler');

exports.send = function send(url){
	console.log('.....................    kem in     .......................');
	console('Restler starting to ping %s',url);
	rest.get()
        .on('complete', function(data) {
        	console.log('notifiation sent');
        });
}


