var mongoose = require("mongoose");

var Camps = require("./models/campground");
var Comments = require("./models/comment");

var data = [
    {   name: "Cloud's Rest",
        img: "https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1440478008/campground-photos/csnhvxn0qcki2id5vxnc.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at justo purus. Vivamus ex dui, commodo non diam nec, euismod tempor tortor. Suspendisse lacinia dui arcu, vulputate dictum risus porttitor et. Aenean mi velit, hendrerit vel sodales eu, ultrices in dolor. Vestibulum mollis sapien nulla, et blandit massa dignissim vitae. Nunc vel tellus nisl. Quisque a vulputate ante."
    },
    {   name: "Desert Mesa",
        img: "https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg",
        desc: "Aliquam mattis mi et nisi commodo, et venenatis nisl gravida. Ut rhoncus tortor vitae maximus congue. Nam fringilla ante massa, non aliquam magna porta sit amet. In hac habitasse platea dictumst. Donec enim justo, ultrices ut malesuada sed, sodales vitae diam. Phasellus volutpat a massa vel aliquet. Curabitur sit amet mollis tortor. Integer suscipit est at cursus ultrices. Donec faucibus odio in tortor bibendum, quis sagittis enim aliquam."
    },
    {   name: "Canyon Floor",
        img: "https://www.yellowstonenationalparklodges.com/content/uploads/2017/04/madison-campground-1024x768.jpg",
        desc: "Suspendisse in mi euismod, maximus libero sit amet, iaculis leo. Cras nec convallis nisl. In laoreet mi at enim luctus, eget pretium velit ultricies. Praesent vulputate tortor ut accumsan aliquam. Aenean blandit efficitur sodales. Sed vulputate vestibulum velit eu condimentum. Maecenas sed pulvinar eros. Maecenas at sodales est. Praesent elementum sed tortor sit amet volutpat. Praesent ut est dolor."
    }
    ];

function seedDB() {
    Camps.remove({}, function(err){
       if(err){
           console.log(err);
       } else {
           console.log("removed all camps");
       }
       
       Comments.remove({}, function(err){
           if(err){
               console.log(err);
           } else {
               console.log("removed all comments");
           }
               
          data.forEach(function(seed){
                Camps.create(seed, function(err, camp){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("added a camp");
                        Comments.create({
                            text: "This place is great, but I wish there was internet.",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                camp.comments.push(comment);
                                camp.save();
                            }
                        });
                    }
                });
            });
        });
    });
}

module.exports = seedDB;



