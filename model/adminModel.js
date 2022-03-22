const mongoose = require("mongoose");

const adminShema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

module.exports = mongoose.model("admins",adminShema);