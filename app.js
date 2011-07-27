require.paths.unshift('models');
/**
 * Module dependencies.
 */

var express = require('express'),
    inspect = require('eyes').inspector(),
    request = require('request'),
    Geo     = require('geo');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
var remoteIp = function (req) {
  var ip = req.connection.remoteAddress;
  // for testing use google's address instead of localhost.
  if(ip === '127.0.0.1') {
    ip = '74.125.93.106'
  }
  return ip;
}

app.get('/', function(req, res){
  res.render('index', {
    title : 'Found you',
    ip    : remoteIp(req)
  });
});

app.get('/geo', function (req, res) {
  var ip = remoteIp(req); 
  Geo.get(ip, function (geo) {
    res.send(geo);
  });
 
});
