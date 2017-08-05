
var orm = require("../config/orm.js");

// Calls the ORM functions using burger specific input for the ORM
// (This basically just uses the ORM functions we already created, passes through
// the burger table we made and any other necessary arguments, then uses a 
// callback so it will wait to run until it is done loading)


var burger = {
	
	selectAll: function(cb) {
		orm.selectAll('burgers', function(res) {
			cb(res);
		});
	},
	
	insertOne: function(cols, vals, cb) {
		orm.insertOne('burgers', cols, vals, function(res) {
			cb(res);
		});
	},

	updateOne: function(objColVals, condition, cb) {
		orm.updateOne('burgers', objColVals, condition, function(res) {
			cb(res);
		});
	}
};

// export burger back to the controller
module.exports = burger;