const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const db_handler =  require("./handlers/db_handler");
const api_handler =  require("./handlers/api_handler");
const test_patient = require("./test_objects/test_patient");
let patientNumber = 0;

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
    //let patientList = await api_handler.seePatientList()
    let patientList = await db_handler.getPatientList();
    res.send(patientList).status(200).end();
})

//admin side
app.post("/send_patient_to_server", async function(req, res){
    let patient = req.body;
    console.log("Patient received");

    //assign a number between 1 and 100
    if(patientNumber === 1000){
        patientNumber = 0
    }

    let number = patientNumber+1
    patientNumber = number;
    patient.info.number = number

    let saved_user;
    let detectRuleOutTrue = false;

    for(key in patient.ruleOut){
        if(patient.ruleOut[key] === true){
            //score ruled out patient
            saved_user = api_handler.scorePatient(patient);
            let saved = await db_handler.createPatient(saved_user);
            if(saved === false){
                res.send({message: "Duplicated phone in db"}).status(400).end();
            }
            detectRuleOutTrue = true
        } else {
    
        }
    }

    if(detectRuleOutTrue === false){
        //wait for patient triage to score
        saved_user = await db_handler.createPatient(patient);
        if(saved_user === false){
            res.send({message: "Duplicated phone in db"}).status(400).end();
        }
    }

    res.send(saved_user).status(200).end();
})

//patient side
app.post("/update_patient_in_db", async function(req, res){
    let patient = req.body;

    let scoredPatient = await api_handler.scorePatient(patient);
    await scoredPatient

    //update
    let updated = await db_handler.updatePatient(scoredPatient);
    console.log(updated)
    res.send({number: updated}).status(200).end();
})


app.post("/check_phone", async function(req, res){

    let phone = req.body.phone;

    let found = await db_handler.checkPatientPhone(phone);
    if(found === false){
        res.status(404).end();
    } else {
        res.send(found[0]).status(200).end();
    }
});

app.post("/delete_patient", async function(req, res){
    let phone = req.body.phone;

    let deleted = await db_handler.deletePatient(phone);
    console.log(deleted);

    res.status(200).end();
})

