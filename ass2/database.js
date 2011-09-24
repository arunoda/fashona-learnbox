var mongo = require('mongoskin');

var db = mongo.db('localhost:27017/soori?auto_reconnect');
var myself = db.collection('myself');

myself.find().toArray(function(err, docs){
  //  console.dir(docs);
})


//var new_db = db.createCollection('mongoskin');

//db.createCollection(...);
//db.collection('user').ensureIndex([['username', 1]], true, function(err, replies){});


//db.collection('node').find().sort({"count" :11}).limit(10).toArray(function(err, posts){console.log(posts); })



//db.collection('node').save({_id: 1, gg: 10}, function(data) {console.log(data)});

//db.collection('node').save({"req" : "wtf", "user" : "charithsoori", "count" : 1}, function(data) {console.log(data)});

//db.collection('node').update({"req" : "wtf", "user" : "charithsoori"},{"$inc":{"count" : 1}});

//db.collection('node').findAndModify({"query":{"req" : "soori", "user" : "soori"}},{"sort" : {"count" : 1}},{"update":{"$inc":{"count" : 1}}},true);