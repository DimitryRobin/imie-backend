var log4js = require('log4js');
var logger = log4js.getLogger();

var mysql = require('mysql');
var pool  = mysql.createPool({
	connectionLimit : 10,
	acquireTimeout  : 10000,
	host            : '127.0.0.1',
	user            : 'root',
	password        : '',
	database        : 'imie-backend'
});

// Thread acquis
pool.on('acquire', function (connection) {
	logger.info('Connection %d acquired.', connection.threadId);
});

// En attente d'un thread  disponible
pool.on('enqueue', function () {
	// logger.fatal('Waiting for available connection slot...');
});

// Thread libéré
pool.on('release', function (connection) {
	logger.warn('Connection %d released.', connection.threadId);
});

exports.getVolVelo = function(callback) {
	pool.getConnection(function(err, connection) {
		if(err) { logger.error("Connexion à la base de données échouée."); callback(true); return; }
		connection.query("Select * from vol", function(err, results) {
			connection.release();
			if(err) { logger.error(err); callback(true); return; }
			callback(false, results);
		});
	});
};