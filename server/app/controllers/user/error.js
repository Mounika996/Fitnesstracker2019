"use strict";

var path = require('path'),
    async = require('async');

var getMyError = function(req,res) {	
	return res.render('error', {});
}

module.exports = function (app) {
  app.route('/error').get(getMyError);
};
