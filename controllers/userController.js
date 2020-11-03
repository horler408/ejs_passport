const router = require('express').Router()
const passport = require('passport')

const User = require("./../models/user"); 
const auth = require('./../config/auth')

// Showing register form 
router.get("/register", function (req, res) { 
    res.render("register"); 
}); 

//Showing login form 
router.get("/login", function (req, res) { 
    res.render("login"); 
}); 
  
// Handling user signup 
router.post("/register", function (req, res) { 
    var username = req.body.username 
    var password = req.body.password 
    User.register(new User({ username: username }), 
            password, function (err, user) { 
        if (err) { 
            console.log(err); 
            return res.render("register"); 
        } 
  
        passport.authenticate("local")( 
            req, res, function () { 
            res.render("secret"); 
        }); 
    }); 
}); 
  
  
//Handling user login 
router.post("/login", auth, passport.authenticate("local", { 
    successRedirect: "/dashboard", 
    failureRedirect: "/users/login"
}), function (req, res) { 
}); 
  

//Handling user logout  
router.get("/logout", function (req, res) { 
    req.logout(); 
    res.redirect("/"); 
}); 


module.exports = router