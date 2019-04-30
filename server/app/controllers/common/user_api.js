"use strict";

var path = require('path'),
	Q = require('q'),
	express = require("express"),
    router = express.Router(),
    config = require(path.resolve('./config/config')),
    base64 = require('base64-js'),
	user_model = require(path.resolve('./app/models/user'));

function login(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	user_model.getUserByIdAndPwdm(email, password, function (err, result) {
		if (err) {
			console.log('getUserByIdAndPwdm: Error');
		} else {
			if (result.length == 0) {				
				console.log('login Failed');
				res.send({"res": "loginFailed"});
			}
			else {
				var loginUser = {
					"email": result[0].email,
					"name": result[0].name,
					"age": result[0].age,
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
function getAll(req, res, next) {
	user_model.getAllm(function (err, result) {
		if (err) {
			console.log('getAll: Error');
		} else {
			var data = [];
			for (var i = 0; i < result.length; i++) {
				data.push({"email":result[i].name + ":" + result[i].email});
			}
			res.send(data);
		}
	});
}

function register(req, res, next) {
	var data = req.body;
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
	user_model.updateUserm(data, function(err, result) {
		if (err) {
			console.log('updateuser err');
			res.send('Some errors!');
		}
		else {
			console.log('updated success');
			res.send('Updated Success!');
		}
	});
}

module.exports = function(app) {
	app.route('/register').post(register);
	app.route('/login').post(login);
	app.route('/update').post(update);
	app.route('/getAll').post(getAll);
};