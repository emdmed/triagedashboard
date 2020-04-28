const PatientModel = require("../models/patientModel");


const db_handler = {
    createPatient,
    checkPatientPhone,
    updatePatient,
    getPatientList,
    deletePatient
}


async function createPatient(patient, callback){
    let duplicatedPhone = await checkPatientPhone(patient.info.phone);
    console.log("duplicatedphonevar: ", duplicatedPhone);
    if(duplicatedPhone === false){
        let created_patient = await PatientModel.create(patient);
        return created_patient;
    } else {
        console.log("Duplicated phone")
        return false;
    }

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

async function deletePatient(phone){
    let deleted = await PatientModel.findOneAndDelete({"info.phone": phone});
    console.log(deleted);
    
}

module.exports = db_handler;