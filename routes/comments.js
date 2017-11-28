var express = require("express");
var router = express.Router({mergeParams: true});
var Camps = require("../models/campground");
var Comments = require("../models/comment");
var middleware= require("../middleware");

router.get("/new", middleware.isLogin, function(req, res){
    Camps.findById(req.params.id, function(err, foundcamp){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {camp:foundcamp});
        }
    });
});

router.post("/", middleware.isLogin, function(req, res){
    Camps.findById(req.params.id, function(err, foundcamp) {
        if(err){
            console.log(err);
            req.redirect("/campgrounds");
        }else{
            Comments.create(req.body.comments, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundcamp.comments.push(comment);
                    foundcamp.save();
                    req.flash("success", "Adding comment successful");
                    res.redirect("/campgrounds/" + foundcamp._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwenership, function(req, res){
    Comments.findById(req.params.comment_id, function(err, foundcomment) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/edit", {camp_id: req.params.id, comment: foundcomment});
        }
    });
});

router.put("/:comment_id", middleware.checkCommentOwenership, function(req, res){
   Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           console.log(err);
           res.redirect("back");
       }else{
           req.flash("success", "Removing comment successful");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) ;
});

router.delete("/:comment_id", middleware.checkCommentOwenership, function(req, res){
    Comments.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        }
        req.flash("success", "Removing comment successful");
        res.redirect("/campgrounds");
    });
});

module.exports = router;