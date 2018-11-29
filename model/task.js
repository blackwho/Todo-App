var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var schema = mongoose.Schema;


// define the schema for our user model
var taskSchema = new schema({

	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	name: {
		type: String
	},
	taskDate: {
		type: String
	}
});

var task = mongoose.model('Task', taskSchema);
module.exports = task;