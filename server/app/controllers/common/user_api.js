"use strict";

var path = require('path'),
	Q = require('q'),
	express = require("express"),
    router = express.Router(),
    config = require(path.resolve('./config/config')),
    base64 = require('base64-js'),
	user_model = require(path.resolve('./app/models/user')),
	calorie_model = require(path.resolve('./app/models/calories')),
	friend_model = require(path.resolve('./app/models/friends')),
	heartbeat_model = require(path.resolve('./app/models/heartbeats')),
	period_model = require(path.resolve('./app/models/period')),
	slept_model = require(path.resolve('./app/models/slept_time')),
	step_model = require(path.resolve('./app/models/steps'));

function login(req, res, next) {
	var loginName = req.body.loginName;
	var password = req.body.password;
	console.log(req.body);
	user_model.getUserByIdAndPwdm(loginName, password, function (err, result) {
		if (err) {
			console.log('getUserByIdAndPwdm: Error');
		} else {
			if (result.length == 0) {				
				console.log('login Failed');
				res.send({"res": "loginFailed"});
			}
			else {
				var loginUser = {
					"Idx": result[0].idx,
					"id": result[0].id,
					"firstname": result[0].firstname,
					"lastname": result[0].lastname,
					"birthday": result[0].birthday,
					"weight": result[0].weight,
					"height": result[0].height,
					"created_at": result[0].created_at
				};
				console.log('login OK');
				res.send({"userinfo":loginUser, "res": "loginOK"});;
			}
		}
	});
}

function register(req, res, next) {
	var data = req.body;
	console.log(data);
	user_model.addUserm(data, function (err, result) {
	   	if (err) {
			console.log('err');
			res.send('ERR');
	   	}
		else if( result == 'ID_DUPLICATION' ) { 
			console.log('DUP');
			res.send('DUP');
		}		
		else {
			console.log('OK');
			res.send('OK');
	   	}
	});
}

function update(req, res, next) {
	var data = req.body;
	console.log(data);
	user_model.updateUserm(data, function(err, result) {
		if (err) {
			console.log('updateuser err');
			res.send('Some errors!');
		}
		else {
			calorie_model.addCaloriem(data, null);
			friend_model.addFriendm(data, null);
			heartbeat_model.addHeartbeatm(data, null);
			step_model.addStepm(data, null);
			period_model.addPeriodm(data, null);
			slept_model.addSleptm(data, null);
			console.log('updated success');
			res.send('Updated Success!');
		}
	});
}

module.exports = function(app) {
	app.route('/register').post(register);
	app.route('/login').post(login);
	app.route('/update').post(update);
};