
const mongoose = require("mongoose");

//SCHEMA

var User= mongoose.Schema({
username: String,
lastname: String,
password: {type: String, required: true},
creation_date: Date,
phone: Number,
email: {type: String, required: true},
admin: Array
});

var User = module.exports = mongoose.model("User", User);
        