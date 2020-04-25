let test_patient = require("../models/patientModel");

//config here
test_patient.symptoms.fever.isPresent = true;
test_patient.symptoms.cough.isPresent = true;

module.exports = test_patient;