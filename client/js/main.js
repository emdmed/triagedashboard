//request patient exmple onload

// LINK TO SEND WHATSAPP DIRECTLY FROM FRONTEND https://web.whatsapp.com/send?phone=PHONENUMBER

let PATIENT_EXAMPLE;
let patient_example; //write on this one only
console.log("main js loaded")
moment.locale('es')
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

function requestPatientExample(){
    $.ajax({
        url: "/patient_example",
        method: "GET",
        success: function(res){
            let data = res
            PATIENT_EXAMPLE = data;
            console.log(PATIENT_EXAMPLE);
            console.log("Patient model retrieved");
        }
    })


    //request list
    $.ajax({
        url: "/patient_list",
        method: "GET",
        success: function(res){
            let data = res
            let priority_class;

            $("#patient_cards_here").empty();

            //order data by data.score
            let orderedData = data.sort((a,b) =>  b.score-a.score)

            //console.log("data ", data);
            //.log("Ordered data ", orderedData);

     

            orderedData.forEach(element => {

                console.log(element.score)

                //set card color according priority score
                if(element.score >= 0 && element.score < 30){
                    priority_class = "border-success"
                } else if(element.score >= 30 && element.socre < 60){
                    priority_class = "border-primary"
                } else if(element.score > 60){
                    priority_class = "border-danger"
                }

                //set waiting time
                let waitingTime;
                moment.locale('es');
                waitingTime = moment().startOf(element.info.date).fromNow(); 
                console.log(moment(element.info.date), moment()); 

                console.log("priority class", priority_class)

                $("#patient_cards_here").append(`
                
                    <div class="card text-center mx-auto ${priority_class}" id="${element.info.phone}">
                        <div class="card-body text-center">
                            <div class="form-row align-items-center">
                                <div class="col-auto pl-3 pr-3 ">
                                    <h4>${element.info.age} años</h4>
                                </div>
                                <div class="col-auto pl-3 pr-3">
                                    <p class="card-text"><small class="text-muted">Esperando ${waitingTime}</small></p>
                                </div>
                                <div class="col-auto pl-3 pr-3">
                                    <a class="btn btn-primary-sm" href="https://web.whatsapp.com/send?phone=${element.info.phone}&text=http://localhost:3000/paciente">Hacer pasar</a>
                                    <button class="btn btn-outline-primary-sm" >Atendido</button>
                                    <button class="btn btn-outline-primary-sm" >Ver síntomas</button>
                                </div>
                            </div>
                        </div>
                    </div>

                `)
            });
        }
    })
}

$("body").on("click", "#send_patient_btn", function(){
    //validation pending
    console.log("click");

    //avoid writing on PATIENT_EXAMPLE
    patient_example = PATIENT_EXAMPLE;

    let phone = $("#patient_phone").val();
    let age = $("#patient_age").val();
    let date = new Date();

    patient_example.info.phone = phone;
    patient_example.info.age = age;
    patient_example.info.date = date;

    render_clinic_triage()
})

