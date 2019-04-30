"use strict";

var path = require('path'),
	Q = require('q'),
	act_model = require(path.resolve('./app/models/activity'));

function addActivity(req, res, next) {
	var data = req.body;
	act_model.addActivitym(data, function (err, result) {
	   	if (err) {
	   		console.log('err');
	   	}
		else {
			res.send(result);
	   	}
	});
}

function getActivity(req, res, next) {
	var data = req.body;
	act_model.getActivitym(data, function (err, result) {
	   	if (err) {
	   		console.log('err');
	   	}
		else {
			console.log('OK');
			res.send(result);
	   	}
	});
}

module.exports = function(app) {
	app.route('/addActivity').post(addActivity);
	app.route('/getActivity').post(getActivity);
};