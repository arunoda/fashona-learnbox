var rest=require('restler');
var parser = require('libxml-to-js');
var EventEmitter = require('events').EventEmitter;
var util = require('util');


//store previous published date of rss feed
var oldDate = new Date ('Mon, 26 Sep 2010 19:40:08 +0000');
var self;
//var feed;
//var Id ;

/*
  TODO  Following parameters set though function 'AssemblaRss(key,feed,username,password)'
        in './start ' file. How send those parameters correctly ?

  @para id 
  @para feed
*/
//module.exports = new AssemblaRss('id','feed','user','pw');
exports.load = function(feed, user, password) {
    return new AssemblaRss(feed, user, password);
};

function AssemblaRss(feed, user, password) {
    console.log('Load data using \n feed : %s \n user : %s \n password : %s ',feed,user,password);
    self = this;
   // Id = id;
    //feedurl = feed +,{username: user, password: pw};

    setInterval(function() {
        if(user === undefined){
            rest.get(feed).on('complete', function(data) {

             parsAndTrigger(data)
          
            });
        }else
        rest.get(feed,{username:user,password:password}).on('complete', function(data) {

             parsAndTrigger(data)
          
        });
        
    }, 15000);
}

util.inherits(AssemblaRss, EventEmitter);


function parsAndTrigger(data){

    parser(data, function (error, result) {
        console.log('Test : Recived data stream %s',data);
        if (error) {
                    console.error(error);
        } else {
            console.log('Old date value is %s ,',oldDate);
            console.log(result.channel.item[0].title +" "+result.channel.item[0].pubDate);
            var newDate = result.channel.item[0].pubDate;
            var triggerVar = dateCompare(oldDate,newDate);

            if(triggerVar==1){
                console.log('time to emmit.................................>');
                //this will emit the change
                self.emit('change');
            }

            oldDate = newDate;
        }
    });
}


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

