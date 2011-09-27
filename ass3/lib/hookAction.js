var rest=require('restler');

exports.send = function send(){
	rest.get( 'http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=charithsoori')
        .on('complete', function(data) {
        	console.log();
        });
}