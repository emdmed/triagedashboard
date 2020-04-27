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
        $("#symptom_details_modal").find(".modal-body").append(`

            <div class="container-fluid text-center mx-auto">

                <div class="row text-center mx-auto">
                    <div class="col-xs-6 text-center mx-auto">
                        <button class="btn btn-primary-sm mx-auto" style="width:${detailButtonsWidth}">uno</button>
                    </div>
                    <div class="col-xs-6 text-center mx-auto">
                        <button class="btn btn-primary-sm mx-auto" style="width:${detailButtonsWidth}">dos</button>
                    </div>    
                    <div class="col-xs-6 text-center mx-auto">
                        <button class="btn btn-primary-sm mx-auto" style="width:${detailButtonsWidth}">tres</button>
                    </div>
                </div>

                <div class="row text-center mx-auto">
                <div class="col-xs-6 text-center mx-auto">
                    <button class="btn btn-primary-sm mx-auto" style="width:${detailButtonsWidth}">cuatro</button>
                </div>
                <div class="col-xs-6 text-center mx-auto">
                    <button class="btn btn-primary-sm mx-auto" style="width:${detailButtonsWidth}">cinco</button>
                </div>    
                <div class="col-xs-6 text-center mx-auto">
                    <button class="btn btn-primary-sm mx-auto" style="width:${detailButtonsWidth}">seis</button>
                </div>
            </div>

            <div class="row text-center text-center mx-auto">
                <div class="col-xs-6 text-center mx-auto">
                    <button class="btn btn-primary-sm mx-auto" style="width:${detailButtonsWidth}">siete</button>
                </div>
                <div class="col-xs-6 text-center mx-auto">
                    <button class="btn btn-primary-sm mx-auto" style="width:${detailButtonsWidth}">ocho</button>
                </div>    
                <div class="col-xs-6 text-center mx-auto">
                    <button class="btn btn-primary-sm mx-auto" style="width:${detailButtonsWidth}">nueve</button>
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