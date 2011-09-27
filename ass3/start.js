var configuration = require('./conf/configuration');
var AssemblaRss = require('./lib/AssemblaRss');
var observer = require('./lib/observer');


configuration.loadConfig();


exports.configReady=function configReady(key,config){
	/*
		
	*/
	var key = key;
	var feed = config['feed'];
	var username = config['username'];
	var password = config['password'];

	var hooksArray = config['hooks'];

	observer.add(key,hooksArray);
	
	AssemblaRss(key,feed,username,password);

}