var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var schema = mongoose.Schema;


// define the schema for our user model
var userSchema = new schema({

    email: {
        type:String,
        required: false
    },
    password: {
        type:String,
        required: false
    },
    name: {
        type: String
    },
    avatar: {
        type: schema.Types.Mixed
    },
    onboarded: {
        type: Boolean,
        default: false
     }
    
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var user = mongoose.model('User', userSchema);
module.exports = user;