var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var config = {
  env: 'development',
  root: rootPath,
  app: {
    name: 'fitness'
  },
  port: 8080,
  sessionSecret: 'fitness@project',
  sessionCollection: 'sessions',
  sessionCookie: {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: null
  },
  sessionName: 'connect.sid',
  sessionStore: 60 * 1000 * 30,
  token: '74CHTO3K4J20E9FJWL23@(372*-19@LW3P2O2JR',
  mysql: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'fitness_db',
    connectionLimit: 30,
    waitForConnections: true
  },
  error_code: {
    input_error: 0,
    condition_error: 1,
    token_error: 2,
    server_error: 3
  },
  online: []
};

module.exports = config;
