"use strict";

var path = require('path'),
	Q = require('q'),
	express = require("express"),
    router = express.Router(),
    config = require(path.resolve('./config/config')),
    base64 = require('base64-js'),
	heartbeat_model = require(path.resolve('./app/models/heartbeats'));

function heartbeats(req, res, next) {
	var data = req.body;
	console.log(data);
	heartbeat_model.addHeartbeatm(data, function (err, result) {
	   	if (err) {
	   		console.log('err');
	   	}
		else {
			console.log('OK');
	   	}
	});
	res.send('end');
}

module.exports = function(app) {
	app.route('/heartbeats').post(heartbeats);
};