const scorePatient = require("./api_functions/scorePatient");
const patientList = require("./api_functions/patientList");
const patientExample = require("../examples/patientModel");

const api_handler = {
    scorePatient: scorePatient,
    addPatientToPatientList: patientList.addPatientToList,
    seePatientList: patientList.seeList,
    getPatientExample: patientExample
}


module.exports = api_handler;