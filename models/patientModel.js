
const mongoose = require("mongoose");

//SCHEMA

var PatientModel= mongoose.Schema({
    info: {
        gender: String,
        age: {required: true, type: Number},
        phone: {required: true, type: Number},
        date: {required: true, type: Date},
        number: Number,
        nomobile: Boolean,
        covidAlert: Boolean
    },
    score: Number,
    ruleOut: {
        intensiveCareInLastMonth: Boolean,
        cancer: Boolean,
        immuneDefficiency: Boolean,
        chemoInLast2Months: Boolean,
        dyspnea: Boolean,
        acuteMotorImpairment: Boolean,
        chestPain: Boolean,
        hematemesis: Boolean
    },
    symptoms: {
        fever: {
            isPresent: Boolean,
            measured: Boolean,
            durationInDays: Number,
            abortedWithAntipyretics: Boolean
        },
        cough: {
            isPresent: Boolean,
            sputum: {
                isPresent: Boolean,
                color: {
                    isGreen: Boolean,
                    isYellow: Boolean,
                    isTransparent: Boolean,
                    isWhite: Boolean,
                    isRed: Boolean
                },

            }
        },
        abdominalPain: {
            isPresent: Boolean,
            durationInDays: Number,
            location: {
                one: Boolean,
                two: Boolean,
                three: Boolean,
                four: Boolean,
                five: Boolean,
                six: Boolean,
                seven: Boolean,
                eight: Boolean, 
                nine: Boolean
            }
        },
        throatPain: {
            isPresent: Boolean,
            voiceChange: Boolean,
            durationInDays: Number
        },
        runnyNose: {
            isPresent: Boolean, 
            sputum: {
                color: {
                    isGreen: Boolean,
                    isYellow: Boolean,
                    isTransparent: Boolean,
                    isWhite: Boolean,
                    isRed: Boolean
                }
            }
        },
        urinatingPain: {
            isPresent: Boolean,
            durationInDays: Number,
            secretions: {
                isPresent: Boolean,
                color: {
                    isGreen: Boolean,
                    isYellow: Boolean,
                    isTransparent: Boolean,
                    isWhite: Boolean,
                    isRed: Boolean
                }
            }
        },
        diarrhea: {
            isPresent: Boolean,
            color: {
                isRed: Boolean,
                isBlack: Boolean
            }
        },
        vomiting: {
            isPresent: Boolean
        }
    }
});

var PatientModel = module.exports = mongoose.model("triagixPacientes", PatientModel);
        