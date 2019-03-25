"use strict";

var path = require('path'),
	Q = require('q'),
	express = require("express"),
    router = express.Router(),
    config = require(path.resolve('./config/config')),
    base64 = require('base64-js'),
	step_model = require(path.resolve('./app/models/slept_time'));

function slept_time(req, res, next) {
	var data = req.body;
	console.log(data);
	step_model.addStepm(data, function (err, result) {
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
	app.route('/slept_time').post(slept_time);
};