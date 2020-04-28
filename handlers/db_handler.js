const PatientModel = require("../models/patientModel");


const db_handler = {
    createPatient,
    checkPatientPhone,
    updatePatient,
    getPatientList
}


async function createPatient(patient, callback){
    let created_patient = await PatientModel.create(patient);
    return created_patient;
}

async function checkPatientPhone(phone){
    console.log("phone: ", phone)
    let foundPatient = await PatientModel.find({"info.phone": phone})
    if(foundPatient.length > 0){
        return foundPatient;
    } else {
        return false
    }
}

async function updatePatient(patient){
    console.log("dbhandler - updated patient ", patient)
    try{
        let updated = await PatientModel.findOneAndUpdate({"info.phone": patient.info.phone}, patient, {useFindAndModify: false});
        console.log("Success");
        return updated.info.number
    }catch(err){
        return false
    }
}

async function getPatientList(){
    let patientList = await PatientModel.find();
    return patientList;
}

module.exports = db_handler;