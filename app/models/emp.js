var mongoose = require('mongoose');

module.exports = mongoose.model('Employee', {
	name : String,
	position : String,
	assgn : String,
	accom : String,
	available : String,				
	done : Boolean
});