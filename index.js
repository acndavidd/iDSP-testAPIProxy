require ('newrelic');
var express = require('express');
var app = express();
var port = (process.env.PORT || 5000);
var request = require('request');

app.set('port', port);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,Authorization,Proxy-Authorization,X-session");
	
    next();
});

app.put("/opisnet/*", function(req, res){

	var fullUrl = 'https://staging.smart.com.ph' + req.path;
	
	var options = {
		proxy: process.env.QUOTAGUARDSTATIC_URL,
		url: fullUrl,
		form:req.body,
		headers: {
			'User-Agent': 'node.js'
		}
	};
	
	req.pipe(request.put(options)).pipe(res);
  
});

app.post("/RestAdapter/*", function(req, res){

	var fullUrl = 'https://stg.apis.smart.com.ph' + req.path;
	    
	var options = {
		proxy: process.env.QUOTAGUARDSTATIC_URL,
		url: fullUrl,
		form:req.body,
		headers: {
			'User-Agent': 'node.js'
		}
	};
	console.log(fullUrl);
    console.log(req.body);
	req.pipe(request.post(options)).pipe(res);
  
});

app.post("/opisnet/*", function(req, res){
	
	var fullUrl = 'https://csptraining.smart.com.ph' + req.path;
	
	var options = {
		proxy: process.env.QUOTAGUARDSTATIC_URL,
		url: fullUrl,
		form:req.body,
		headers: {
			'User-Agent': 'node.js'
		}
	};
	console.log(fullUrl);
    console.log(req.body);
	req.pipe(request.post(options)).pipe(res);
  
});

app.get("/opisnet/*", function(req, res){
	
	var fullUrl = 'https://staging.smart.com.ph' + req.path;
	
	var options = {
		proxy: process.env.QUOTAGUARDSTATIC_URL,
		url: fullUrl,
		headers: {
			'User-Agent': 'node.js'
		},
		qs: req.query
	};
	
	req.pipe(request(options)).pipe(res);
	
	console.log(res);
  
});

// app.delete("/apimysmartws/*", function(req, res){
	
	// var fullUrl = 'https://staging.smart.com.ph' + req.path;
	
	// var options = {
		// proxy: process.env.QUOTAGUARDSTATIC_URL,
		// url: fullUrl,
		// headers: {
			// 'User-Agent': 'node.js'
		// },
		// qs: req.query
	// };
	
	// req.pipe(request(options)).pipe(res);
  
// });

//OLD API===================================================================

app.post("/postpaidws/sessionManagement/sessions/rpc", function(req, res){
	
	var fullUrl = 'https://apis.smart.com.ph:7443' + req.path;
	
	var options = {
		proxy: process.env.QUOTAGUARDSTATIC_URL,
		url: fullUrl,
		form:req.body,
		headers: {
			'User-Agent': 'node.js'
		}
	};
	
	req.pipe(request.post(options)).pipe(res);
  
});

app.get("/postpaidws/*", function(req, res){
	
	console.log(req.path);
	
	var fullUrl = 'https://apis.smart.com.ph:7443' + req.path;
	
	var options = {
		proxy: process.env.QUOTAGUARDSTATIC_URL,
		url: fullUrl,
		headers: {
			'User-Agent': 'node.js'
		}
	};
	
	req.pipe(request(options)).pipe(res);
  
});

//===================================================================

app.listen(port, function() {
  console.log('Node app is running on port', app.get('port'));
});