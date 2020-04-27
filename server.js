const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const db_handler =  require("./handlers/db_handler");
const api_handler =  require("./handlers/api_handler");
const test_patient = require("./test_objects/test_patient");

//DB
const remotemongo = "mongodb://admin:sanatorio123@ds054118.mlab.com:54118/labos";
//connect to mongoose
mongoose.connect(remotemongo, {useNewUrlParser: true});

const server = require("http").createServer(app);

app.use(express.static(__dirname + "/client"));

server.listen(process.env.PORT || 3000);
console.log("Server running...")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//ROUTES

app.get("/admin", function(req, res){
    //send first the login page then admin //TODO
    res.sendFile(__dirname + "/client/admin.html")
})

app.get("/paciente", function(req, res){
    res.sendFile(__dirname + "/client/paciente.html")
})

//Test one patient scoring
app.get("/score_patient", async function(req, res){
    let data = test_patient;

    //send to api handler here
    let scoredPatient = await api_handler.scorePatient(data);

    //send scored patient to patient list
    await api_handler.addPatientToPatientList(scoredPatient);

    res.status(200).end();
})

app.get("/patient_example", async function(req, res){
    let patient = await api_handler.getPatientExample
    res.send(patient).status(200).end();
})

app.get("/patient_list", async function(req, res){
    let patientList = await api_handler.seePatientList()
    res.send(patientList).status(200).end();
})

//admin side
app.post("/send_patient_to_server", async function(req, res){
    let patient = req.body;
    console.log("received patient ", patient);

    //send to api handler here
    let scoredPatient = await api_handler.scorePatient(patient);

    //send scored patient to patient list
    await api_handler.addPatientToPatientList(scoredPatient);

    //send scored patient to patient db
    let saved_user = await db_handler.createPatient(scoredPatient);

    res.send(saved_user).status(200).end();
})

//patient side
app.post("/update_patient_in_db", async function(req, res){
    let patient = req.body;

    //update
    let updated = await db_handler.updatePatient(patient);
    if(updated === true){
        res.status(200).end();
    } else if (updated === false){
        res.status(404).end();
    }
})


app.post("/check_phone", async function(req, res){

    let phone = req.body.phone;

    let found = await db_handler.checkPatientPhone(phone);
    if(found === false){
        res.stastus(404).end();
    } else {
        res.send(found[0]).status(200).end();
    }

});

