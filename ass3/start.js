var configuration = require('./conf/configuration');
var AssemblaRss = require('./lib/AssemblaRss');
var hookAction = require('./lib/hookAction');


configuration.loadConfig();

/*
	Once configuration loaded 'sendJSONObject(config)' trigger this
	function 

	@para key
	@para config 
*/
exports.configReady=function configReady(conf){

	console.log('configuration loaded');
	console.log(conf);
	//create feed notification for each feed
	//AssemblaRss(key,feed,username,password);

	for(var name in conf){
		var item = conf[name];
		console.log('\n \n Handling item %s in configurations',name);
		console.log(item);

		var rss = AssemblaRss.load(item.feed, item.password, item.username); 


		var hookArray = item.hooks;
		rss.on('change', function() {
        	
        	console.log('A rss feed recived from %s',name);
        	console.log(rss);
        	
        	hookArray.forEach(function(data){
				hookAction.send(data);
			});

        	hookAction.send(data);

    	});


	}

}
