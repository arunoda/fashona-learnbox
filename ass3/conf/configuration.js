var fs = require('fs');
var events = require('events');

var start = require('../start');

var configuration = new function() {
  var confObject = Object.create(new events.EventEmitter);

  /*
    excute with the trigure of config
  */
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

  /*
    Read configuration from config.json file and emit config once loaded.
  */
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

/*
  send JSON configuration to './start.configReady (key,config).
*/
function sendJSONObject(config){
     start.configReady(config);
}
