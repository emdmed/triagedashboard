let mongoose = require("mongoose")

let config = {
    url: {domain: (domainUrl)=>{
        if(domainUrl === "production"){
            return "production url here"
        } else if (domainUrl === "dev"){
            return "http://localhost:3000"
        } else {
            console.log("Url Error")
        } }
    },
    DB: "mongodb://admin:sanatorio123@ds054118.mlab.com:54118/labos",
    connectToDB: async function(){
        try{
            await mongoose.connect(this.DB, {useNewUrlParser: true, useUnifiedTopology: true });
            console.log("Connected to DB");
        }catch{
            console.log("Error connecting to DB, retrying in 10");
            setTimeout(() => {
                this.connectToDB();
            }, 10000);
         
        }
    },
    environment: {
        set(env){
            if(env === "dev"){
                config.connectToDB = ()=>{
                    console.log("no DB")
                }
            } 
        }
    }
}

module.exports = config;
