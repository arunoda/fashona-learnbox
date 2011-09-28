var rest=require('restler');

exports.send = function send(url){
		
	rest.get(url)
        .on('complete', function(data) {
        	console.log('Hook %s notified ',url);
    });   
}

