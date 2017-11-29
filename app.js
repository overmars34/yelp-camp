var express         = require("express"),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash"),
    Camps           = require("./models/campground"),
    Comments        = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds"),
    campRoutes      = require("./routes/campgrounds"),
    commentRoutes   = require("./routes/comments"),
    authRoutes      = require("./routes/index");
    
//mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
mongoose.connect("mongodb://overmars34:31001357mc@ds123896.mlab.com:23896/jliusapps", {useMongoClient: true});

app.set("view engine", "ejs");   
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
mongoose.Promise = global.Promise;

//seedDB();

app.use(require("express-session")({
    secret: "Lorem Ipsum",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds", campRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started for Yelp Camp app");
});