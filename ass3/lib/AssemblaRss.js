var rest=require('restler');
var parser = require('libxml-to-js');

var observer = require('./observer');


//store previous published date of rss feed
var oldDate = new Date ('Mon, 26 Sep 2010 19:40:08 +0000');


var ResourceUrl = 'http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=charithsoori';
//var ResourceUrl = 'https://www.assembla.com/spaces/rngncut/stream.rss',{username: 'arunoda.susiripala', password:'xxxx'};


/*
    poll RSS 
    trigger in a new data
*/
exports.getFeed=function getFeed(){

    rest.get(ResourceUrl)
        .on('complete', function(data) {

			parser(data, function (error, result) {
			    if (error) {
			        console.error(error);
			    } else {
			    	console.log('Old date value is %s ,',oldDate);
			        console.log(result.channel.item[0].title +" "+result.channel.item[0].pubDate);
			        var newDate = result.channel.item[0].pubDate;
			        var triggerVar = DateCompare(oldDate,newDate);

			        if(triggerVar==1){

			        	trigure();
			        }

			        oldDate = newDate;
			    }
			});

        });
}


//Trigure to registers webhooks
function trigure(){
	console.log('....................a change ..............');

    observer.notify();
}


function DateCompare(prevDate,newDate){
	var prevDate = new Date(prevDate);
	var newDate = new Date(newDate);
	
	var elapsed = newDate - prevDate;
	console.log('elapsed %',elapsed);
	if(elapsed>0){
		console.log('inside >0');
		return 1;
	}
}


//asembla object

/*
{ '@': { version: '2.0' },
  channel:{ title: 'Assembla rngNcut Events',
     link: 'https://www.assembla.com/spaces/rngncut/new_items',
     description: 'New items and changes in rngNcut space',
     language: 'en-us',
     ttl: '60',
     item: 
      [ [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object] ] 
    } }
*/

/*
//twitter object 
{ '@': 
   { version: '2.0',
     xmlns: 
      { atom: 'http://www.w3.org/2005/Atom',
        twitter: 'http://api.twitter.com' } },
  channel: 
   { title: 'Twitter / charithsoori',
     link: 'http://twitter.com/charithsoori',
     'atom:link': { '@': [Object] },
     description: 'Twitter updates from Charith soori / charithsoori.',
     language: 'en-us',
     ttl: '40',
     item: 
      [ [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object] ] } }
*/