"use strict";

var path = require('path'),
	Q = require('q'),
	express = require("express"),
    router = express.Router(),
    config = require(path.resolve('./config/config')),
    base64 = require('base64-js'),
    _ = require('underscore'),
	friend_model = require(path.resolve('./app/models/friends'));

function addFriend(req, res, next) {
	var data = req.body;
	var str = data.follower;
	var arr = str.split(':');
	data.follower = arr[1];
	data['follower_name'] = arr[0];
	if(data.follower == data.following) {
		res.send('SAME_ME');
		return;
	}

	friend_model.addFriendm(data, function (err, result) {
	   	if (err) {
	   		console.log('err');
	   	}
		else if(result == 'EXIST_FRIEND'){
			console.log('EXIST_FRIEND');
			res.send('EXIST_FRIEND');
	   	}
	   	else {
	   		console.log('added');
	   		res.send('ADD_OK');
	   	}
	});
}

Object.filter = (obj, predicate) => 
	Object.keys(obj)
		.filter(key => predicate(obj[key]))
		.reduce((res, key) => (res[key] = obj[key], res), {});

function isOnline(email) {
	var filtered = Object.filter(config.online, t => t == email);

	if(_.isEmpty(filtered))
		return false;
	return true;
}

function getFriends(req, res, next) {
	var data = req.body;
	friend_model.getFriendsm(data, function (err, result) {
	   	if (err) {
	   		console.log('err');
	   	}
	   	else {
	   		var data = [];
	   		for ( var i = 0 ; i < result.length; i++) {
	   			data.push({"name":result[i].follower_name,"email":result[i].follower,
	   				"available":isOnline(result[i].follower)
	   			});
	   		}
			res.send(data);
	   	}
	});
}


module.exports = function(app) {
	app.route('/addFriend').post(addFriend);
	app.route('/getFriends').post(getFriends);
};