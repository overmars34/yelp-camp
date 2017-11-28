var middlewareObj = {};
var Camps = require("../models/campground");
var Comments = require("../models/comment");

middlewareObj.checkCampOwenership = function(req, res, next) {
    if(req.isAuthenticated()){
        Camps.findById(req.params.id, function(err, foundcamp){
            if(err){
                req.flash("error", "Camp not found");
                console.log(err);
                res.redirect("campgrounds/show");
            }else{
                if(foundcamp.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwenership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comments.findById(req.params.comment_id, function(err, foundcomment){
            if(err){
                req.flash("error", "Comment not found");
                console.log(err);
                res.redirect("campgrounds/show");
            }else{
                if(foundcomment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLogin = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;