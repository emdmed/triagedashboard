//request patient exmple onload

// LINK TO SEND WHATSAPP DIRECTLY FROM FRONTEND https://web.whatsapp.com/send?phone=PHONENUMBER

let PATIENT_EXAMPLE_; //never write data here
let patient_example; //write on this one only
console.log("main js loaded")
moment.locale('es')
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

//request list
requestPatientList();

//request patient list every x time
/*
setInterval(() => {
    requestPatientList();
}, 5000);
*/

function requestPatientExample(){
    $.ajax({
        url: "/patient_example",
        method: "GET",
        success: function(res){
            let data = res
            PATIENT_EXAMPLE_ = data;
            console.log(PATIENT_EXAMPLE_);
            console.log("Patient model retrieved");
            patient_example = PATIENT_EXAMPLE_;
        }
    })
}

$("body").on("click", "#send_patient_btn", function(){
    //validation pending
    console.log("click");

    let phone = $("#patient_phone").val();
    let age = $("#patient_age").val();
    let date = new Date();
    let nomobile = $("#nomobile_check").prop("checked");
    console.log(nomobile);

    patient_example.info.phone = phone;
    patient_example.info.age = age;
    patient_example.info.date = date;
    patient_example.info.nomobile = nomobile;

    render_clinic_triage()
})

$("body").on("click", ".getPatientList_btn", function(){

    //request list
    requestPatientList();

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

    let symptoms = patient_example.ruleOut;

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

    patient_example.ruleOut[id] = true;


    console.log("Sending patient: ", patient_example);

    $.ajax({
        url: "/send_patient_to_server",
        method: "POST",
        contentType: "application/JSON",
        data: JSON.stringify(patient_example),
        success: function(res){

            if(res.message === "Duplicated phone in db"){
                alert("El numero de telefono indicado ya se encuentra en uso.");
            }

            //reset modal
            $("#clinic_triage_modal").find(".modal-body").empty();
            $("#clinic_triage_modal").find(".modal-body").append(`
            
                <p>Telefono</p>
                <input type="number" placeholder="Telefono celular" id="patient_phone">
                <hr>
                <p>Edad</p>
                <input type="number" placeholder="Edad" id="patient_age">

            `);

            $("#clinic_triage_modal").modal("hide");

            requestPatientList();
            //reset patient example
            requestPatientExample();
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

    //avoid writing on PATIENT_EXAMPLE_
    //patient_example = PATIENT_EXAMPLE_;

    console.log("Seding patient: ", patient_example);

    //nomobile render triage on admin panel


    $.ajax({
        url: "/send_patient_to_server",
        method: "POST",
        contentType: "application/JSON",
        data: JSON.stringify(patient_example),
        success: function(res){
                 

            if(res.message === "Duplicated phone in db"){
                alert("El numero de telefono indicado ya se encuentra en uso.");
            }

            $("#clinic_triage_modal").modal("hide");
            //render patient on ui 

            requestPatientList();
            requestPatientExample();

        },
        error: function(res){
            let problem = res;
            alert(problem.message);
        }
    })
})


function requestPatientList(){
    $.ajax({
        url: "/patient_list",
        method: "GET",
        success: function(res){
            let data = res
            let priority_class;
            let pendingTriageBadge = `<img src="./images/triagix/correct.png" height="20px">`;

            $("#patient_cards_here").empty();

            //order data by data.score
            let orderedData = data.sort((a,b) =>  b.score-a.score)

            orderedData.forEach(element => {

                console.log("score ", element.score)

                //set card color according priority score
                if(element.score >= 0 && element.score < 30){
                    priority_class = "border-success"
                } else if(element.score >= 30 && element.score < 60){
                    priority_class = "border-primary"
                } else if(element.score > 60){
                    priority_class = "border-danger"
                }else if (element.score === undefined){
                    priority_class = "border-dark"
                    pendingTriageBadge = `<img src="./images/triagix/timer.png" height="20px">`
                }

                //set waiting time
                let waitingTime;
                moment.locale('es');
                waitingTime = moment().startOf(element.info.date).fromNow(); 

                console.log("priority class", priority_class)

                $("#patient_cards_here").append(`
                
                    <div class="card text-center mx-auto ${priority_class} p-0 m-1" id="${element.info.phone}">
                        <div class="card-body text-center p-1">
                            <div class="form-row align-items-center">
                                <div class="col-auto pl-3 pr-3 ">
                                    <p class="m-0">Nro ${element.info.number}</p>
                                </div>
                                <div class="col-auto pl-3 pr-3 ">
                                    <h4 class="m-0">${element.info.age} años</h4>
                                </div>
                                <div class="col-auto pl-2 pr-2">
                                    ${pendingTriageBadge}
                                </div>
                                <div class="col-auto pl-3 pr-3">
                                    <p class="card-text"><small class="text-muted">Esperando ${waitingTime}</small></p>
                                </div>
                                <div class="col-auto pl-3 pr-3">
                                    <a class="btn btn-primary-sm" href="https://web.whatsapp.com/send?phone=${element.info.phone}&text=https://192.168.0.50:3000/paciente">enviar triage</a>
                                    <button class="btn btn-outline-primary-sm delete_patient" id="${element.info.phone}" >Atendido</button>
                                </div>
                            </div>
                        </div>
                    </div>

                `)
            });
        }
    })
}

$("body").on("click", ".delete_patient", function(){

    let check = confirm("¿Confirmar que el paciente ya fue atendido?")
    console.log(check)
    if(check === false){

    } else if (check === true){
        let phonenumber = $(this).attr("id");

        $.ajax({
            url: "/delete_patient",
            method: "POST",
            data: {phone: phonenumber},
            success: function(res){
                console.log(res);
                requestPatientList();
            }
        })
    }
})