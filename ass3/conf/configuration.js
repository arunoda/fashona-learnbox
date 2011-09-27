var fs = require('fs');
var events = require('events');

var start = require('../start');

var configuration = new function() {
  var confObject = Object.create(new events.EventEmitter);

  confObject.on("config", function(err, json_string) {
    if(err) {
      console.error("Could not open config file: ", err);
      process.exit(1);
    }

    try {
      confObject.config = JSON.parse(json_string);
    } catch(exception) {
      console.error("There was an error parsing the json config file: ", exception);
      process.exit(1);
    }
    
    sendJSONObject(confObject.config);
  });

  confObject.startup = function(config_file) {
    fs.readFile(config_file, 'utf8', this.emit.bind(this, "config"));
  };

  return confObject;
}

var config;
module.exports.loadConfig=function loadConfiguration(){
  var serverObj = Object.create(configuration);
  config = serverObj.startup('./conf/config.json');
}

function sendJSONObject(config){
  /*
     
  }
  */
  for(key in config){

    console.log(config[key]);
     start.configReady(key,config);
  }
	

 
}




/*
  var data = fs.readFileSync('./config.json'),
      myObj;

  try {
    myObj = JSON.parse(data);
    console.dir(myObj);
  }
  catch (err) {
    console.log('There has been an error parsing your JSON.')
    console.log(err);
  }
*/


//var config = getCongiuration();
//console.log(config);



/*

var fs = require('fs');

function getCongiuration ()	{
	fs.readFile('config.json', 'ascii', function(err,json_string) {

		 if(err) {
		    console.error("Could not open config file: ", err);
		    process.exit(1);
		 }

		try {

		    var config = JSON.parse(json_string);
		    
		   
		}
		catch(exception) {
		    console.error("There was an error parsing the json config file: ", exception);
		    process.exit(1);
		}

	  	console.log(config.rngncut.hooks);
	  	return config;
	});
}

var config = getCongiuration();
//console.log(config);

*/