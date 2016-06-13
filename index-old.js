var express = require('express');
var app = express();
var cors = require('cors');
var port = (process.env.PORT || 5000);
var fs   = require('fs');
var  https = require('https');
var httpProxy = require('http-proxy');
var http = require('http');
var url = require("url");

var proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL);
var target  = url.parse("https://apis.smart.com.ph:7443");

app.set('port', port);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,Authorization,Proxy-Authorization,X-session");
	
	console.log(req.headers);
	
    next();
});

var apiProxy = httpProxy.createProxyServer();

app.post("/postpaidws/sessionManagement/sessions/rpc", function(req, res){
	
  //req.header("Proxy-Authorization","Basic " + (new Buffer(proxy.auth).toString("base64")));
  //req.header("User-Agent",'node.js');
  //req.header("Host",'https://apis.smart.com.ph:7443');
  
  //console.log(proxy.hostname);
  //console.log(req.headers);
	
  apiProxy.web(req,res,
  {
    agent  : https.globalAgent,
	/* target: {
		host: proxy.hostname,
		port: proxy.port || 80
	} */
	target:'https://apis.smart.com.ph:7443',
	toProxy: process.env.QUOTAGUARDSTATIC_URL,
	secure: false
  });
});

app.get("/postpaidws/*", function(req, res){
	
  apiProxy.web(req,res,
  {
    agent  : https.globalAgent,
	/* target: {
		host: proxy.hostname,
		port: proxy.port || 80
	} */
	target:'https://apis.smart.com.ph:7443',
	toProxy: process.env.QUOTAGUARDSTATIC_URL,
	secure: false
  });
});

app.listen(port, function() {
  console.log('Node app is running on port', app.get('port'));
});