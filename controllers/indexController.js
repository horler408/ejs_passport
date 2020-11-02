const router = require('express').Router()

// Showing home page 
router.get("/", function (req, res) { 
    res.render("home"); 
}); 
  
// Showing secret page 
router.get("/secret", isLoggedIn, function (req, res) { 
    res.render("secret"); 
}); 

module.exports = router