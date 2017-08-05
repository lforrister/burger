// import in the connection to the database
var connection = require('../config/connection.js');

// ----------------------------------------------------
// TBH I have no idea what these next two functions do but they were in the example so I'mma keep them
// Helper function for SQL syntax.
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		}
	}

	return arr.toString();
}

// -----------------------------------------------
var orm = {
	// Create a variable that selects all from whatever you pass through the tableInput parameter
	selectAll: function(tableInput, cb) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		// Then connect to the database and make a query, then display the results. Callback makes it so it will wait to display til it's done running
		connection.query(queryString, function(err, result) {
			if (err) throw err;
			cb(result);
		});
	},


	// Create a variable that will insert what you pass through as the table argument
	insertOne: function(table, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + table;

		// Insert into (whatever table you pass through)(whatever column you pass through) (whatever values you pass through), plus a callback 

		queryString += ' (';
		queryString += cols.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += printQuestionMarks(vals.length);
		queryString += ') ';

		   // console log the querySTring & vals, then connect the database and return the results after a callback

		console.log(queryString);
		console.log(vals);

		connection.query(queryString, vals, function(err, result) {
			if (err) throw err;
		
			cb(result);
		});
	},

	
	updateOne: function(table, objColVals, condition, cb) {
		// Create a variable that will update what you pass through as the table argument
		var queryString = 'UPDATE ' + table;

		// Update (whatever table you pass through) by setting (whatever the values of the column object you pass through)
		// where (the condition you pass through), then return the result after a callback

		queryString += ' SET ';
		queryString += objToSql(objColVals);
		queryString += ' WHERE ';
		queryString += condition;

		console.log(queryString);

		connection.query(queryString, function(err, result) {
			if (err) throw err;
			
			cb(result);
		});
	}
};

// export the orm back to the model burger.js
module.exports = orm;