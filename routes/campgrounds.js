var express = require("express");
var router = express.Router();
var Camps = require("../models/campground");
var middleware= require("../middleware");

router.get("/", function(req, res){
    Camps.find({}, function(err, camps){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index", {camps: camps});
       }
    });
});

router.post("/", middleware.isLogin, function(req, res){
    var parsedName = req.body.campname;
    var parsedPrice = req.body.campprice;
    var parsedURL = req.body.imgurl;
    var parsedDesc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newObj = {"name": parsedName, "price": parsedPrice, "img": parsedURL, "desc": parsedDesc, "author": author};
    Camps.create(newObj, function(err, newObj){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Adding camp successful");
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new", middleware.isLogin, function(req, res){
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res){
    Camps.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {camp: foundcamp});
        }
    });
});

router.get("/:id/edit", middleware.checkCampOwenership, function(req, res){
    Camps.findById(req.params.id, function(err, foundcamp){
        if(err){
            console.log(err);
            res.redirect("campgrounds/show");
        }else{
                res.render("campgrounds/edit", {camp:foundcamp});
        }
    });
});

router.put("/:id", function(req, res){
    Camps.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCamp){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Editing camp successful");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:id", middleware.checkCampOwenership, function(req, res){
   Camps.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
       }
       req.flash("success", "Removing camp successful");
       res.redirect("/campgrounds");
   }) 
});

module.exports = router;