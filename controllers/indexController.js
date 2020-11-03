const router = require('express').Router()

const { isLoggedIn } = require('./../config/auth')

// Showing home page 
router.get("/", function (req, res) { 
    res.render("home"); 
}); 
  
// Showing secret page 
router.get("/dashboard", isLoggedIn, function (req, res) { 
    res.render("dashboard", {user: req.user}); 
}); 

module.exports = router