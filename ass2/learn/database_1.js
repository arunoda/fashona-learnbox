//new Db(database name, server configuration, options)
var mongo= require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;

//auto_reconnect -> tells the driver to retry sending a command to the 
//				     server if there is a failure.

var server = new Server('localhost',27017,{auto_reconnect:true});
var db = new Db('examplesDb',server);

db.open(function  (err,db) {
	if (!err) {
		console.log("we are connected");

		//will not actually create a collection on the database 
		//	until you actually insert the first document.
		db.collection('test',function(err,collection){
			var doc1 = {'hello':'doc1'};
			var doc2 = {'hello':'doc2'};

			var lotsOfDocs =[{'hello':'docs3'},{'hello':'docs4'}];
			
			//not needing confirmation about the persisting of the data to Mongo DB
			collection.insert(doc1);

			//safe:true} retrieve the status of the operation ,error back 
			//if the document fails to insert correctly.
			collection.insert(doc1,{safe:true},function(err,results){});
			
			/*
				insert large batches of documents as you incur a lot less overhead.
			*/
			collection.insert(lotsOfDocs, {safe:true}, function(err, result) {});
		});

		//{safe:true} option option will make the driver 
		//	check if the collection exists and 
		//db.collection('test',{safe:true},function(err,collection){});


		/*
			create the collection on the Mongo DB database before 
			returning the collection object. If the collection already 
			exists it will ignore the creation of the collection.
		*/

		//db.collection('test',function(err,collection){});

		/*
			{safe:true} option will make the method return an error if 
			the collection already exists.With an open db connection and 
			a collection defined we are ready to do some CRUD operation on the data.
		*/
		//db.collection('test',{safe:true},function(err,collection){});
		

	};
});


//var = new Db('test',new Server('127.0.0.1',27017,{auto_reconnect:true}),{})