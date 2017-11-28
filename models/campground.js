var mongoose = require("mongoose");

var campsSchema = new mongoose.Schema({
    name: String,
    price: String,
    img: String,
    desc: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }]
});

module.exports = mongoose.model("Camps", campsSchema);
