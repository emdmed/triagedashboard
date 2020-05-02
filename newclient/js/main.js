let triagixweb = "www.google.com"

//request patient example onload
let PATIENT_EXAMPLE_; //never write data here
let patient_example; //write on this one only

//request list
requestPatientList();

//request patient list every 30s time
setInterval(() => {
    requestPatientList();
}, 30000);

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
    $("#clinic_triage_modal").find(".modal-body").append(`<h5 class="m-0 text-center">Por favor realice las siguientes preguntas.</h5><p>Si alguna es afirmativa por favor seleccionela, de lo contrario seleccione "Continuar"</p>`)
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

    console.log("Seding patient: ", patient_example);

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
            let orderedData = data.sort((a,b) =>  b.score < a.score ? -1:1)
            console.log("ordered patient ", orderedData);

            orderedData.forEach(element => {

                console.log("score ", element.score, " patient ", element.age)

                //set waiting time
                let waitingTime;
                moment.locale('es');
                waitingTime = moment(element.info.date).startOf().fromNow(); 
          
                //set card color according priority score
                if(element.score >= 0 && element.score < 30){
                    priority_class = "border-success";
                    renderNewDashboardPatientCard(element, priority_class, pendingTriageBadge, waitingTime);
                } else if(element.score >= 30 && element.score < 60){
                    priority_class = "border-primary";
                    renderNewDashboardPatientCard(element, priority_class, pendingTriageBadge, waitingTime);
                } else if(element.score > 60){
                    priority_class = "border-danger";
                    renderNewDashboardPatientCard(element, priority_class, pendingTriageBadge, waitingTime);
                }
            });

            orderedData.forEach(element=>{
                //set waiting time
                let waitingTime;
                moment.locale('es');
                waitingTime = moment(element.info.date).startOf().fromNow(); 

                if(element.score === undefined){
                    priority_class = "border-dark"
                    pendingTriageBadge = `<img src="./images/triagix/timer.png" height="20px">`
                    renderNewDashboardPatientCard(element, priority_class, pendingTriageBadge, waitingTime);
                }
            })
        }
    })
}

function renderPatientCard(element, priority_class, pendingTriageBadge, waitingTime){
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
                    <a class="btn btn-primary-sm" href="https://web.whatsapp.com/send?phone=${element.info.phone}&text=Hola%20porfavor%20complete%20el%20ingreso%20a%20la%20guardia%20con%20el%20siguiente%20link%20https://${triagixweb}/paciente">enviar triage</a>
                    <button class="btn btn-outline-primary-sm delete_patient" id="${element.info.phone}" >Atendido</button>
                </div>
            </div>
        </div>
    </div>
    `)
}

function renderNewDashboardPatientCard(element, priority_class, pendingTriageBadge, waitingTime){
    $("#patient_cards_here").append(`
         
        <div class="card shadow mb-2 ${priority_class}" id="${element.info.phone}">
    
            <div class="card-body">

                <div class="row no-gutters align-items-center">

                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Nro ${element.info.number}</div>
                        <div class="h4 mb-0 font-weight-bold text-gray-800">${element.info.age} años</div>
                    </div>

                    <div class="col mr-2">
                        <div class="font-weight-bold mb-1">Esperando ${waitingTime}</div>
                    </div>

                    <div class="col-auto">
                    ${pendingTriageBadge}
                    <a class="btn btn-primary" href="https://web.whatsapp.com/send?phone=${element.info.phone}&text=Hola%20porfavor%20complete%20el%20ingreso%20a%20la%20guardia%20con%20el%20siguiente%20link%20https://${triagixweb}/paciente" >Enviar triage</a>
                    <button class="btn btn-outline-primary-sm delete_patient id="${element.info.phone}">Atendido</button>
                    </div>

                </div>
        
            </div>
        </div>

    `)
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