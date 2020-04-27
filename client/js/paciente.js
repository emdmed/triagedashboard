let PATIENT_EXAMPLE;
let patient_example;

console.log("paciente iniciado")

function initPatient(){
    $.ajax({
        url: "/patient_example",
        method: "GET",
        success: function(res){
            let data = res
            PATIENT_EXAMPLE = data;
            console.log("Patient example retrieved");
        }
    })
}

function renderSymptomsFrontend(){

    $("#symptoms_here").empty();
    //render frontend
    let symptoms = PATIENT_EXAMPLE.symptoms;

    $("#symptoms_here").append(`
        
        <h2>¿Cómo te sientes?</h2>  
        <hr>

    `)

    for(key1 in symptoms){
        for(key2 in spanishSymptoms){
            if(key1 === key2){

                let modalLauncher;

                //put symptoms with detais here
                if(key1 === "abdominalPain"){
                    modalLauncher = `data-toggle="modal" data-target="#symptom_details_modal"`
                }

                $("#symptoms_here").append(`
    
                <button class="btn btn-outline-primary" ${modalLauncher} id="${key1}">${spanishSymptoms[key2]}</button>    
                <hr>
    
            `)
            }
        }
    }
}

$("body").on("click", "#init_sintomas", function(){

    patient_example = PATIENT_EXAMPLE;

    let phone = $("#phoneNumber").val();

    console.log(patient_example);

    patient_example.info.phone = phone;

    //send phone to db and check if it exists
    $.ajax({
        url: "/check_phone",
        method: "POST",
        data: {phone: patient_example.info.phone},
        success: function(res){
            console.log(res);

            //if succes render symptoms ui
            renderSymptomsFrontend();
        }
    })


});

//SYMPTOMS BUTTONS
$("body").on("click", "#fever", function(){
    let thisClass = $(this).attr("class");
    if(thisClass === "btn btn-outline-primary"){
        $(this).attr("class", "btn btn-primary");
        patient_example.symptoms.fever.isPresent = true;
    }else if(thisClass === "btn btn-primary"){
        $(this).attr("class", "btn btn-outline-primary");
        patient_example.symptoms.fever.isPresent = false;
    }
})

$("body").on("click", "#cough", function(){
    let thisClass = $(this).attr("class");
    if(thisClass === "btn btn-outline-primary"){
        $(this).attr("class", "btn btn-primary");
        patient_example.symptoms.cough.isPresent = true;
    }else if(thisClass === "btn btn-primary"){
        $(this).attr("class", "btn btn-outline-primary");
        patient_example.symptoms.cough.isPresent = false;
    }
})

$("body").on("click", "#abdominalPain", function(){
    let thisClass = $(this).attr("class");
    if(thisClass === "btn btn-outline-primary"){
        $(this).attr("class", "btn btn-primary");
        patient_example.symptoms.abdominalPain.isPresent = true;

        // launch symptoms details
        //()modal body is already empty)
        //append html
        let detailButtonsWidth = "80px"
        $("#symptom_details_modal").find(".modal-title").text("Indique la zona donde le duela más")
        $("#symptom_details_modal").find(".modal-body").append(`

            <div class="container-fluid text-center mx-auto p-0">
            <img src="./images/triagix/abdomen3.png" class="abdomen-image">

                <div class="row text-center mx-auto" style="height: 20vh">
                    <div class="col text-center mx-auto p-0">
                        <button class="btn btn-outline-primary-sm transparent btn-block mx-auto full-size-button" id="abdomen1">uno</button>
                    </div>
                    <div class="col text-center mx-auto p-0">
                        <button class="btn btn-outline-primary-sm transparent btn-block mx-auto full-size-button" id="abdomen2">dos</button>
                    </div>    
                    <div class="col text-center mx-auto p-0">
                        <button class="btn btn-outline-primary transparent btn-block mx-auto full-size-button" id="abdomen3">tres</button>
                    </div>
                </div>

                <div class="row text-center mx-auto" style="height: 20vh">
                    <div class="col text-center mx-auto p-0">
                        <button class="btn btn-outline-primary-sm transparent btn-block mx-auto full-size-button" id="abdomen4">cuatro</button>
                    </div>
                    <div class="col text-center mx-auto p-0">
                        <button class="btn btn-outline-primary-sm transparent btn-block mx-auto full-size-button" id="abdomen5">cinco</button>
                    </div>    
                    <div class="col text-center mx-auto p-0">
                        <button class="btn btn-outline-primary-sm transparent btn-block mx-auto full-size-button" id="abdomen6">seis</button>
                    </div>
                </div>

                <div class="row text-center mx-auto" style="height: 20vh">
                    <div class="col text-center mx-auto p-0">
                        <button class="btn btn-outline-primary-sm transparent btn-block mx-auto full-size-button" id="abdomen7">siete</button>
                    </div>
                    <div class="col text-center mx-auto p-0">
                        <button class="btn btn-outline-primary-sm transparent btn-block mx-auto full-size-button" id="abdomen8">ocho</button>
                    </div>    
                    <div class="col text-center mx-auto p-0">
                        <button class="btn btn-outline-primary-sm transparent btn-block mx-auto full-size-button" id="abdomen9">nueve</button>
                    </div>
                </div>
            
            </div>
        `)


    }else if(thisClass === "btn btn-primary"){
        $(this).attr("class", "btn btn-outline-primary");
        patient_example.symptoms.abdominalPain.isPresent = false;
    }
})

$("body").on("click", "#throatPain", function(){
    let thisClass = $(this).attr("class");
    if(thisClass === "btn btn-outline-primary"){
        $(this).attr("class", "btn btn-primary");
        patient_example.symptoms.throatPain.isPresent = true;
    }else if(thisClass === "btn btn-primary"){
        $(this).attr("class", "btn btn-outline-primary");
        patient_example.symptoms.throatPain.isPresent = false;
    }
})

$("body").on("click", "#runnyNose", function(){
    let thisClass = $(this).attr("class");
    if(thisClass === "btn btn-outline-primary"){
        $(this).attr("class", "btn btn-primary");
        patient_example.symptoms.runnyNose.isPresent = true;
    }else if(thisClass === "btn btn-primary"){
        $(this).attr("class", "btn btn-outline-primary");
        patient_example.symptoms.runnyNose.isPresent = false;
    }
})

$("body").on("click", "#urinatingPain", function(){
    let thisClass = $(this).attr("class");
    if(thisClass === "btn btn-outline-primary"){
        $(this).attr("class", "btn btn-primary");
        patient_example.symptoms.urinatingPain.isPresent = true;
    }else if(thisClass === "btn btn-primary"){
        $(this).attr("class", "btn btn-outline-primary");
        patient_example.symptoms.urinatingPain.isPresent = false;
    }
})

$("body").on("click", "#diarrhea", function(){
    let thisClass = $(this).attr("class");
    if(thisClass === "btn btn-outline-primary"){
        $(this).attr("class", "btn btn-primary");
        patient_example.symptoms.diarrhea.isPresent = true;
    }else if(thisClass === "btn btn-primary"){
        $(this).attr("class", "btn btn-outline-primary");
        patient_example.symptoms.diarrhea.isPresent = false;
    }
})