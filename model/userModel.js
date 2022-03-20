const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    favPackages: [
        {
            type: Schema.Types.ObjectId,
            ref: "packages"
        }],
    favItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "items"
        }
    ],
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isVerified : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model("users", userSchema);