const scorePatient = (patient)=>{

    let activeSypmtoms = [];

    //rule out
    for(key in patient.ruleOut){
        if(patient.ruleOut[key] === true){
            console.log("patient ruled out! because: ", key, " is true");
                patient.score = 100;
                return {patient, message: `patient ruled out! because: ${key} is true. Patient score is ${patient.score}`}
        }
    }

    //not ruled out
    //check age priority
    if(patient.info.age >= 40 && patient.info.age < 70){
        patient.score = 30;
    } else if (patient.info.age >= 18 && patient.info.age < 40){
        patient.score = 0;
    } else if (patient.info.age > 70){
        patient.score = 60;
    }

    //check symptoms
    for(key in patient.symptoms){
        if(patient.symptoms[key].isPresent === true){
            console.log(key, " is true");
            activeSypmtoms.push({[key]: patient.symptoms[key]});
        }
    }

    console.log("Active symptoms: ", activeSypmtoms);

}


module.exports = scorePatient;

