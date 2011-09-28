var rest = require('restler');
var parser = require('libxml-to-js');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var hookAction = require('./hookAction');

//store previous published date of rss feed
var oldDate = new Date ('Mon, 26 Sep 2010 19:40:08 +0000');
var self;




function AssemblaRss(feed, user, password) {

    console.log('Load data using \n feed : %s \n user : %s \n password : %s ',feed,user,password);
    self = this;


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
     //   console.log('Test : Recived data stream %s',data);
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
}






exports.start=function start(conf){

    console.log('configuration loaded');
    console.log(conf);

    for(var name in conf){
        var item = conf[name];
        console.log('\n \n Handling item %s in configurations',name);
        console.log(item);

        var rss = load(item.feed, item.password, item.username); 


        var hookArray = item.hooks;
        rss.on('change', function() {
            
            console.log('A rss feed recived from %s',name);
            //console.log(rss);
            
            hookArray.forEach(function(item){
                console.log(item);
                console.log('next url')
                send(item);
            });

    

        });


    }

}

function send(url){
        
    rest.get(url)
        .on('complete', function(data) {
            console.log('Hook %s notified ',url);
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

//AssemblaRss object factory

function load(feed, user, password) {
    return new AssemblaRss(feed, user, password);
};


