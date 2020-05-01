const mongoose = require("mongoose");

//SCHEMA

var User= mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    creation_date: Date,
    phone: Number,
    email: String
});

var User = module.exports = mongoose.model("TriagixUsers", User);
        