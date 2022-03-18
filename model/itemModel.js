const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    name : String,
    price : Number,
    quantity : Number,
    image : String,
    day : String,
    catId : Schema.Types.ObjectId
});

module.exports = mongoose.model("items",itemSchema);