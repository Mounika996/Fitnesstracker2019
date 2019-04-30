var express = require('express');
var config = require('./config/config');


var app = express();
require('./config/express')(app);
var server = require('http').Server(app);
var io = require('socket.io')(server);

Object.filter = (obj, predicate) => 
	Object.keys(obj)
		.filter(key => predicate(obj[key]))
		.reduce((res, key) => (res[key] = obj[key], res), {});

io.on('connection', function(socket) {
	socket.emit('customEmit', 'be received everyone');
	socket.on('emit_method', function(msg) {
		config.online[socket.id] = msg;
		var email = config.online[socket.id];
		socket.broadcast.emit('someone_in', email);
	});
	socket.on('logout_method', function() {
		var email = config.online[socket.id];
		delete config.online[socket.id];
		socket.broadcast.emit('someone_out', email);
	});
	socket.on('disconnect', function() {
		var email = config.online[socket.id];
		delete config.online[socket.id];
		socket.broadcast.emit('someone_out', email);
	});
});
server.listen(config.port);