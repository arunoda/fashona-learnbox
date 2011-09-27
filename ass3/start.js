var configuration = require('./conf/configuration');
var AssemblaRss = require('./lib/AssemblaRss');
var observer = require('./lib/observer');


configuration.loadConfig();

/*
	Once configuration loaded 'sendJSONObject(config)' trigger this
	function 

	@para key
	@para config 
*/
exports.configReady=function configReady(key,config){
	/*
		
	*/
	var key = key;
	var feed = config['feed'];
	var username = config['username'];
	var password = config['password'];

	var hooksArray = config['hooks'];

	//add hook aray to observer with a key . This key generated 
	//according to propertise order in config.json object
	 
	observer.add(key,hooksArray);

	//create feed notification for each feed
	AssemblaRss(key,feed,username,password);

}