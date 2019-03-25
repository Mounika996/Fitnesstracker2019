"use strict";

var path = require('path'),
	db = require(path.resolve('./config/db')),
	pool = db.pool;
var utils = require(path.resolve('./app/models/utils'));
function getUserByIdAndPwdm(userID, userPwd, callback) {
	pool.getConnection( function(err, connection) {
		connection.beginTransaction( function (err) {
			if (err) {
				connection.release();
				callback(err, null);
			} else {
				var query = connection.query('SELECT * FROM tbl_users WHERE id="' + userID + '" AND password=PASSWORD("' + userPwd + '") ', function (err, rows) {
					if (err) {
						connection.release();
						callback(err, null);
					} else {
						connection.commit( function (err) {
							connection.release();
							if (err) {
								callback(err, null);
							} else {
								callback(err, rows);
							}
						});
					}
				});
			}
		});
	});
}

function addUserm(data, callback) {
	var user = new Object({
		'id': data.user_id,
		'firstname': data.firstname,
		'lastname': data.lastname,
		'birthday': data.birthday,
		'height': data.height,
		'weight': data.weight,
		'created_at': utils.getDateNow()
	});
	pool.getConnection( function(err, connection) {
		connection.beginTransaction( function (err) {
			if (err) {
				connection.release();
				callback(err, null);
			} else {
				var query = connection.query('SELECT * FROM tbl_users where id = "' + data.user_id + '"', function(err, result) {
					if( err ) {
						connection.release();
						console.log('query');
						callback(err, null);
					}
					else if( result.length > 0 ) {
						connection.release();
						callback(null, 'ID_DUPLICATION');
					}
					else {
						var query = connection.query('INSERT into tbl_users SET ? , password=PASSWORD("' + data.password + '")', user, function (err, result) {
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


function updateUserm(data, callback) {
	var user = new Object({
		'firstname': data.firstname,
		'lastname': data.lastname,
		'birthday': data.birthday,
		'height': data.height,
		'weight': data.weight,
		'created_at': utils.getDateNow()
	});
	console.log(data.user_id);
	pool.getConnection( function(err, connection) {
		connection.beginTransaction( function (err) {
			if (err) {
				connection.release();
				callback(err, null);
			} else {
				var query = connection.query('UPDATE tbl_users SET ? WHERE id="' + data.user_id + '"', user, function(err, result) {
					if (err) {
						console.log(err);
						connection.release();
						callback(err, null);
					} else {
						if(data.password) {
							connection.query('UPDATE tbl_users SET password = PASSWORD("' + data.password + '") WHERE id="'+data.user_id+'"', function(err, result2) {
								if (err) {
									console.log(err);
									connection.release();
									callback(err, null);
								} 
								else 
								{
									connection.commit( function(err) {
										connection.release();
										if (err) {
											callback(err, null);
										} else {
											callback(err, result2);
										}
									});
								}
							});
						}
						else {
							connection.commit( function(err) {
								connection.release();
								if (err) {
									callback(err, null);
								} else {
									callback(err, result);
								}
							});
						}
					}
				});
			}
		});
	});
}

exports.getUserByIdAndPwdm = getUserByIdAndPwdm;
exports.addUserm = addUserm;
exports.updateUserm = updateUserm;