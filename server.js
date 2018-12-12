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

app.get('/user', function(req, res) {
 res.locals.connection.query('SELECT * from members', function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
 
});


app.post('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.listen(port);
module.exports = app;
