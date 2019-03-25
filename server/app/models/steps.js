"use strict";

var path = require('path'),
	db = require(path.resolve('./config/db')),
	pool = db.pool;
var utils = require(path.resolve('./app/models/utils'));

function addStepm(data, callback) {
	if(!data.steps)	return;
	var step = {
		id: data.user_id,
		steps: data.steps,
		created_at: utils.getDateNow()
	};
	pool.getConnection( function(err, connection) {
		connection.beginTransaction( function (err) {
			if (err) {
				connection.release();
				callback(err, null);
			} else {
				var query = connection.query('INSERT into tbl_steps SET ? ', step, function (err, result) {
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

exports.addStepm = addStepm;