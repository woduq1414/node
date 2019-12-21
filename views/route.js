const passport = require('passport');
const userModel = require('./user.js');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



// router.post('/signup', (req, res) => {  
    


// 	let id = req.body.signupID
// 	let password = req.body.signupPW
// 	let name = req.body.signupName
// 	let date = Date.now();
// 	let user = new userModel();
	
// 	user.id = id;
// 	user.password = password;
//     user.name = name;
// 	user.date = date;
// 	user.save(function (err) {
// 		if (err) {
// 			throw err;
// 		}
// 		else {
// 			res.json({status: "SUCCESS"});
// 		}
// 	});
// })


router.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.send(info.message) }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send("success");
      });
    })(req, res, next);
  });

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.send("incorrect") }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send("correct");
      });
    })(req, res, next);
  });




module.exports = router;