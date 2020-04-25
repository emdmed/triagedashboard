var patient_list = [];

const PatientList = {
    addPatientToList: (patient) =>{
        patient_list.push(patient);
        console.log("<<New patient added to patient list>>");
    },
    seeList: ()=>{
        console.log(patient_list);
        return patient_list
    }
    
}

module.exports = PatientList;