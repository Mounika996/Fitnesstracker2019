"use strict";

var path = require('path'),
	db = require(path.resolve('./config/db')),
	pool = db.pool;
var utils = require(path.resolve('./app/models/utils'));
function addFriendm(data, callback) {
	if(!data.follower) return;
	var friend = {
		following: data.following,
		follower: data.follower,
		follower_name: data.follower_name,
		created_at: utils.getDateNow()
	};
	pool.getConnection( function(err, connection) {
		connection.beginTransaction( function (err) {
			if (err) {
				connection.release();
				callback(err, null);
			} else {
				var query = connection.query('SELECT * FROM tbl_friends where following = "' + data.following + '" AND follower = "' + data.follower + '"', function(err, rows) {
					if( err ) {
						connection.release();
						console.log('query');
						callback(err, null);
					}
					else if( rows.length >= 1) {
						connection.release();
						callback(null, 'EXIST_FRIEND');
					}
					else {
						var query = connection.query('INSERT into tbl_friends SET ? ', friend, function (err, result) {
							if (err) {
								connection.release();
								callback(err, null);
							} else {
								connection.commit( function (err) {
									connection.release();
									if (err) {
										callback(err, null);
									} else {
										callback(err, result);
									}
								});
							}
						});
					}
				});
			}
		});
	});
}


function getFriendsm(data, callback) {
	pool.getConnection( function(err, connection) {
		connection.beginTransaction( function (err) {
			if (err) {
				connection.release();
				callback(err, null);
			} else {
				var query = connection.query('SELECT * FROM tbl_friends where following = "' + data.email + '"', function(err, result) {
					if( err ) {
						connection.release();
						console.log('query');
						callback(err, null);
					}
					else {
						connection.commit( function (err) {
							connection.release();
							if (err) {
								callback(err, null);
							} else {
								callback(err, result);
							}
						});
					}
				});
			}
		});
	});
}

exports.addFriendm = addFriendm;
exports.getFriendsm = getFriendsm;