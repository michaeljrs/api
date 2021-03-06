var port = process.env.PORT || 3000;
var express = require('express');

var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var mysql = require("mysql");
//Database connection

app.use(function(req, res, next){
 
	res.locals.connection = mysql.createConnection({
		host     : 'sql10.freemysqlhosting.net',
		user     : 'sql10276346',
		password : 'HfajhPLb4y',
		database : 'sql10276346'
	});
	res.locals.connection.connect();
	next();
});

app.get('/', function(req, res) {
  res.send({
    "Output": "get Hello World!"
  });
});
app.post('/', function(req, res) {
  res.send({
    "Output": "post Hello World!"
  });
});

app.get('/user/:id', function(req, res) {
 res.locals.connection.query('SELECT * from members where id="' + req.params.id + '"', function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
});
app.get('/user/add/:id/:name', function(req, res) {
  //INSERT INTO members (id, name) VALUES(778,"michael") ON DUPLICATE KEY UPDATE name="michaelss44"
  var query='insert into members (id,name) value("' + req.params.id + '","' + req.params.name + '") ON DUPLICATE KEY UPDATE name="' + req.params.name + '"';
  res.locals.connection.query(query, function (error, results, fields) {
	if(error) throw error;
		res.send(JSON.stringify(results));
	});
});

app.get('/element/:element/unique/:id', function(req, res) {

	console.log(res)
  var query='select * from ' + req.params.element + ' where id="' + req.params.id + '" ';
  res.locals.connection.query(query, function (error, results, fields) {
		
	if(error) throw error;
		res.send(JSON.stringify(results));
	});
});

app.post('/element/:element/unique/:id', function(req, res) {

	console.log(req.body.teste)
  var query='select * from ' + req.params.element + ' where id="' + req.params.id + '" ';
  res.locals.connection.query(query, function (error, results, fields) {
		
	if(error) throw error;
		res.send(JSON.stringify(results));
	});
});


app.put('/element/:element/unique/:id', function(req, res) {

	console.log(req.body.teste)
  var query='select * from ' + req.params.element + ' where id="' + req.params.id + '" ';
  res.locals.connection.query(query, function (error, results, fields) {
		
	if(error) throw error;
		res.send(JSON.stringify(results));
	});
});

app.get('/element/:element/all', function(req, res) {
  var query='select * from ' + req.params.element + ' ';

  res.locals.connection.query(query, function (error, results, fields) {
	if(error) throw error;
		res.send(JSON.stringify(results));
	});
});

app.get('/element/:element/filter/:filter', function(req, res) {
  var query='select * from ' + req.params.element + ' where ' + req.params.filter + ' ';
  res.locals.connection.query(query, function (error, results, fields) {
	if(error) throw error;
		res.send(JSON.stringify(results));
	});
});



app.get('/query/:request', function(req, res) {
  //INSERT INTO members (id, name) VALUES(778,"michael") ON DUPLICATE KEY UPDATE name="michaelss44"
  var query= req.params.request;
  res.locals.connection.query(query, function (error, results, fields) {
	if(error) {
			res.send(query + JSON.stringify(results));
	//	throw error;
	}
	res.send(JSON.stringify(results));
	
	});
});

app.post('/query/', function(req, res) {
  //INSERT INTO members (id, name) VALUES(778,"michael") ON DUPLICATE KEY UPDATE name="michaelss44"
  var query= req.body.query
  res.locals.connection.query(query, function (error, results, fields) {
	if(error) {
		 
			res.send("error:" +query + JSON.stringify(results));
	//	throw error;
	}
	res.send(JSON.stringify(results));
	
	});
});

app.get('/users', function(req, res) {
 res.locals.connection.query('SELECT * from members ', function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
 
});






app.listen(port);
module.exports = app;
