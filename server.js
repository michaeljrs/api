var port = process.env.PORT || 3000;
var express = require('express');

var app = express();


var mysql = require("mysql");
//Database connection
app.use(function(req, res, next){
 
	res.locals.connection = mysql.createConnection({
		host     : 'mydb.csv5qvzrti0z.us-east-1.rds.amazonaws.com',
		user     : 'root',
		password : '#192341!dev',
		database : 'general'
	});
	res.locals.connection.connect();
	next();
});


app.get('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
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

app.get('/users', function(req, res) {
 res.locals.connection.query('SELECT * from members ', function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
 
});


app.get('/teste', function(req, res) {
		res.send("testesss");
});


app.post('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.listen(port);
module.exports = app;
