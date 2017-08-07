// Set up database connection
var mysql = require('mysql');
var connection;




var connection = mysql.createConnection({
	port: 3306,
	host: "localhost",
	user: "root",
	password: "",
	database: "burgers_db"
});


connection.connect(function(err) {
	if (err) {
		console.error('error conencting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

// export the connection back to orm
module.exports = connection;