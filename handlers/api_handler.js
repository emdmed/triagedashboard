const scorePatient = require("./api_functions/scorePatient");
const patientList = require("./api_functions/patientList");

const api_handler = {
    scorePatient: scorePatient,
    addPatientToPatientList: patientList.addPatientToList,
    seePatientList: patientList.seeList
}


module.exports = api_handler;