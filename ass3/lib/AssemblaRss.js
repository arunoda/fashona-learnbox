var rest=require('restler');
var parser = require('libxml-to-js');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var observer = require ('./observer');

//store previous published date of rss feed
var oldDate = new Date ('Mon, 26 Sep 2010 19:40:08 +0000');
var feed;
var Id ;

/*
  TODO  Following parameters set though function 'AssemblaRss(key,feed,username,password)'
        in './start ' file. How send those parameters correctly ?

  @para id 
  @para feed
*/
module.exports = new AssemblaRss('id','feed','user','pw');

function AssemblaRss(id,feed,user,pw) {
    
    var self = this;
    Id = id;
    feedurl = feed + ,{username: user, password: pw};

    setInterval(function() {
        
        rest.get(feedurl).on('complete', function(data) {

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




assembla.on("change", function(){
 
  // send notifications to webhooks through onserver notify method
  observer.notify(Id)
})




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

