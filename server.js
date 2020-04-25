const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const db_handler =  require("./handlers/db_handler");
const api_handler =  require("./handlers/api_handler");
const test_patient = require("./test_objects/test_patient");

//DB
//const remotemongo = "mongodb://admin:sanatorio123@ds054118.mlab.com:54118/labos";
//connect to mongoose
//mongoose.connect(remotemongo, {useNewUrlParser: true});

const server = require("http").createServer(app);

app.use(express.static(__dirname + "/client"));

server.listen(process.env.PORT || 3000);
console.log("Server running...")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//ROUTES

app.get("/", function(req, res){
    res.send("Hello, this is Triage Api");
})

//Test one patient scoring
app.get("/score_patient", async function(req, res){
    let data = test_patient;
    //send to api handler here
    let scoredPatient = await api_handler.scorePatient(data);
    console.log("Scored Patient: ", scoredPatient)
    res.status(200).end();
})
