let test_patient = require("../models/patientModel");

//config here
//age
test_patient.info.age = 74;

//symptoms
test_patient.symptoms.fever.isPresent = true;
test_patient.symptoms.cough.isPresent = true;

module.exports = test_patient;