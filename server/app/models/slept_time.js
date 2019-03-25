"use strict";

var path = require('path'),
	db = require(path.resolve('./config/db')),
	pool = db.pool;
var utils = require(path.resolve('./app/models/utils'));

function addSleptm(data, callback) {
	if(!data.slept_time)	return;
	var aslept_time = {
		id: data.user_id,
		slept_time: data.slept_time,
		created_at: utils.getDateNow()
	};
	pool.getConnection( function(err, connection) {
		connection.beginTransaction( function (err) {
			if (err) {
				connection.release();
				callback(err, null);
			} else {
				var query = connection.query('INSERT into tbl_slept_time SET ? ', aslept_time, function (err, result) {
					if (err) {
						connection.release();
						callback(err, null);
					} else {
						connection.commit( function (err) {
							connection.release();
							if (err) {
								callback(err, null);
							} else {
//								callback(err, result);
							}
						});
					}
				});
			}
		});
	});
}

exports.addSleptm = addSleptm;