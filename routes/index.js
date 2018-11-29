var express = require('express');
var router = express.Router();
var multer   =  require( 'multer' );
var upload   =  multer({ storage : multer.memoryStorage()});
var config = require("../config.js");
var User = require('../model/user');
var Task = require('../model/task');
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'vroy', 
  api_key: '182646376985325', 
  api_secret: 'nqMpWO66YGE-eV3EVrT2yGNY4_0' 
});

/* GET home page. */
module.exports = function(passport){


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function(req, res, next){
	res.render('index', {title: 'Register'});
});
router.get('/login', function(req, res, next){
	res.render('index', {title: 'Login'});
});

router.get('/tasks', function(req, res, next){
    if (req.isAuthenticated()) {
        res.render('index', {title: 'Tasks'});
    }else{
        res.redirect('/login');
    }
    
});

router.get('/onboarding', function(req, res, next){
	if (req.isAuthenticated()) {
        console.log("I am authenticated true");
        res.render('index', {title: 'Onboarding'});
	}else{
       res.redirect('/login');
    }
});

router.get('/onboarding/fetch', function(req, res){
  console.log("My Id is:" + req.user.id);
  User.findById(req.user.id, function(err,user){
      if(err)
        throw err;
      if(!user)
        res.json({s: 'f'});
      else
        res.json({s: 'p', d: user});
    });
});

router.get('/logout', function(req, res){
  if(req.isAuthenticated()){
    req.logout();
    res.json({s: 'p'});
  }else{
    res.json({s: 'f'});
  }
    
});

router.get('/getTask', function(req, res){
    if(req.user.id){
        Task.find({userId: req.user.id}, function(err, result) {
            if(err){
                throw err;
            }else{
                console.log(result);
                res.json({s: 'p', tasks: result});
            }
        });
    }else{
        res.json({s: 'f'});
    }
});

router.post('/addTask', function(req, res){
  console.log("ID: " + req.user.id);
  var date = Date.now().toString();
  Task.create({userId: req.user.id, name: req.body.taskName, taskDate: date}, function(err, task){
      if(err){
        throw err
      }else{
        // User.updateOne({_id: req.user.id}, { $push: { tasks: task._id }}).exec();
        res.json({s:'p'});
    }
  })
});

router.post('/deleteTask', function(req, res){
    Task.deleteOne({userId: req.user.id, name: req.body.taskName}, function(err, task){
        if(err) {
            throw err
        }else{
            // console.log("userId: " + req.user.id);
            // console.log("task_id: " + JSON.stringify(task));
            // User.updateOne({_id: req.user.id}, { $pull: { tasks: task._id } }).exec();
            res.json({s:'p'});
        }

    })
})

router.post('/onboarding', function(req, res, next){

      console.log("ID: " + req.user.id);
      User.findById(req.user.id, function(err,user){
        user.name = req.body.name;
        user.email = req.body.email;
        user.onboarded = true;
        user.save(function(err, saveUser){
              if(err){
                  throw err;
              }
              
              console.log(saveUser);
              res.json({'s':'p'});
         });

     });

});

router.post('/onboarding/upload', upload.single('file'), function(req, res, next){
  console.log("This is req file" + req.file);
  if (req.file) {
    var data = req.file.buffer;
    cloudinary.uploader.upload_stream(function(result){
        User.findById(req.user.id, function(err,user){
            console.log("I am result:" +result);
            user.avatar = result;
            user.markModified('profilePic');
            user.save(function(err,savedPost){
                if(err){
                    throw err;
                }
                console.log("old Movie Edited",savedPost);
                res.json({s:'p', d: savedPost._id});
                //return done(null, savedUser);
            });
        });
    }).end( req.file.buffer );
  }else{
    res.json({s:'f'});
  }
      
});

router.post('/login',
                passport.authenticate('local-login',{failureRedirect: '/login', failureFlash : true}),
                function(req, res, next) {
        console.log("User Authenticated: " + req.isAuthenticated());
        console.log(req.session);
        if("passport" in req.session){
            User.findById(req.session.passport.user, function(err, user){
                if(err) throw err;
                if(user){
                    res.json({s:'p', data: user.onboarded});
                }
            })
        }else{
            res.json({s:'f'});
        }
        
        
    });

router.post('/register', function(req, res, next) {
	
	User.findOne({'email':req.body.email}, function(err,user){
            if(err){
                throw err;
            }
            if(user){
                res.json({'s':'f', d:'user_exist'});
            }
            else{
                var newUser = new User();
                newUser.email = req.body.email;
                newUser.password = req.body.pass;
                newUser.save(function(err,saveUser){
                    if(err){
                        throw err;
                    }
                    console.log(saveUser);
                    res.json({'s':'p'});
                });

            }

        }); 
});

return router;
}
