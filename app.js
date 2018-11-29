var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var passport = require('passport');
var session = require('express-session');
var RedisStore =require('connect-redis')(session);

var app = express();
var conf = require('./config');

require('./utility/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//     secret: conf.redisStore.secret,
//     cookie: {_expires : 60000000},
//     resave: true,
//     saveUninitialized: true,
//     store: new RedisStore({
//         host: conf.redisStore.host,
//         port: conf.redisStore.port,
//         prefix: 'todo-database'
//     })
// }));

app.use(session({
             secret : 'your_cookie_secret',
             cookie:{_expires : 60000000}, // time im ms
             })
        ); 

app.use(passport.initialize());
app.use(passport.session());

var index = require('./routes/index')(passport);
var users = require('./routes/users');

//create a cors middleware
app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', index);
app.use('/users', users);


//mongodb connection
mongoose.connect(conf.dbUrl,{
    server: {
        socketOptions: {
            keepAlive: 1
        }
    },
    replset: {
        socketOptons:{
            keepAlive: 1
        }
    }
},function(err){
    if (err){
        console.log(conf.dbUrl);
        console.error('Connecting error in mongodb...',err);
        return;
    };
    
    console.log('mongodb connected...');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
