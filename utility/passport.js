var LocalStrategy    = require('passport-local').Strategy;
var User = require('../model/user');

module.exports = function(passport){
	// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass',
    session:true,
    passReqToCallback: true
	  },
	  function(req, email, password, done){
	  	console.log("I am here");
	    process.nextTick(function(){
	      User.findOne({ 'email': email}, function(err, user){
	        if(err)
	        {
	          console.log('error');
	          return done(err);
	        }
	        if(!user)
	        {
	          console.log('nouser');
	          return done(null, false);              
	        }
	        if(user.password != password){
	          console.log('nopass');
	          return done(null, false);
	        }
	        console.log(user);
	        return done(null, user);

	      });
	    });
	  }
	));

}
