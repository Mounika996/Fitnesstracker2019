"use strict";

var path = require('path'),
	db = require(path.resolve('./config/db')),
	pool = db.pool;
var utils = require(path.resolve('./app/models/utils'));

function addActivitym(data, callback) {
	var act = {
		user_email: data.user_email,
		act_type: data.act_type,
		act_value: data.act_value,
		created_at: utils.getDateNow()
	};
	pool.getConnection( function(err, connection) {
		connection.beginTransaction( function (err) {
			if (err) {
				connection.release();
				callback(err, null);
			} else {
				var query = connection.query('INSERT into tbl_activity SET ? ', act, function (err, result) {
					if (err) {
						connection.release();
						callback(err, null);
					} else {
						connection.commit( function (err) {
							connection.release();
							if (err) {
								callback(err, null);
							} else {
								callback(err, act.created_at);
							}
						});
					}
				});
			}
		});
	});
}
function getActivitym(data, callback) {
	pool.getConnection( function(err, connection) {
		connection.beginTransaction( function (err) {
			if (err) {
				connection.release();
				callback(err, null);
			} else {
				var query = connection.query('SELECT * FROM tbl_activity where user_email = "' + data.user_email + '"', function (err, result) {
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
	});
}

exports.addActivitym = addActivitym;
exports.getActivitym = getActivitym;