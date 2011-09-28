var cjson = require('cjson');
var AssemblaRss = require('./lib/AssemblaRss');
var test = cjson.load('./conf/config.json')


AssemblaRss.start(test);
