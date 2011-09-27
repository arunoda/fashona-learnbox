var rest=require('restler');
var parser = require('libxml-to-js');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

//store previous published date of rss feed
var oldDate = new Date ('Mon, 26 Sep 2010 19:40:08 +0000');

var ResourceUrl = 'http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=charithsoori';
//var ResourceUrl = 'https://www.assembla.com/spaces/rngncut/stream.rss',{username: 'arunoda.susiripala', password:'OMG12345'};

module.exports = new AssemblaRss();

function AssemblaRss() {
    
    var self = this;

    setInterval(function() {
        
        rest.get(ResourceUrl).on('complete', function(data) {

            parser(data, function (error, result) {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Old date value is %s ,',oldDate);
                    console.log(result.channel.item[0].title +" "+result.channel.item[0].pubDate);
                    var newDate = result.channel.item[0].pubDate;
                    var triggerVar = dateCompare(oldDate,newDate);

                    if(triggerVar==1){

                        //this will emit the change
                        self.emit('change');
                    }

                    oldDate = newDate;
                }
            });

        });
        
    }, 15000);
}

util.inherit(AssemblaRss, EventEmitter);

function dateCompare(prevDate,newDate){
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