var express = require('express');
var url     = require("url");
var events  =require("events");
var pathna  =require("path");
var http    =require("http");

function start() {
  function onRequest(request, response) {
    // Parse the entire URI to get just the pathname
   var uri = url.parse(request.url).pathname, query;
  console.log(uri);
   // If the user is requesting the Twitter search feature
   if(uri === "/") {
      
  
      //Executes when new tweets are found
      Twitter.EventEmitter.once("tweets", function(tweets){
         console.log(tweets);

  
      });
 
      // Parse out the search term
      query = request.url.split("?")[1];

      get_tweets(query);
 
    }
  }
  
  var app = express.createServer();
  app.get(){
    
  }

  express.createServer(onRequest).listen(8888);
  console.log("Server has started in 8888");
 // console.log('Express server started on port %s', app.address().port);
}

exports.start = start




var Twitter = (function(){
   var eventEmitter = new events.EventEmitter();
 
   return {
      EventEmitter : eventEmitter,
   };
})();





//search in twitter api
 function get_tweets(query) {
  
  // Send a search request to Twitter
  var request = http.request({
    host: "search.twitter.com",
    port: 80,
    method: "GET",
    path: "/search.json?q=" + query
  })
  
  //on response execute 
  .on("response", function(response){
    var body = "";
    
      response.on("data", function(data){
      body += data;
      
      try {
        var tweets = JSON.parse(body);
        
        if (tweets.results.length > 0) {

          //boroads cast tweets
          Twitter.EventEmitter.emit("tweets", tweets);
        }
        
        Twitter.EventEmitter.removeAllListeners("tweets");
      } 
      catch (ex) {
       console.log("waiting for more data chunks...");
      }
    });
  });
  request.end();
 }
