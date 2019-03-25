"use strict";

var path = require('path'),
	db = require(path.resolve('./config/db')),
	pool = db.pool;
var utils = require(path.resolve('./app/models/utils'));

function addPeriodm(data, callback) {
	if(!data.period) return;
	var period = {
		id: data.user_id,
		period: data.period,
		created_at: utils.getDateNow()
	};
	pool.getConnection( function(err, connection) {
		connection.beginTransaction( function (err) {
			if (err) {
				connection.release();
				callback(err, null);
			} else {
				var query = connection.query('INSERT into tbl_period SET ? ', period, function (err, result) {
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

exports.addPeriodm = addPeriodm;