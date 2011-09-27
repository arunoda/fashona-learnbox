var fs = require('fs');
var http = require('http');


fs.readFile('./config.json', 'utf8', function(err,json_string) {
  if(err) {
    console.error("Could not open config file: ", err);
    process.exit(1);
  }

  try {
    var config = JSON.parse(json_string);
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World\n');
    }).listen(config.port, config.host, function() {
      console.log("Server is bound.")
    });
  }
  catch(exception) {
    console.error("There was an error parsing the json config file: ", exception);
    process.exit(1);
  }
});

