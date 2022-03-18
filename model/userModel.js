const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    mobile : String,
    fav : {
        packages : [
            {
                type : Schema.Types.ObjectId,
                ref : "packages"
            }
        ],
        items : [
            {
                type : Schema.Types.ObjectId,
                ref : "items"
            }
        ]
    }
});

module.exports = mongoose.model("users",userSchema);