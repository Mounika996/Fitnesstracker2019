var mysql = require("mysql"),
    config = require("./config");

exports.pool = mysql.createPool({
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    connectionLimit: config.mysql.connectionLimit,
    waitForConnections: config.mysql.waitForConnections
});