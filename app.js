var awslogin = require('./awslogin.js');
var awsgetboosts = require('./awsgetboosts.js');

var express = require('express');
var app = express();
var path = require("path");
var session = require("express-session");
var bodyParser = require("body-parser");

app.use(express.static(__dirname + '/public'));

// set your key properly 
app.use(session({resave: true, saveUninitialized: true, secret: '[place your key here]', cookie: { maxAge: 60000 }}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname +'/index.html'));
});


app.get('/index.html',function(req,res){
  res.sendFile(path.join(__dirname +'/index.html'));
});


app.post('/actlogin',function(req,res) {
  var user = req.body['username'];
  var pass = req.body['password'];

  awslogin(user, pass, function(err, data){
  	if(data)
  	{
  		req.session.isloggedin = true;
        res.redirect('/table');
  	}
  	else {
        res.redirect('/index.html?error');
  	}
  });

});



app.get('/table',function(req,res) {
  if(req.session.isloggedin) 
  {
  	awsgetboosts(true, function(err, params){
  		res.render('table', params);
  	});
  } else {
    res.redirect('/index.html');
  } 

});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
