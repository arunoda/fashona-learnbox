var cjson = require('cjson');
var AssemblaRss = require('./lib/AssemblaRss');


var conf = cjson.load('./conf/config.json')
AssemblaRss.start(conf);

//configuration.loadConfig();