$("body").on("click", ".getPatientList_btn", function(){

    //request list
    $.ajax({
        url: "/patient_list",
        method: "GET",
        success: function(res){
            let data = res
            let priority_class;

            $("#patient_cards_here").empty();

            //order data by data.score
            let orderedData = data.sort((a,b) =>  b.score-a.score)

            console.log("data ", data);
            //console.log("Ordered data ", orderedData);

     

            orderedData.forEach(element => {
                //set card color according priority score
                if(element.score >= 0 && element.score < 30){
                    priority_class = "border-success"
                } else if(element.score >= 30 && element.score < 60){
                    priority_class = "border-primary"
                } else if(element.score > 60){
                    priority_class = "border-danger"
                }

                //set waiting time
                let waitingTime;
                moment.locale('es');
                waitingTime = moment().startOf(element.info.date).fromNow(); 
                console.log(moment(element.info.date), moment()); 

                $("#patient_cards_here").append(`
                
                    <div class="card text-center mx-auto ${priority_class}" id="${element.info.phone}">
                        <div class="card-body text-center">
                            <div class="form-row align-items-center">
                                <div class="col-auto pl-3 pr-3 ">
                                    <h4>${element.info.age} años</h4>
                                </div>
                                <div class="col-auto pl-3 pr-3">
                                    <p class="card-text"><small class="text-muted">Esperando ${waitingTime}</small></p>
                                </div>
                                <div class="col-auto pl-3 pr-3">
                                    <a class="btn btn-primary-sm" href="https://web.whatsapp.com/send?phone=${element.info.phone}&text=http://localhost:3000/paciente">Hacer pasar</a>
                                    <button class="btn btn-outline-primary-sm" >Atendido</button>
                                    <button class="btn btn-outline-primary-sm" >Ver síntomas</button>
                                </div>
                            </div>
                        </div>
                    </div>

                `)
            });
        }
    })

});

//just for testing
$("body").on("click", "#addTestPatient_btn", function(){

    $.ajax({
        url: "/score_patient",
        method: "GET",
        success: function(res){
            console.log("success")
        }
    })

});

function render_clinic_triage(){
    $("#clinic_triage_modal").find(".modal-body").empty();

    let symptoms = PATIENT_EXAMPLE.ruleOut;

    for(key1 in symptoms){
        for(key2 in questions){
            if(key1 === key2){
                $("#clinic_triage_modal").find(".modal-body").append(`
    
                <button class="btn btn-outline-primary ruleout_btn" id="${key1}">${questions[key2]}</button>    
                <hr>
    
            `)
            }
        }
    }

    //re render continue button
    $("#clinic_triage_modal").find(".modal-footer").empty();
    $("#clinic_triage_modal").find(".modal-footer").append(`
    
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="end_patient_modal_btn">Continuar</button>

    `)
}

$("body").on("click", ".ruleout_btn", function(){

    let id = $(this).attr("id");

    //avoid writing on PATIENT_EXAMPLE

    patient_example = PATIENT_EXAMPLE;

    patient_example.ruleOut[id] = true;

    $.ajax({
        url: "/send_patient_to_server",
        method: "POST",
        contentType: "application/JSON",
        data: JSON.stringify(patient_example),
        success: function(res){
            $("#clinic_triage_modal").find(".modal-body").empty();
            $("#clinic_triage_modal").find(".modal-body").append(`
            
                <p>Telefono</p>
                <input type="number" placeholder="Telefono celular" id="patient_phone" value="11">
                <hr>
                <p>Edad</p>
                <input type="number" placeholder="Edad" id="patient_age">

            `);

            $("#clinic_triage_modal").modal("hide");
          
         
        }

    })

})

//reset add_patient modal when hidden
$('#clinic_triage_modal').on('hidden.bs.modal', function () {
    $("#clinic_triage_modal").find(".modal-body").empty();
    $("#clinic_triage_modal").find(".modal-body").append(`
    
        <p>Telefono</p>
        <input type="number" placeholder="Telefono celular" id="patient_phone" value="11">
        <hr>
        <p>Edad</p>
        <input type="number" placeholder="Edad" id="patient_age">

    `);

    $("#clinic_triage_modal").find(".modal-footer").empty();
    $("#clinic_triage_modal").find(".modal-footer").append(`
    
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="send_patient_btn">Continuar</button>

    `)
});

$("body").on("click", "#end_patient_modal_btn", function(){
    //continue

    //avoid writing on PATIENT_EXAMPLE
    patient_example = PATIENT_EXAMPLE;

    $.ajax({
        url: "/send_patient_to_server",
        method: "POST",
        contentType: "application/JSON",
        data: JSON.stringify(patient_example),
        success: function(res){
            console.log(res);     
            $("#clinic_triage_modal").modal("hide");
            //render patient on ui 
        }

    })

})