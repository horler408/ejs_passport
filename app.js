const express = require("express"), 
    mongoose = require("mongoose"), 
    passport = require("passport"), 
    bodyParser = require("body-parser"), 
    LocalStrategy = require("passport-local"), 
    passportLocalMongoose =  
        require("passport-local-mongoose");

const indexRoute = require('./controllers/indexController');
const userRoute = require('./controllers/userController');
        
mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true); 
mongoose.connect("mongodb://localhost/auth_demo_app"); 
  
const app = express(); 
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Express Session 
app.use(require("express-session")({ 
    secret: "Rusty is a dog", 
    resave: false, 
    saveUninitialized: false
})); 
  
app.use(passport.initialize()); 
app.use(passport.session()); 
  
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 
  
  
// Routes
app.use('/', indexRoute)
app.use('user', userRoute)

var port = process.env.PORT || 3000; 
app.listen(port, function () { 
    console.log("Server Has Started!"); 
}); 